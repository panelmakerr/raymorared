export default function Newsletter() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900 rounded-3xl p-8 md:p-12 lg:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Stay in the Loop
          </h2>
          <p className="mt-4 text-gray-400 max-w-lg mx-auto">
            Subscribe to our newsletter for exclusive offers, new arrivals, and design inspiration.
          </p>
          <form className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white text-gray-900 font-medium rounded-full hover:bg-gray-100 transition-colors"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-4 text-xs text-gray-500">
            No spam, unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  )
}
