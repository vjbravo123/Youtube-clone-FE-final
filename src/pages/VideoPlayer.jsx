import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function VideoPlayer() {
  const { id: videoId } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  // Fetch video + comments
  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `https://youtube-clone-be-final.onrender.com/api/videos/${videoId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setVideo(res.data);
        setComments(res.data.comments || []);
      } catch (err) {
        console.error(err);
        setError("Video not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [videoId, token]);

  // Like video
  const handleLike = async () => {
    try {
      const res = await axios.put(
        `https://youtube-clone-be-final.onrender.com/api/likes/${videoId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setVideo((prev) => ({
        ...prev,
        likes: res.data.likes,
        dislikes: res.data.dislikes,
        userReaction: res.data.userReaction,
      }));
    } catch (err) {
      console.error("Error liking video:", err);
    }
  };

  // Dislike video
  const handleDislike = async () => {
    try {
      const res = await axios.put(
        `https://youtube-clone-be-final.onrender.com/api/likes/${videoId}/dislike`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setVideo((prev) => ({
        ...prev,
        likes: res.data.likes,
        dislikes: res.data.dislikes,
        userReaction: res.data.userReaction,
      }));
    } catch (err) {
      console.error("Error disliking video:", err);
    }
  };

  // Add comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await axios.post(
        `https://youtube-clone-be-final.onrender.com/api/comments/${videoId}/comments`,
        { text: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments((prev) => [...prev, res.data]);
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  // Update comment
  const handleUpdateComment = async (commentId) => {
    if (!editText.trim()) return;
    try {
      const res = await axios.put(
        `https://youtube-clone-be-final.onrender.com/api/comments/${videoId}/comments/${commentId}`,
        { text: editText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments((prev) =>
        prev.map((c) => (c._id === commentId ? { ...c, text: res.data.text } : c))
      );
      setEditingId(null);
      setEditText("");
    } catch (err) {
      console.error("Error updating comment:", err);
    }
  };

  // Delete comment
  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `https://youtube-clone-be-final.onrender.com/api/comments/${videoId}/comments/${commentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600 font-medium">Loading video...</span>
      </div>
    );
  }

  // Error state
  if (error || !video) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600 font-semibold">{error || "Video not found."}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left: Video + Details */}
      <div className="flex-1">
        <div className="w-full aspect-video bg-black rounded-lg mb-4">
          <iframe
            className="w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${video.videoId}`}
            title={video.title}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        <h1 className="text-xl font-semibold mb-2">{video.title}</h1>

        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-700 font-medium">
            {video.channel?.name || "Unknown Channel"}
          </span>
          <div className="flex gap-3">
            <button
              onClick={handleLike}
              className={`px-3 py-1 rounded ${
                video.userReaction === "like" ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              👍 {video.likes || 0}
            </button>
            <button
              onClick={handleDislike}
              className={`px-3 py-1 rounded ${
                video.userReaction === "dislike" ? "bg-red-500 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              👎 {video.dislikes || 0}
            </button>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-6">{video.description}</p>

        {/* Comments Section */}
        <h2 className="text-lg font-semibold mb-3">
          Comments ({comments.length})
        </h2>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 border rounded px-3 py-2 text-sm"
          />
          <button
            onClick={handleAddComment}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Comment
          </button>
        </div>

        <div className="space-y-3">
          {comments.map((c) => (
            <div key={c._id} className="border-b pb-2">
              <p className="text-sm font-medium">
                {c.user?.username || username || "Anonymous"}
              </p>

              {editingId === c._id ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 border rounded px-2 py-1 text-sm"
                  />
                  <button
                    onClick={() => handleUpdateComment(c._id)}
                    className="px-3 py-1 bg-green-600 text-white rounded text-xs"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditText("");
                    }}
                    className="px-3 py-1 bg-gray-400 text-white rounded text-xs"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <p className="text-sm">{c.text}</p>
              )}

              <p className="text-xs text-gray-400">
                {c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
              </p>

              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => {
                    setEditingId(c._id);
                    setEditText(c.text);
                  }}
                  className="text-blue-600 text-xs underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteComment(c._id)}
                  className="text-red-600 text-xs underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Recommended */}
      <div className="w-full lg:w-80">
        <h3 className="font-semibold mb-3">Recommended</h3>
        {video.recommended?.map((v) => (
          <div
            key={v._id}
            className="flex gap-3 mb-3 cursor-pointer hover:bg-gray-100 p-2 rounded"
            onClick={() => navigate(`/video/${v._id}`)}
          >
            <img
              src={v.thumbnailUrl}
              alt={v.title}
              className="w-40 h-24 object-cover rounded"
            />
            <div>
              <h4 className="text-sm font-medium line-clamp-2">{v.title}</h4>
              <p className="text-xs text-gray-500">
                {v.channel?.name || "Unknown"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
