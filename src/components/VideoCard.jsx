import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
  return (
    <div className="flex flex-col">
      {/* Video Thumbnail → links to video player */}
      <Link to={`/watch/${video._id}`} className="block">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-48 object-cover rounded-lg"
        />
      </Link>

      {/* Video Info */}
      <div className="flex mt-2 gap-3">
        {/* Channel Avatar → links to channel */}
        <Link to={`/channel/${video.channel?._id}`} className="flex-shrink-0">
          {video.channel?.profileImage ? (
            <img
              src={video.channel.profileImage}
              alt={video.channel.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              {video.channel?.name?.charAt(0).toUpperCase() || "C"}
            </div>
          )}
        </Link>

        {/* Title + Channel Info */}
        <div className="flex flex-col">
          <Link
            to={`/watch/${video._id}`}
            className="font-semibold line-clamp-2 hover:text-blue-600"
          >
            {video.title}
          </Link>
          <Link
            to={`/channel/${video.channel?._id}`}
            className="text-sm text-gray-600 hover:text-black"
          >
            {video.channel?.name || "Unknown Channel"}
          </Link>
          <span className="text-xs text-gray-500">
            {video.views || 0} views
          </span>
        </div>
      </div>
    </div>
  );
}
