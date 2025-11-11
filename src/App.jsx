import React, { useMemo, useState } from 'react'
import { ThemeProvider, useTheme } from './components/ThemeContext'
import Header from './components/Header'
import GlowButton from './components/GlowButton'
import AnimatedCounter from './components/AnimatedCounter'
import { CircularGauge, GradientBar } from './components/Charts'
import Calendar from './components/Calendar'
import AIOrbit from './components/AIOrbit'
import Confetti from './components/Confetti'
import { Sparkles, RefreshCw, Flame, Droplets, Footprints, Calendar as CalIcon, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

function Section({ children, className = '' }) {
  return (
    <section className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
  )
}

function Card({ children, className = '' }) {
  return (
    <div className={`rounded-2xl border backdrop-blur-xl 
      bg-white/60 border-slate-200/70 dark:bg-[rgba(20,28,34,0.45)] dark:border-slate-700/60 shadow-sm ${className}`}>{children}</div>
  )
}

function Snapshot() {
  return (
    <Section className="py-8 space-y-6">
      <div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Today’s Snapshot</h2>
        <p className="text-slate-600 dark:text-slate-300 mt-1">{new Date().toLocaleDateString()} • Move. Nourish. Thrive.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between text-slate-700 dark:text-slate-200"><span className="font-medium">Steps</span><Footprints className="w-4 h-4"/></div>
          <div className="mt-4 text-3xl font-black"><AnimatedCounter value={8234}/></div>
          <div className="text-xs text-slate-500 mt-1">Goal 10,000</div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between text-slate-700 dark:text-slate-200"><span className="font-medium">Calories Burned</span><Flame className="w-4 h-4 text-orange-500"/></div>
          <div className="mt-4 text-3xl font-black"><AnimatedCounter value={612}/></div>
          <div className="text-xs text-slate-500 mt-1">Daily target 700</div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between text-slate-700 dark:text-slate-200"><span className="font-medium">Water</span><Droplets className="w-4 h-4 text-sky-500"/></div>
          <div className="mt-4 text-3xl font-black"><AnimatedCounter value={9}/><span className="text-lg font-semibold ml-1">cups</span></div>
          <div className="text-xs text-slate-500 mt-1">Goal 10 cups</div>
        </Card>
      </div>
    </Section>
  )
}

function TipCard() {
  const [key, setKey] = useState(0)
  const tips = [
    'Small steps, big change. Take a 10-minute walk now.',
    'Hydration reset: drink a glass of water.',
    'Fuel up: add a protein-rich snack today.',
  ]
  const tip = tips[key % tips.length]
  return (
    <Section className="pb-6">
      <Card className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-teal-500" />
          <p className="text-slate-700 dark:text-slate-200">{tip}</p>
        </div>
        <button onClick={() => setKey(k => k + 1)} className="text-sm text-sky-600 dark:text-sky-300 inline-flex items-center gap-1 hover:underline">
          <RefreshCw className="w-4 h-4"/> refresh tip
        </button>
      </Card>
    </Section>
  )
}

function Calories() {
  return (
    <Section className="py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 flex items-center justify-center">
          <div className="text-center">
            <CircularGauge value={72} />
            <div className="mt-3 text-slate-700 dark:text-slate-200 font-semibold">Calorie Goal</div>
            <div className="text-2xl font-black">1,440 / 2,000</div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-4">
            <GradientBar label="Protein" value={68} colorFrom="from-emerald-400" colorTo="to-teal-400" />
            <GradientBar label="Carbs" value={54} colorFrom="from-sky-400" colorTo="to-blue-500" />
            <GradientBar label="Fats" value={41} colorFrom="from-orange-400" colorTo="to-rose-400" />
          </div>
        </Card>
      </div>
    </Section>
  )
}

function WeightTrend() {
  // simple decorative chart using CSS bars for now
  const data = [72, 71.5, 71.2, 70.8, 70.5, 70.2]
  const max = Math.max(...data)
  return (
    <Section className="py-6">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4 text-slate-700 dark:text-slate-200"><CalIcon className="w-4 h-4"/> Weight Trend (5 Months)</div>
        <div className="flex items-end gap-3 h-40">
          {data.map((v,i) => (
            <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${(v/max)*100}%` }} transition={{ duration: 0.9, delay: i*0.06 }}
              className="w-10 rounded-xl bg-gradient-to-t from-orange-400 via-sky-400 to-teal-400 shadow-[0_8px_24px_rgba(48,192,240,0.3)]" />
          ))}
        </div>
      </Card>
    </Section>
  )
}

function ActivityCalendar() {
  return (
    <Section className="py-6">
      <Card className="p-6">
        <div className="mb-4 text-slate-700 dark:text-slate-200 font-medium">Activity Calendar</div>
        <Calendar meals={[1,3,5,7,10,12,15,21,24]} workouts={[2,5,9,12,14,18,21,24]} />
      </Card>
    </Section>
  )
}

function TodaysPlan({ onConfetti }) {
  const [expanded, setExpanded] = useState({ meals: true, workouts: true, hydration: false })
  const toggle = k => setExpanded(s => ({ ...s, [k]: !s[k] }))
  return (
    <Section className="py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5">
          <button onClick={() => toggle('meals')} className="w-full text-left font-semibold text-slate-800 dark:text-slate-100">Meals</button>
          {expanded.meals && (
            <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <div>08:00 • Greek Yogurt + Berries</div>
              <div>12:30 • Rainbow Bowl</div>
              <div>19:00 • Salmon + Quinoa</div>
            </div>
          )}
        </Card>
        <Card className="p-5">
          <button onClick={() => toggle('workouts')} className="w-full text-left font-semibold text-slate-800 dark:text-slate-100">Workouts</button>
          {expanded.workouts && (
            <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <div>AM • Mobility 10m</div>
              <div>PM • HIIT 25m</div>
            </div>
          )}
        </Card>
        <Card className="p-5">
          <button onClick={() => toggle('hydration')} className="w-full text-left font-semibold text-slate-800 dark:text-slate-100">Hydration</button>
          {expanded.hydration && (
            <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <div>Goal • 10 cups</div>
              <div>Status • 9/10</div>
            </div>
          )}
        </Card>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <GlowButton gradient="from-emerald-400 via-teal-400 to-sky-400" onClick={onConfetti}>Log Meal 🍱</GlowButton>
        <GlowButton gradient="from-orange-400 via-rose-400 to-amber-400" onClick={onConfetti}>Log Exercise 🏋️‍♂️</GlowButton>
      </div>
    </Section>
  )
}

function GenerateAI({ onSuccess }) {
  return (
    <Section className="py-8">
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <AIOrbit floating />
          <div>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">Generate Plans with AI</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">Personalized workouts and meals — tuned to your goals.</p>
            <div className="flex flex-wrap gap-3">
              <GlowButton gradient="from-lime-400 via-sky-400 to-rose-400" onClick={onSuccess}>Generate Plan</GlowButton>
              <GlowButton gradient="from-sky-400 to-blue-500">Workout Plan</GlowButton>
              <GlowButton gradient="from-emerald-400 to-teal-400">Nutrition Plan</GlowButton>
              <GlowButton gradient="from-teal-400 via-sky-400 to-orange-400">Combined Plan</GlowButton>
            </div>
          </div>
        </div>
      </Card>
    </Section>
  )
}

function FooterWidgets() {
  return (
    <Section className="py-8 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5">
          <div className="text-sm text-slate-600 dark:text-slate-300">Hydration Streak</div>
          <div className="mt-2 text-3xl font-black text-sky-500 dark:text-sky-300">5-day streak!</div>
        </Card>
        <Card className="p-5">
          <div className="text-sm text-slate-600 dark:text-slate-300">Mini Chart</div>
          <div className="mt-3 h-16 w-full bg-gradient-to-r from-emerald-400 via-sky-400 to-orange-400 rounded-xl opacity-70" />
        </Card>
        <Card className="p-5">
          <div className="text-sm text-slate-600 dark:text-slate-300">Motivation</div>
          <div className="mt-2 italic text-slate-800 dark:text-slate-100">“Consistency compounds. Show up for future you.”</div>
        </Card>
      </div>
    </Section>
  )
}

function BackgroundGrad() {
  const { theme } = useTheme()
  const cls = theme === 'light'
    ? 'from-[#F7FBFB] to-[#F3FAFA]'
    : 'from-[#070F1E] to-[#091524]'
  return <div className={`fixed inset-0 -z-10 bg-gradient-to-br ${cls}`} />
}

function SuccessPulse({ show }) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-0">
      {show && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0.2, 0, 0.2, 0] }} transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-sky-400/10 to-orange-400/10" />
      )}
    </div>
  )
}

function AchievementToast({ show }) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div initial={{ y: 30, opacity: 0 }} animate={show ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }} transition={{ type: 'spring', stiffness: 350, damping: 22 }}
        className="flex items-center gap-2 rounded-2xl px-4 py-2 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700/60 text-slate-800 dark:text-slate-100 shadow-xl">
        <CheckCircle2 className="w-5 h-5 text-emerald-400" /> 5-day streak!
      </motion.div>
    </div>
  )
}

function Dashboard() {
  const [confetti, setConfetti] = useState(false)
  const [successPulse, setSuccessPulse] = useState(false)
  const [showStreak, setShowStreak] = useState(true)
  const logo = '/favicon.svg' // replace with uploaded gradient logo when available

  const triggerCelebrate = () => {
    setConfetti(true); setTimeout(() => setConfetti(false), 800)
    setSuccessPulse(true); setTimeout(() => setSuccessPulse(false), 1200)
  }

  return (
    <div className="relative">
      <BackgroundGrad />
      <Confetti trigger={confetti} />
      <SuccessPulse show={successPulse} />
      <AchievementToast show={showStreak} />
      <Header logoSrc={logo} />

      <Snapshot />
      <TipCard />
      <Calories />
      <WeightTrend />
      <ActivityCalendar />
      <TodaysPlan onConfetti={triggerCelebrate} />
      <GenerateAI onSuccess={triggerCelebrate} />
      <FooterWidgets />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider defaultLight>
      <Dashboard />
    </ThemeProvider>
  )
}
