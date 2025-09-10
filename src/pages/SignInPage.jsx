import { Link } from "react-router-dom";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-lg font-semibold text-gray-800">
          Try searching to get started
        </h2>
        <p className="text-gray-600 mt-2">
          Start watching videos to help us build a feed of videos you'll love
        </p>
      </div>

      {/* Sign In Box */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 text-center">
        <img
          src="https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg"
          alt="YouTube"
          className="w-32 mx-auto mb-6"
        />

        <h3 className="text-lg font-medium mb-4">
          Sign in to YouTube
        </h3>

        <Link
          to="/auth"
          className="w-full block bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Sign in
        </Link>

        <p className="text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <Link to="/auth" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
