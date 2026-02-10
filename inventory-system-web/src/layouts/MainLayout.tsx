import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";

export default function MainLayout() {
    return (
        <div className="flex justify-between flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <Navbar />
            <main className="flex flex-1">
                <Outlet />
            </main>
        </div>
    );
}
