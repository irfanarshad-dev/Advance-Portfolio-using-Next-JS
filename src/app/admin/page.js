"use client";
import { useState, useEffect, useCallback } from "react";

function Avatar({ name, size = "md" }) {
  const s = size === "lg" ? "w-14 h-14 text-xl" : "w-9 h-9 text-sm";
  return (
    <div className={`${s} rounded-full bg-[var(--primary)]/20 flex items-center justify-center font-extrabold text-[var(--primary)] uppercase flex-shrink-0`}>
      {name?.[0] ?? "?"}
    </div>
  );
}

function StatCard({ value, label, color = "text-[var(--primary)]" }) {
  return (
    <div className="flex-1 text-center py-3 px-4">
      <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
      <p className="text-[10px] uppercase tracking-widest text-[var(--nav-text)] mt-0.5">{label}</p>
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [mobileView, setMobileView] = useState("list");
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(false);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/contacts");
      if (res.ok) {
        const data = await res.json();
        setContacts(data.contacts ?? []);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/admin/contacts");
      if (res.ok) {
        const data = await res.json();
        setContacts(data.contacts ?? []);
        setAuthed(true);
      }
      setChecking(false);
    })();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
      fetchContacts();
    } else {
      setLoginError("Invalid password. Please try again.");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    setAuthed(false);
    setContacts([]);
    setSelected(null);
    setPassword("");
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this message?")) return;
    setDeleting(true);
    await fetch("/api/admin/contacts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setContacts((prev) => prev.filter((c) => c._id !== id));
    if (selected?._id === id) { setSelected(null); setMobileView("list"); }
    setDeleting(false);
  };

  const thisWeek = contacts.filter((c) => Date.now() - new Date(c.createdAt) < 7 * 86400000).length;
  const today = contacts.filter((c) => new Date(c.createdAt).toDateString() === new Date().toDateString()).length;

  const filtered = contacts.filter((c) =>
    !search || [c.name, c.email, c.subject, c.message].some((f) => f?.toLowerCase().includes(search.toLowerCase()))
  );

  // ── Loading screen ──
  if (checking) return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-[var(--nav-text)]">Checking session...</p>
      </div>
    </div>
  );

  // ── Login screen ──
  if (!authed) return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <form
          onSubmit={handleLogin}
          className="p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-2xl space-y-5"
        >
          {/* Icon + title */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center mx-auto">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-[var(--foreground)]">Admin Portal</h1>
              <p className="text-xs text-[var(--nav-text)] mt-1">Secure access to your dashboard</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-[var(--border-color)]" />

          {/* Password field */}
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              autoFocus
              className="w-full px-4 py-3 pr-11 rounded-xl text-sm bg-[var(--card-bg-secondary)] text-[var(--foreground)] placeholder-[var(--nav-text)] border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--nav-text)] hover:text-[var(--foreground)] active:scale-90 transition-all cursor-pointer touch-manipulation"
            >
              {showPass ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          {loginError && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 text-xs px-3 py-2.5 rounded-xl">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {loginError}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[var(--primary)] text-black font-bold text-sm hover:bg-[var(--primary-hover)] active:scale-95 transition-all cursor-pointer touch-manipulation flex items-center justify-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" />
            </svg>
            Sign In
          </button>
        </form>
        <p className="text-center text-xs text-[var(--nav-text)] mt-4">Protected area — authorized personnel only</p>
      </div>
    </div>
  );

  // ── Dashboard ──
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col" style={{ height: "100dvh" }}>

      {/* ── Top Bar ── */}
      <header className="sticky top-0 z-40 border-b border-[var(--border-color)] bg-[var(--card-bg)] flex-shrink-0">

        {/* Mobile detail view — two-row header */}
        {mobileView === "detail" ? (
          <div className="lg:hidden">
            {/* Row 1: back + title + theme space */}
            <div className="flex items-center gap-3 px-4 pt-3 pb-2">
              <button
                onClick={() => setMobileView("list")}
                className="w-8 h-8 rounded-xl bg-[var(--card-bg-secondary)] border border-[var(--border-color)] flex items-center justify-center hover:border-[var(--primary)] hover:text-[var(--primary)] active:scale-95 transition-all cursor-pointer touch-manipulation flex-shrink-0"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M11 6l-6 6 6 6" />
                </svg>
              </button>
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-[var(--primary)] flex items-center justify-center flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <h1 className="text-sm font-extrabold leading-none truncate">
                  Admin <span className="text-[var(--primary)]">Dashboard</span>
                </h1>
              </div>
              {/* spacer so theme toggle doesn't overlap */}
              <div className="w-9 flex-shrink-0" />
            </div>
            {/* Row 2: refresh + logout */}
            <div className="flex items-center gap-2 px-4 pb-3">
              <button
                onClick={fetchContacts}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-[var(--border-color)] hover:border-[var(--primary)] hover:text-[var(--primary)] active:scale-95 transition-all disabled:opacity-40 cursor-pointer"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={loading ? "animate-spin" : ""}>
                  <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
                  <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
                </svg>
                {loading ? "Syncing..." : "Refresh"}
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-red-500/10 text-red-500 hover:bg-red-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        ) : null}

        {/* List view mobile: two-row header | desktop: single row */}
        <div className={`${mobileView === "detail" ? "hidden lg:block" : "block"}`}>
          {/* Mobile two-row */}
          <div className="lg:hidden">
            <div className="flex items-center gap-3 px-4 pt-3 pb-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-[var(--primary)] flex items-center justify-center flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <h1 className="text-sm font-extrabold leading-none truncate">
                  Admin <span className="text-[var(--primary)]">Dashboard</span>
                </h1>
              </div>
              <div className="w-9 flex-shrink-0" />
            </div>
            <div className="flex items-center gap-2 px-4 pb-3">
              <button
                onClick={fetchContacts}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-[var(--border-color)] hover:border-[var(--primary)] hover:text-[var(--primary)] active:scale-95 transition-all disabled:opacity-40 cursor-pointer"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={loading ? "animate-spin" : ""}>
                  <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
                  <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
                </svg>
                {loading ? "Syncing..." : "Refresh"}
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-red-500/10 text-red-500 hover:bg-red-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                </svg>
                Logout
              </button>
            </div>
          </div>
          {/* Desktop single row */}
          <div className="hidden lg:flex px-6 py-3 items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div>
                <h1 className="text-base font-extrabold leading-none">
                  Admin <span className="text-[var(--primary)]">Dashboard</span>
                </h1>
                <p className="text-[10px] text-[var(--nav-text)] mt-0.5">
                  {contacts.length} total · {thisWeek} this week · {today} today
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 mr-12">
              <button
                onClick={fetchContacts}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-[var(--border-color)] hover:border-[var(--primary)] hover:text-[var(--primary)] active:scale-95 transition-all disabled:opacity-40 cursor-pointer"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={loading ? "animate-spin" : ""}>
                  <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
                  <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
                </svg>
                {loading ? "Syncing..." : "Refresh"}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 text-red-500 hover:bg-red-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar ── */}
        <aside className={`w-full lg:w-[340px] xl:w-[380px] flex-shrink-0 border-r border-[var(--border-color)] flex flex-col overflow-hidden ${mobileView === "detail" ? "hidden lg:flex" : "flex"}`}>

          {/* Stats */}
          <div className="flex border-b border-[var(--border-color)] bg-[var(--card-bg-secondary)] divide-x divide-[var(--border-color)]">
            <StatCard value={contacts.length} label="Total" />
            <StatCard value={thisWeek} label="This Week" color="text-green-500" />
            <StatCard value={today} label="Today" color="text-blue-500" />
          </div>

          {/* Search */}
          <div className="px-3 py-2.5 border-b border-[var(--border-color)]">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--nav-text)]" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search messages..."
                className="w-full pl-8 pr-3 py-2 rounded-lg text-xs bg-[var(--card-bg-secondary)] text-[var(--foreground)] placeholder-[var(--nav-text)] border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--nav-text)] hover:text-[var(--foreground)] active:scale-90 transition-all cursor-pointer touch-manipulation">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <div className="w-7 h-7 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
                <p className="text-xs text-[var(--nav-text)]">Loading messages...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3 px-6 text-center">
                <span className="text-5xl opacity-20">{search ? "🔍" : "📭"}</span>
                <p className="text-sm font-semibold text-[var(--nav-text)]">{search ? "No results found" : "No messages yet"}</p>
                <p className="text-xs text-[var(--nav-text)]/60">{search ? `Nothing matched "${search}"` : "Contact form submissions will appear here"}</p>
              </div>
            ) : (
              <ul className="divide-y divide-[var(--border-color)]">
                {filtered.map((c) => {
                  const isActive = selected?._id === c._id;
                  return (
                    <li key={c._id}>
                      <button
                        onClick={() => { setSelected(c); setMobileView("detail"); }}
                        className={`w-full text-left px-4 py-3.5 transition-all duration-150 hover:bg-[var(--card-bg-secondary)] active:bg-[var(--primary)]/10 cursor-pointer touch-manipulation relative ${isActive ? "bg-[var(--card-bg-secondary)]" : ""}`}
                      >
                        {isActive && <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--primary)] rounded-r" />}
                        <div className="flex items-start gap-3">
                          <Avatar name={c.name} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-0.5">
                              <span className={`font-semibold text-sm truncate ${isActive ? "text-[var(--primary)]" : ""}`}>{c.name}</span>
                              <span className="text-[10px] text-[var(--nav-text)] flex-shrink-0 bg-[var(--card-bg-secondary)] px-1.5 py-0.5 rounded-md">
                                {new Date(c.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                              </span>
                            </div>
                            <p className="text-xs font-medium text-[var(--nav-text)] truncate">{c.subject}</p>
                            <p className="text-xs text-[var(--nav-text)]/50 truncate mt-0.5">{c.message}</p>
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Footer */}
          {filtered.length > 0 && (
            <div className="px-4 py-2.5 border-t border-[var(--border-color)] bg-[var(--card-bg-secondary)]">
              <p className="text-[10px] text-[var(--nav-text)] text-center">
                {search ? `${filtered.length} of ${contacts.length} messages` : `${contacts.length} message${contacts.length !== 1 ? "s" : ""} total`}
              </p>
            </div>
          )}
        </aside>

        {/* ── Detail Panel ── */}
        <main className={`flex-1 overflow-y-auto custom-scrollbar ${mobileView === "list" ? "hidden lg:flex lg:flex-col" : "flex flex-col"}`}>
          {selected ? (
            <div className="flex-1 p-4 sm:p-6 lg:p-8">
              <div className="max-w-2xl mx-auto space-y-5">

                {/* Header card */}
                <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <Avatar name={selected.name} size="lg" />
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg sm:text-xl font-extrabold truncate">{selected.name}</h2>
                      <a href={`mailto:${selected.email}`} className="text-sm text-[var(--primary)] hover:underline truncate block mt-0.5">
                        {selected.email}
                      </a>
                      <div className="flex items-center gap-1.5 mt-2">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-[var(--nav-text)] flex-shrink-0">
                          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                        </svg>
                        <p className="text-xs text-[var(--nav-text)]">
                          {new Date(selected.createdAt).toLocaleString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(selected._id)}
                      disabled={deleting}
                      className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-red-500/10 text-red-500 hover:bg-red-500/20 active:scale-95 transition-all cursor-pointer touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6M9 6V4h6v2" />
                      </svg>
                      <span className="hidden sm:inline">{deleting ? "Deleting..." : "Delete"}</span>
                    </button>
                  </div>
                </div>

                {/* Subject */}
                <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--nav-text)] mb-2 flex items-center gap-1.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="14" y2="15" /><line x1="4" y1="3" x2="20" y2="3" /><line x1="4" y1="21" x2="14" y2="21" />
                    </svg>
                    Subject
                  </p>
                  <p className="text-sm font-semibold">{selected.subject}</p>
                </div>

                {/* Message */}
                <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--nav-text)] mb-3 flex items-center gap-1.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                    Message
                  </p>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap text-[var(--foreground)]">
                    {selected.message}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pb-24 lg:pb-4">
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--primary)] text-black text-sm font-bold hover:bg-[var(--primary-hover)] active:scale-95 transition-all cursor-pointer touch-manipulation"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    Reply via Email
                  </a>
                  <button
                    onClick={() => { setSelected(null); setMobileView("list"); }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border-color)] text-sm font-semibold hover:border-[var(--primary)] hover:text-[var(--primary)] active:scale-95 transition-all cursor-pointer touch-manipulation"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5M11 6l-6 6 6 6" />
                    </svg>
                    Back to list
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6">
              <div className="w-20 h-20 rounded-2xl bg-[var(--card-bg-secondary)] border border-[var(--border-color)] flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="text-[var(--nav-text)] opacity-40">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--nav-text)]">No message selected</p>
                <p className="text-xs text-[var(--nav-text)]/50 mt-1">Pick a message from the list to read it here</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
