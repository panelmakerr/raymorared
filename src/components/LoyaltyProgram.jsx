import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, bounceIn } from '../utils/animations'

const tiers = [
  {
    name: 'Bronze',
    points: '0 - 999',
    perks: ['1x Points', 'Free Shipping > $100', 'Birthday Reward'],
    color: 'from-amber-700 to-amber-500',
  },
  {
    name: 'Silver',
    points: '1,000 - 4,999',
    perks: ['1.5x Points', 'Free Shipping Always', 'Early Access', 'Birthday Reward'],
    color: 'from-gray-400 to-gray-300',
  },
  {
    name: 'Gold',
    points: '5,000+',
    perks: ['2x Points', 'Free Express Shipping', 'Exclusive Products', 'Priority Support', 'Birthday Reward'],
    color: 'from-yellow-500 to-yellow-300',
  },
]

const waysToEarn = [
  { icon: '🛒', action: 'Make a Purchase', points: '1 pt / $1' },
  { icon: '👥', action: 'Refer a Friend', points: '500 pts' },
  { icon: '📱', action: 'Follow on Social', points: '100 pts' },
  { icon: '⭐', action: 'Write a Review', points: '50 pts' },
  { icon: '🎂', action: 'Birthday Bonus', points: '200 pts' },
  { icon: '📧', action: 'Newsletter Signup', points: '25 pts' },
]

export default function LoyaltyProgram() {
  return (
    <section className="py-20 bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-amber-400 uppercase tracking-wider">Rewards Program</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mt-2">
            Earn Points, Get Rewards
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Join our loyalty program and start earning points with every purchase
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              variants={staggerItem}
              className={`relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 ${
                index === 2 ? 'ring-2 ring-amber-500' : ''
              }`}
            >
              {index === 2 && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">
                  Most Popular
                </div>
              )}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-6`}>
                <span className="text-2xl font-bold text-white">{tier.name.charAt(0)}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
              <p className="text-sm text-gray-400 mb-6">{tier.points} points</p>
              <ul className="space-y-3">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-3 text-sm text-gray-300">
                    <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {perk}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white text-center mb-8">Ways to Earn Points</h3>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {waysToEarn.map((way) => (
              <motion.div
                key={way.action}
                variants={bounceIn}
                className="bg-white/5 rounded-2xl p-4 text-center hover:bg-white/10 transition-colors cursor-pointer group"
              >
                <span className="text-3xl block mb-3 group-hover:scale-110 transition-transform">{way.icon}</span>
                <p className="text-sm text-white font-medium mb-1">{way.action}</p>
                <p className="text-xs text-amber-400 font-semibold">{way.points}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/25"
          >
            Join Now — It's Free
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
