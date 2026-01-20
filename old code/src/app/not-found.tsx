export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-white/60 mb-8">Page not found</p>
        <a 
          href="/" 
          className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded transition-all inline-block"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}
