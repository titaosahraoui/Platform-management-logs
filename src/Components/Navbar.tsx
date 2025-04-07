
import SearchBox from "./SearchBox"
import { useState } from "react"
import ProfileIcon from "../assets/Profile.svg";
import CarrowDown from "../assets/CaretDown.svg";
import { useAppSelector } from "../Redux/Store";


export interface navbarinterface {
    links: link[],
}

export interface link {
    path: string,
    label: string,
}

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const username = useAppSelector((state) => state.auth.username);
    console.log("Username from Redux:", username);
    return (
        <div className=" flex justify-between items-center bg-white text-black w-[100%] border-b-[1px] border-[#E5E5E5]">
            <div className=" p-4 ml-10">
                <SearchBox searchBy="search" searchTerm={searchTerm} setSearchTerm={(value) => setSearchTerm(value)} />
            </div>
            <div className="mr-10 flex items-center gap-2">
                <img src={ProfileIcon} alt="Profile" className=" cursor-pointer" />
                <h1 className=" cursor-pointer">{username}</h1>
                <img src={CarrowDown} alt="Arrow" className=" cursor-pointer" />
            </div>
        </div>
    )
}

export default Navbar