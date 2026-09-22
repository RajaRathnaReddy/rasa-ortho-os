import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package, Plus, Search, Filter, AlertTriangle, AlertCircle,
  CheckCircle2, Clock, ShieldCheck, Zap, Download, RefreshCw,
  Building2, ArrowUpDown, ChevronRight, X, FileText, Check,
  ExternalLink, Barcode, Calendar, IndianRupee, Layers
} from 'lucide-react';
import { cn } from '../../lib/cn';
import { formatCurrency } from '../../lib/formatters';

export interface InventoryItem {
  id: string;
  name: string;
  refCode: string;
  lotNumber: string;
  cat: 'Joint Implants' | 'Trauma Fixation' | 'Spine Hardware' | 'Arthroscopy' | 'Consumables';
  stock: number;
  min: number;
  unit: string;
  cost: number;
  supplier: string;
  leadTime: string;
  urgency: 'critical' | 'warning' | 'optimal';
  expiryDate: string;
  location: string;
}

const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-1',
    name: 'Zimmer NexGen CR Femoral Component',
    refCode: 'REF #00-5980-045-00',
    lotNumber: 'LOT #2024-ZIM-8841',
    cat: 'Joint Implants',
    stock: 1,
    min: 3,
    unit: 'pcs',
    cost: 185000,
    supplier: 'Zimmer Biomet India',
    leadTime: '⚡ 24h Express',
    urgency: 'critical',
    expiryDate: 'Nov 2028',
    location: 'Sterile Vault A-12',
  },
  {
    id: 'inv-2',
    name: 'Stryker Triathlon Tibial Baseplate Sz 4',
    refCode: 'REF #5520-B-400',
    lotNumber: 'LOT #2024-STR-3109',
    cat: 'Joint Implants',
    stock: 2,
    min: 3,
    unit: 'pcs',
    cost: 95000,
    supplier: 'Stryker India',
    leadTime: '⚡ 24h Express',
    urgency: 'warning',
    expiryDate: 'Aug 2029',
    location: 'Sterile Vault A-14',
  },
  {
    id: 'inv-3',
    name: 'DePuy Synthes Distal Radius Volar Plate',
    refCode: 'REF #02.115.202',
    lotNumber: 'LOT #2024-DPS-9021',
    cat: 'Trauma Fixation',
    stock: 1,
    min: 4,
    unit: 'pcs',
    cost: 28000,
    supplier: 'Johnson & Johnson MedTech',
    leadTime: '⚡ 48h Standard',
    urgency: 'critical',
    expiryDate: 'Mar 2027',
    location: 'Trauma Rack T-02',
  },
  {
    id: 'inv-4',
    name: 'Titanium Pedicle Screws 6.5×45mm',
    refCode: 'REF #CD-7721-6545',
    lotNumber: 'LOT #2024-MDT-4412',
    cat: 'Spine Hardware',
    stock: 4,
    min: 10,
    unit: 'pcs',
    cost: 14500,
    supplier: 'Medtronic Spinal',
    leadTime: '⚡ 24h Express',
    urgency: 'warning',
    expiryDate: 'Jan 2030',
    location: 'Spine Tray S-05',
  },
  {
    id: 'inv-5',
    name: 'Arthroscopic Shaver Blades 4.0mm',
    refCode: 'REF #72200155',
    lotNumber: 'LOT #2024-SN-5100',
    cat: 'Arthroscopy',
    stock: 3,
    min: 8,
    unit: 'boxes',
    cost: 18500,
    supplier: 'Smith & Nephew',
    leadTime: '⚡ 48h Standard',
    urgency: 'warning',
    expiryDate: 'Jun 2026',
    location: 'Endo Bin E-01',
  },
  {
    id: 'inv-6',
    name: 'Bone Cement with Gentamicin 40g',
    refCode: 'REF #PAL-6600-40G',
    lotNumber: 'LOT #2024-HER-7729',
    cat: 'Consumables',
    stock: 12,
    min: 6,
    unit: 'packs',
    cost: 8500,
    supplier: 'Heraeus Medical',
    leadTime: '⚡ 24h Express',
    urgency: 'optimal',
    expiryDate: 'Dec 2026',
    location: 'Cold Pharmacy Bay C-03',
  },
  {
    id: 'inv-7',
    name: 'Ethicon Vicryl 1-0 Heavy Sutures',
    refCode: 'REF #W9120-VIC',
    lotNumber: 'LOT #2024-JJ-1194',
    cat: 'Consumables',
    stock: 24,
    min: 10,
    unit: 'boxes',
    cost: 4200,
    supplier: 'Johnson & Johnson',
    leadTime: '⚡ 24h Express',
    urgency: 'optimal',
    expiryDate: 'Sep 2028',
    location: 'Suture Cabinet S-01',
  },
  {
    id: 'inv-8',
    name: 'Smith & Nephew PEEK Suture Anchors',
    refCode: 'REF #72202500',
    lotNumber: 'LOT #2024-SN-8820',
    cat: 'Arthroscopy',
    stock: 2,
    min: 5,
    unit: 'pcs',
    cost: 22000,
    supplier: 'Smith & Nephew',
    leadTime: '⚡ 48h Standard',
    urgency: 'warning',
    expiryDate: 'Oct 2027',
    location: 'Sports Med Tray B-08',
  },
];

export function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [urgencyFilter, setUrgencyFilter] = useState<'all' | 'critical' | 'warning' | 'optimal'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [poModalItem, setPoModalItem] = useState<InventoryItem | null>(null);
  const [isPoModalOpen, setIsPoModalOpen] = useState(false);
  const [poQuantity, setPoQuantity] = useState(5);
  const [isEmergencyPriority, setIsEmergencyPriority] = useState(false);

  // Lot Details Modal
  const [selectedLotItem, setSelectedLotItem] = useState<InventoryItem | null>(null);

  const categories = ['All', 'Joint Implants', 'Trauma Fixation', 'Spine Hardware', 'Arthroscopy', 'Consumables'];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCat = selectedCat === 'All' || item.cat === selectedCat;
      const matchesUrgency = urgencyFilter === 'all' || item.urgency === urgencyFilter;
      const matchesSearch =
        !searchQuery.trim() ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.refCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.lotNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.cat.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCat && matchesUrgency && matchesSearch;
    });
  }, [items, selectedCat, urgencyFilter, searchQuery]);

  // Executive counts
  const criticalItems = items.filter(i => i.urgency === 'critical');
  const warningItems = items.filter(i => i.urgency === 'warning');
  const optimalItems = items.filter(i => i.urgency === 'optimal');
  const totalValuation = items.reduce((sum, item) => sum + item.stock * item.cost, 0);

  const handleOpenPoModal = (item?: InventoryItem) => {
    if (item) {
      setPoModalItem(item);
      setPoQuantity(Math.max(item.min * 2 - item.stock, 5));
    } else {
      setPoModalItem(criticalItems[0] || items[0]);
      setPoQuantity(5);
    }
    setIsEmergencyPriority(item?.urgency === 'critical');
    setIsPoModalOpen(true);
  };

  const handleConfirmPo = () => {
    if (!poModalItem) return;
    const poNumber = `PO-2024-${poModalItem.supplier.split(' ')[0].toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    setItems(prev =>
      prev.map(i => {
        if (i.id === poModalItem.id) {
          const newStock = i.stock + poQuantity;
          const newUrgency = newStock > i.min ? 'optimal' : newStock === i.min ? 'warning' : 'critical';
          return { ...i, stock: newStock, urgency: newUrgency };
        }
        return i;
      })
    );

    setIsPoModalOpen(false);
    setToastMessage(`Purchase Order ${poNumber} dispatched to ${poModalItem.supplier} (+${poQuantity} ${poModalItem.unit})!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleInstantReorder = (item: InventoryItem) => {
    setItems(prev =>
      prev.map(i => {
        if (i.id === item.id) {
          return { ...i, stock: i.stock + 5, urgency: 'optimal' };
        }
        return i;
      })
    );
    setToastMessage(`⚡ Quick PO auto-submitted for ${item.name} (+5 units)`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="page-container space-y-6">
      {/* Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-semibold border border-slate-700 max-w-md"
          >
            <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ CLEAN REFINED HEADER ═══ */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 page-header">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-teal-700/20 shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Surgical & Implant Inventory</h1>
                <span className="badge bg-teal-50 text-teal-700 border border-teal-200 text-[11px] font-bold">
                  GS1 Barcode Synced
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Hospital consumable stocks · Prosthetics reorder pipeline · Supplier PO tracker
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => {
                setToastMessage('Exporting active inventory catalog and sterile lot ledger (CSV)...');
                setTimeout(() => setToastMessage(null), 3000);
              }}
              className="btn-secondary !text-xs !py-2 flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Export Audit</span>
            </button>

            <button
              type="button"
              onClick={() => handleOpenPoModal()}
              className="btn-primary !bg-teal-600 hover:!bg-teal-700 !text-white !text-xs !py-2 !px-4 shadow-sm flex items-center gap-1.5 cursor-pointer transition-all hover:scale-102"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Generate Reorder PO</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* ═══ EXECUTIVE STOCK HEALTH & VALUATION TELEMETRY (ELEGANT DESIGN) ═══ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Critical Depletion */}
        <div
          onClick={() => setUrgencyFilter(urgencyFilter === 'critical' ? 'all' : 'critical')}
          className={cn(
            'card p-4.5 border transition-all cursor-pointer relative overflow-hidden group',
            urgencyFilter === 'critical'
              ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/40 shadow-sm'
              : 'border-surface-200 hover:border-rose-300 bg-white hover:shadow-xs'
          )}
        >
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block">
                Level 1 · Emergency Low
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-slate-900">{criticalItems.length}</span>
                <span className="text-xs text-rose-600 font-bold">Items Depleted</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4.5 h-4.5" />
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
            Stock at or below critical emergency threshold (&le; 1 unit).
          </p>
          <div className="mt-3 pt-2.5 border-t border-surface-100 flex items-center justify-between text-[11px]">
            <span className="font-semibold text-rose-700">OT Risk Detected</span>
            <span className="text-[10px] font-bold text-slate-400 group-hover:text-rose-600 transition-colors">
              Filter Critical &rarr;
            </span>
          </div>
        </div>

        {/* Card 2: Buffer Warning */}
        <div
          onClick={() => setUrgencyFilter(urgencyFilter === 'warning' ? 'all' : 'warning')}
          className={cn(
            'card p-4.5 border transition-all cursor-pointer relative overflow-hidden group',
            urgencyFilter === 'warning'
              ? 'border-amber-500 ring-2 ring-amber-500/20 bg-amber-50/40 shadow-sm'
              : 'border-surface-200 hover:border-amber-300 bg-white hover:shadow-xs'
          )}
        >
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block">
                Level 2 · Buffer Warning
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-slate-900">{warningItems.length}</span>
                <span className="text-xs text-amber-600 font-bold">Below Threshold</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Clock className="w-4.5 h-4.5" />
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
            Replenish within 48h to avoid surgical rescheduling.
          </p>
          <div className="mt-3 pt-2.5 border-t border-surface-100 flex items-center justify-between text-[11px]">
            <span className="font-semibold text-amber-700">48h Window</span>
            <span className="text-[10px] font-bold text-slate-400 group-hover:text-amber-600 transition-colors">
              Filter Warning &rarr;
            </span>
          </div>
        </div>

        {/* Card 3: Optimal Reserves */}
        <div
          onClick={() => setUrgencyFilter(urgencyFilter === 'optimal' ? 'all' : 'optimal')}
          className={cn(
            'card p-4.5 border transition-all cursor-pointer relative overflow-hidden group',
            urgencyFilter === 'optimal'
              ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/40 shadow-sm'
              : 'border-surface-200 hover:border-emerald-300 bg-white hover:shadow-xs'
          )}
        >
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">
                Level 3 · Optimal Reserves
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-slate-900">{optimalItems.length}</span>
                <span className="text-xs text-emerald-600 font-bold">In Safe Stock</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4.5 h-4.5" />
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
            Consumables and surgical sutures fully stocked for 30+ days.
          </p>
          <div className="mt-3 pt-2.5 border-t border-surface-100 flex items-center justify-between text-[11px]">
            <span className="font-semibold text-emerald-700">100% Buffered</span>
            <span className="text-[10px] font-bold text-slate-400 group-hover:text-emerald-600 transition-colors">
              Filter Optimal &rarr;
            </span>
          </div>
        </div>

        {/* Card 4: Total Stock Valuation */}
        <div className="card p-4.5 border border-surface-200 bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 block">
                Total Holding Valuation
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-white">{formatCurrency(totalValuation)}</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-white/10 text-teal-300 flex items-center justify-center shrink-0 border border-white/10">
              <IndianRupee className="w-4.5 h-4.5" />
            </div>
          </div>
          <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
            8 catalogued prothesis lines & consumables under custody.
          </p>
          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
            <span>Sterility: 100%</span>
            <span className="text-[10px] font-mono text-teal-300">4 Active Vendors</span>
          </div>
        </div>
      </div>

      {/* ═══ SEARCH & FILTER CONTROLS ═══ */}
      <div className="card p-4 space-y-3 bg-white border border-surface-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by implant brand, model, SKU, catalog REF, or supplier..."
              className="input-base !pl-10 !text-xs !py-2 w-full"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Active Filter Badges */}
          <div className="flex items-center gap-2">
            {urgencyFilter !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200">
                <span>Filter: {urgencyFilter}</span>
                <button
                  type="button"
                  onClick={() => setUrgencyFilter('all')}
                  className="hover:text-rose-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <span className="text-xs text-slate-400 font-medium">
              Showing <strong className="text-slate-800">{filteredItems.length}</strong> of {items.length} SKUs
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pt-2 border-t border-surface-100">
          {categories.map((c) => {
            const count = c === 'All' ? items.length : items.filter((i) => i.cat === c).length;
            const isSelected = selectedCat === c;

            return (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedCat(c)}
                className={cn(
                  'px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5',
                  isSelected
                    ? 'bg-teal-700 text-white shadow-xs font-bold'
                    : 'bg-surface-50 hover:bg-surface-100 text-slate-600 border border-surface-200'
                )}
              >
                <span>{c}</span>
                <span
                  className={cn(
                    'text-[10px] px-1.5 py-0.2 rounded-full font-mono',
                    isSelected ? 'bg-teal-800/80 text-white' : 'bg-surface-200 text-slate-600'
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══ ELEGANT INVENTORY TABLE ═══ */}
      <div className="card overflow-hidden border border-surface-200 shadow-sm bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-surface-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Item & Traceability</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Stock Level & Depth Meter</th>
                <th className="py-3 px-4 text-right">Unit Price</th>
                <th className="py-3 px-4 text-right">Holding Value</th>
                <th className="py-3 px-4 hidden lg:table-cell">Supplier & SLA</th>
                <th className="py-3 px-4 text-center">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100 text-xs">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <Package className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="font-semibold text-sm text-slate-700">No inventory items matched your criteria</p>
                    <p className="text-xs text-slate-400 mt-1">Try clearing search keywords or selecting another category</p>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCat('All');
                        setUrgencyFilter('all');
                        setSearchQuery('');
                      }}
                      className="mt-3 px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 text-xs font-bold border border-teal-200 cursor-pointer"
                    >
                      Reset All Filters
                    </button>
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => {
                  const isCrit = item.urgency === 'critical';
                  const isWarn = item.urgency === 'warning';
                  const holdingValue = item.stock * item.cost;
                  const stockDepthPct = Math.min(Math.round((item.stock / (item.min * 2)) * 100), 100);

                  return (
                    <tr
                      key={item.id}
                      className={cn(
                        'hover:bg-slate-50/70 transition-colors',
                        isCrit ? 'bg-rose-50/20' : isWarn ? 'bg-amber-50/15' : ''
                      )}
                    >
                      {/* Item Name & Codes */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              'w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white font-bold shadow-2xs mt-0.5',
                              isCrit
                                ? 'bg-rose-600'
                                : isWarn
                                ? 'bg-amber-500'
                                : 'bg-emerald-600'
                            )}
                          >
                            <Package className="w-4 h-4" />
                          </div>

                          <div className="min-w-0">
                            <h3 className="font-bold text-slate-900 leading-snug hover:text-teal-700 transition-colors cursor-pointer" onClick={() => setSelectedLotItem(item)}>
                              {item.name}
                            </h3>
                            <div className="flex items-center gap-2 flex-wrap mt-0.5 text-[10px]">
                              <span className="font-mono text-slate-500">{item.refCode}</span>
                              <span className="text-slate-300">&bull;</span>
                              <button
                                type="button"
                                onClick={() => setSelectedLotItem(item)}
                                className="font-mono text-teal-700 hover:underline flex items-center gap-0.5 cursor-pointer"
                              >
                                <Barcode className="w-3 h-3" />
                                {item.lotNumber}
                              </button>
                              <span className="text-slate-300">&bull;</span>
                              <span className="text-slate-400">Exp: {item.expiryDate}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 text-slate-600">
                        <span className="badge bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-semibold">
                          {item.cat}
                        </span>
                        <span className="block text-[10px] text-slate-400 mt-1">{item.location}</span>
                      </td>

                      {/* Stock Level & Visual Gauge Meter */}
                      <td className="py-3.5 px-4 min-w-[160px]">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span
                              className={cn(
                                'text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1',
                                isCrit
                                  ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                  : isWarn
                                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              )}
                            >
                              <span
                                className={cn(
                                  'w-1.5 h-1.5 rounded-full',
                                  isCrit ? 'bg-rose-600 animate-pulse' : isWarn ? 'bg-amber-500' : 'bg-emerald-600'
                                )}
                              />
                              {item.stock} {item.unit}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">Min: {item.min}</span>
                          </div>

                          {/* Refined Smooth Progress Meter */}
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden flex">
                            <div
                              className={cn(
                                'h-full transition-all duration-300 rounded-full',
                                isCrit ? 'bg-rose-600' : isWarn ? 'bg-amber-500' : 'bg-emerald-500'
                              )}
                              style={{ width: `${Math.max(stockDepthPct, 15)}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Unit Price */}
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-800">
                        {formatCurrency(item.cost)}
                      </td>

                      {/* Holding Value */}
                      <td className="py-3.5 px-4 text-right font-mono text-slate-600 font-medium">
                        {formatCurrency(holdingValue)}
                      </td>

                      {/* Supplier & Lead Time */}
                      <td className="py-3.5 px-4 hidden lg:table-cell">
                        <div className="space-y-0.5">
                          <span className="font-semibold text-slate-800 block truncate max-w-[170px]">
                            {item.supplier}
                          </span>
                          <span className="text-[10px] font-mono text-teal-700 bg-teal-50 px-1.5 py-0.2 rounded border border-teal-200 inline-block">
                            {item.leadTime}
                          </span>
                        </div>
                      </td>

                      {/* Quick Action */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenPoModal(item)}
                            className={cn(
                              'text-xs font-bold px-3 py-1.5 rounded-xl transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer',
                              isCrit
                                ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20'
                                : isWarn
                                ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                            )}
                          >
                            <Zap className="w-3.5 h-3.5" />
                            <span>Reorder +5</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Summary Strip */}
        <div className="p-3 bg-slate-50 border-t border-surface-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-600" /> Critical: {criticalItems.length}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> Low Buffer: {warningItems.length}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600" /> Optimal: {optimalItems.length}
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            Automated hospital replenishment triggers every morning at 06:00 AM
          </span>
        </div>
      </div>

      {/* ═══ PURCHASE ORDER GENERATOR MODAL ═══ */}
      <AnimatePresence>
        {isPoModalOpen && poModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl border border-surface-200 max-w-lg w-full overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-4 border-b border-surface-200 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Generate Hospital Reorder PO</h3>
                    <p className="text-[10px] text-slate-300">Purchase Order dispatched via EDI to Authorized Medical Depot</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPoModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 space-y-4 text-xs">
                {/* Selected Item Info */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-surface-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{poModalItem.name}</span>
                    <span className="badge bg-slate-200 text-slate-700 text-[10px] font-mono">
                      {poModalItem.refCode}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span>Vendor: <strong className="text-slate-800">{poModalItem.supplier}</strong></span>
                    <span>Current Stock: <strong className="text-rose-600">{poModalItem.stock} {poModalItem.unit}</strong></span>
                  </div>
                </div>

                {/* Quantity Adjustment */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Order Quantity ({poModalItem.unit})
                  </label>
                  <div className="flex items-center gap-3">
                    {[1, 3, 5, 10].map((qty) => (
                      <button
                        key={qty}
                        type="button"
                        onClick={() => setPoQuantity(qty)}
                        className={cn(
                          'flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer',
                          poQuantity === qty
                            ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                            : 'bg-white text-slate-700 border-surface-200 hover:bg-slate-50'
                        )}
                      >
                        +{qty} {poModalItem.unit}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Priority Flag */}
                <label className="flex items-start gap-2.5 p-3 rounded-xl border border-amber-200 bg-amber-50/50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isEmergencyPriority}
                    onChange={(e) => setIsEmergencyPriority(e.target.checked)}
                    className="rounded text-teal-600 mt-0.5"
                  />
                  <div>
                    <span className="font-bold text-slate-900 block">Flag as Emergency OT Fast-Track Order</span>
                    <span className="text-[11px] text-slate-500">
                      Requests expedited 12-24h air courier delivery from regional manufacturer depot.
                    </span>
                  </div>
                </label>

                {/* Financial Summary */}
                <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 space-y-1 font-mono text-[11px]">
                  <div className="flex justify-between text-slate-600">
                    <span>Unit Contract Price:</span>
                    <span>{formatCurrency(poModalItem.cost)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Quantity Requested:</span>
                    <span>{poQuantity} {poModalItem.unit}</span>
                  </div>
                  <div className="pt-1.5 border-t border-slate-200 flex justify-between font-bold text-slate-900 text-xs">
                    <span>Total Purchase Order Value:</span>
                    <span className="text-teal-700 font-extrabold">{formatCurrency(poModalItem.cost * poQuantity)}</span>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-surface-200 bg-slate-50 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsPoModalOpen(false)}
                  className="btn-secondary !text-xs !py-2"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmPo}
                  className="btn-primary !bg-teal-600 hover:!bg-teal-700 !text-white !text-xs !py-2 !px-4 shadow-sm font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Confirm & Dispatch PO</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ═══ GS1 LOT & BATCH TRACEABILITY MODAL ═══ */}
      <AnimatePresence>
        {selectedLotItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl border border-surface-200 max-w-md w-full overflow-hidden"
            >
              <div className="p-4 border-b border-surface-200 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Barcode className="w-5 h-5 text-teal-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider">GS1 Implant Traceability Ledger</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedLotItem(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 space-y-3.5 text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{selectedLotItem.name}</h4>
                  <p className="text-slate-500">{selectedLotItem.supplier}</p>
                </div>

                <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-slate-50 border border-surface-200">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Catalog Code</span>
                    <span className="font-mono font-bold text-slate-800">{selectedLotItem.refCode}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Batch / Lot Number</span>
                    <span className="font-mono font-bold text-teal-700">{selectedLotItem.lotNumber}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Sterile Shelf Life</span>
                    <span className="font-mono font-bold text-slate-800">{selectedLotItem.expiryDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Storage Location</span>
                    <span className="font-semibold text-slate-800">{selectedLotItem.location}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sterile barrier integrity verified. Cleared for Laminar Airflow OT Suite deployment.</span>
                </div>
              </div>

              <div className="p-3 border-t border-surface-200 bg-slate-50 text-right">
                <button
                  type="button"
                  onClick={() => setSelectedLotItem(null)}
                  className="btn-secondary !text-xs !py-1.5"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
