import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { categories, materials, priceRanges } from '../utils/data'

const colorOptions = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Brown', hex: '#5c4033' },
  { name: 'Gold', hex: '#c9a96e' },
  { name: 'Red', hex: '#c75b39' },
  { name: 'Green', hex: '#87a878' },
  { name: 'Grey', hex: '#36454f' },
]

const ratingOptions = [4.5, 4.0, 3.5, 3.0]

export default function FilterBar({ filters, onFilterChange }) {
  const [expandedSection, setExpandedSection] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleSection = (section) => {
    setExpandedSection(prev => prev === section ? null : section)
  }

  const updateFilter = (key, value) => {
    onFilterChange({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    onFilterChange({
      category: 'All',
      material: 'All',
      priceRange: priceRanges[0],
      colors: [],
      minRating: 0,
      sizes: [],
      sortBy: 'featured',
    })
  }

  const activeFilterCount = [
    filters.category !== 'All',
    filters.material !== 'All',
    filters.priceRange.label !== 'All',
    filters.colors.length > 0,
    filters.minRating > 0,
    filters.sizes.length > 0,
  ].filter(Boolean).length

  const FilterSection = ({ title, children, sectionKey }) => (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between py-3 text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        {title}
        <motion.svg
          animate={{ rotate: expandedSection === sectionKey ? 180 : 0 }}
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {expandedSection === sectionKey && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-6 left-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/50 lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                  <button onClick={() => setMobileOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <MobileFilters filters={filters} updateFilter={updateFilter} toggleSection={toggleSection} expandedSection={expandedSection} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hidden lg:block w-72 flex-shrink-0">
        <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">Filters</h3>
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-xs text-gray-500 hover:text-gray-900 underline"
              >
                Clear all
              </button>
            )}
          </div>

          <FilterSection title="Category" sectionKey="category">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => updateFilter('category', cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                    filters.category === cat
                      ? 'bg-gray-900 text-white scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Price Range" sectionKey="price">
            <div className="space-y-1">
              {priceRanges.map(range => (
                <button
                  key={range.label}
                  onClick={() => updateFilter('priceRange', range)}
                  className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                    filters.priceRange.label === range.label
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Color" sectionKey="colors">
            <div className="flex flex-wrap gap-2">
              {colorOptions.map(color => (
                <button
                  key={color.name}
                  onClick={() => {
                    const colors = filters.colors.includes(color.name)
                      ? filters.colors.filter(c => c !== color.name)
                      : [...filters.colors, color.name]
                    updateFilter('colors', colors)
                  }}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    filters.colors.includes(color.name)
                      ? 'border-gray-900 scale-110 shadow-md'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Material" sectionKey="material">
            <div className="flex flex-wrap gap-2">
              {materials.map(mat => (
                <button
                  key={mat}
                  onClick={() => updateFilter('material', mat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                    filters.material === mat
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {mat}
                </button>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Rating" sectionKey="rating">
            <div className="space-y-1">
              {ratingOptions.map(rating => (
                <button
                  key={rating}
                  onClick={() => updateFilter('minRating', filters.minRating === rating ? 0 : rating)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                    filters.minRating === rating
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{rating}+</span>
                  <span className="text-yellow-500">★★★★★</span>
                </button>
              ))}
            </div>
          </FilterSection>
        </div>
      </div>
    </>
  )
}

function MobileFilters({ filters, updateFilter, toggleSection, expandedSection }) {
  return (
    <div>
      <FilterSection title="Category" sectionKey="category-m" expandedSection={expandedSection} toggleSection={toggleSection}>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => updateFilter('category', cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                filters.category === cat ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </FilterSection>
      <FilterSection title="Price" sectionKey="price-m" expandedSection={expandedSection} toggleSection={toggleSection}>
        <div className="space-y-1">
          {priceRanges.map(range => (
            <button
              key={range.label}
              onClick={() => updateFilter('priceRange', range)}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg ${
                filters.priceRange.label === range.label ? 'bg-gray-900 text-white' : 'text-gray-600'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </FilterSection>
      <FilterSection title="Material" sectionKey="material-m" expandedSection={expandedSection} toggleSection={toggleSection}>
        <div className="flex flex-wrap gap-2">
          {materials.map(mat => (
            <button
              key={mat}
              onClick={() => updateFilter('material', mat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                filters.material === mat ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {mat}
            </button>
          ))}
        </div>
      </FilterSection>
    </div>
  )
}

function FilterSection({ title, children, sectionKey, expandedSection, toggleSection }) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between py-3 text-sm font-medium text-gray-700"
      >
        {title}
        <motion.svg
          animate={{ rotate: expandedSection === sectionKey ? 180 : 0 }}
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {expandedSection === sectionKey && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
