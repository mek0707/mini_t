import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-800 text-center">
      <div>
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-xl text-gray-700 dark:text-gray-300">Ooops! The page you are looking for does not exist.</p>
        <Link href="/home/example_work">
          <span className="mt-4 inline-block px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600">Go to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
