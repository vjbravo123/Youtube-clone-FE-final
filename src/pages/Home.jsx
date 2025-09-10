import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const filters = [
  "All",
  "React",
  "Tailwind",
  "MERN",
  "JavaScript",
  "Node.js",
  "MongoDB",
  "Music",
  "News",
  "Gaming",
  "Sports",
  "Movies",
  "Trending",
];

export default function Home({ searchQuery }) {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("https://youtube-clone-be-final.onrender.com/api/videos");
        const data = await res.json();
        if (Array.isArray(data)) {
          setVideos(data);
          setFilteredVideos(data);
          console.log(data);
          
        } else {
          setVideos([]);
          setFilteredVideos([]);
        }
      } catch (err) {
        console.error("Error fetching videos:", err);
        setVideos([]);
        setFilteredVideos([]);
      }
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    let data = [...videos];

    if (selectedFilter !== "All") {
      data = data.filter((v) => v.category === selectedFilter);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.channel?.name?.toLowerCase().includes(q)
      );
    }

    setFilteredVideos(data);
  }, [selectedFilter, searchQuery, videos]);

  return (
    <div className="w-full">
      {/* Filter Bar */}
      <div className="fixed w-full top-8 bg-white z-40 border-b">
        <div className="flex gap-3 pt-10 overflow-x-auto whitespace-nowrap py-3 px-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-1 rounded-full border text-sm ${
                selectedFilter === filter
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid gap-8 mt-15 sm:grid-cols-2 md:grid-cols-3">
        {filteredVideos.map((video) => (
          <div key={video._id} className="flex flex-col">
            <Link
              to={`/video/${video._id}`}
              className="relative w-full aspect-video"
            >
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
              />
              <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-1.5 py-0.5 rounded">
                12:34
              </span>
            </Link>

            <div className="mt-3 flex gap-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>

              <div className="flex flex-col">
                <Link to={`/video/${video._id}`} className="text-sm font-semibold line-clamp-2 hover:text-blue-600" >
                  {video.title}
                </Link>

                
                <Link to={`/channel/${video.channel?._id || ""}`} className="text-xs text-gray-600 hover:text-blue-500" >
                  {video.channel?.name || "Unknown Channel"}
                </Link>

                <p className="text-xs text-gray-500">
                  {video.views.toLocaleString()} views · 1 year ago
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
