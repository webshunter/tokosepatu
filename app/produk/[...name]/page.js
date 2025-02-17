import { dataWilayah } from "@/app/library/loadJson";
const wilayah = dataWilayah();
import mysql from 'mysql2/promise';
import useSWR, { SWRConfig } from 'swr';
import ProdukDetail from "@/app/component/produk/produkDetail";
import { DB_CONF } from "@/app/library/configDatabase";
import Head from "next/head";
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export async function generateMetadata({ params, searchParams }, parent) {
    let [slug] = params.name; 
    const connection = await mysql.createConnection(DB_CONF);
    const query = `SELECT a.*, b.image, c.fullname, c.telp phone, c.avatar FROM listing a
        LEFT JOIN user c ON c.email = a.email
        LEFT JOIN gallery b ON a.uniqid = b.uid_listing 
        WHERE a.slug = '${slug}'`;
        const [data] = await connection.query(query);
        if(data){
            if(data.length > 0){
                let [getData] = data;
                return {
                    title: getData.judul +' - RumahJo',
                    description: getData.deskrisi,
                    metadataBase: new URL('https://rumahjo.com'),
                    alternates: {
                        canonical: '/produk/' + getData.slug,
                    },
                    openGraph: {
                        images: ['https://app.rumahjo.com/' + getData.image],
                    },
                }
            }else{
                return {
                    title: 'Halman tidak tersedia - RumahJo',
                    description: 'halman tidak untuk saat ini',
                    openGraph: {
                    },
                }
            }
        }
}

export default async function Produk({params}) {
    let [slug] = params.name; 
    const connection = await mysql.createConnection(DB_CONF);
    const query = `SELECT a.*, b.image, c.fullname, c.telp phone, c.avatar, c.reg FROM listing a
        LEFT JOIN user c ON c.email = a.email
        LEFT JOIN gallery b ON a.uniqid = b.uid_listing 
        WHERE a.slug = '${slug}'`;
    const [data] = await connection.query(query);

    console.log(data)
    // [latitude,longitude]
    return (<>
        {data && data.length > 0?
            <>
                <Head>
                    <title>{data.judul + ' - RumahJo'}</title>
                    <link
                        rel="canonical"
                        href={"/produk/"+data.slug}
                        key="canonical"
                    />
                </Head>
                <ProdukDetail data={data} />
            </>
        :
            <div className="py-[50px]">
                <div className="text-2xl text-center">Iklan tidak aktif</div>
            </div>
        }
    </>)
}