import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Search, Download, Trash2, AlertCircle, ShieldAlert, Check } from "lucide-react";

export default function OrganizerDashboard({ isOpen, onClose }) {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Load registrations when authenticated and open
  useEffect(() => {
    if (isAuthenticated && isOpen) {
      loadRegistrations();
    }
  }, [isAuthenticated, isOpen]);

  const loadRegistrations = () => {
    try {
      const data = JSON.parse(localStorage.getItem("inception_registrations") || "[]");
      // Sort newest first
      data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setRegistrations(data);
    } catch (err) {
      console.error("Error reading registrations:", err);
    }
  };

  const handleAuth = (e) => {
    if (e) e.preventDefault();
    // Passcode validation
    if (passcode === "inception-admin") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Incorrect passcode. Access Denied.");
      setPasscode("");
    }
  };

  const handleClose = () => {
    setPasscode("");
    setAuthError("");
    setIsAuthenticated(false);
    setSearchQuery("");
    setShowClearConfirm(false);
    onClose();
  };

  const handleExportCSV = () => {
    if (registrations.length === 0) return;

    // CSV Headers
    const headers = [
      "Registration ID",
      "Timestamp",
      "Team Name",
      "College Name",
      "Contact Email",
      "Contact Phone",
      "Leader Name",
      "Member 2 Name",
      "Member 3 Name",
      "Member 4 Name"
    ];

    // CSV Rows
    const rows = registrations.map(reg => [
      reg.id || "",
      reg.timestamp || "",
      `"${(reg.teamName || "").replace(/"/g, '""')}"`,
      `"${(reg.collegeName || "").replace(/"/g, '""')}"`,
      reg.email || "",
      reg.phone || "",
      `"${(reg.leaderName || "").replace(/"/g, '""')}"`,
      `"${(reg.member2Name || "").replace(/"/g, '""')}"`,
      `"${(reg.member3Name || "").replace(/"/g, '""')}"`,
      `"${(reg.member4Name || "").replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map(row => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `inception_registrations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearAll = () => {
    localStorage.removeItem("inception_registrations");
    setRegistrations([]);
    setShowClearConfirm(false);
  };

  // Filter registrations by query
  const filteredRegistrations = registrations.filter(reg => {
    const query = searchQuery.toLowerCase();
    return (
      (reg.teamName || "").toLowerCase().includes(query) ||
      (reg.collegeName || "").toLowerCase().includes(query) ||
      (reg.email || "").toLowerCase().includes(query) ||
      (reg.leaderName || "").toLowerCase().includes(query)
    );
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-4xl bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col h-[85vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100 bg-stone-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-stone-900 flex items-center justify-center text-white font-bold text-xs">
                  A
                </div>
                <div>
                  <h3
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                    className="text-lg font-black tracking-wider uppercase text-stone-850"
                  >
                    Organizer Portal
                  </h3>
                  <p className="text-stone-500 text-[10px] tracking-widest uppercase mt-0.5">
                    {isAuthenticated ? "Team Registration Database" : "Secure Gatehouse"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-stone-500 hover:text-stone-850 bg-stone-100 hover:bg-stone-200/50 p-2 rounded-full border border-stone-200 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-450 focus-visible:ring-offset-2"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-hidden flex flex-col">
              {!isAuthenticated ? (
                /* Auth Screen */
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-sm mx-auto">
                  <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center text-stone-550 border border-stone-200 mb-5 animate-pulse">
                    <ShieldAlert size={28} />
                  </div>
                  <h4
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                    className="text-base font-bold uppercase tracking-wider text-stone-800 mb-2"
                  >
                    Passcode Required
                  </h4>
                  <p className="text-stone-500 text-xs leading-relaxed font-light mb-6">
                    Access is restricted to authorized hackathon coordinators. Please enter the master database passcode.
                  </p>
                  <form onSubmit={handleAuth} className="w-full space-y-3">
                    <input
                      type="password"
                      placeholder="Passcode"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      required
                      autoFocus
                      className="input-branded text-center"
                    />
                    {authError && (
                      <p className="text-red-500 text-[11px] flex items-center justify-center gap-1 mt-1 font-light">
                        <AlertCircle size={12} /> {authError}
                      </p>
                    )}
                    <button
                      type="submit"
                      className="w-full py-3 bg-stone-900 hover:bg-stone-850 text-white font-bold text-xs tracking-wider uppercase rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-2"
                    >
                      Authenticate Access
                    </button>
                  </form>
                </div>
              ) : (
                /* Authenticated Dashboard View */
                <div className="flex-1 flex flex-col overflow-hidden">
                  {/* Actions / Filter Bar */}
                  <div className="px-6 py-4 bg-stone-50/50 border-b border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:max-w-xs">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={14} />
                      <input
                        type="text"
                        placeholder="Search team, college, or leader..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-stone-200/80 rounded-xl text-xs bg-white focus:outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-400 transition-all font-light"
                      />
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                      <button
                        onClick={handleExportCSV}
                        disabled={registrations.length === 0}
                        className="px-4 py-2 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-2"
                      >
                        <Download size={13} /> Export Excel / CSV
                      </button>
                      <button
                        onClick={() => setShowClearConfirm(true)}
                        disabled={registrations.length === 0}
                        className="px-4 py-2 border border-red-200 hover:bg-red-50/50 text-red-600 disabled:opacity-50 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      >
                        <Trash2 size={13} /> Reset
                      </button>
                    </div>
                  </div>

                  {/* Registrations List / Table Container */}
                  <div className="flex-1 overflow-auto">
                    {filteredRegistrations.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center p-6 text-stone-400 text-sm gap-2">
                        <span className="text-2xl">📭</span>
                        <p className="font-light">No registrations found matching the criteria.</p>
                      </div>
                    ) : (
                      <table className="w-full border-collapse text-left text-xs text-stone-600 font-light">
                        <thead className="bg-stone-50 border-b border-stone-100 font-semibold text-stone-750 uppercase tracking-wider sticky top-0 z-10">
                          <tr>
                            <th className="px-6 py-3.5">Team Context</th>
                            <th className="px-6 py-3.5">Contact Details</th>
                            <th className="px-6 py-3.5">Team Roster (4 Members)</th>
                            <th className="px-6 py-3.5">Registered</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 bg-white">
                          {filteredRegistrations.map((reg) => (
                            <tr key={reg.id} className="hover:bg-stone-50/30 transition-all">
                              <td className="px-6 py-4">
                                <p className="font-bold text-stone-850 text-sm mb-0.5">{reg.teamName}</p>
                                <p className="text-stone-500 font-medium text-[11px]">{reg.collegeName}</p>
                              </td>
                              <td className="px-6 py-4 space-y-0.5">
                                <p className="font-medium text-stone-800">{reg.email}</p>
                                <p className="text-stone-500 tabular-nums">{reg.phone}</p>
                              </td>
                              <td className="px-6 py-4">
                                <ul className="space-y-1 text-stone-600">
                                  <li>👑 <span className="font-semibold text-stone-800">{reg.leaderName}</span> (Leader)</li>
                                  <li>👤 {reg.member2Name}</li>
                                  <li>👤 {reg.member3Name}</li>
                                  <li>👤 {reg.member4Name}</li>
                                </ul>
                              </td>
                              <td className="px-6 py-4 text-stone-400 tabular-nums">
                                {new Date(reg.timestamp).toLocaleDateString()}<br />
                                {new Date(reg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Clear All Confirmation Portal */}
            <AnimatePresence>
              {showClearConfirm && (
                <div className="absolute inset-0 z-20 flex items-center justify-center p-6 bg-white/95 backdrop-blur-sm">
                  <div className="max-w-sm text-center">
                    <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4 border border-red-200">
                      <Trash2 size={22} />
                    </div>
                    <h4
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                      className="text-base font-bold uppercase tracking-wider text-stone-850 mb-2"
                    >
                      Reset Databases?
                    </h4>
                    <p className="text-stone-500 text-xs leading-relaxed font-light mb-6">
                      Are you sure you want to permanently clear all stored team registrations? This action cannot be undone.
                    </p>
                    <div className="flex items-center gap-3 justify-center">
                      <button
                        onClick={handleClearAll}
                        className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wider uppercase rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      >
                        Yes, Delete All
                      </button>
                      <button
                        onClick={() => setShowClearConfirm(false)}
                        className="px-6 py-2.5 border border-stone-200 hover:bg-stone-50 text-stone-700 font-bold text-xs tracking-wider uppercase rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
