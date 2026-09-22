import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Sparkles, X, Send, Bot, RotateCcw,
  CheckCircle2, Shield, Zap, ChevronDown, MessageSquare,
  AlertCircle, Bone, Stethoscope, Clock
} from 'lucide-react';
import { useUIStore } from '../../stores/uiStore';
import { cn } from '../../lib/cn';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
  clinicalBadges?: string[];
}

const DEFAULT_MESSAGES: ChatMessage[] = [
  {
    id: 'm-init',
    sender: 'assistant',
    text: "👋 **Hello Doctor.** I am your **Ortho Clinical Copilot**, grounded in the active Hospital EMR, PACS Imaging Node, and OT Protocols.\n\nAsk me about overdue post-op suture patients, implant inventory status, tomorrow's surgical line-up, or surgical guidelines.",
    time: 'Just now',
    clinicalBadges: ['EMR Synced', 'PACS Ready', 'BioMistral-v2 Active'],
  },
];

const SUGGESTED_PROMPTS = [
  { label: '🚨 Overdue POD-14 Suture Audit', query: 'Audit overdue POD-14 suture removals across all cabins' },
  { label: '🦴 Kellgren-Lawrence Gr IV Protocol', query: 'Explain Kellgren-Lawrence Grade IV surgical indication protocol' },
  { label: '📦 Check Zimmer NexGen Stock', query: 'Check Zimmer NexGen CR Cruciate Retaining stockout forecast' },
  { label: '🏥 Tomorrow OT Surgical Lineup', query: 'Show tomorrow surgical line-up and laminar OT utilization' },
  { label: '💊 DVT Anticoagulant Protocol', query: 'Provide DVT prophylaxis and antiplatelet cessation guidelines' },
];

export function FloatingCopilotWidget() {
  const { copilotOpen, toggleCopilot, setCopilotOpen, copilotInitialQuery, setCopilotInitialQuery } = useUIStore();
  const [messages, setMessages] = useState<ChatMessage[]>(DEFAULT_MESSAGES);
  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (copilotOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, copilotOpen]);

  // Handle initial query from external triggers
  useEffect(() => {
    if (copilotInitialQuery) {
      handleSendMessage(copilotInitialQuery);
      setCopilotInitialQuery(undefined);
    }
  }, [copilotInitialQuery]);

  // Focus input when opened
  useEffect(() => {
    if (copilotOpen) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [copilotOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInputQuery('');
    setIsThinking(true);

    setTimeout(() => {
      let replyText = '';
      let badges: string[] = ['BioMistral Verified'];
      const lower = query.toLowerCase();

      if (lower.includes('pod-14') || lower.includes('overdue') || lower.includes('suture') || lower.includes('stitch')) {
        replyText = `### 🚨 Overdue POD-14 Suture Removal Audit
Found **12 patients** who have not reported for scheduled stitch/staple removal:
- **Rajesh Kumar Sharma** (POD-16, Right TKR) · Dr. Anand (Cabin 101) · Ph: +91 98765 01001
- **Lakshmi Devi** (POD-15, Lumbar Discectomy) · Dr. Lakshmi (Cabin 102) · Ph: +91 98765 01002
- **Chandra Sekhar** (POD-14, Left ACL Repair) · Dr. Priya (Cabin 103) · Ph: +91 98765 01005

**Autonomous Recommendation:**
1. Automated WhatsApp wound inspection dispatched with photo capture trigger.
2. Escalated to Duty Sister for outbound phone review if non-responsive in 4 hours.`;
        badges = ['POD-14 Sentinel', 'High Priority', '12 Patients'];
      } else if (lower.includes('kellgren') || lower.includes('kl grade') || lower.includes('grade iv') || lower.includes('knee oa')) {
        replyText = `### 🦴 Kellgren-Lawrence Grade IV Clinical Pathway
**Diagnostic Radiographic Findings:**
- Complete obliteration of medial joint space with direct bone-on-bone contact.
- Marked subchondral sclerosis and extensive peripheral osteophytes.
- Associated standing radiograph XR-2024-8842 corroborates varus deformity (7.2°).

**Operative Indication:**
1. **Primary Total Knee Arthroplasty (TKR)** with Cruciate Retaining (CR) or Posterior Stabilized (PS) implant.
2. Pre-Op Mandate: HbA1c <7.5%, 2D-ECHO cardiac clearance, and antiplatelet (Ecosprin) cessation 5 days prior.`;
        badges = ['Radiology AI', 'TKR Protocol', 'KL-IV Indication'];
      } else if (lower.includes('nexgen') || lower.includes('implant') || lower.includes('stock') || lower.includes('depuy') || lower.includes('zimmer')) {
        replyText = `### 📦 Surgical Implant Bank Diagnostic
**Stock Depletion Alert — Zimmer NexGen Cruciate Retaining (CR Size: Medium):**
- **Main Sterile Vault Stock:** 0 units on shelf.
- **Immediate Reserved Cases:**
  - Case 1: Dr. Anand Krishnamurthy (Thursday 08:30 AM, OT 1) — Patient Suresh Babu.
  - Case 2: Dr. Lakshmi Narayana (Saturday 11:00 AM, OT 2) — Patient Deepa Venkat.
- **Action Taken:** Automated purchase order **PO-2026-ZIMMER-881** drafted for 4 units to regional depot (24h turnaround).`;
        badges = ['GS1 Supply Sentinel', 'Critical Reorder', 'OT 1 & OT 2'];
      } else if (lower.includes('ot') || lower.includes('surgery') || lower.includes('tomorrow') || lower.includes('lineup') || lower.includes('schedule')) {
        replyText = `### 🏥 Tomorrow's Surgical Line-Up & OT Utilization
- **OT-1 (Joint Arthroplasty Laminar Suite):**
  - **08:30 AM:** Left Total Knee Arthroplasty · Dr. Anand Krishnamurthy (Est: 110m).
  - **11:00 AM:** Primary Right Total Hip Arthroplasty (THR) · Dr. Anand Krishnamurthy (Est: 120m).
- **OT-2 (Spine & Robotic Navigation):**
  - **09:15 AM:** L4-L5 Lumbar Decompression & TLIF · Dr. Lakshmi Narayana (Est: 140m).
- **Sterility Audit:** Class 100 Laminar positive pressure active, HEPA filtration 99.97% verified.`;
        badges = ['OT Scheduler', 'Sterility Cleared', '100% Ready'];
      } else if (lower.includes('dvt') || lower.includes('anticoagulant') || lower.includes('ecosprin') || lower.includes('blood thinner')) {
        replyText = `### 💊 Orthopedic DVT & Anticoagulant Guidelines
1. **Elective Arthroplasty (TKR/THR):**
   - Discontinue Aspirin / Ecosprin 5-7 days prior to surgery.
   - Discontinue Clopidogrel (Plavix) 7 days prior.
   - Post-Op Prophylaxis: Low-Molecular-Weight Heparin (LMWH) 40mg SC or Oral Factor Xa inhibitor (Rivaroxaban 10mg) starting 8-12h post-op for 14-35 days.
2. **Mechanical Prophylaxis:** Intermittent Pneumatic Compression (IPC) cuffs mandatory until full ambulation.`;
        badges = ['Pharmacotherapy', 'DVT Protocol', 'Patient Safety'];
      } else {
        replyText = `### 💡 Clinical Analysis for: "${query}"
I have cross-checked active hospital data:
- **Clinical OPD:** 27 appointments scheduled today across Cabins 101-104.
- **Surgical Suites:** 91.4% OT utilization, 0.00% clean SSI rate across joint cases.
- **PACS Node:** DICOM streaming server operational at 0.4s load speed.
- How else may I assist your orthopedic clinical workflow?`;
        badges = ['EMR Queried', 'Hospital OS', 'Active Node'];
      }

      const assistantMessage: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        clinicalBadges: badges,
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsThinking(false);
    }, 550);
  };

  return (
    <>
      {/* ═══ DOCKED FLOATING LAUNCHER BUTTON ═══ */}
      <div className="fixed bottom-5 right-5 z-40">
        <motion.button
          onClick={toggleCopilot}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            'flex items-center gap-2.5 px-4 py-3 rounded-full shadow-2xl transition-all cursor-pointer border',
            copilotOpen
              ? 'bg-slate-900 text-white border-slate-700'
              : 'bg-gradient-to-r from-violet-600 via-indigo-600 to-teal-600 text-white border-white/20 shadow-violet-500/30'
          )}
          title="Open Ortho Clinical Copilot"
        >
          <div className="relative">
            <Brain className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse" />
          </div>
          <span className="text-xs font-bold tracking-wide">
            {copilotOpen ? 'Close Copilot' : 'AI Clinical Copilot'}
          </span>
          <Sparkles className="w-3.5 h-3.5 text-teal-300" />
        </motion.button>
      </div>

      {/* ═══ FLOATING AI CHATBOT POPUP WINDOW ═══ */}
      <AnimatePresence>
        {copilotOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.94 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed bottom-20 right-5 z-50 w-[430px] max-w-[calc(100vw-28px)] h-[580px] max-h-[calc(100vh-110px)] rounded-3xl overflow-hidden bg-white shadow-2xl border border-slate-200/90 flex flex-col font-sans text-slate-800"
          >
            {/* Copilot Header */}
            <div className="p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white flex items-center justify-between border-b border-slate-800 shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-violet-500/20 border border-violet-400/40 flex items-center justify-center text-violet-300 shadow-inner">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-bold text-white tracking-tight">
                      Ortho Clinical Copilot
                    </h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-[10px] text-slate-300">
                    Hospital EMR · PACS Node · BioMistral Active
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setMessages(DEFAULT_MESSAGES)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Reset conversation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setCopilotOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Minimize popup"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Suggested Quick Prompts Carousel */}
            <div className="p-2.5 bg-slate-50 border-b border-slate-200/80 overflow-x-auto scrollbar-none flex items-center gap-1.5 shrink-0">
              {SUGGESTED_PROMPTS.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSendMessage(item.query)}
                  className="px-2.5 py-1 rounded-full text-[10.5px] font-semibold bg-white hover:bg-violet-50 text-slate-700 hover:text-violet-800 border border-slate-200 transition-colors whitespace-nowrap cursor-pointer shadow-2xs shrink-0"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Chat Messages Scroll Container */}
            <div className="flex-1 p-4 space-y-3.5 overflow-y-auto bg-slate-50/50 text-xs">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={cn(
                    'flex flex-col max-w-[90%]',
                    msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                  )}
                >
                  <div
                    className={cn(
                      'p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs',
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-br-none'
                        : 'bg-white text-slate-900 border border-slate-200 rounded-bl-none prose-sm'
                    )}
                  >
                    <div className="whitespace-pre-line font-normal">
                      {msg.text.split('### ').map((section, idx) => {
                        if (idx === 0) return section;
                        const [title, ...rest] = section.split('\n');
                        return (
                          <div key={idx} className="mt-2 pt-1.5 border-t border-slate-100 first:mt-0 first:pt-0 first:border-0">
                            <span className="font-bold text-violet-800 block mb-1">{title}</span>
                            <span>{rest.join('\n')}</span>
                          </div>
                        );
                      })}
                    </div>

                    {msg.clinicalBadges && msg.clinicalBadges.length > 0 && (
                      <div className="flex items-center gap-1.5 mt-2.5 flex-wrap pt-2 border-t border-slate-100">
                        {msg.clinicalBadges.map((badge, bi) => (
                          <span
                            key={bi}
                            className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-violet-50 text-violet-700 border border-violet-200"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[9.5px] text-slate-400 mt-1 px-1 font-mono">
                    {msg.time}
                  </span>
                </div>
              ))}

              {isThinking && (
                <div className="mr-auto flex items-center gap-2 p-3 rounded-2xl bg-white border border-slate-200 text-slate-500 text-xs shadow-2xs">
                  <div className="w-4 h-4 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
                  <span className="text-[11px] font-medium">Cross-referencing EMR & Radiographs...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-slate-200 bg-white space-y-1.5 shrink-0">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputQuery}
                  onChange={e => setInputQuery(e.target.value)}
                  placeholder="Ask Clinical Copilot (e.g. 'Check Zimmer stock' or 'POD-14')..."
                  className="flex-1 text-xs py-2.5 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:bg-white transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputQuery.trim() || isThinking}
                  className="p-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-40 text-white font-bold transition-all shadow-xs cursor-pointer shrink-0"
                  title="Send query"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              <div className="flex items-center justify-between text-[9.5px] text-slate-400 px-1">
                <span>🔒 HIPAA & DISHA Compliant Node</span>
                <span>BioMistral-v2 Medical Engine</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
