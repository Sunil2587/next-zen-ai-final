export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-500 mb-8">Page not found</p>
        <a
          href="/"
          className="px-8 py-3 bg-zen hover:brightness-110 text-white font-semibold rounded-lg transition-all inline-block"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}
