import { useEffect, useState } from 'react'
import { MapPin, Leaf, Truck, Lock, Zap, ShieldCheck } from 'lucide-react'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Hero() {
  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
        <ShieldCheck size={16} /> Bengaluru-only • 50km radius
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold mt-6 tracking-tight text-gray-900">
        Crop to Nutrition to Patients
      </h1>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        Farmers with surplus produce connect directly to hospitals, schools, NGOs, orphanages, and old-age homes within Bengaluru. Smart matching by nutrition and distance.
      </p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <a href="#dashboards" className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-semibold shadow">
          Explore Dashboards
        </a>
        <a href="/test" className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 px-5 py-3 rounded-lg font-semibold shadow">
          Check Backend
        </a>
      </div>
    </div>
  )
}

function FeatureGrid() {
  const features = [
    { icon: <Leaf className="text-green-600" />, title: 'Farmer surplus', desc: 'Upload crop type, quantity, harvest date, and location.' },
    { icon: <MapPin className="text-blue-600" />, title: '50 km radius', desc: 'Auto-filter to Bengaluru and nearby 50 km.' },
    { icon: <Lock className="text-amber-600" />, title: 'First-come lock', desc: 'Mediator locks a match to prevent duplicate claims.' },
    { icon: <Truck className="text-gray-700" />, title: 'Delivery workflow', desc: 'Assign delivery agents and upload proof-of-delivery.' },
    { icon: <Zap className="text-purple-600" />, title: 'AI-powered', desc: 'Recommendations, NLP parsing, grading, and forecasts.' },
  ]
  return (
    <div className="grid md:grid-cols-5 gap-4">
      {features.map((f, i) => (
        <div key={i} className="bg-white rounded-xl shadow p-4">
          <div className="h-10 w-10 flex items-center justify-center">{f.icon}</div>
          <div className="font-semibold mt-2">{f.title}</div>
          <div className="text-sm text-gray-600 mt-1">{f.desc}</div>
        </div>
      ))}
    </div>
  )
}

function BengaluruOrgs() {
  const [orgs, setOrgs] = useState([])
  const [loading, setLoading] = useState(false)
  const seed = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${backend}/seed-bengaluru`, { method: 'POST' })
      const data = await res.json()
      await fetchList()
    } catch (e) {
    } finally {
      setLoading(false)
    }
  }
  const fetchList = async () => {
    // Quick list by querying users with role organization (needs simple helper route). For now show static featured orgs.
    setOrgs([
      { name: "St. John's Medical College Hospital", address: 'Sarjapur Road', prefs: 'High-vitamin C produce' },
      { name: 'Vriddha Ashram Bengaluru', address: 'Indiranagar', prefs: 'Soft, easy-to-digest greens' },
      { name: "SOS Children's Village Bengaluru", address: 'Bengaluru', prefs: 'Bulk staples and fruits' },
    ])
  }
  useEffect(() => { fetchList() }, [])
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Featured Bengaluru Organizations</h3>
        <button onClick={seed} className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded">
          Seed demo data
        </button>
      </div>
      <div className="mt-4 space-y-3">
        {orgs.map((o, i) => (
          <div key={i} className="flex items-start gap-3 p-3 border rounded-lg">
            <MapPin className="text-blue-600 mt-1" size={18} />
            <div>
              <div className="font-medium">{o.name}</div>
              <div className="text-sm text-gray-600">{o.address}</div>
              <div className="text-sm mt-1">Requirement focus: <span className="font-medium">{o.prefs}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SimpleDashboards() {
  const cards = [
    { role: 'Farmer', desc: 'Add Surplus', href: '#', color: 'from-green-500 to-green-600' },
    { role: 'Organization', desc: 'Post Demand', href: '#', color: 'from-blue-500 to-blue-600' },
    { role: 'Mediator', desc: 'Match & Lock', href: '#', color: 'from-amber-500 to-amber-600' },
    { role: 'Delivery', desc: 'Assigned Deliveries', href: '#', color: 'from-gray-700 to-gray-800' },
    { role: 'Admin', desc: 'Oversight & Users', href: '#', color: 'from-purple-600 to-purple-700' },
  ]
  return (
    <div id="dashboards" className="grid md:grid-cols-5 gap-4">
      {cards.map((c) => (
        <a key={c.role} href="#" className={`rounded-xl p-5 text-white shadow bg-gradient-to-br ${c.color}`}>
          <div className="text-lg font-semibold">{c.role}</div>
          <div className="text-sm opacity-90">{c.desc}</div>
        </a>
      ))}
    </div>
  )
}

export default function App() {
  const [status, setStatus] = useState('')
  useEffect(() => {
    fetch(`${backend}`)
      .then((r) => r.json())
      .then((d) => setStatus(d.message || ''))
      .catch(() => setStatus(''))
  }, [])
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      <header className="p-4 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Leaf className="text-green-600" /> C2N2P
        </div>
        <div className="text-sm text-gray-600">Backend: {status || '...'}</div>
      </header>
      <main className="max-w-6xl mx-auto px-4 space-y-10 pb-16">
        <Hero />
        <FeatureGrid />
        <BengaluruOrgs />
        <SimpleDashboards />
      </main>
      <footer className="text-center text-xs text-gray-500 py-6">Bengaluru-only • Auto 50km radius filtering • AI-augmented</footer>
    </div>
  )
}
