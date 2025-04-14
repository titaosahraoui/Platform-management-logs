import { Outlet } from "react-router-dom"
import Navbar from "../Components/Navbar"
import Sidebar from "../Components/Sidebar";

const Layout = () => {
    const links = [
        { label: 'Dashnoard', path: '/' },
        { label: 'Stream', path: '/Dashboard' },
        { label: 'Logs', path: '/logs' },
        { label: 'Source', path: '/payconnect/Princing' },
        { label: 'System', path: '/contact' },
    ];

    return (
        <div className="flex h-screen">
            <Sidebar links={links} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <div className="flex-1 overflow-y-auto p-4 mt-16 border-2 border-black flex justify-center">
                    <div className="w-full max-w-4xl flex flex-col items-center">
                        <h1>Welcome to the LMS Dashboard</h1>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Layout