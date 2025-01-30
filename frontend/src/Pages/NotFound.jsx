import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <h1 className="text-7xl font-extrabold text-red-600">404</h1>
      <p className="text-2xl text-gray-800 font-semibold mt-4">
        Oops! Page Not Found
      </p>
      <p className="text-gray-600 mt-2 text-center">
        The page you are looking for doesnot exist or has been moved.
      </p>
      <img
        src="https://media.licdn.com/dms/image/v2/C5112AQEw1fXuabCTyQ/article-inline_image-shrink_1500_2232/article-inline_image-shrink_1500_2232/0/1581099611064?e=1743033600&v=beta&t=pihFtsZyntXSCqFRDAa33r6SS_giphQF-J88AyQ2YvU
"
        alt="404 Not Found"
        className="mt-6 w-80 md:w-96"
      />
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-red-600 text-white text-lg font-semibold rounded-lg shadow hover:bg-red-700 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
