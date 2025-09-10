import { useState } from "react";

export default function CommentList({ comments, onAdd }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  }

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-3">
        <input
          className="flex-1 border rounded px-2 py-1"
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-3 py-1 rounded">
          Post
        </button>
      </form>
      <ul className="space-y-3">
        {comments.map((c) => (
          <li key={c._id} className="border-b pb-2">
            <p className="text-sm text-gray-800">{c.text}</p>
            <span className="text-xs text-gray-400">
              {c.user?.username || "User"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
