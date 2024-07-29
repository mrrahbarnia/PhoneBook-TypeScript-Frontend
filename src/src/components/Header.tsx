"use client"
import { SlNotebook } from "react-icons/sl";
import { useState } from "react";
import { FaAlignJustify } from "react-icons/fa";
import Link from "next/link";

const HEADER_LINKS: string[] = ["Login", "Register", "Phone book"]


export function Header() {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const clickHandler = () => {
        setShowMobileMenu(!showMobileMenu)
    }

    return <nav className="flex flex-wrap justify-between lg:justify-start space-x-10 items-center">
        <Link href="#" className="cursor-pointer text-purple-700">
            <SlNotebook size={30}/>
        </Link>
        {HEADER_LINKS.map(link => <button className="transition rounded-lg px-3 py-1 hover:bg-purple-100 font-bold hidden lg:block"><Link href="#">{link}</Link></button>)}
        <button className="lg:hidden cursor-pointer text-purple-700 hover:text-purple-500 p-1 bg-gray-100 rounded-md">
            <FaAlignJustify onClick={clickHandler} size={30}/>
        </button>
        {showMobileMenu && <div className="lg:hidden w-full bg-gray-100 my-2 rounded-lg">
            <ul className="space-y-2 p-1">
                {HEADER_LINKS.map(link => <li key={link} className="font-bold hover:bg-purple-100 cursor-pointer px-2 rounded-lg"><Link href="#">{link}</Link></li>)}
            </ul>
        </div>}
    </nav>
}