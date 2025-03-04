import { Outlet } from "react-router-dom"
import Navbar from "../Components/Navbar"
import Sidebar from "../Components/Sidebar";

const Layout = () => {
    const links = [
        { label: 'Dashnoard', path: '/' },
        { label: 'Stream', path: '/about' },
        { label: 'Search', path: '/payconnect/dev' },
        { label: 'Source', path: '/payconnect/Princing' },
        { label: 'System', path: '/contact' },
    ];

    return (
        <div className="flex  h-screen">
            <Sidebar links={links} />
            <div className="flex-1 flex flex-col overflow-hidden"> {/* Adjust margin based on sidebar width */}
                <Navbar />
                <div className="flex-1 overflow-y-auto p-4 mt-16"> {/* Adjust padding-top based on navbar height */}
                    <h1>Welcome to the LMS Dashboard</h1>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout