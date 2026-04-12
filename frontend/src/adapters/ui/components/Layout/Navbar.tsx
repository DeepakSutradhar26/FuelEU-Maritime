export const Navbar = () => (
  <nav className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white px-6 py-4 shadow-2xl border-b border-blue-700">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="bg-blue-600 p-2 rounded-xl shadow-lg">
          <span className="text-3xl">⚓</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">FuelEU Maritime</h1>
          <p className="text-blue-300 text-xs tracking-widest uppercase">Compliance Dashboard</p>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-6 text-sm text-blue-200">
        <div className="text-right">
          <p className="text-xs text-blue-400">Target Intensity</p>
          <p className="font-bold text-white">89.3368 gCO₂e/MJ</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-blue-400">Regulation</p>
          <p className="font-bold text-white">EU 2023/1805</p>
        </div>
      </div>
    </div>
  </nav>
);