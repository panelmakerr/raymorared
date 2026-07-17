export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
              Minimalist
              <span className="block text-gray-400">Essentials</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-lg mx-auto md:mx-0">
              Discover our curated collection of thoughtfully designed products.
              Quality meets simplicity.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="#products"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-colors"
              >
                Shop Now
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-gray-900 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden shadow-2xl">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto bg-gray-300 rounded-full mb-4"></div>
                  <p className="text-gray-400 text-sm">Product Image</p>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gray-900 rounded-full opacity-10"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gray-900 rounded-full opacity-5"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
