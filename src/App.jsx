import { Routes, Route, Outlet } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import VideoPlayer from "./pages/VideoPlayer";
import Channel from "./pages/Channel";
import Auth from "./pages/Auth";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function MainLayout({ handleToggleSidebar, setSearchQuery, mobileOpen, collapsed, setMobileOpen }) {
  return (
    <>
      <Header onToggleSidebar={handleToggleSidebar} setSearchQuery={setSearchQuery} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar mobileOpen={mobileOpen}  collapsed={collapsed}  onClose={() => setMobileOpen(false)} />

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <Outlet /> 
        </main>
      </div>
    </>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  function handleToggleSidebar() {
    if (window.innerWidth < 768) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <Routes>
        {/* Auth Page */}
        <Route path="/auth" element={<Auth />} />


        {/* Layout Route */}
        <Route element={
          <MainLayout handleToggleSidebar={handleToggleSidebar} searchQuery={searchQuery} setSearchQuery={setSearchQuery}  mobileOpen={mobileOpen} collapsed={collapsed} setMobileOpen={setMobileOpen} />
          }>

          {/* children routes to show in outlet  */}
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/video/:id" element={<VideoPlayer />} />
          <Route path="/channel/:id" element={<Channel />} />
          <Route path="/watch/:id" element={<VideoPlayer />} />
        </Route>
      </Routes>
    </div>
  );
}
