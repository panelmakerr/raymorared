import { motion } from 'framer-motion'

const TIERS = [
  { name: 'Bronze', range: '0 - 999 pts', perks: ['1x Points', 'Free Shipping > $100', 'Birthday Reward'], gradient: 'from-amber-700 to-amber-500' },
  { name: 'Silver', range: '1K - 5K pts', perks: ['1.5x Points', 'Free Shipping Always', 'Early Access'], gradient: 'from-gray-400 to-gray-300' },
  { name: 'Gold', range: '5K+ pts', perks: ['2x Points', 'Free Express', 'Exclusive Products', 'Priority Support'], gradient: 'from-yellow-500 to-yellow-300', popular: true },
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
const si = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

export default function LoyaltyProgram() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-sm font-medium text-amber-400 uppercase tracking-wider">Rewards Program</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mt-2">Earn Points, Get Rewards</h2>
        </motion.div>
        <motion.div variants={sc} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6 mb-16">
          {TIERS.map((t) => (
            <motion.div key={t.name} variants={si} className={`relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 ${t.popular ? 'ring-2 ring-amber-500' : ''}`}>
              {t.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">Most Popular</div>}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.gradient} flex items-center justify-center mb-5`}>
                <span className="text-xl font-bold text-white">{t.name[0]}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{t.name}</h3>
              <p className="text-sm text-gray-400 mb-5">{t.range}</p>
              <ul className="space-y-2">
                {t.perks.map((p) => <li key={p} className="flex items-center gap-2 text-sm text-gray-300"><svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>{p}</li>)}
              </ul>
            </motion.div>
          ))}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
          <h3 className="text-lg font-bold text-white text-center mb-6">Ways to Earn Points</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {EARN.map((e) => (
              <motion.div key={e.action} whileHover={{ scale: 1.05, y: -5 }} className="bg-white/5 rounded-2xl p-4 text-center hover:bg-white/10 transition-colors cursor-pointer">
                <span className="text-2xl block mb-2">{e.icon}</span>
                <p className="text-xs text-white font-medium mb-1">{e.action}</p>
                <p className="text-[10px] text-amber-400 font-semibold">{e.pts}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/25">Join Now — It's Free</motion.button>
        </motion.div>
      </div>
    </section>
  )
}
