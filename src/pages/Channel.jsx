import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Channel() {
  const { id } = useParams(); // channelId
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch channel by ID
        const res = await fetch(`https://youtube-clone-be-final.onrender.com/api/channels/${id}`);
        const data = await res.json();

        if (res.ok) {
          setChannel(data);

          // Fetch videos by channel ID
          const vids = await fetch(
            `https://youtube-clone-be-final.onrender.com/api/videos?channel=${data._id}`
          );
          const videoData = await vids.json();
          setVideos(videoData);
        } else {
          setChannel(null);
        }
      } catch (err) {
        console.error("Error loading channel:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;

  if (!channel)
    return (
      <div className="p-6 text-center text-gray-600">
        <h2 className="text-2xl font-bold mb-2">Channel not found</h2>
        <p>This channel does not exist.</p>
      </div>
    );

  return (
    <div className="flex flex-col">
      {/* Banner */}
      <div className="w-full h-20 bg-gray-200"></div>

      {/* Channel Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-4">
          {channel.profileImage ? (
            <img
              src={channel.profileImage}
              alt={channel.name}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
              {channel.name.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <h1 className="text-2xl font-bold">{channel.name}</h1>
            <p className="text-sm text-gray-500">
              {channel.handle || "@handle"} • {videos.length} videos
            </p>
            <p className="text-gray-600 text-sm">{channel.description}</p>
          </div>
        </div>

        <button className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700">
          Subscribe
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 px-6 py-3 border-b text-sm font-medium">
        <button className="text-red-600 border-b-2 border-red-600 pb-1">
          Home
        </button>
        <button className="text-gray-600 hover:text-black">Videos</button>
        <button className="text-gray-600 hover:text-black">About</button>
      </div>

      {/* Videos Section */}
      <div className="p-6">
        {videos.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {videos.map((video) => (
              <div
                key={video._id}
                className="border rounded-lg overflow-hidden hover:shadow"
              >
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3">
                  <h3 className="font-semibold">{video.title}</h3>
                  <p className="text-sm text-gray-500">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-20">
            <p className="text-lg">This channel has no videos.</p>
          </div>
        )}
      </div>
    </div>
  );
}
