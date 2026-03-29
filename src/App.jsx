import { useState, useMemo } from "react";

const Icon = ({ d, size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={d} />
  </svg>
);
const Icons = {
  home: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  file: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6",
  users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  list: "M8 6h13 M8 12h13 M8 18h13 M3 6h.01 M3 12h.01 M3 18h.01",
  settings: "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
  bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
  plus: "M12 5v14 M5 12h14",
  search: "M11 3a8 8 0 100 16A8 8 0 0011 3z M21 21l-4.35-4.35",
  x: "M18 6L6 18 M6 6l12 12",
  check: "M20 6L9 17l-5-5",
  send: "M22 2L11 13 M22 2l-7 20-4-9-9-4 20-7z",
  edit: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  copy: "M20 9h-9a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-9a2 2 0 00-2-2z M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1",
  arrowLeft: "M19 12H5 M12 19l-7-7 7-7",
  tag: "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z M7 7h.01",
  dollar: "M12 1v22 M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6",
  trending: "M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6",
  clock: "M12 22a10 10 0 100-20 10 10 0 000 20z M12 6v6l4 2",
  package: "M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  chevronDown: "M6 9l6 6 6-6",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
};

const QUOTES = [
  { id: "QC-2026-001", title: "Full Roof Replacement", customer: "Marcus Webb", address: "1842 Spruce Dr, Denver, CO", total: 18400, margin: 34, status: "Won", date: "2026-03-10", rep: "Jake", trade: "Roofing", viewed: true },
  { id: "QC-2026-002", title: "Siding & Gutter Package", customer: "Priya Nair", address: "904 Elm St, Aurora, CO", total: 12750, margin: 29, status: "Sent", date: "2026-03-18", rep: "Sarah", trade: "Siding", viewed: false },
  { id: "QC-2026-003", title: "Storm Damage Restoration", customer: "Tom & Diane Kowalski", address: "217 Oak Ave, Lakewood, CO", total: 31200, margin: 38, status: "Viewed", date: "2026-03-20", rep: "Jake", trade: "Roofing", viewed: true },
  { id: "QC-2026-004", title: "Window Replacement – 14 Units", customer: "Crestview HOA", address: "5500 Crestview Blvd, Littleton, CO", total: 22800, margin: 31, status: "Draft", date: "2026-03-24", rep: "Sarah", trade: "Windows", viewed: false },
  { id: "QC-2026-005", title: "Exterior Paint – Full House", customer: "Rodrigo Mendes", address: "312 Birch Ln, Englewood, CO", total: 8900, margin: 42, status: "Won", date: "2026-03-05", rep: "Jake", trade: "Painting", viewed: true },
  { id: "QC-2026-006", title: "Gutter Replacement & Covers", customer: "Sandra Liu", address: "670 Aspen Ct, Westminster, CO", total: 4200, margin: 45, status: "Expired", date: "2026-02-28", rep: "Sarah", trade: "Gutters", viewed: true },
  { id: "QC-2026-007", title: "Complete Exterior Package", customer: "Nathan Briggs", address: "1108 Pine Rd, Arvada, CO", total: 41500, margin: 33, status: "Sent", date: "2026-03-25", rep: "Jake", trade: "Roofing", viewed: false },
  { id: "QC-2026-008", title: "Roof Inspection & Repair", customer: "Angela Torres", address: "88 Cedar Way, Boulder, CO", total: 3600, margin: 50, status: "Lost", date: "2026-03-12", rep: "Sarah", trade: "Roofing", viewed: true },
];

const PRICE_LIST = [
  { id: 1, name: "GAF Timberline HDZ Shingles", trade: "Roofing", unit: "SQ", cost: 120, total: 230, margin: 47, sku: "GAF-THDZ-30" },
  { id: 2, name: "CertainTeed Landmark Pro Shingles", trade: "Roofing", unit: "SQ", cost: 135, total: 250, margin: 46, sku: "CT-LMP-30" },
  { id: 3, name: "Ice & Water Shield", trade: "Roofing", unit: "SQ", cost: 45, total: 95, margin: 53, sku: "GEN-IWS-2" },
  { id: 4, name: "Synthetic Underlayment", trade: "Roofing", unit: "SQ", cost: 22, total: 48, margin: 54, sku: "GEN-SYN-U" },
  { id: 5, name: "James Hardie Lap Siding", trade: "Siding", unit: "SF", cost: 2.80, total: 9.00, margin: 69, sku: "JH-LAP-6" },
  { id: 6, name: "Mastic Quest Double 4\" Vinyl", trade: "Siding", unit: "SF", cost: 1.20, total: 4.70, margin: 74, sku: "MAS-Q4-WH" },
  { id: 7, name: "K-Style Seamless Aluminum Gutter", trade: "Gutters", unit: "LF", cost: 4.50, total: 13.00, margin: 65, sku: "ALU-K5-WH" },
  { id: 8, name: "Andersen 100 Series Double Hung", trade: "Windows", unit: "EA", cost: 320, total: 630, margin: 49, sku: "AND-100-DH" },
  { id: 9, name: "Sherwin-Williams Duration Ext.", trade: "Painting", unit: "SF", cost: 0.80, total: 3.40, margin: 76, sku: "SW-DUR-EXT" },
  { id: 10, name: "Ridge Cap Shingles", trade: "Roofing", unit: "LF", cost: 3.20, total: 7.50, margin: 57, sku: "GEN-RDG-C" },
];

const fmt$ = (n) => "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
const fmtK = (n) => n >= 1000 ? "$" + (n / 1000).toFixed(1) + "k" : fmt$(n);

const STATUS_STYLE = {
  Draft:   "bg-zinc-700/60 text-zinc-300 border-zinc-600",
  Sent:    "bg-blue-900/50 text-blue-300 border-blue-700",
  Viewed:  "bg-violet-900/50 text-violet-300 border-violet-700",
  Won:     "bg-emerald-900/50 text-emerald-300 border-emerald-700",
  Lost:    "bg-red-900/50 text-red-400 border-red-800",
  Expired: "bg-amber-900/50 text-amber-300 border-amber-700",
};

const StatusBadge = ({ status }) => (
  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border tracking-wide whitespace-nowrap ${STATUS_STYLE[status]}`}>
    {status}
  </span>
);

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "home" },
  { id: "quotes", label: "Quotes", icon: "file" },
  { id: "clients", label: "Clients", icon: "users" },
  { id: "pricelists", label: "Price Lists", icon: "list" },
  { id: "settings", label: "Settings", icon: "settings" },
];

// ── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ onOpenQuote }) {
  const won = QUOTES.filter(q => q.status === "Won");
  const sent = QUOTES.filter(q => ["Sent","Viewed"].includes(q.status));
  const wonRevenue = won.reduce((s, q) => s + q.total, 0);
  const pipeline = sent.reduce((s, q) => s + q.total, 0);
  const winRate = Math.round((won.length / QUOTES.filter(q => q.status !== "Draft").length) * 100);

  const kpis = [
    { label: "Quotes Sent", value: "8", sub: "this month", icon: "send", color: "text-blue-400" },
    { label: "Revenue Won", value: fmtK(wonRevenue), sub: "last 30 days", icon: "dollar", color: "text-emerald-400" },
    { label: "Win Rate", value: winRate + "%", sub: "last 30 days", icon: "trending", color: winRate >= 40 ? "text-emerald-400" : "text-amber-400" },
    { label: "Avg Quote Value", value: fmtK(QUOTES.reduce((s,q)=>s+q.total,0)/QUOTES.length), sub: "all time", icon: "tag", color: "text-violet-400" },
    { label: "Open Pipeline", value: fmtK(pipeline), sub: "active quotes", icon: "zap", color: "text-sky-400" },
    { label: "Avg Days to Close", value: "11", sub: "won quotes", icon: "clock", color: "text-amber-400" },
  ];

  const followUp = QUOTES.filter(q => q.status === "Sent" && !q.viewed);
  const tradeVol = {};
  QUOTES.forEach(q => { tradeVol[q.trade] = (tradeVol[q.trade] || 0) + q.total; });
  const maxVol = Math.max(...Object.values(tradeVol));

  return (
    <div className="p-6 space-y-5">
      <div className="grid grid-cols-3 gap-4">
        {kpis.map(k => (
          <div key={k.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-start gap-3">
            <div className={`mt-0.5 ${k.color}`}><Icon d={Icons[k.icon]} size={18} /></div>
            <div>
              <p className="text-[11px] text-zinc-500 uppercase tracking-widest font-medium">{k.label}</p>
              <p className={`text-2xl font-bold mt-0.5 ${k.color}`}>{k.value}</p>
              <p className="text-[11px] text-zinc-600 mt-0.5">{k.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-100">Recent Quotes</span>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                {["Customer","Quote","Total","Margin","Status","Date"].map(h => (
                  <th key={h} className="text-left text-[11px] text-zinc-500 font-medium px-4 py-2 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {QUOTES.slice(0,6).map(q => (
                <tr key={q.id} onClick={() => onOpenQuote(q)} className="border-b border-zinc-800/40 hover:bg-zinc-800/40 cursor-pointer transition-colors">
                  <td className="px-4 py-2.5 text-zinc-100 font-medium text-[13px]">{q.customer}</td>
                  <td className="px-4 py-2.5 text-zinc-400 text-[12px] max-w-[140px] truncate">{q.title}</td>
                  <td className="px-4 py-2.5 text-zinc-100 font-mono text-[12px]">{fmt$(q.total)}</td>
                  <td className="px-4 py-2.5">
                    <span className={`text-[12px] font-mono ${q.margin >= 40 ? "text-emerald-400" : q.margin >= 30 ? "text-zinc-300" : "text-amber-400"}`}>{q.margin}%</span>
                  </td>
                  <td className="px-4 py-2.5"><StatusBadge status={q.status} /></td>
                  <td className="px-4 py-2.5 text-zinc-500 text-[12px]">{q.date.slice(5).replace("-","/")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-zinc-800 flex items-center gap-2">
              <Icon d={Icons.clock} size={13} className="text-amber-400" />
              <span className="text-sm font-semibold text-zinc-100">Follow-up Queue</span>
              {followUp.length > 0 && <span className="ml-auto bg-amber-500/20 text-amber-400 text-[10px] font-bold px-1.5 py-0.5 rounded">{followUp.length}</span>}
            </div>
            {followUp.length === 0
              ? <p className="text-zinc-600 text-xs px-4 py-4">All caught up 🎉</p>
              : followUp.map(q => (
                <div key={q.id} onClick={() => onOpenQuote(q)} className="px-4 py-2.5 border-b border-zinc-800/40 hover:bg-zinc-800/40 cursor-pointer">
                  <p className="text-[12px] text-zinc-200 font-medium">{q.customer}</p>
                  <p className="text-[11px] text-zinc-500 truncate">{q.title} · {fmt$(q.total)}</p>
                </div>
              ))
            }
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-zinc-800">
              <span className="text-sm font-semibold text-zinc-100">Top Trade by Volume</span>
            </div>
            <div className="p-4 space-y-2.5">
              {Object.entries(tradeVol).sort((a,b) => b[1]-a[1]).map(([trade, vol]) => (
                <div key={trade}>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-zinc-400">{trade}</span>
                    <span className="text-zinc-300 font-mono">{fmtK(vol)}</span>
                  </div>
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full" style={{ width: `${(vol/maxVol)*100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Quote List ───────────────────────────────────────────────────────────────
function QuoteList({ onOpen, onCreate }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const statuses = ["All","Draft","Sent","Viewed","Won","Lost","Expired"];
  const filtered = useMemo(() => QUOTES.filter(q => {
    const s = search.toLowerCase();
    const matchSearch = !s || q.customer.toLowerCase().includes(s) || q.title.toLowerCase().includes(s) || q.id.toLowerCase().includes(s);
    const matchStatus = statusFilter === "All" || q.status === statusFilter;
    return matchSearch && matchStatus;
  }), [search, statusFilter]);

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-zinc-100">Quotes</h2>
        <button onClick={onCreate} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
          <Icon d={Icons.plus} size={15} /> New Quote
        </button>
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <Icon d={Icons.search} size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search quotes…"
            className="bg-zinc-800 border border-zinc-700 rounded-lg pl-9 pr-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500 w-56" />
        </div>
        <div className="flex gap-1 flex-wrap">
          {statuses.map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors ${statusFilter === s ? "bg-blue-600 text-white" : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"}`}>{s}</button>
          ))}
        </div>
      </div>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800">
              {["Quote #","Customer","Title","Trade","Total","Margin","Status","Date","Rep",""].map(h => (
                <th key={h} className="text-left text-[11px] text-zinc-500 font-medium px-4 py-2.5 uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(q => (
              <tr key={q.id} className="border-b border-zinc-800/40 hover:bg-zinc-800/40 transition-colors group">
                <td className="px-4 py-3 font-mono text-[11px] text-zinc-500 whitespace-nowrap">{q.id}</td>
                <td className="px-4 py-3 text-zinc-100 font-medium text-[13px] whitespace-nowrap">{q.customer}</td>
                <td className="px-4 py-3 text-zinc-400 text-[12px]">{q.title}</td>
                <td className="px-4 py-3 text-zinc-500 text-[12px]">{q.trade}</td>
                <td className="px-4 py-3 text-zinc-100 font-mono text-[12px] whitespace-nowrap">{fmt$(q.total)}</td>
                <td className="px-4 py-3">
                  <span className={`text-[12px] font-mono ${q.margin >= 40 ? "text-emerald-400" : q.margin >= 30 ? "text-zinc-300" : "text-amber-400"}`}>{q.margin}%</span>
                </td>
                <td className="px-4 py-3"><StatusBadge status={q.status} /></td>
                <td className="px-4 py-3 text-zinc-500 text-[12px] whitespace-nowrap">{q.date}</td>
                <td className="px-4 py-3 text-zinc-500 text-[12px]">{q.rep}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onOpen(q)} className="p-1.5 hover:bg-zinc-700 rounded text-zinc-400 hover:text-zinc-100 transition-colors" title="Edit"><Icon d={Icons.edit} size={13} /></button>
                    <button className="p-1.5 hover:bg-zinc-700 rounded text-zinc-400 hover:text-zinc-100 transition-colors" title="Duplicate"><Icon d={Icons.copy} size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="text-center py-12 text-zinc-600 text-sm">No quotes match your filters</div>}
      </div>
    </div>
  );
}

// ── Quote Editor ─────────────────────────────────────────────────────────────
const EMPTY_TABS = () => [
  { id: "t1", label: "Good",   sections: [{ id: "s1", label: "Scope of Work", items: [] }] },
  { id: "t2", label: "Better", sections: [{ id: "s2", label: "Scope of Work", items: [] }] },
  { id: "t3", label: "Best",   sections: [{ id: "s3", label: "Scope of Work", items: [] }] },
];

function buildEditorQuote(q) {
  if (q._editorReady) return q;
  const base = {
    id: q.id || "QC-2026-009",
    title: q.title || "New Quote",
    customer: q.customer || "",
    email: q.email || "",
    phone: q.phone || "",
    address: q.address || "",
    status: q.status || "Draft",
    rep: q.rep || "Jake",
    date: q.date || "2026-03-28",
    expiration: "2026-04-27",
    discount: 0,
    taxRate: 8.3,
    notes: "",
    terms: "50% deposit required to schedule. Balance due upon completion.",
    _editorReady: true,
  };

  if (q.id && q.id !== "QC-2026-009") {
    base.tabs = [
      { id: "t1", label: "Option A", sections: [{ id: "s1", label: "Scope of Work", items: [
        { id: "i1", name: "GAF Timberline HDZ Shingles", qty: 24, unit: "SQ", cost: 120, unitPrice: 230 },
        { id: "i2", name: "Ice & Water Shield", qty: 4, unit: "SQ", cost: 45, unitPrice: 95 },
        { id: "i3", name: "Synthetic Underlayment", qty: 24, unit: "SQ", cost: 22, unitPrice: 48 },
      ]}]},
      { id: "t2", label: "Option B", sections: [{ id: "s2", label: "Scope of Work", items: [
        { id: "i4", name: "CertainTeed Landmark Pro Shingles", qty: 24, unit: "SQ", cost: 135, unitPrice: 250 },
        { id: "i5", name: "Ice & Water Shield", qty: 6, unit: "SQ", cost: 45, unitPrice: 95 },
      ]}]},
      { id: "t3", label: "Option C", sections: [{ id: "s3", label: "Scope of Work", items: [] }]},
    ];
  } else {
    base.tabs = EMPTY_TABS();
  }
  return base;
}

function QuoteEditor({ quote: initialQuote, onBack }) {
  const [quote, setQuote] = useState(() => buildEditorQuote(initialQuote));
  const [activeTab, setActiveTab] = useState(0);
  const [showPicker, setShowPicker] = useState(false);
  const [pickerSearch, setPickerSearch] = useState("");
  const [pickerSecIdx, setPickerSecIdx] = useState(0);
  const [saved, setSaved] = useState(false);

  const upd = (patch) => setQuote(q => ({ ...q, ...patch }));

  const currentTab = quote.tabs[activeTab];

  const tabTotal = (tab) =>
    tab.sections.reduce((s, sec) =>
      s + sec.items.reduce((si, it) => si + (it.qty || 0) * (it.unitPrice || 0), 0), 0);

  const subtotal = tabTotal(currentTab);
  const discountAmt = subtotal * (quote.discount / 100);
  const tax = (subtotal - discountAmt) * (quote.taxRate / 100);
  const finalTotal = subtotal - discountAmt + tax;

  const openPicker = (secIdx) => { setPickerSecIdx(secIdx); setPickerSearch(""); setShowPicker(true); };

  const addItem = (pl) => {
    const newItem = { id: Date.now().toString(), name: pl.name, qty: 1, unit: pl.unit, cost: pl.cost, unitPrice: pl.total };
    setQuote(q => ({
      ...q,
      tabs: q.tabs.map((tab, ti) => ti !== activeTab ? tab : {
        ...tab,
        sections: tab.sections.map((sec, si) => si !== pickerSecIdx ? sec : { ...sec, items: [...sec.items, newItem] })
      })
    }));
    setShowPicker(false);
  };

  const updateItem = (secIdx, itemIdx, patch) => {
    setQuote(q => ({
      ...q,
      tabs: q.tabs.map((tab, ti) => ti !== activeTab ? tab : {
        ...tab,
        sections: tab.sections.map((sec, si) => si !== secIdx ? sec : {
          ...sec, items: sec.items.map((it, ii) => ii !== itemIdx ? it : { ...it, ...patch })
        })
      })
    }));
  };

  const removeItem = (secIdx, itemIdx) => {
    setQuote(q => ({
      ...q,
      tabs: q.tabs.map((tab, ti) => ti !== activeTab ? tab : {
        ...tab,
        sections: tab.sections.map((sec, si) => si !== secIdx ? sec : {
          ...sec, items: sec.items.filter((_, ii) => ii !== itemIdx)
        })
      })
    }));
  };

  const filteredPL = PRICE_LIST.filter(p => {
    const s = pickerSearch.toLowerCase();
    return !s || p.name.toLowerCase().includes(s) || p.trade.toLowerCase().includes(s);
  });

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="bg-zinc-900 border-b border-zinc-800 px-5 py-2.5 flex items-center gap-4 flex-shrink-0">
        <button onClick={onBack} className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-100 text-sm transition-colors">
          <Icon d={Icons.arrowLeft} size={14} /> Back
        </button>
        <div className="w-px h-5 bg-zinc-700" />
        <div className="flex-1 min-w-0">
          <input value={quote.title} onChange={e => upd({ title: e.target.value })}
            className="bg-transparent text-zinc-100 font-semibold text-sm focus:outline-none w-full" />
          <p className="text-[11px] text-zinc-600 truncate">{quote.id} · {quote.customer || "No customer"} · {quote.address}</p>
        </div>
        <StatusBadge status={quote.status} />
        <button onClick={handleSave}
          className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors ${saved ? "bg-emerald-700 text-emerald-100" : "bg-zinc-700 hover:bg-zinc-600 text-zinc-200"}`}>
          <Icon d={Icons.check} size={13} /> {saved ? "Saved!" : "Save"}
        </button>
        <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors">
          <Icon d={Icons.send} size={13} /> Send Quote
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Editor main */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tab bar */}
          <div className="bg-zinc-900/60 border-b border-zinc-800 px-5 flex items-center flex-shrink-0">
            {quote.tabs.map((tab, i) => (
              <button key={tab.id} onClick={() => setActiveTab(i)}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${activeTab === i ? "border-blue-500 text-blue-400" : "border-transparent text-zinc-500 hover:text-zinc-300"}`}>
                {tab.label}
                <span className="ml-2 text-[11px] font-mono opacity-60">{fmtK(tabTotal(tab))}</span>
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* Customer */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <h3 className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-3">Customer</h3>
              <div className="grid grid-cols-2 gap-3">
                {[["Name","customer"],["Service Address","address"],["Email","email"],["Phone","phone"]].map(([label, key]) => (
                  <div key={key}>
                    <label className="text-[10px] text-zinc-600 block mb-1">{label}</label>
                    <input value={quote[key] || ""} onChange={e => upd({ [key]: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-[13px] text-zinc-100 focus:outline-none focus:border-blue-500" />
                  </div>
                ))}
              </div>
            </div>

            {/* Sections */}
            {currentTab.sections.map((section, secIdx) => {
              const secTotal = section.items.reduce((s, it) => s + (it.qty||0)*(it.unitPrice||0), 0);
              return (
                <div key={section.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-zinc-800 flex items-center justify-between">
                    <span className="text-sm font-semibold text-zinc-100">{section.label}</span>
                    <span className="text-sm font-mono text-zinc-400">{fmt$(secTotal)}</span>
                  </div>

                  {section.items.length > 0 && (
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-zinc-800/60">
                          <th className="text-left text-[10px] text-zinc-600 font-medium px-4 py-2 uppercase tracking-wider">Item</th>
                          <th className="text-left text-[10px] text-zinc-600 font-medium px-2 py-2 uppercase tracking-wider w-20">Qty</th>
                          <th className="text-left text-[10px] text-zinc-600 font-medium px-2 py-2 uppercase tracking-wider w-14">Unit</th>
                          <th className="text-left text-[10px] text-zinc-600 font-medium px-2 py-2 uppercase tracking-wider w-24">Cost</th>
                          <th className="text-left text-[10px] text-zinc-600 font-medium px-2 py-2 uppercase tracking-wider w-24">Unit Price</th>
                          <th className="text-left text-[10px] text-zinc-600 font-medium px-2 py-2 uppercase tracking-wider w-28">Line Total</th>
                          <th className="w-8"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.items.map((item, itemIdx) => {
                          const qty = item.qty || 0;
                          const up = item.unitPrice || 0;
                          const cost = item.cost || 0;
                          const lineTotal = qty * up;
                          const lineCost = qty * cost;
                          const lineMargin = lineTotal > 0 ? Math.round(((lineTotal - lineCost) / lineTotal) * 100) : null;
                          return (
                            <tr key={item.id} className="border-b border-zinc-800/30 hover:bg-zinc-800/30 group">
                              <td className="px-4 py-2 text-[12px] text-zinc-200">{item.name}</td>
                              <td className="px-2 py-2">
                                <input type="number" value={qty}
                                  onChange={e => updateItem(secIdx, itemIdx, { qty: Number(e.target.value) })}
                                  className="w-16 bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-[12px] text-zinc-100 text-right focus:outline-none focus:border-blue-500" />
                              </td>
                              <td className="px-2 py-2 text-zinc-500 text-[12px]">{item.unit}</td>
                              <td className="px-2 py-2 text-zinc-500 font-mono text-[12px]">{fmt$(cost)}</td>
                              <td className="px-2 py-2">
                                <input type="number" value={up}
                                  onChange={e => updateItem(secIdx, itemIdx, { unitPrice: Number(e.target.value) })}
                                  className="w-20 bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-[12px] text-zinc-100 text-right focus:outline-none focus:border-blue-500" />
                              </td>
                              <td className="px-2 py-2">
                                <span className="font-mono text-[12px] text-zinc-100">{fmt$(lineTotal)}</span>
                                {lineMargin !== null && (
                                  <span className={`ml-1.5 text-[10px] font-mono ${lineMargin >= 40 ? "text-emerald-400" : lineMargin >= 25 ? "text-zinc-500" : "text-amber-400"}`}>{lineMargin}%</span>
                                )}
                              </td>
                              <td className="px-2 py-2">
                                <button onClick={() => removeItem(secIdx, itemIdx)}
                                  className="p-1 opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-400 transition-all">
                                  <Icon d={Icons.x} size={12} />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}

                  <div className="px-4 py-2">
                    <button onClick={() => openPicker(secIdx)}
                      className="flex items-center gap-1.5 text-[12px] text-zinc-500 hover:text-blue-400 transition-colors py-1">
                      <Icon d={Icons.plus} size={12} /> Add line item
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-60 border-l border-zinc-800 bg-zinc-900/40 overflow-y-auto flex-shrink-0">
          <div className="p-4 space-y-4">
            <div>
              <h3 className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mb-2">Quote Details</h3>
              <div className="space-y-2">
                {[["Rep","rep"],["Date","date"],["Expiration","expiration"]].map(([label, key]) => (
                  <div key={key}>
                    <label className="text-[10px] text-zinc-600 block mb-0.5">{label}</label>
                    <input value={quote[key] || ""} onChange={e => upd({ [key]: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded px-2.5 py-1.5 text-[12px] text-zinc-100 focus:outline-none focus:border-blue-500" />
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-zinc-800" />

            <div>
              <h3 className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mb-2">Summary</h3>
              <div className="space-y-1.5 text-[12px]">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Subtotal</span>
                  <span className="font-mono text-zinc-200">{fmt$(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500">Discount</span>
                  <div className="flex items-center gap-1">
                    <input type="number" value={quote.discount} onChange={e => upd({ discount: Number(e.target.value) })}
                      className="w-12 bg-zinc-800 border border-zinc-700 rounded px-1.5 py-0.5 text-[11px] text-zinc-100 text-right focus:outline-none" />
                    <span className="text-zinc-500 text-[10px]">%</span>
                  </div>
                </div>
                {quote.discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-zinc-600 text-[11px]">Discount amt.</span>
                    <span className="font-mono text-red-400 text-[11px]">-{fmt$(discountAmt)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-zinc-500">Tax ({quote.taxRate}%)</span>
                  <span className="font-mono text-zinc-400">{fmt$(tax)}</span>
                </div>
                <div className="h-px bg-zinc-700 my-1" />
                <div className="flex justify-between font-semibold">
                  <span className="text-zinc-300">Total</span>
                  <span className="font-mono text-emerald-400">{fmt$(finalTotal)}</span>
                </div>
              </div>
            </div>

            <div className="h-px bg-zinc-800" />

            <div>
              <label className="text-[10px] text-zinc-600 uppercase tracking-widest block mb-1.5">Internal Notes</label>
              <textarea value={quote.notes} onChange={e => upd({ notes: e.target.value })} rows={3}
                placeholder="Private notes…"
                className="w-full bg-zinc-800 border border-zinc-700 rounded px-2.5 py-1.5 text-[12px] text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-blue-500 resize-none" />
            </div>

            <div>
              <label className="text-[10px] text-zinc-600 uppercase tracking-widest block mb-1.5">Terms</label>
              <textarea value={quote.terms} onChange={e => upd({ terms: e.target.value })} rows={4}
                className="w-full bg-zinc-800 border border-zinc-700 rounded px-2.5 py-1.5 text-[12px] text-zinc-100 focus:outline-none focus:border-blue-500 resize-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Item picker modal */}
      {showPicker && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setShowPicker(false)}>
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl w-[520px] max-h-[420px] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-3.5 border-b border-zinc-800 flex items-center gap-3">
              <Icon d={Icons.search} size={15} className="text-zinc-500 flex-shrink-0" />
              <input autoFocus value={pickerSearch} onChange={e => setPickerSearch(e.target.value)}
                placeholder="Search price list by name or trade…"
                className="flex-1 bg-transparent text-zinc-100 text-sm focus:outline-none placeholder-zinc-500" />
              <button onClick={() => setShowPicker(false)} className="text-zinc-500 hover:text-zinc-300 flex-shrink-0">
                <Icon d={Icons.x} size={15} />
              </button>
            </div>
            <div className="overflow-y-auto">
              {filteredPL.length === 0 && <p className="text-zinc-600 text-sm px-4 py-8 text-center">No items found</p>}
              {filteredPL.map(item => (
                <div key={item.id} onClick={() => addItem(item)}
                  className="px-4 py-3 hover:bg-zinc-800 cursor-pointer border-b border-zinc-800/40 flex items-center justify-between">
                  <div className="min-w-0 mr-3">
                    <p className="text-[13px] text-zinc-100 font-medium truncate">{item.name}</p>
                    <p className="text-[11px] text-zinc-500">{item.trade} · per {item.unit} · {item.sku}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[13px] font-mono text-zinc-100">{fmt$(item.total)}/{item.unit}</p>
                    <p className="text-[11px] text-emerald-400">{item.margin}% margin</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Wireframe: New Quote ──────────────────────────────────────────────────────
const WF_Input = ({ label, placeholder = "", value = "", note = "", wide = false, type = "text" }) => (
  <div className={wide ? "col-span-2" : ""}>
    <label className="text-[11px] font-medium text-zinc-500 block mb-1">{label}</label>
    <div className="w-full bg-zinc-800/60 border border-zinc-700/80 rounded-lg px-3 py-2 text-[13px] text-zinc-400 select-none">
      {value || <span className="text-zinc-600">{placeholder}</span>}
    </div>
    {note && <p className="text-[10px] text-zinc-600 mt-1">{note}</p>}
  </div>
);

const WF_Select = ({ label, value = "", note = "" }) => (
  <div>
    <label className="text-[11px] font-medium text-zinc-500 block mb-1">{label}</label>
    <div className="w-full bg-zinc-800/60 border border-zinc-700/80 rounded-lg px-3 py-2 text-[13px] text-zinc-400 flex items-center justify-between select-none">
      <span>{value || <span className="text-zinc-600">Select…</span>}</span>
      <Icon d={Icons.chevronDown} size={13} className="text-zinc-600 flex-shrink-0" />
    </div>
    {note && <p className="text-[10px] text-zinc-600 mt-1">{note}</p>}
  </div>
);

const WF_Section = ({ title, children, className = "" }) => (
  <div className={`bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden ${className}`}>
    <div className="px-4 py-3 border-b border-zinc-800">
      <span className="text-[13px] font-semibold text-zinc-100">{title}</span>
    </div>
    <div className="p-4">{children}</div>
  </div>
);

function NewQuoteWireframe({ onBack }) {
  const tabs = ["Good", "Better", "Best"];
  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="bg-zinc-900 border-b border-zinc-800 px-5 py-2.5 flex items-center gap-4 flex-shrink-0">
        <button onClick={onBack} className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-100 text-sm transition-colors">
          <Icon d={Icons.arrowLeft} size={14} /> Back to Quotes
        </button>
        <div className="w-px h-5 bg-zinc-700" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-zinc-100">New Quote</p>
          <p className="text-[11px] text-zinc-600">Fill in the details below to get started</p>
        </div>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border tracking-wide bg-zinc-700/60 text-zinc-300 border-zinc-600">Draft</span>
        <div className="flex items-center gap-2">
          <button className="text-[13px] font-medium text-zinc-400 hover:text-zinc-200 px-3 py-1.5 rounded-lg border border-zinc-700 transition-colors">
            Cancel
          </button>
          <button className="flex items-center gap-1.5 bg-blue-600 text-white text-[13px] font-semibold px-4 py-1.5 rounded-lg opacity-50 cursor-not-allowed">
            <Icon d={Icons.check} size={13} /> Create Quote
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto bg-zinc-950">
        <div className="max-w-5xl mx-auto px-6 py-6 grid grid-cols-3 gap-5">
          {/* Left col (2/3) */}
          <div className="col-span-2 space-y-5">

            {/* Customer lookup */}
            <WF_Section title="Customer">
              <div className="space-y-3">
                {/* Search */}
                <div>
                  <label className="text-[11px] font-medium text-zinc-500 block mb-1">Search existing customers</label>
                  <div className="relative">
                    <Icon d={Icons.search} size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
                    <div className="w-full bg-zinc-800/60 border border-zinc-700/80 rounded-lg pl-9 pr-3 py-2 text-[13px] text-zinc-600 select-none">
                      Search by name, email, or phone…
                    </div>
                  </div>
                </div>
                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-zinc-800" />
                  <span className="text-[11px] text-zinc-600">or create new</span>
                  <div className="flex-1 h-px bg-zinc-800" />
                </div>
                {/* New customer fields */}
                <div className="grid grid-cols-2 gap-3">
                  <WF_Input label="First Name" placeholder="First name" />
                  <WF_Input label="Last Name" placeholder="Last name" />
                  <WF_Input label="Email" placeholder="customer@email.com" />
                  <WF_Input label="Phone" placeholder="(303) 555-0000" />
                  <WF_Input label="Company" placeholder="Company name (optional)" />
                  <div /> {/* spacer */}
                  <WF_Input label="Service Address" placeholder="123 Main St, Denver, CO 80203" wide />
                  <div className="col-span-2 flex items-center gap-2">
                    <div className="w-4 h-4 rounded border border-zinc-600 bg-zinc-800/60 flex-shrink-0" />
                    <span className="text-[12px] text-zinc-500">Billing address same as service address</span>
                  </div>
                </div>
              </div>
            </WF_Section>

            {/* Quote metadata */}
            <WF_Section title="Quote Setup">
              <div className="grid grid-cols-2 gap-3">
                <WF_Input label="Quote Title" placeholder="e.g. Full Roof Replacement" wide />
                <WF_Select label="Price List" value="Denver Metro – Q1 2026" note="Controls available line items in the editor" />
                <WF_Select label="Primary Trade" value="Roofing" />
                <WF_Input label="Quote #" value="QC-2026-009" note="Auto-assigned · configurable in Settings" />
                <WF_Input label="Quote Date" value="2026-03-29" />
                <WF_Input label="Expiration Date" value="2026-04-28" note="Default: 30 days from today" />
                <WF_Select label="Assigned Rep" value="Jake" />
                <WF_Select label="Tax Rate" value="Denver – 8.3%" note="Applied to materials only" />
              </div>
            </WF_Section>

            {/* Defaults */}
            <WF_Section title="Payment & Terms">
              <div className="grid grid-cols-2 gap-3">
                <WF_Select label="Payment Terms" value="50% deposit · balance on completion" />
                <div />
                <div className="col-span-2">
                  <label className="text-[11px] font-medium text-zinc-500 block mb-1">Terms & Conditions</label>
                  <div className="w-full bg-zinc-800/60 border border-zinc-700/80 rounded-lg px-3 py-2 text-[12px] text-zinc-500 h-16 select-none">
                    Payment terms: 50% deposit required to schedule work. Balance due upon completion. All work is warranted for…
                  </div>
                  <p className="text-[10px] text-zinc-600 mt-1">Loaded from company default · editable per-quote in the editor</p>
                </div>
              </div>
            </WF_Section>
          </div>

          {/* Right col (1/3) */}
          <div className="space-y-5">

            {/* Tab config */}
            <WF_Section title="Quote Tabs">
              <p className="text-[11px] text-zinc-500 mb-3">Up to 7 pricing versions per quote. Renameable at any time.</p>
              <div className="space-y-2">
                {tabs.map((t, i) => (
                  <div key={t} className="flex items-center gap-2 bg-zinc-800/60 border border-zinc-700/60 rounded-lg px-3 py-2">
                    <div className="w-4 h-4 rounded bg-zinc-700 flex items-center justify-center flex-shrink-0">
                      <span className="text-[9px] text-zinc-400 font-bold">{i+1}</span>
                    </div>
                    <span className="flex-1 text-[13px] text-zinc-300">{t}</span>
                    <Icon d={Icons.x} size={12} className="text-zinc-600" />
                  </div>
                ))}
                <button className="flex items-center gap-2 w-full px-3 py-2 border border-dashed border-zinc-700 rounded-lg text-[12px] text-zinc-600 hover:border-zinc-500 hover:text-zinc-400 transition-colors">
                  <Icon d={Icons.plus} size={12} /> Add tab
                </button>
              </div>
            </WF_Section>

            {/* Cover page */}
            <WF_Section title="Cover Page">
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-medium text-zinc-500 block mb-1.5">Cover Photo</label>
                  <div className="border-2 border-dashed border-zinc-700 rounded-xl h-24 flex flex-col items-center justify-center gap-1.5 text-zinc-600 bg-zinc-800/30">
                    <Icon d={Icons.plus} size={18} />
                    <span className="text-[11px]">Upload image</span>
                    <span className="text-[10px] text-zinc-700">JPG, PNG up to 10MB</span>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-medium text-zinc-500 block mb-1.5">Manufacturer / Partner Logo</label>
                  <div className="border-2 border-dashed border-zinc-700 rounded-xl h-14 flex items-center justify-center gap-2 text-zinc-600 bg-zinc-800/30">
                    <Icon d={Icons.plus} size={14} />
                    <span className="text-[11px]">Upload logo (optional)</span>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-medium text-zinc-500 block mb-1">Cover Tagline</label>
                  <div className="w-full bg-zinc-800/60 border border-zinc-700/80 rounded-lg px-3 py-2 text-[12px] text-zinc-600 select-none">
                    Roofing · Siding · Gutters · Windows
                  </div>
                </div>
              </div>
            </WF_Section>

            {/* EagleView */}
            <div className="bg-blue-950/40 border border-blue-800/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded bg-blue-600/30 flex items-center justify-center flex-shrink-0">
                  <Icon d={Icons.zap} size={11} className="text-blue-400" />
                </div>
                <span className="text-[13px] font-semibold text-blue-300">EagleView</span>
              </div>
              <p className="text-[11px] text-blue-400/70 mb-3">Import a report to auto-populate line item quantities after creating this quote.</p>
              <div className="w-full bg-blue-900/30 border border-blue-700/40 rounded-lg px-3 py-2 text-[11px] text-blue-400/60 select-none text-center">
                Available in the editor after creation
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Wireframe: Existing Quote (View / Edit) ───────────────────────────────────
const WF_LineItem = ({ name, qty, unit, cost, price, total, margin, highlight = false }) => (
  <tr className={`border-b border-zinc-800/40 ${highlight ? "bg-zinc-800/20" : ""}`}>
    <td className="px-4 py-2.5 text-[12px] text-zinc-200">{name}</td>
    <td className="px-3 py-2.5">
      <div className="w-14 bg-zinc-800/60 border border-zinc-700/60 rounded px-2 py-1 text-[12px] text-zinc-300 text-right select-none">{qty}</div>
    </td>
    <td className="px-2 py-2.5 text-[12px] text-zinc-500">{unit}</td>
    <td className="px-3 py-2.5 text-[12px] font-mono text-zinc-500">${cost}</td>
    <td className="px-3 py-2.5">
      <div className="w-18 bg-zinc-800/60 border border-zinc-700/60 rounded px-2 py-1 text-[12px] text-zinc-300 text-right select-none">${price}</div>
    </td>
    <td className="px-3 py-2.5">
      <span className="text-[12px] font-mono text-zinc-100">${total}</span>
      <span className={`ml-2 text-[10px] font-mono ${margin >= 50 ? "text-emerald-400" : margin >= 35 ? "text-zinc-500" : "text-amber-400"}`}>{margin}%</span>
    </td>
    <td className="px-2 py-2.5">
      <div className="flex gap-1 opacity-30">
        <div className="p-1 rounded text-zinc-500"><Icon d={Icons.copy} size={11} /></div>
        <div className="p-1 rounded text-zinc-500"><Icon d={Icons.x} size={11} /></div>
      </div>
    </td>
  </tr>
);

const TAB_DATA = [
  {
    label: "Option A", total: "$19,927",
    sections: [
      { label: "Scope of Work", subtotal: "$9,212", items: [
        { name: "GAF Timberline HDZ Shingles", qty: "24", unit: "SQ", cost: "120", price: "230", total: "5,520", margin: 48 },
        { name: "Ice & Water Shield", qty: "4", unit: "SQ", cost: "45", price: "95", total: "380", margin: 53 },
        { name: "Synthetic Underlayment", qty: "24", unit: "SQ", cost: "22", price: "48", total: "1,152", margin: 54 },
        { name: "Ridge Cap Shingles", qty: "120", unit: "LF", cost: "3.20", price: "7.50", total: "900", margin: 57 },
        { name: "Drip Edge — Eave", qty: "180", unit: "LF", cost: "1.80", price: "4.20", total: "756", margin: 57 },
        { name: "Pipe Boot Flashings", qty: "4", unit: "EA", cost: "28", price: "85", total: "340", margin: 67 },
      ]},
      { label: "Additional Work", subtotal: "$2,300", items: [
        { name: "Flashing Replacement", qty: "1", unit: "EA", cost: "180", price: "450", total: "450", margin: 60 },
        { name: "Decking Replacement (OSB)", qty: "4", unit: "SQ", cost: "95", price: "220", total: "880", margin: 57 },
        { name: "Skylight Flashing Kit", qty: "2", unit: "EA", cost: "145", price: "345", total: "690", margin: 58 },
        { name: "Dumpster / Haul-away", qty: "1", unit: "EA", cost: "95", price: "280", total: "280", margin: 66 },
      ]},
    ],
    subtotal: "$18,400", tax: "$1,527", finalTotal: "$19,927", margin: "38%",
  },
  {
    label: "Option B", total: "$14,685",
    sections: [
      { label: "Scope of Work", subtotal: "$7,674", items: [
        { name: "CertainTeed Landmark Pro Shingles", qty: "24", unit: "SQ", cost: "135", price: "250", total: "6,000", margin: 46 },
        { name: "Ice & Water Shield", qty: "6", unit: "SQ", cost: "45", price: "95", total: "570", margin: 53 },
        { name: "Synthetic Underlayment", qty: "24", unit: "SQ", cost: "22", price: "46", total: "1,104", margin: 52 },
      ]},
    ],
    subtotal: "$13,560", tax: "$1,125", finalTotal: "$14,685", margin: "33%",
  },
  {
    label: "Option C", total: "—",
    sections: [],
    subtotal: "—", tax: "—", finalTotal: "—", margin: "—", empty: true,
  },
];

function ExistingQuoteWireframe({ onBack }) {
  const [activeTab, setActiveTab] = useState(0);
  const tab = TAB_DATA[activeTab];

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="bg-zinc-900 border-b border-zinc-800 px-5 py-2.5 flex items-center gap-3 flex-shrink-0">
        <button onClick={onBack} className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-100 text-sm transition-colors flex-shrink-0">
          <Icon d={Icons.arrowLeft} size={14} /> Back
        </button>
        <div className="w-px h-5 bg-zinc-700" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-zinc-100 truncate">Storm Damage Restoration</span>
            <span className="text-[10px] text-zinc-600 bg-zinc-800 px-1.5 py-0.5 rounded font-mono flex-shrink-0">v2</span>
          </div>
          <p className="text-[11px] text-zinc-600 truncate">QC-2026-003 · Tom & Diane Kowalski · 217 Oak Ave, Lakewood, CO</p>
        </div>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border tracking-wide bg-violet-900/50 text-violet-300 border-violet-700 flex-shrink-0">Viewed</span>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-400 hover:text-zinc-200 px-2.5 py-1.5 rounded-lg border border-zinc-700 transition-colors">
            <Icon d={Icons.file} size={12} /> Export Sub Scope
          </button>
          <button className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-400 hover:text-zinc-200 px-2.5 py-1.5 rounded-lg border border-zinc-700 transition-colors">
            <Icon d={Icons.eye} size={12} /> Preview PDF
          </button>
          <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[13px] font-semibold px-3 py-1.5 rounded-lg transition-colors">
            <Icon d={Icons.send} size={13} /> Send Quote
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Viewed banner */}
          <div className="bg-violet-950/50 border-b border-violet-800/40 px-5 py-2 flex items-center gap-2.5 flex-shrink-0">
            <Icon d={Icons.eye} size={13} className="text-violet-400" />
            <p className="text-[12px] text-violet-300">Customer last viewed this quote <span className="font-semibold">2 days ago</span> — no response yet.</p>
            <button className="ml-auto text-[11px] text-violet-400 hover:text-violet-200 underline underline-offset-2 transition-colors">Mark as Lost</button>
          </div>

          {/* Tab bar */}
          <div className="bg-zinc-900/60 border-b border-zinc-800 px-5 flex items-center flex-shrink-0">
            {TAB_DATA.map((t, i) => (
              <button key={t.label} onClick={() => setActiveTab(i)}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${activeTab === i ? "border-blue-500 text-blue-400" : "border-transparent text-zinc-500 hover:text-zinc-300"}`}>
                {t.label}
                <span className="ml-2 text-[11px] font-mono opacity-60">{t.total}</span>
              </button>
            ))}
            <div className="ml-2 p-1.5 text-zinc-700 cursor-pointer hover:text-zinc-500 transition-colors">
              <Icon d={Icons.plus} size={13} />
            </div>
          </div>

          {/* Editor content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">

            {/* Customer card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">Customer</h3>
                <button className="text-[11px] text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition-colors">
                  <Icon d={Icons.edit} size={11} /> Edit
                </button>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
                {[
                  ["Name", "Tom & Diane Kowalski"],
                  ["Service Address", "217 Oak Ave, Lakewood, CO 80226"],
                  ["Email", "tkowalski@email.com"],
                  ["Phone", "(303) 555-0147"],
                ].map(([label, val]) => (
                  <div key={label} className="flex items-baseline gap-2">
                    <span className="text-[11px] text-zinc-600 w-28 flex-shrink-0">{label}</span>
                    <span className="text-[13px] text-zinc-200">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Empty tab state */}
            {tab.empty && (
              <div className="border-2 border-dashed border-zinc-800 rounded-xl py-16 flex flex-col items-center justify-center gap-3 text-zinc-700">
                <Icon d={Icons.file} size={28} />
                <p className="text-sm font-medium">This tab is empty</p>
                <p className="text-[12px] text-zinc-600">Add a section to start building this option</p>
                <button className="mt-1 flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[13px] font-medium px-4 py-2 rounded-lg transition-colors">
                  <Icon d={Icons.plus} size={13} /> Add Section
                </button>
              </div>
            )}

            {/* Sections */}
            {!tab.empty && tab.sections.map((section, si) => (
              <div key={section.label} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                <div className="px-4 py-2.5 border-b border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-zinc-600 cursor-grab"><Icon d="M9 3h1 M9 9h1 M9 15h1 M14 3h1 M14 9h1 M14 15h1" size={13} /></div>
                    <span className="text-[13px] font-semibold text-zinc-100">{section.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono text-zinc-200">{section.subtotal}</span>
                    <button className="text-[11px] text-zinc-600 hover:text-zinc-400 border border-zinc-700 rounded px-2 py-0.5 transition-colors">Hide subtotal</button>
                    <button className="text-zinc-600 hover:text-zinc-400 transition-colors"><Icon d={Icons.x} size={13} /></button>
                  </div>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-800/60">
                      {["Item","Qty","Unit","Our Cost","Unit Price","Line Total",""].map(h => (
                        <th key={h} className="text-left text-[10px] text-zinc-600 font-medium px-4 py-2 uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.items.map((item, ii) => (
                      <tr key={ii} className="border-b border-zinc-800/40 hover:bg-zinc-800/30 transition-colors group">
                        <td className="px-4 py-2.5 text-[12px] text-zinc-200">{item.name}</td>
                        <td className="px-3 py-2.5">
                          <div className="w-14 bg-zinc-800/60 border border-zinc-700/60 rounded px-2 py-1 text-[12px] text-zinc-300 text-right">{item.qty}</div>
                        </td>
                        <td className="px-2 py-2.5 text-[12px] text-zinc-500">{item.unit}</td>
                        <td className="px-3 py-2.5 text-[12px] font-mono text-zinc-500">${item.cost}</td>
                        <td className="px-3 py-2.5">
                          <div className="w-20 bg-zinc-800/60 border border-zinc-700/60 rounded px-2 py-1 text-[12px] text-zinc-300 text-right">${item.price}</div>
                        </td>
                        <td className="px-3 py-2.5">
                          <span className="text-[12px] font-mono text-zinc-100">${item.total}</span>
                          <span className={`ml-2 text-[10px] font-mono ${item.margin >= 50 ? "text-emerald-400" : item.margin >= 35 ? "text-zinc-500" : "text-amber-400"}`}>{item.margin}%</span>
                        </td>
                        <td className="px-2 py-2.5">
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="p-1 rounded hover:bg-zinc-700 text-zinc-500 cursor-pointer transition-colors"><Icon d={Icons.copy} size={11} /></div>
                            <div className="p-1 rounded hover:bg-zinc-700 text-zinc-500 hover:text-red-400 cursor-pointer transition-colors"><Icon d={Icons.x} size={11} /></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={7} className="px-4 py-2.5">
                        <button className="flex items-center gap-1.5 text-[12px] text-zinc-600 hover:text-blue-400 transition-colors">
                          <Icon d={Icons.plus} size={12} /> Add line item from price list
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}

            {/* Add section */}
            {!tab.empty && (
              <button className="flex items-center gap-2 w-full border border-dashed border-zinc-700 rounded-xl py-3 justify-center text-[13px] text-zinc-600 hover:border-zinc-500 hover:text-zinc-400 transition-colors">
                <Icon d={Icons.plus} size={14} /> Add section
              </button>
            )}

            {/* Customer-facing notes */}
            {!tab.empty && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <label className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest block mb-2">Customer-Facing Notes</label>
                <div className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-lg px-3 py-2.5 text-[12px] text-zinc-400 min-h-[56px] select-none">
                  All materials are manufacturer-spec. Work area will be protected and cleaned daily. Estimated duration: 2–3 days weather permitting.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="w-64 border-l border-zinc-800 bg-zinc-900/40 overflow-y-auto flex-shrink-0">
          <div className="p-4 space-y-4">

            {/* Quote details */}
            <div>
              <h3 className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mb-2.5">Quote Details</h3>
              <div className="space-y-2">
                {[
                  ["Status", <StatusBadge key="s" status="Viewed" />],
                  ["Rep", <span key="r" className="text-[12px] text-zinc-300">Jake</span>],
                  ["Sent", <span key="sd" className="text-[12px] font-mono text-zinc-300">2026-03-20</span>],
                  ["Expires", <span key="exp" className="text-[12px] font-mono text-amber-400">2026-04-19</span>],
                  ["Price List", <span key="pl" className="text-[11px] text-zinc-400">Denver Metro – Q1 2026</span>],
                ].map(([label, val]) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-[11px] text-zinc-600">{label}</span>
                    {val}
                  </div>
                ))}
              </div>
            </div>

            {/* EagleView */}
            <div className="bg-blue-950/30 border border-blue-800/40 rounded-lg p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Icon d={Icons.zap} size={12} className="text-blue-400" />
                <span className="text-[11px] font-semibold text-blue-300">EagleView</span>
                <span className="ml-auto text-[10px] bg-blue-900/50 text-blue-400 px-1.5 py-0.5 rounded border border-blue-700/50">Report #48291</span>
              </div>
              <p className="text-[10px] text-blue-400/60 mb-2">Imported · 24.3 SQ · 7/12 pitch</p>
              <button className="text-[11px] text-blue-400 hover:text-blue-200 transition-colors">Re-import →</button>
            </div>

            <div className="h-px bg-zinc-800" />

            {/* Summary */}
            <div>
              <h3 className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mb-2.5">Summary — {TAB_DATA[activeTab].label}</h3>
              <div className="space-y-1.5 text-[12px]">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Subtotal</span>
                  <span className="font-mono text-zinc-200">{TAB_DATA[activeTab].subtotal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500">Discount</span>
                  <div className="flex items-center gap-1">
                    <div className="w-10 bg-zinc-800/60 border border-zinc-700/60 rounded px-1.5 py-0.5 text-[11px] text-zinc-400 text-right select-none">0</div>
                    <span className="text-zinc-600 text-[10px]">%</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Tax (8.3%)</span>
                  <span className="font-mono text-zinc-400">{TAB_DATA[activeTab].tax}</span>
                </div>
                <div className="h-px bg-zinc-700 my-1" />
                <div className="flex justify-between font-semibold">
                  <span className="text-zinc-300">Total</span>
                  <span className="font-mono text-emerald-400">{TAB_DATA[activeTab].finalTotal}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-zinc-600 text-[11px]">Overall margin</span>
                  <span className="text-emerald-400 text-[11px] font-mono font-semibold">{TAB_DATA[activeTab].margin}</span>
                </div>
              </div>
            </div>

            <div className="h-px bg-zinc-800" />

            {/* Internal notes */}
            <div>
              <label className="text-[10px] text-zinc-600 uppercase tracking-widest block mb-1.5">Internal Notes</label>
              <div className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded px-2.5 py-2 text-[12px] text-zinc-500 h-16 select-none">
                Homeowner mentioned they have GAF preferred contractor discount. Verify before sending.
              </div>
            </div>

            {/* Terms */}
            <div>
              <label className="text-[10px] text-zinc-600 uppercase tracking-widest block mb-1.5">Terms</label>
              <div className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded px-2.5 py-2 text-[12px] text-zinc-500 h-14 select-none">
                50% deposit required to schedule. Balance due upon completion…
              </div>
            </div>

            <div className="h-px bg-zinc-800" />

            {/* Activity */}
            <div>
              <h3 className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mb-2.5">Activity</h3>
              <div className="space-y-2.5">
                {[
                  { label: "Viewed by customer", time: "2 days ago", color: "bg-violet-500" },
                  { label: "Quote sent", time: "2026-03-20", color: "bg-blue-500" },
                  { label: "v2 saved (draft edit)", time: "2026-03-19", color: "bg-zinc-600" },
                  { label: "Quote created", time: "2026-03-18", color: "bg-zinc-700" },
                ].map((a, i) => (
                  <div key={i} className="flex gap-2.5 items-start">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${a.color}`} />
                    <div>
                      <p className="text-[11px] text-zinc-400">{a.label}</p>
                      <p className="text-[10px] text-zinc-600">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Danger zone */}
            <div className="h-px bg-zinc-800" />
            <div className="space-y-1.5">
              <button className="w-full text-[12px] font-medium text-zinc-500 hover:text-zinc-200 border border-zinc-700 rounded-lg py-1.5 transition-colors">
                Create Revision
              </button>
              <button className="w-full text-[12px] font-medium text-red-500/70 hover:text-red-400 border border-red-900/40 rounded-lg py-1.5 transition-colors">
                Mark as Lost
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Placeholder ──────────────────────────────────────────────────────────────
function Placeholder({ label }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-zinc-700 gap-2">
      <Icon d={Icons.package} size={32} />
      <p className="text-sm">{label} — coming soon</p>
    </div>
  );
}

// ── Collapse icon ─────────────────────────────────────────────────────────────
const CollapseIcon = ({ collapsed }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: collapsed ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>
    <path d="M11 19l-7-7 7-7 M18 19l-7-7 7-7" />
  </svg>
);

// ── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [nav, setNav] = useState("dashboard");
  const [editingQuote, setEditingQuote] = useState(null);
  const [screen, setScreen] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  const handleOpenQuote = (q) => { setEditingQuote(q); setScreen("existing"); setNav("quotes"); };
  const handleNewQuote = () => { setEditingQuote(null); setScreen("new"); setNav("quotes"); };
  const handleBack = () => { setScreen(null); setEditingQuote(null); };

  const showEditor = nav === "quotes" && screen === "editor" && editingQuote;
  const showNewWireframe = nav === "quotes" && screen === "new";
  const showExistingWireframe = nav === "quotes" && screen === "existing";

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* Sidebar */}
      <aside
        style={{ width: collapsed ? "56px" : "208px", transition: "width 0.22s cubic-bezier(0.4,0,0.2,1)" }}
        className="bg-zinc-900 border-r border-zinc-800 flex flex-col flex-shrink-0 overflow-hidden"
      >
        {/* Logo row */}
        <div className="flex items-center border-b border-zinc-800 flex-shrink-0" style={{ height: "52px", padding: collapsed ? "0 12px" : "0 16px", justifyContent: collapsed ? "center" : "space-between" }}>
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center flex-shrink-0">
              <Icon d={Icons.package} size={13} className="text-white" />
            </div>
            {!collapsed && (
              <span className="font-bold text-[15px] tracking-tight whitespace-nowrap overflow-hidden" style={{ opacity: collapsed ? 0 : 1, transition: "opacity 0.15s ease" }}>
                QuoteCraft
              </span>
            )}
          </div>
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="p-1 rounded text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 transition-colors flex-shrink-0 ml-1"
              title="Collapse sidebar"
            >
              <CollapseIcon collapsed={false} />
            </button>
          )}
        </div>

        {/* Expand button when collapsed */}
        {collapsed && (
          <div className="flex justify-center py-2 border-b border-zinc-800 flex-shrink-0">
            <button
              onClick={() => setCollapsed(false)}
              className="p-1.5 rounded text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
              title="Expand sidebar"
            >
              <CollapseIcon collapsed={true} />
            </button>
          </div>
        )}

        {/* Nav items */}
        <nav className="flex-1 py-3 space-y-0.5" style={{ padding: collapsed ? "12px 8px" : "12px 10px" }}>
          {NAV.map(item => (
            <button
              key={item.id}
              onClick={() => { setNav(item.id); if (item.id !== "quotes") { setEditingQuote(null); setScreen(null); } }}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center rounded-lg text-sm font-medium transition-colors ${
                nav === item.id ? "bg-blue-600/20 text-blue-400" : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800"
              }`}
              style={{ gap: collapsed ? 0 : "12px", padding: collapsed ? "8px 0" : "8px 12px", justifyContent: collapsed ? "center" : "flex-start" }}
            >
              <Icon d={Icons[item.icon]} size={15} className="flex-shrink-0" />
              {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* User */}
        <div
          className="border-t border-zinc-800 flex items-center flex-shrink-0"
          style={{ gap: collapsed ? 0 : "10px", padding: collapsed ? "12px 0" : "12px", justifyContent: collapsed ? "center" : "flex-start" }}
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0">J</div>
          {!collapsed && (
            <div className="flex-1 min-w-0 overflow-hidden">
              <p className="text-[12px] font-semibold text-zinc-200 whitespace-nowrap">Jake</p>
              <p className="text-[10px] text-zinc-600 whitespace-nowrap">Admin</p>
            </div>
          )}
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-zinc-900 border-b border-zinc-800 px-5 py-2.5 flex items-center justify-between flex-shrink-0">
          <h1 className="text-sm font-semibold text-zinc-100">
            {nav === "dashboard" && "Dashboard"}
            {nav === "quotes" && !screen && "Quotes"}
            {nav === "quotes" && screen === "new" && "New Quote"}
            {nav === "quotes" && screen === "existing" && (editingQuote?.title || "Quote")}
            {nav === "quotes" && screen === "editor" && (editingQuote?.title || "Quote Editor")}
            {nav === "clients" && "Clients"}
            {nav === "pricelists" && "Price Lists"}
            {nav === "settings" && "Settings"}
          </h1>
          <div className="flex items-center gap-2.5">
            <div className="relative p-1.5 text-zinc-500 hover:text-zinc-200 transition-colors cursor-pointer">
              <Icon d={Icons.bell} size={17} />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-500 rounded-full" />
            </div>
            <button onClick={handleNewQuote} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[13px] font-semibold px-3 py-1.5 rounded-lg transition-colors">
              <Icon d={Icons.plus} size={13} /> New Quote
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-hidden relative">
          {nav === "dashboard" && <div className="h-full overflow-y-auto"><Dashboard onOpenQuote={handleOpenQuote} /></div>}
          {nav === "quotes" && !screen && <div className="h-full overflow-y-auto"><QuoteList onOpen={handleOpenQuote} onCreate={handleNewQuote} /></div>}
          {nav === "quotes" && showNewWireframe && <div className="h-full flex flex-col"><NewQuoteWireframe onBack={handleBack} /></div>}
          {nav === "quotes" && showExistingWireframe && <div className="h-full flex flex-col"><ExistingQuoteWireframe onBack={handleBack} /></div>}
          {nav === "quotes" && showEditor && <div className="h-full flex flex-col relative"><QuoteEditor quote={editingQuote} onBack={handleBack} /></div>}
          {nav === "clients" && <div className="flex-1 h-full flex"><Placeholder label="Clients" /></div>}
          {nav === "pricelists" && <div className="flex-1 h-full flex"><Placeholder label="Price Lists" /></div>}
          {nav === "settings" && <div className="flex-1 h-full flex"><Placeholder label="Settings" /></div>}
        </main>
      </div>
    </div>
  );
}
