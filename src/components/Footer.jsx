const LINKS = {
  Shop: ['New Arrivals', 'Best Sellers', 'Sale', 'All Products'],
  About: ['Our Story', 'Sustainability', 'Careers', 'Press'],
  Help: ['FAQ', 'Shipping', 'Returns', 'Contact'],
}

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-2">
            <a href="#" className="inline-flex text-2xl font-bold tracking-tight text-gray-900">
              <span className="bg-gray-900 text-white px-2 py-0.5 rounded-lg mr-1">S</span>STORE
            </a>
            <p className="mt-4 text-sm text-gray-500 max-w-xs">Thoughtfully designed products for modern living.</p>
            <div className="mt-6 p-4 bg-white rounded-2xl border border-gray-100 inline-block">
              <p className="text-xs text-gray-400 mb-2">Built by</p>
              <a href="https://raymora.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors group">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center text-white text-xs font-bold group-hover:scale-110 transition-transform">R</div>
                raymora.vercel.app
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </div>
            <div className="flex gap-3 mt-6">
              {['Instagram', 'Twitter', 'GitHub'].map((name) => (
                <a key={name} href="#" className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-gray-300 hover:shadow-md transition-all" aria-label={name}>
                  <span className="text-xs font-medium">{name[0]}</span>
                </a>
              ))}
            </div>
          </div>
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">{title}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => <li key={link}><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{link}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Store. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
