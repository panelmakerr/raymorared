export default function ProductCard({ product }) {
  return (
    <div className="group cursor-pointer">
      <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4 relative">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full mb-2"></div>
            <p className="text-gray-400 text-xs">Product</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
        <button className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-medium py-2.5 rounded-xl opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          Add to Cart
        </button>
      </div>
      <div className="px-1">
        <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1">{product.category}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-base font-semibold text-gray-900">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  )
}
