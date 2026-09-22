import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Users, Stethoscope, CalendarDays, Syringe, Bone, FileBarChart } from 'lucide-react';
import { useUIStore } from '../../stores/uiStore';
import { mockPatients, mockDoctors, mockAppointments, mockSurgeries, mockImplants } from '../../data/mock';
import { cn } from '../../lib/cn';

interface SearchResult {
  id: string;
  type: 'patient' | 'doctor' | 'appointment' | 'surgery' | 'implant';
  title: string;
  subtitle: string;
  path: string;
}

const typeConfig = {
  patient: { icon: Users, label: 'Patient', color: 'text-blue-500 bg-blue-50' },
  doctor: { icon: Stethoscope, label: 'Doctor', color: 'text-teal-500 bg-teal-50' },
  appointment: { icon: CalendarDays, label: 'Appointment', color: 'text-purple-500 bg-purple-50' },
  surgery: { icon: Syringe, label: 'Surgery', color: 'text-amber-500 bg-amber-50' },
  implant: { icon: Bone, label: 'Implant', color: 'text-emerald-500 bg-emerald-50' },
};

export function CommandPalette() {
  const { commandPaletteOpen, toggleCommandPalette } = useUIStore();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const patientResults: SearchResult[] = mockPatients
      .filter(p => `${p.firstName} ${p.lastName}`.toLowerCase().includes(q) || p.patientId.toLowerCase().includes(q) || p.phone.includes(q))
      .slice(0, 5)
      .map(p => ({ id: p.id, type: 'patient', title: `${p.firstName} ${p.lastName}`, subtitle: `${p.patientId} · ${p.phone}`, path: `/patients/${p.id}` }));

    const doctorResults: SearchResult[] = mockDoctors
      .filter(d => d.name.toLowerCase().includes(q) || d.specialization.toLowerCase().includes(q))
      .slice(0, 3)
      .map(d => ({ id: d.id, type: 'doctor', title: d.name, subtitle: d.specialization, path: `/doctors/${d.id}` }));

    const surgeryResults: SearchResult[] = mockSurgeries
      .filter(s => s.patientName.toLowerCase().includes(q) || s.procedure.toLowerCase().includes(q))
      .slice(0, 3)
      .map(s => ({ id: s.id, type: 'surgery', title: s.procedure, subtitle: `${s.patientName} · ${s.doctorName}`, path: `/surgeries/${s.id}` }));

    const implantResults: SearchResult[] = mockImplants
      .filter(i => i.model.toLowerCase().includes(q) || i.serialNumber.toLowerCase().includes(q) || i.manufacturer.toLowerCase().includes(q))
      .slice(0, 3)
      .map(i => ({ id: i.id, type: 'implant', title: `${i.model} (${i.size})`, subtitle: `${i.manufacturer} · ${i.serialNumber}`, path: `/implants/${i.id}` }));

    return [...patientResults, ...doctorResults, ...surgeryResults, ...implantResults];
  }, [query]);

  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [commandPaletteOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  const handleSelect = (result: SearchResult) => {
    navigate(result.path);
    toggleCommandPalette();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      handleSelect(results[selectedIndex]);
    } else if (e.key === 'Escape') {
      toggleCommandPalette();
    }
  };

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            onClick={toggleCommandPalette}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-xl z-[101]"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-surface-200 overflow-hidden mx-4">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-surface-100">
                <Search className="w-5 h-5 text-gray-400 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search patients, doctors, surgeries, implants..."
                  className="flex-1 text-sm outline-none placeholder:text-gray-400 bg-transparent"
                />
                <button onClick={toggleCommandPalette} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto">
                {query.trim() === '' ? (
                  <div className="p-8 text-center">
                    <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Start typing to search across all records</p>
                    <p className="text-xs text-gray-300 mt-1">Patients · Doctors · Surgeries · Implants</p>
                  </div>
                ) : results.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-sm text-gray-400">No results found for "{query}"</p>
                  </div>
                ) : (
                  <div className="p-2">
                    {results.map((result, i) => {
                      const config = typeConfig[result.type];
                      const Icon = config.icon;
                      return (
                        <button
                          key={result.id}
                          onClick={() => handleSelect(result)}
                          onMouseEnter={() => setSelectedIndex(i)}
                          className={cn(
                            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors',
                            selectedIndex === i ? 'bg-primary-50' : 'hover:bg-surface-50'
                          )}
                        >
                          <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0', config.color)}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900 truncate">{result.title}</p>
                            <p className="text-xs text-gray-400 truncate">{result.subtitle}</p>
                          </div>
                          <span className="text-[10px] font-medium text-gray-400 bg-surface-100 px-1.5 py-0.5 rounded shrink-0">
                            {config.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-surface-100 flex items-center gap-4 text-[10px] text-gray-400">
                <span>↑↓ Navigate</span>
                <span>↵ Open</span>
                <span>Esc Close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
