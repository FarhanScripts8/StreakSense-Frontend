import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import MobileNav from "./MobileNav.jsx";

export default function AppLayout() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <MobileNav />
      <main className="lg:ml-64 px-4 lg:px-8 py-6 lg:py-8 pb-24 lg:pb-10 max-w-6xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
