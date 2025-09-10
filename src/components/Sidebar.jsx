import { Link } from "react-router-dom";

const mainLinks = [
  { 
    name: "Home", 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" width="24" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path clipRule="evenodd" d="m7.61 15.719.392-.22v-2.24l-.534-.228-.942-.404c-.869-.372-1.4-1.15-1.446-1.974-.047-.823.39-1.642 1.203-2.097h.001L15.13 3.59c1.231-.689 2.785-.27 3.466.833.652 1.058.313 2.452-.879 3.118l-1.327.743-.388.217v2.243l.53.227.942.404c.869.372 1.4 1.15 1.446 1.974.047.823-.39 1.642-1.203 2.097l-.002.001-8.845 4.964-.001.001c-1.231.688-2.784.269-3.465-.834-.652-1.058-.313-2.451.879-3.118l1.327-.742Zm1.993 6.002c-1.905 1.066-4.356.46-5.475-1.355-1.057-1.713-.548-3.89 1.117-5.025a4.14 4.14 0 01.305-.189l1.327-.742-.942-.404a4.055 4.055 0 01-.709-.391c-.963-.666-1.578-1.718-1.644-2.877-.08-1.422.679-2.77 1.968-3.49l8.847-4.966c1.905-1.066 4.356-.46 5.475 1.355 1.057 1.713.548 3.89-1.117 5.025a4.074 4.074 0 01-.305.19l-1.327.742.942.403c.253.109.49.24.709.392.963.666 1.578 1.717 1.644 2.876.08 1.423-.679 2.77-1.968 3.491l-8.847 4.965ZM10 14.567a.25.25 0 00.374.217l4.45-2.567a.25.25 0 000-.433l-4.45-2.567a.25.25 0 00-.374.216v5.134Z" fillRule="evenodd"></path>
      </svg>
    )
  },
  { 
    name: "Shorts", 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" width="24" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path clipRule="evenodd" d="M4 4.5A1.5 1.5 0 015.5 3h13A1.5 1.5 0 0120 4.5H4Zm16.5 3h-17v11h17v-11ZM3.5 6A1.5 1.5 0 002 7.5v11A1.5 1.5 0 003.5 20h17a1.5 1.5 0 001.5-1.5v-11A1.5 1.5 0 0020.5 6h-17Zm7.257 4.454a.5.5 0 00-.757.43v4.233a.5.5 0 00.757.429L15 13l-4.243-2.546Z" fillRule="evenodd"></path>
      </svg>
    )
  },
  { 
    name: "Subscriptions", 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" width="24" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path clipRule="evenodd" d="M14.203 4.83c-1.74-.534-3.614-.418-5.274.327-1.354.608-2.49 1.6-3.273 2.843H8.25c.414 0 .75.336.75.75s-.336.75-.75.75H3V4.25c0-.414.336-.75.75-.75s.75.336.75.75v2.775c.935-1.41 2.254-2.536 3.815-3.236 1.992-.894 4.241-1.033 6.328-.392 2.088.641 3.87 2.02 5.017 3.878 1.146 1.858 1.578 4.07 1.215 6.223-.364 2.153-1.498 4.1-3.19 5.48-1.693 1.379-3.83 2.095-6.012 2.016-2.182-.08-4.26-.949-5.849-2.447-1.588-1.499-2.578-3.523-2.784-5.697-.039-.412.264-.778.676-.817.412-.04.778.263.818.675.171 1.812.996 3.499 2.32 4.748 1.323 1.248 3.055 1.973 4.874 2.04 1.818.065 3.598-.532 5.01-1.681 1.41-1.15 2.355-2.773 2.657-4.567.303-1.794-.056-3.637-1.012-5.186-.955-1.548-2.44-2.697-4.18-3.231ZM12.75 7.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75v4.886l.314.224 3.5 2.5c.337.241.806.163 1.046-.174.241-.337.163-.806-.174-1.046l-3.186-2.276V7.5Z" fillRule="evenodd"></path>
      </svg>
    )
  },
  { 
    name: "You", 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" width="24" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    )
  },
  { 
    name: "History", 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" width="24" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M13 3a9 9 0 100 18 9 9 0 000-18zm0 2a7 7 0 110 14 7 7 0 010-14zm-.5 3v5.25l4.5 2.67.5-.85-4-2.37V8z"/>
      </svg>
    )
  },
];

const exploreLinks = [
  { name: "Trending", icon: <span>🔥</span> },
  { name: "Shopping", icon: <span>🛒</span> },
  { name: "Music", icon: <span>🎵</span> },
  { name: "Movies", icon: <span>🎞️</span> },
  { name: "Live", icon: <span>📡</span> },
  { name: "Gaming", icon: <span>🎮</span> },
  { name: "News", icon: <span>📰</span> },
  { name: "Sports", icon: <span>⚽</span> },
];

export default function Sidebar({ mobileOpen, collapsed, onClose }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 h-full bg-white shadow z-50 
          transition-all duration-200 ease-in-out
          ${mobileOpen ? "translate-x-0 w-60" : "-translate-x-full md:translate-x-0"} 
          ${collapsed ? "md:w-24" : "md:w-60"}`}
      >
        <nav className="flex flex-col h-full overflow-y-auto">
          {/* Main Links */}
          <div className={`p-2 ${collapsed ? "flex flex-col items-center" : ""}`}>
            {mainLinks.map((link) => (
              <Link
                key={link.name}
                to="/"
                className={`flex ${collapsed ? "flex-col items-center" : "flex-row"} gap-2 px-3 py-3 hover:bg-gray-100 rounded`}
              >
                <span className="text-xl">{link.icon}</span>
                {collapsed ? (
                  <span className="text-[10px]">{link.name}</span>
                ) : (
                  <span>{link.name}</span>
                )}
              </Link>
            ))}
          </div>

          {/* Sign In */}
          {!collapsed && !user && (
            <div className="p-3 border-t border-gray-200">
              <p className="text-sm mb-2">
                Sign in to like videos, comment, and subscribe.
              </p>
              <Link
                to="/auth"
                className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-full hover:bg-gray-100 text-sm w-fit"
              >
                <span className="text-blue-600">👤</span>
                <span className="text-blue-600 font-medium">Sign in</span>
              </Link>
            </div>
          )}

          {/* Explore */}
          {!collapsed && (
            <div className="p-3 border-t border-gray-200">
              <h3 className="px-3 py-2 text-sm font-semibold text-gray-600">Explore</h3>
              {exploreLinks.map((link) => (
                <Link
                  key={link.name}
                  to="/"
                  className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded"
                >
                  <span className="text-xl">{link.icon}</span>
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          )}
        </nav>
      </aside>
    </>
  );
}
