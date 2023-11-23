import { dataWilayah } from "@/app/library/loadJson";
const wilayah = dataWilayah();
import mysql from 'mysql2/promise';
import useSWR, { SWRConfig } from 'swr';
import ProdukDetail from "@/app/component/produk/produkDetail";
import { DB_CONF } from "@/app/library/configDatabase";
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export async function generateMetadata({ params, searchParams }, parent) {
    let [slug] = params.name; 
    const connection = await mysql.createConnection(DB_CONF);
    const query = `SELECT a.*, b.image, c.fullname, c.telp phone FROM listing a
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
                    openGraph: {
                        images: ['https://app.rumahjo.com/' + getData.image],
                    },
                }
            }
        }
}

export default async function Produk({params}) {
    let [slug] = params.name; 
    const connection = await mysql.createConnection(DB_CONF);
    const query = `SELECT a.*, b.image, c.fullname, c.telp phone FROM listing a
        LEFT JOIN user c ON c.email = a.email
        LEFT JOIN gallery b ON a.uniqid = b.uid_listing 
        WHERE a.slug = '${slug}'`;
    const [data] = await connection.query(query);
    // [latitude,longitude]
    return (<>
        {data?
        <ProdukDetail data={data} />
        :<> 
        
        </>
        }
    </>)
}