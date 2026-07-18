import { motion } from 'framer-motion'

const TIERS = [
  { name: 'Bronze', range: '0 - 999 pts', perks: ['1x Points', 'Free Shipping > $100', 'Birthday Reward'], gradient: 'from-amber-700 to-amber-500', shadow: 'shadow-amber-700/20' },
  { name: 'Silver', range: '1K - 5K pts', perks: ['1.5x Points', 'Free Shipping Always', 'Early Access'], gradient: 'from-gray-400 to-gray-300', shadow: 'shadow-gray-400/20' },
  { name: 'Gold', range: '5K+ pts', perks: ['2x Points', 'Free Express', 'Exclusive Products', 'Priority Support'], gradient: 'from-yellow-500 to-yellow-300', shadow: 'shadow-yellow-500/20', popular: true },
]

const EARN = [
  { icon: '🛒', action: 'Make a Purchase', pts: '1 pt / $1' },
  { icon: '👥', action: 'Refer a Friend', pts: '500 pts' },
  { icon: '📱', action: 'Follow Social', pts: '100 pts' },
  { icon: '⭐', action: 'Write a Review', pts: '50 pts' },
  { icon: '🎂', action: 'Birthday Bonus', pts: '200 pts' },
  { icon: '📧', action: 'Newsletter', pts: '25 pts' },
]

const sc = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }
const si = { hidden: { opacity: 0, y: 40, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }

export default function LoyaltyProgram() {
  return (
    <section className="py-20 md:py-28 bg-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-sm font-medium text-amber-400 uppercase tracking-wider">Rewards Program</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mt-2">Earn Points, Get Rewards</h2>
          <p className="mt-3 text-gray-400 max-w-lg mx-auto">Join our loyalty program and start earning points with every purchase</p>
        </motion.div>

        <motion.div variants={sc} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {TIERS.map((t) => (
            <motion.div key={t.name} variants={si} whileHover={{ y: -8, scale: 1.02 }}
              className={`relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 ${t.popular ? 'ring-2 ring-amber-500 shadow-lg shadow-amber-500/10' : 'hover:shadow-lg'}`}>
              {t.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-500 text-white text-xs font-bold rounded-full shadow-lg shadow-amber-500/25">Most Popular</div>}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.gradient} flex items-center justify-center mb-5 shadow-lg ${t.shadow}`}>
                <span className="text-xl font-bold text-white">{t.name[0]}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{t.name}</h3>
              <p className="text-sm text-gray-400 mb-6">{t.range}</p>
              <ul className="space-y-3">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-sm text-gray-300">
                    <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-white/10">
          <h3 className="text-xl font-bold text-white text-center mb-8">Ways to Earn Points</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {EARN.map((e) => (
              <motion.div key={e.action} whileHover={{ y: -6, scale: 1.05 }} className="bg-white/5 rounded-2xl p-5 text-center hover:bg-white/10 transition-all cursor-pointer border border-transparent hover:border-white/10">
                <span className="text-3xl block mb-3">{e.icon}</span>
                <p className="text-xs text-white font-medium mb-1">{e.action}</p>
                <p className="text-[10px] text-amber-400 font-bold">{e.pts}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
          <motion.button whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(245,158,11,0.4)' }} whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-amber-500 text-white font-bold rounded-full hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/25 text-base">
            Join Now — It's Free
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
