"use client"
import { Header } from "@/app/component/header";
import { useEffect, useState } from "react";
import { ProdukCard } from '@/app/library/card2';
import { JoinDate } from '@/app/library/joinDate';


export default function Profile({params}) {
    let [slug] = params.name;  
    const [nama, setNama] = useState(null);
    const [about, setAbout] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [dataListing, setDataListing] = useState([]);

    const [card, addCard] = useState([]);

    let join = new Date().toString();

    let src = ""

    useEffect(() => {

        fetch('/api/user?uniqid=' + slug)
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                let [data] = res.message;
                setNama(data.fullname);
                setAbout(data.about);
                
                setAvatar(data.avatar);
                join = data.tgldaftar;
            })

        if (localStorage.getItem('produkstart') != undefined) {
            setDataListing(JSON.parse(localStorage.getItem('produkstart')));
        }

        (async function () {
            let data = await fetch('/pages/api/produk?limit=21&start=0&uid_user=' + slug);
            data = await data.json();
            localStorage.setItem('produkstart', JSON.stringify(data));
            setDataListing(data);
        })()
    }, [setDataListing])

    let yh = [];
    for (let index = 0; index < 12; index++) {
        yh.push({
            data: index
        })
    }
    return (<>
    <div className='my-5 bg-white'>
        <div className="pt-5 mx-[20px] xl:mx-[60px]">
            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-4 md:col-span-1">
                    <div className="block w-full">
                        <div className="flex md:block ml-auto mr-auto w-full md:w-[50%]">
                            <div className="relative " style={{width:"fit-content"}}>
                                { avatar ? 
                                (
                                    <figure className="w-[56px] md:w-[106px] h-[56px] md:h-[106px] bg-[50%] bg-cover rounded-full m-0" style={{backgroundImage:`url('https://ui-avatars.com/api/?name=${nama}&bold=true&background=1e1b4b&color=ffe50c&size=250')`}}></figure>
                                ) :
                                (
                                    <figure className="w-[56px] md:w-[106px] h-[56px] md:h-[106px] bg-[50%] bg-cover rounded-full m-0" style={{backgroundImage:`url('https://ui-avatars.com/api/?name=${nama}&bold=true&background=1e1b4b&color=ffe50c&size=250')`}}></figure>
                                ) }
                            </div>
                        </div>
                        <div className="flex items-center overflow-hidden whitespace-nowrap text-ellipsis">
                            <span className="text-[20px] leading-[30px] capitalize w-full font-bold">{nama?nama:"UserJo"}</span>
                        </div>
                        <div className="flex flex-col">
                            <div className="my-[20px]">
                                <div className="flex items-center">
                                    <svg className="w-[16px] h-[16px]" viewBox="0 0 1024 1024" fillRule="evenodd"><path d="M341.579 85.3359V127.981H683.211V85.3359H768.619V127.981H895.963L938.667 170.669V895.981L895.963 938.669H128.038L85.3335 895.981V170.669L128.038 127.981H256.15V85.3359H341.579ZM853.259 426.648H170.742V853.315H853.259V426.648ZM320.221 511.988C355.601 511.988 384.277 540.66 384.277 575.988C384.277 611.337 355.601 639.988 320.221 639.988C284.84 639.988 256.165 611.337 256.165 575.988C256.165 540.66 284.84 511.988 320.221 511.988ZM256.15 213.315H170.742V341.336H853.259V213.315H768.619V255.981L725.915 298.648L683.211 255.981V213.315H341.579V255.981L298.875 298.648L256.15 255.981V213.315Z"></path></svg>
                                    <div className="m-[4px] ml-[5px]">
                                        <span>Anggota sejak {JoinDate(join)}</span>
                                    </div>
                                </div>
                                { about ? (
                                <div className="flex items-center">
                                    <svg className="w-[16px] h-[16px]" viewBox="0 0 1024 1024" fillRule="evenodd"><path d="M512 938.664C276.736 938.664 85.3331 747.261 85.3331 511.997C85.3331 276.733 276.736 85.3307 512 85.3307C747.264 85.3307 938.667 276.733 938.667 511.997C938.667 747.261 747.264 938.664 512 938.664ZM512 853.331C700.202 853.331 853.333 700.2 853.333 511.997C853.333 323.795 700.202 170.664 512 170.664C323.797 170.664 170.666 323.795 170.666 511.997C170.666 700.2 323.797 853.331 512 853.331ZM512 383.997C488.448 383.997 469.333 364.883 469.333 341.331C469.333 317.779 488.448 298.664 512 298.664C535.552 298.664 554.667 317.779 554.667 341.331C554.667 364.883 535.552 383.997 512 383.997ZM512 725.331L469.333 682.664V469.331L512 426.664L554.667 469.331V682.664L512 725.331Z"></path></svg>
                                    <div className="m-[4px] ml-[5px]">
                                        <span>Kami menyediakan rumah siap huni</span>
                                    </div>
                                </div>
                                ) : ("") }
                            </div>
                            <div className="mt-1">
                                <span>Pengguna terverifikasi dengan</span>
                                <div className="mt-[5px]">
                                    <div className="flex my-[8px]">
                                        <div className="mr-[8px]">
                                            <svg className="w-[20px] h-[20px]" viewBox="0 0 1024 1024" fillRule="evenodd"><path d="M880.485 764.516C880.485 753.636 878.934 743.163 876.024 733.097C868.073 704.569 849.455 680.54 824.63 665.412C806.982 654.746 786.23 648.346 764.121 648.346C699.927 648.346 647.758 700.302 647.758 764.516C647.758 786.217 653.964 806.794 664.63 824.229C679.564 849.054 703.612 867.866 732.121 876.031C742.206 878.92 753.067 880.666 764.121 880.666C828.315 880.666 880.485 828.516 880.485 764.516V764.516ZM589.576 764.515C589.576 668.302 667.733 590.164 764.121 590.164C793.794 590.164 821.915 597.708 846.352 610.702C855.855 579.09 861.091 545.926 861.091 511.211C861.091 319.211 704.388 162.722 512 162.722C319.612 162.722 162.909 319.211 162.909 511.211C162.909 703.425 319.612 859.72 512 859.72C545.94 859.72 578.715 854.678 609.746 845.582C596.946 821.34 589.576 793.606 589.576 764.515V764.515ZM908.994 667.332C927.612 694.872 938.667 728.443 938.667 764.515C938.667 860.709 860.509 938.654 764.121 938.654C727.661 938.654 693.915 927.405 665.794 908.419C618.085 926.823 566.303 937.102 512 937.102C276.752 937.102 85.3335 746.091 85.3335 511.211C85.3335 276.351 276.752 85.3203 512 85.3203C747.249 85.3203 938.667 276.351 938.667 511.211C938.667 566.29 928 618.848 908.994 667.332V667.332ZM744.727 781.369L738.909 775.745L708.267 745.122H667.152V786.023L724.17 843.061H765.285L861.091 747.429V706.334H819.976L744.727 781.369ZM667.152 500.932C667.152 602.557 599.079 674.702 496.097 674.702C397.77 674.702 318.061 595.206 318.061 497.073C318.061 398.746 397.77 319.211 496.097 319.211C544.194 319.211 584.533 336.86 615.37 365.582L565.14 415.618V415.425C546.327 397.776 522.667 388.642 496.097 388.642C437.333 388.642 389.624 438.115 389.624 496.86C389.624 555.449 437.333 605.078 496.097 605.078C549.43 605.078 585.697 574.843 593.261 532.952H496.097V463.696H663.661C665.988 475.546 667.152 487.938 667.152 500.932V500.932Z"></path></svg>
                                        </div>
                                        <div className="mr-[8px]">
                                            <svg className="w-[20px] h-[20px]" viewBox="0 0 1024 1024" fillRule="evenodd"><path d="M880.485 764.438C880.485 753.597 878.934 743.143 876.024 733.078C868.073 704.608 849.455 680.617 824.63 665.335C806.982 654.668 786.23 648.288 764.121 648.288C699.927 648.288 647.758 700.36 647.758 764.438C647.758 786.314 653.964 806.833 664.63 824.249C679.564 849.034 703.612 867.808 732.121 875.934C742.206 878.843 753.067 880.588 764.121 880.588C828.315 880.588 880.485 828.515 880.485 764.438V764.438ZM609.746 845.563C596.946 821.359 589.576 793.665 589.576 764.438C589.576 728.191 600.689 694.542 619.675 666.654C454.827 659.09 322.58 524.69 319.535 359.027L322.211 355.071L409.406 320.259L414.197 322.062L467.064 427.604L465.455 432.433L441.484 444.38L429.46 450.411L430.875 463.754C436.015 512.123 474.938 550.949 523.404 556.108L536.766 557.505L542.798 545.5L554.783 521.587L559.612 519.977L665.329 572.729L667.152 577.519L642.153 639.929C673.61 609.209 716.626 590.222 764.121 590.222C793.794 590.222 821.915 597.747 846.352 610.722C855.855 579.168 861.091 545.868 861.091 511.211C861.091 319.192 704.388 162.78 512 162.78C319.612 162.78 162.909 319.192 162.909 511.211C162.909 703.444 319.612 859.682 512 859.682C545.94 859.682 578.715 854.639 609.746 845.563V845.563ZM908.994 667.255C927.612 694.93 938.667 728.443 938.667 764.438C938.667 860.651 860.509 938.654 764.121 938.654C727.661 938.654 693.915 927.424 665.794 908.477C618.085 926.862 566.303 937.102 512 937.102C276.752 937.102 85.3335 746.052 85.3335 511.211C85.3335 276.409 276.752 85.3203 512 85.3203C747.249 85.3203 938.667 276.409 938.667 511.211C938.667 566.387 928 618.848 908.994 667.255V667.255ZM819.976 706.372H861.091V747.391L765.285 843.042H724.17L667.152 786.12V745.083H708.267L738.909 775.667L744.727 781.466L819.976 706.372Z"></path></svg>
                                        </div>
                                        <div className="mr-[8px]">
                                            <svg className="w-[20px] h-[20px]" viewBox="0 0 1024 1024" fillRule="evenodd"><path d="M783.515 356.851L744.727 318.063H279.273L240.485 356.851V667.154L279.273 705.942H744.727L783.515 667.154V356.851ZM938.667 512.003C938.667 747.271 747.268 938.669 512 938.669C276.732 938.669 85.3335 747.271 85.3335 512.003C85.3335 276.735 276.732 85.3359 512 85.3359C747.268 85.3359 938.667 276.735 938.667 512.003V512.003ZM490.492 544.274L318.061 429.326V628.366H705.94V429.326L533.508 544.274H490.492ZM512 465.399L407.37 395.639H616.63L512 465.399Z"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block w-full my-[26px]">
                        <div className="w-auto">
                            <div className="text-center">
                                <a className="h-[48px] w-full bg-indigo-950 hover:bg-indigo-750 inline-flex justify-center items-center box-border cursor-pointer relative overflow-hidden rounded-md" style={{color:"rgb(250 204 21)"}}>
                                    <div className="flex mr-[8px]">
                                        <svg className="w-[22px] h-[22px]" style={{fill:"rgb(250 204 21)"}} viewBox="0 0 1024 1024" fillRule="evenodd"><path d="M768 853.333C720.896 853.333 682.666 815.104 682.666 768C682.666 720.896 720.896 682.667 768 682.667C815.104 682.667 853.333 720.896 853.333 768C853.333 815.104 815.104 853.333 768 853.333M256 597.333C208.896 597.333 170.666 559.104 170.666 512C170.666 464.896 208.896 426.667 256 426.667C303.104 426.667 341.333 464.896 341.333 512C341.333 559.104 303.104 597.333 256 597.333M768 170.667C815.104 170.667 853.333 208.896 853.333 256C853.333 303.104 815.104 341.333 768 341.333C720.896 341.333 682.666 303.104 682.666 256C682.666 208.896 720.896 170.667 768 170.667M768 597.333C715.562 597.333 669.312 621.44 637.994 658.645L424.32 535.253C425.386 527.616 426.666 519.979 426.666 512C426.666 507.221 425.642 502.741 425.258 498.091L643.541 372.053C674.645 405.461 718.72 426.667 768 426.667C862.25 426.667 938.666 350.251 938.666 256C938.666 161.749 862.25 85.3333 768 85.3333C673.749 85.3333 597.333 161.749 597.333 256C597.333 270.208 599.594 283.819 602.837 297.003L396.97 415.915C366.208 370.901 314.581 341.333 256 341.333C161.749 341.333 85.333 417.749 85.333 512C85.333 606.251 161.749 682.667 256 682.667C311.466 682.667 360.234 655.787 391.424 614.827L600.618 735.573C598.57 746.112 597.333 756.907 597.333 768C597.333 862.251 673.749 938.667 768 938.667C862.25 938.667 938.666 862.251 938.666 768C938.666 673.749 862.25 597.333 768 597.333"></path></svg>
                                    </div>
                                    <span>Bagikan Profil</span>
                                </a>
                            </div>
                        </div>
                        <div className="w-full h-[48px] my-[16px]">
                            <button className="border-2 h-[48px] border-yellow-400 w-full inline-flex justify-center items-center box-border cursor-pointer relative overflow-hidden rounded-md" style={{color:"rgb(250 204 21)"}}>
                                <div className="flex mr-[8px]">
                                    <svg className="w-[22px] h-[22px]" style={{fill:"rgb(250 204 21)"}} viewBox="0 0 1024 1024" fillRule="evenodd"><path d="M127.979 106.667L85.333 149.334V874.686L127.979 917.354L170.647 874.686V618.679H579.681L622.349 661.347H895.448L938.666 618.679V190.187L895.448 149.334H572.343L529.675 106.667H127.979ZM170.647 192.002H494.325L536.992 234.67H853.352V576.012H657.678L615.01 533.344H170.647V192.002Z"></path></svg>
                                </div>
                                <span>Laporkan pengguna</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-span-4 md:col-span-3">
                    <div className="mt-[10px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                        {dataListing.map((y, i) => {
                            y.key = i;
                            return (
                                <li className="list-none" key={i}>
                                    <ProdukCard data={y} />
                                </li>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>)
}