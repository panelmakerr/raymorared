import ProductCard from './ProductCard'

const products = [
  { id: 1, name: 'Minimal Chair', category: 'Furniture', price: '299', originalPrice: '399' },
  { id: 2, name: 'Ceramic Vase', category: 'Decor', price: '89' },
  { id: 3, name: 'Desk Lamp', category: 'Lighting', price: '149', originalPrice: '199' },
  { id: 4, name: 'Wool Throw', category: 'Textiles', price: '179' },
  { id: 5, name: 'Wall Clock', category: 'Decor', price: '129' },
  { id: 6, name: 'Plant Pot', category: 'Garden', price: '59' },
  { id: 7, name: 'Coffee Table', category: 'Furniture', price: '449' },
  { id: 8, name: 'Floor Mirror', category: 'Decor', price: '329', originalPrice: '429' },
]

const categories = ['All', 'Furniture', 'Decor', 'Lighting', 'Textiles']

export default function Products() {
  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Featured Products
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Handpicked items that blend form and function
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-colors ${
                index === 0
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-gray-900 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
            View All Products
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
