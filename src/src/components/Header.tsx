"use client"
import { MdEmail } from "react-icons/md"; 
import { FaSignOutAlt } from "react-icons/fa"; 
import { CgProfile } from "react-icons/cg"; 
import { useState, Fragment } from "react";
import { DarkMode } from "./DarkMode";
import { SlNotebook } from "react-icons/sl";
import { FaAlignJustify } from "react-icons/fa";
import { useAtomValue, useSetAtom } from "jotai";
import { authenticatedEmail, isAuthenticated, setIsAuthenticatedToLocal } from "@/contexts/authContext";
import Link from "next/link";

const INTERNAL_LOGOUT_API = "/apis/logout/"

export function Header() {
    const email = useAtomValue(authenticatedEmail);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const setIsAuthenticated = useSetAtom(isAuthenticated);
    const setAuthenticatedEmail = useSetAtom(authenticatedEmail);

    const clickHandler = () => {
        setShowMobileMenu(!showMobileMenu)
    }
    console.log(email);
    

    const logoutHandler = async() => {
        await fetch(INTERNAL_LOGOUT_API);
        setIsAuthenticated(() => false)
        setAuthenticatedEmail(() => "")
        setIsAuthenticatedToLocal("0", "")
    }   

    return <Fragment><nav className="flex flex-wrap justify-between lg:justify-start space-x-10 items-center">
        <div className="flex items-center space-x-4">
            <Link href="/" className="cursor-pointer text-black dark:text-white">
                <SlNotebook size={30}/>
            </Link>
            {email && <div className="relative text-left">
                <CgProfile size={30} className="dark:text-white cursor-pointer" onClick={() => setShowProfile(!showProfile)} />
                {showProfile && <div className="z-20 absolute dark:bg-purple-400 rounded-lg py-2 px-4 space-y-2 shadow-md bg-purple-200 mt-2">
                    <div className="flex items-center space-x-2 dark:text-white">
                        <MdEmail size={25} />
                        <p className="block font-semibold">{email}</p>
                    </div>
                    <hr/>
                    <div className="flex items-center space-x-2 cursor-pointer hover:text-purple-900 dark:text-purple-600 dark:hover:text-purple-200">
                        <FaSignOutAlt size={20} />
                        <button className="block" onClick={logoutHandler}>Logout</button>
                    </div>
                </div>}
            </div>}
            <DarkMode />
        </div>

        {/* Desktop Links */}
        {!email && <button className="dark:text-white dark:bg-purple-400 dark:hover:bg-purple-200 transition rounded-lg px-3 py-1 hover:bg-purple-100 font-bold hidden lg:block"><Link href="/login">Login</Link></button>}
        {!email && <button className="dark:text-white dark:bg-purple-400 dark:hover:bg-purple-200 transition rounded-lg px-3 py-1 hover:bg-purple-100 font-bold hidden lg:block"><Link href="/register">Register</Link></button>}
        {!email && <button className="dark:text-white dark:bg-purple-400 dark:hover:bg-purple-200 transition rounded-lg px-3 py-1 hover:bg-purple-100 font-bold hidden lg:block"><Link href="/register">Reset password</Link></button>}
        {email && <button className="dark:text-white dark:bg-purple-400 dark:hover:bg-purple-200 transition rounded-lg px-3 py-1 hover:bg-purple-100 font-bold hidden lg:block"><Link href="/phone-book">Phone book</Link></button>}
        {email && <button className="dark:text-white dark:bg-purple-400 dark:hover:bg-purple-200 transition rounded-lg px-3 py-1 hover:bg-purple-100 font-bold hidden lg:block"><Link href="/change-password">Change password</Link></button>}

        {/* Dark Mode */}
        <button className="dark:bg-transparent dark:text-white lg:hidden cursor-pointer text-black hover:text-gray-600 p-1 bg-gray-100 rounded-md">
            <FaAlignJustify onClick={clickHandler} size={30}/>
        </button>

        {/* Mobile Links */}
        {showMobileMenu && <div className="lg:hidden w-full bg-gray-100 my-2 rounded-lg">
            <ul className="space-y-2 p-1">
                {!email && <Link href="/login"><li className="transition dark:hover:bg-purple-400 font-bold hover:bg-purple-100 cursor-pointer px-2 rounded-lg">Login</li></Link>}
                {!email && <Link href="/register"><li className="transition dark:hover:bg-purple-400 font-bold hover:bg-purple-100 cursor-pointer px-2 rounded-lg">Register</li></Link>}
                {!email && <Link href="/reset-password"><li className="transition dark:hover:bg-purple-400 font-bold hover:bg-purple-100 cursor-pointer px-2 rounded-lg">Reset password</li></Link>}
                {email && <Link href="/phone-book"><li className="transition dark:hover:bg-purple-400 font-bold hover:bg-purple-100 cursor-pointer px-2 rounded-lg">Phone book</li></Link>}
                {email && <Link href="/phone-book"><li className="transition dark:hover:bg-purple-400 font-bold hover:bg-purple-100 cursor-pointer px-2 rounded-lg">Change password</li></Link>}
            </ul>
        </div>}
    </nav>
    <hr className="mt-4"/>
    </Fragment>
}