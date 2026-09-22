import { motion } from 'framer-motion';
import { Bone, Package, AlertTriangle, Search, Plus, Zap, CheckCircle2, RefreshCw, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { mockImplants } from '../../data/mock';
import { formatCurrency } from '../../lib/formatters';
import { cn } from '../../lib/cn';
import { useState, useMemo } from 'react';

export function ImplantsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('all');
  const [implantsList, setImplantsList] = useState(mockImplants);
  const [restockedToast, setRestockedToast] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return implantsList.filter(i => {
      const matchSearch = search === '' ||
        i.model.toLowerCase().includes(search.toLowerCase()) ||
        i.serialNumber.toLowerCase().includes(search.toLowerCase()) ||
        i.manufacturer.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === 'all' || i.status === filter;
      return matchSearch && matchFilter;
    });
  }, [implantsList, search, filter]);

  const lowStock = useMemo(() => {
    return implantsList.filter(i => i.status === 'available' && i.stock <= i.minStock);
  }, [implantsList]);

  const criticalStock = useMemo(() => {
    return implantsList.filter(i => i.status === 'available' && i.stock <= 1);
  }, [implantsList]);

  const handleRestock = (id: string, model: string, addQty = 5) => {
    setImplantsList(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, stock: item.stock + addQty };
      }
      return item;
    }));
    setRestockedToast(`⚡ Restocked +${addQty} units for ${model}! Stock replenished.`);
    setTimeout(() => setRestockedToast(null), 3500);
  };

  return (
    <div className="page-container">
      {/* Toast notification */}
      {restockedToast && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-semibold"
        >
          <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
          <span>{restockedToast}</span>
        </motion.div>
      )}

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 page-header">
          <div>
            <h1 className="page-title">Implant Management & Traceability</h1>
            <p className="page-subtitle">
              {implantsList.length} registered implants · <span className="text-red-600 font-semibold">{criticalStock.length} critical depleted</span> · <span className="text-amber-600 font-semibold">{lowStock.length} under buffer</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                // Batch restock all critical items
                criticalStock.forEach(item => handleRestock(item.id, item.model, 4));
              }}
              className="btn-secondary !text-xs !py-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5 text-primary-600" />
              <span>Restock All Critical</span>
            </button>
            <button className="btn-primary !text-xs !py-1.5">
              <Plus className="w-3.5 h-3.5" />
              <span>Add Implant</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* ═══ GAMIFIED VIBRANT LOW STOCK RADAR ═══ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Level 1: Critical Code Red */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-red-300 bg-gradient-to-br from-red-500/10 via-rose-500/5 to-transparent p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </span>
              <span className="text-xs font-bold text-red-700 uppercase tracking-wider">Level 1 · Critical Red</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-600 text-white">
              {criticalStock.length} Depleted
            </span>
          </div>
          <p className="text-sm font-bold text-gray-900 mb-1">Immediate OT Shortage Risk</p>
          <p className="text-xs text-gray-500 mb-3">Items with ≤ 1 unit remaining in OT buffer.</p>
          <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
            {criticalStock.slice(0, 3).map(item => (
              <div key={item.id} className="flex items-center justify-between p-2 rounded-lg bg-white/80 border border-red-200">
                <div className="min-w-0 flex-1 mr-2">
                  <p className="text-xs font-bold text-gray-900 truncate">{item.model}</p>
                  <p className="text-[10px] text-gray-500">{item.manufacturer} · Size {item.size}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-red-600 px-1.5 py-0.5 rounded bg-red-100">{item.stock} left</span>
                  <button
                    onClick={() => handleRestock(item.id, item.model, 5)}
                    className="p-1 rounded bg-red-600 hover:bg-red-700 text-white shadow-2xs text-[10px] flex items-center gap-0.5 font-semibold px-2"
                    title="1-Click Emergency PO Restock"
                  >
                    <Zap className="w-3 h-3" />
                    +5
                  </button>
                </div>
              </div>
            ))}
            {criticalStock.length === 0 && (
              <p className="text-xs text-emerald-700 py-3 text-center bg-emerald-50 rounded-lg">✅ All critical shortages resolved!</p>
            )}
          </div>
        </div>

        {/* Level 2: Buffer Warning (Amber) */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Level 2 · Buffer Warning</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white">
              {lowStock.length} Low Stock
            </span>
          </div>
          <p className="text-sm font-bold text-gray-900 mb-1">Reorder Threshold Reached</p>
          <p className="text-xs text-gray-500 mb-3">Below min safe inventory (Min: 2-3 units).</p>
          <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
            {lowStock.slice(0, 3).map(item => (
              <div key={item.id} className="flex items-center justify-between p-2 rounded-lg bg-white/80 border border-amber-200">
                <div className="min-w-0 flex-1 mr-2">
                  <p className="text-xs font-semibold text-gray-900 truncate">{item.model}</p>
                  <p className="text-[10px] text-gray-500">{item.manufacturer} · Size {item.size}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-700 px-1.5 py-0.5 rounded bg-amber-100">{item.stock} left</span>
                  <button
                    onClick={() => handleRestock(item.id, item.model, 4)}
                    className="p-1 rounded bg-amber-600 hover:bg-amber-700 text-white shadow-2xs text-[10px] flex items-center gap-0.5 font-semibold px-2"
                  >
                    +4
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Level 3: Optimal Reserves (Emerald) */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Level 3 · Safe Reserve</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
              {implantsList.filter(i => i.status === 'available' && i.stock > i.minStock).length} Optimal
            </span>
          </div>
          <p className="text-sm font-bold text-gray-900 mb-1">Total Active Inventory Value</p>
          <p className="text-xs text-gray-500 mb-2">OT prosthetics, plates & spine hardware.</p>
          <div className="bg-white/90 p-3 rounded-xl border border-emerald-200 mb-2">
            <p className="text-2xl font-black text-gray-900">
              {formatCurrency(implantsList.reduce((acc, curr) => acc + curr.cost * curr.stock, 0))}
            </p>
            <p className="text-[10px] text-emerald-700 font-semibold mt-0.5 flex items-center gap-1">
              <ShieldAlert className="w-3 h-3" />
              Full FDA & CDSCO Barcode Traceability Active
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card mb-5 p-4 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by model, serial, manufacturer, brand..."
            className="input-base pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-1.5 items-center">
          {['all', 'available', 'used', 'allocated', 'expired'].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={cn(
                'badge cursor-pointer whitespace-nowrap capitalize px-3 py-1 font-medium transition-colors',
                filter === s ? 'bg-primary-600 text-white' : 'bg-surface-100 hover:bg-surface-200 text-gray-600'
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Implants Table with Gamified Stock Column */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-50 border-b border-surface-200">
                <th className="table-cell table-header text-left">Model & Implant</th>
                <th className="table-cell table-header text-left">Manufacturer</th>
                <th className="table-cell table-header text-left hidden md:table-cell">Size</th>
                <th className="table-cell table-header text-left hidden md:table-cell">Barcode / Serial</th>
                <th className="table-cell table-header text-left hidden lg:table-cell">Type</th>
                <th className="table-cell table-header text-left">Stock Health & Level</th>
                <th className="table-cell table-header text-right hidden lg:table-cell">Unit Cost</th>
                <th className="table-cell table-header text-left">Status</th>
                <th className="table-cell table-header text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(implant => {
                const isCritical = implant.status === 'available' && implant.stock <= 1;
                const isLow = implant.status === 'available' && implant.stock <= implant.minStock && !isCritical;
                const isOptimal = implant.status === 'available' && implant.stock > implant.minStock;

                return (
                  <tr key={implant.id} className={cn('table-row transition-colors', isCritical ? 'bg-red-50/40' : isLow ? 'bg-amber-50/30' : '')}>
                    <td className="table-cell">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          'w-7 h-7 rounded-lg flex items-center justify-center shrink-0',
                          isCritical ? 'bg-red-100 text-red-700' : isLow ? 'bg-amber-100 text-amber-700' : 'bg-primary-50 text-primary-700'
                        )}>
                          <Bone className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{implant.model}</p>
                          <p className="text-[10px] text-gray-400">{implant.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell text-xs text-gray-600">{implant.manufacturer}</td>
                    <td className="table-cell text-xs text-gray-700 font-medium hidden md:table-cell">{implant.size}</td>
                    <td className="table-cell text-xs text-gray-500 font-mono hidden md:table-cell">
                      <span className="px-1.5 py-0.5 rounded bg-surface-100 text-[10px]">{implant.serialNumber}</span>
                    </td>
                    <td className="table-cell text-xs text-gray-500 hidden lg:table-cell capitalize">{implant.type.replace('_', ' ')}</td>

                    {/* Gamified Stock Health Column */}
                    <td className="table-cell">
                      {implant.status === 'available' ? (
                        <div className="space-y-1.5 min-w-[130px]">
                          <div className="flex items-center justify-between">
                            <span className={cn(
                              'text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs',
                              isCritical ? 'bg-red-500 text-white animate-pulse' :
                              isLow ? 'bg-amber-500 text-white' :
                              'bg-emerald-100 text-emerald-800'
                            )}>
                              {isCritical && '🚨'}
                              {isLow && '⚠️'}
                              {isOptimal && '✅'}
                              {implant.stock} in stock
                            </span>
                            <span className="text-[10px] text-gray-400 font-semibold">Min: {implant.minStock}</span>
                          </div>
                          {/* Segmented health gauge */}
                          <div className="flex gap-1 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className={cn('h-full flex-1 rounded-full', implant.stock >= 1 ? (isCritical ? 'bg-red-500' : isLow ? 'bg-amber-500' : 'bg-emerald-500') : 'bg-gray-200')} />
                            <div className={cn('h-full flex-1 rounded-full', implant.stock >= 2 ? (isLow ? 'bg-amber-500' : 'bg-emerald-500') : 'bg-gray-200')} />
                            <div className={cn('h-full flex-1 rounded-full', implant.stock >= 4 ? 'bg-emerald-500' : 'bg-gray-200')} />
                            <div className={cn('h-full flex-1 rounded-full', implant.stock >= 6 ? 'bg-emerald-500' : 'bg-gray-200')} />
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 italic">N/A ({implant.status})</span>
                      )}
                    </td>

                    <td className="table-cell text-right text-xs font-medium text-gray-700 hidden lg:table-cell">
                      {formatCurrency(implant.cost)}
                    </td>

                    <td className="table-cell">
                      <span className={cn(
                        'badge text-[10px] font-semibold capitalize',
                        implant.status === 'available' ? 'bg-emerald-100 text-emerald-800' :
                        implant.status === 'used' ? 'bg-blue-100 text-blue-700' :
                        implant.status === 'expired' ? 'bg-red-100 text-red-700' :
                        'bg-amber-100 text-amber-800'
                      )}>
                        {implant.status}
                      </span>
                    </td>

                    {/* Quick Restock Action Button */}
                    <td className="table-cell text-center">
                      {implant.status === 'available' ? (
                        <button
                          onClick={() => handleRestock(implant.id, implant.model, 3)}
                          className={cn(
                            'text-xs font-semibold px-2.5 py-1 rounded-lg transition-all shadow-2xs inline-flex items-center gap-1',
                            isCritical ? 'bg-red-600 hover:bg-red-700 text-white' :
                            isLow ? 'bg-amber-500 hover:bg-amber-600 text-white' :
                            'bg-surface-100 hover:bg-surface-200 text-gray-700'
                          )}
                          title="Restock +3 units"
                        >
                          <Plus className="w-3 h-3" />
                          Restock
                        </button>
                      ) : (
                        <span className="text-gray-300 text-xs">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
