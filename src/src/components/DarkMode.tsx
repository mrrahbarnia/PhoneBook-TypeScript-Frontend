import { MdLightMode } from "react-icons/md"; 
import { Fragment, useState } from "react";
import { BsFillMoonStarsFill } from "react-icons/bs"; 
export const DarkMode = () => {
    const [darkMode, setDarkMode] = useState<"dark" | "light">("light")

    const darkModeHandler = () => {
        if (darkMode === "dark") {
            setDarkMode("light")
        } else {
            setDarkMode("dark")
        }
        document.documentElement.classList.toggle("dark")
    }
    return <Fragment>
        {darkMode === "light" ? <BsFillMoonStarsFill onClick={darkModeHandler} size={20} className="text-black cursor-pointer"/> : <MdLightMode onClick={darkModeHandler} size={20} className="text-white cursor-pointer"/>}
    </Fragment>
    
}