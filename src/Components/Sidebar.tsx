import { useState } from "react";
import { NavLink } from "react-router-dom";


export interface SidebarInterface {
    links: link[],
}

export interface link {
    path: string,
    label: string,
}

const Sidebar = ({ links }: SidebarInterface) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`bg-[#F9F9F9] min-h-screen h-[90vh] ${isExpanded ? 'w-[30px]' : 'w-[267px]'} transition-width duration-300 px-5 py-5 relative`}>
            <div className="p-2  ">
                <img src="data:image/png;base64,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" alt="Sonatrach" width={200} />
            </div>
            <button onClick={toggleSidebar} className="text-white w-[30px] h-[30px] bg-[#FF4B00] rounded-full absolute top-14 -right-3">
                {isExpanded ? '>' : '<'}
            </button>
            <div className={` ${isExpanded ? 'hidden' : 'flex flex-col gap-8 mt-20'} `}>
                {links.map((link, i) => (
                    <NavLink key={i} to={link.path} className={({ isActive, isPending }) =>
                        isPending ? 'link cursor-pointer   ' : isActive ? ' bg-[#FF4B00] rounded text-white' : `text-[#727272] hover:bg-[#fff4f0] rounded hover:text-[#FF4B00]`
                    }>
                        <div className='flex items-center gap-3 w-full link cursor-pointer hover:bg-primaryColor text-left rounded px-4 py-4'>
                            {link.label}
                        </div>
                    </NavLink>

                ))}
            </div>
        </div>
    )
}

export default Sidebar

