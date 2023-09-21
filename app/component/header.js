import Link from "next/link"
export const Header = function(){
    return (<>
        <nav className="bg-blue-600 text-white px-10 py-2">
            <Link href="/detail">detail</Link>
        </nav>
    </>)
}