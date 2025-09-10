import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ onToggleSidebar, setSearchQuery }) {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showChannelModal, setShowChannelModal] = useState(false);
  const [searchText, setSearchText] = useState("");

  // ✅ include handle in initial state
  const [channelData, setChannelData] = useState({
    name: "",
    handle: "",
    description: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  }

  async function handleChannelCreate(e) {
    e.preventDefault();
    try {
      const res = await fetch("https://youtube-clone-be-final.onrender.com/api/channels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: channelData.name,
          handle: channelData.handle,
          description: channelData.description,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || data.error || "Failed to create channel");
      }

      alert("Channel created successfully!");
      setShowChannelModal(false);
      setChannelData({ name: "", handle: "", description: "" });

      navigate(`/channel/${data._id || data.channel?._id}`);
    } catch (err) {
      console.error(err);
      alert("Error creating channel: " + err.message);
    }
  }

  // 🔎 Search submit handler
  function handleSearch(e) {
    e.preventDefault();
    if (setSearchQuery) {
      setSearchQuery(searchText);
    }
  }

  // 🔎 Instant search while typing
  function handleChange(e) {
    const value = e.target.value;
    setSearchText(value);
    if (setSearchQuery) {
      setSearchQuery(value);
    }
  }

  return (
    <header className="flex items-center justify-between bg-white px-4 py-2 shadow sticky top-0 z-50">
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          ☰
        </button>
        <Link to="/" className="flex items-center gap-1 text-xl font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"   // smaller width
            height="24"  // smaller height
            viewBox="0 0 29 20"  // original SVG viewBox
            fill="none"
          >
            <g>
              <path
                d="M14.4848 20C14.4848 20 23.5695 20 25.8229 19.4C27.0917 19.06 28.0459 18.08 28.3808 16.87C29 14.65 29 9.98 29 9.98C29 9.98 29 5.34 28.3808 3.14C28.0459 1.9 27.0917 0.94 25.8229 0.61C23.5695 0 14.4848 0 14.4848 0C14.4848 0 5.42037 0 3.17711 0.61C1.9286 0.94 0.954148 1.9 0.59888 3.14C0 5.34 0 9.98 0 9.98C0 9.98 0 14.65 0.59888 16.87C0.954148 18.08 1.9286 19.06 3.17711 19.4C5.42037 20 14.4848 20 14.4848 20Z"
                fill="#FF0033"
              />
              <path d="M19 10L11.5 5.75V14.25L19 10Z" fill="white" />
            </g>
          </svg>
        <span className="font-weight: 100; font-sans">YouTube <sup>IN</sup></span>
        </Link>
      </div>

      {/* 🔍 Search */}
      <form
        className="hidden sm:flex flex-1 max-w-xl mx-4"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={handleChange}
          className="flex-1 border border-gray-300 rounded-l-full px-4 py-1 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-gray-100 border border-gray-300 rounded-r-full px-6 hover:bg-gray-200"
        >
          🔍
        </button>
      </form>

      {/* Right: User */}
      <div className="relative">
        {user ? (
          <>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold hover:opacity-90"
            >
              {user.username.charAt(0).toUpperCase()}
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white border shadow-lg rounded-md">
                <div className="px-4 py-2 border-b">
                  <p className="font-semibold">{user.username}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <Link
                  to={`/channel/${user._id}`}
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  My Channel
                </Link>
                <button
                  onClick={() => {
                    setShowChannelModal(true);
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Create Channel
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <Link
            to="/auth"
            className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-full hover:bg-gray-100 text-sm"
          >
            <span className="text-blue-600">👤</span>
            <span className="text-blue-600 font-medium">Sign in</span>
          </Link>
        )}
      </div>

      {/* 🔑 Channel Create Modal */}
      {showChannelModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Create Your Channel</h2>

            {/* How you'll appear */}
            <p className="text-gray-600 mb-4">How you'll appear</p>

            {/* Profile Image + Upload */}
            <div className="flex flex-col items-center mb-4">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-3xl">
                📷
              </div>
              <label className="mt-2 text-blue-600 text-sm cursor-pointer">
                Select image
                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>

            {/* Form */}
            <form onSubmit={handleChannelCreate} className="space-y-4">
              <input
                type="text"
                placeholder="Channel Name"
                value={channelData.name}
                onChange={(e) =>
                  setChannelData({ ...channelData, name: e.target.value })
                }
                required
                className="w-full border px-3 py-2 rounded"
              />

              <input
                type="text"
                placeholder="Handle (e.g. @mychannel)"
                value={channelData.handle}
                onChange={(e) =>
                  setChannelData({ ...channelData, handle: e.target.value })
                }
                required
                className="w-full border px-3 py-2 rounded"
              />

              <textarea
                placeholder="Description (optional)"
                value={channelData.description}
                onChange={(e) =>
                  setChannelData({ ...channelData, description: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />

              {/* Terms & Conditions */}
              <div className="flex items-start gap-2 text-sm">
                <input type="checkbox" required className="mt-1" />
                <p>
                  I agree to YouTube’s{" "}
                  <span className="text-blue-600 cursor-pointer">
                    Terms & Conditions
                  </span>{" "}
                  and Community Guidelines.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowChannelModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
