export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          {/* Outer spinning ring */}
          <div className="inline-block animate-spin rounded-full h-24 w-24 border-4 border-slate-700 border-t-yellow-400"></div>
          {/* Inner emoji */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-5xl animate-pulse">💻</div>
          </div>
        </div>
        
        <h2 className="text-4xl font-game mb-3 text-white" style={{
          textShadow: '2px 2px 0px rgba(0,0,0,0.8)'
        }}>
          Loading...
        </h2>
        
        <p className="text-xl text-gray-400 mb-6">
          Please wait while we prepare your content
        </p>
        
        {/* Loading dots animation */}
        <div className="flex justify-center gap-2">
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  )
}
