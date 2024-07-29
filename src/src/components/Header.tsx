"use client"
import { useState } from "react";
import { DarkMode } from "./DarkMode";
import { SlNotebook } from "react-icons/sl";
import { FaAlignJustify } from "react-icons/fa";
import Link from "next/link";

const HEADER_LINKS: string[] = ["Login", "Register", "Phone book"]


export function Header() {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const clickHandler = () => {
        setShowMobileMenu(!showMobileMenu)
    }

    return <nav className="flex flex-wrap justify-between lg:justify-start space-x-10 items-center">
        <div className="flex items-center space-x-4">
            <Link href="#" className="cursor-pointer text-purple-700 dark:text-white">
                <SlNotebook size={30}/>
            </Link>
            <div>
                <DarkMode />
            </div>
        </div>
        {HEADER_LINKS.map(link => <button key={link} className="dark:text-white dark:bg-purple-400 dark:hover:bg-purple-200 transition rounded-lg px-3 py-1 hover:bg-purple-100 font-bold hidden lg:block"><Link href="#">{link}</Link></button>)}
        <button className="dark:bg-transparent dark:text-white lg:hidden cursor-pointer text-purple-700 hover:text-purple-500 p-1 bg-gray-100 rounded-md">
            <FaAlignJustify onClick={clickHandler} size={30}/>
        </button>
        {showMobileMenu && <div className="lg:hidden w-full bg-gray-100 my-2 rounded-lg">
            <ul className="space-y-2 p-1">
                {HEADER_LINKS.map(link => <li key={link} className="transition dark:hover:bg-purple-400 font-bold hover:bg-purple-100 cursor-pointer px-2 rounded-lg"><Link href="#">{link}</Link></li>)}
            </ul>
        </div>}
    </nav>
}