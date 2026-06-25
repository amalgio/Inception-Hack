import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  AlertCircle,
  Check,
  Download,
  Plus,
  RefreshCw,
  Save,
  Search,
  ShieldAlert,
  Trash2,
  UserPlus,
  X,
} from "lucide-react";
import {
  addAdmin,
  deleteRecord,
  downloadCsv,
  downloadExcel,
  getAdminData,
  isSupabaseConfigured,
  removeAdmin,
  signInAdmin,
  updateSettings,
  upsertRecord,
} from "../../lib/inceptionApi";

const tabs = [
  ["overview", "Overview"],
  ["registrations", "Registrations"],
  ["settings", "Settings"],
  ["content", "CMS"],
  ["admins", "Admins"],
];

const emptyRows = {
  announcements: { title: "", content: "" },
  faq: { question: "", answer: "", sort_order: 0 },
  timeline: { title: "", description: "", event_date: "" },
  sponsors: { sponsor_name: "", sponsor_logo: "", sponsor_website: "" },
};

export default function OrganizerDashboard({ isOpen, onClose }) {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState("");
  const [notice, setNotice] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [newAdminEmail, setNewAdminEmail] = useState("");

  const token = session?.access_token;

  useEffect(() => {
    if (isOpen && token) loadData();
  }, [isOpen, token]);

  const loadData = async () => {
    if (!token) return;
    setLoading(true);
    setNotice("");
    try {
      setData(await getAdminData(token));
    } catch (error) {
      setNotice(error.message || "Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (event) => {
    event.preventDefault();
    setAuthError("");
    setLoading(true);
    try {
      const auth = await signInAdmin(email, password);
      setSession(auth);
      setPassword("");
      setActiveTab("overview");
    } catch (error) {
      setAuthError(error.message || "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setAuthError("");
    setNotice("");
    setSearchQuery("");
    onClose();
  };

  const registrations = data?.registrations || [];
  const filteredRegistrations = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return registrations;
    return registrations.filter((reg) =>
      [
        reg.registration_id,
        reg.team_name,
        reg.college_name,
        reg.email,
        reg.mobile_number,
        reg.member_1,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query))
    );
  }, [registrations, searchQuery]);

  const exportRows = [
    [
      "Registration ID",
      "Team Name",
      "College Name",
      "Email",
      "Mobile Number",
      "Member 1",
      "Member 2",
      "Member 3",
      "Member 4",
      "Created At",
    ],
    ...filteredRegistrations.map((reg) => [
      reg.registration_id,
      reg.team_name,
      reg.college_name,
      reg.email,
      reg.mobile_number,
      reg.member_1,
      reg.member_2,
      reg.member_3,
      reg.member_4,
      reg.created_at,
    ]),
  ];

  const handleSaveSettings = async (settings) => {
    setSaving("settings");
    setNotice("");
    try {
      const [updated] = await updateSettings(token, settings);
      setData((prev) => ({ ...prev, settings: updated }));
      setNotice("Website settings saved.");
    } catch (error) {
      setNotice(error.message || "Failed to save settings.");
    } finally {
      setSaving("");
    }
  };

  const handleSaveRecord = async (table, record) => {
    setSaving(table);
    setNotice("");
    try {
      await upsertRecord(token, table, record);
      await loadData();
      setNotice("Content saved.");
    } catch (error) {
      setNotice(error.message || "Failed to save content.");
    } finally {
      setSaving("");
    }
  };

  const handleDeleteRecord = async (table, id) => {
    setSaving(table);
    setNotice("");
    try {
      await deleteRecord(token, table, id);
      await loadData();
      setNotice("Content deleted.");
    } catch (error) {
      setNotice(error.message || "Failed to delete content.");
    } finally {
      setSaving("");
    }
  };

  const handleAddAdmin = async (event) => {
    event.preventDefault();
    if (!newAdminEmail.trim()) return;
    setSaving("admins");
    setNotice("");
    try {
      await addAdmin(token, newAdminEmail);
      setNewAdminEmail("");
      await loadData();
      setNotice("Admin added. Create the matching Supabase Auth user if it does not exist yet.");
    } catch (error) {
      setNotice(error.message || "Failed to add admin.");
    } finally {
      setSaving("");
    }
  };

  const handleRemoveAdmin = async (id) => {
    setSaving("admins");
    setNotice("");
    try {
      await removeAdmin(token, id);
      await loadData();
      setNotice("Admin removed.");
    } catch (error) {
      setNotice(error.message || "Failed to remove admin.");
    } finally {
      setSaving("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative z-10 flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-stone-100 bg-stone-50 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-900 text-xs font-black text-white">
                  A
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-wider text-stone-850" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Admin Dashboard
                  </h3>
                  <p className="mt-0.5 text-[10px] uppercase tracking-widest text-stone-500">
                    {session ? "Supabase protected console" : "Email and password login"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="rounded-full border border-stone-200 bg-stone-100 p-2 text-stone-500 transition hover:bg-stone-200/50 hover:text-stone-850"
                aria-label="Close admin dashboard"
              >
                <X size={16} />
              </button>
            </div>

            {!isSupabaseConfigured() ? (
              <SetupRequired />
            ) : !session ? (
              <LoginForm
                email={email}
                password={password}
                loading={loading}
                error={authError}
                onEmail={setEmail}
                onPassword={setPassword}
                onSubmit={handleAuth}
              />
            ) : (
              <div className="flex min-h-0 flex-1 flex-col">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 bg-stone-50/70 px-5 py-3">
                  <div className="flex flex-wrap gap-2">
                    {tabs.map(([id, label]) => (
                      <button
                        key={id}
                        onClick={() => setActiveTab(id)}
                        className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                          activeTab === id
                            ? "bg-stone-900 text-white"
                            : "border border-stone-200 bg-white text-stone-600 hover:text-[#ff5500]"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={loadData}
                    disabled={loading}
                    className="flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-stone-600 transition hover:text-[#ff5500] disabled:opacity-60"
                  >
                    <RefreshCw size={13} className={loading ? "animate-spin" : ""} /> Refresh
                  </button>
                </div>

                {notice && (
                  <div className="mx-5 mt-4 flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
                    <AlertCircle size={15} className="mt-0.5 shrink-0" />
                    <span>{notice}</span>
                  </div>
                )}

                <div className="min-h-0 flex-1 overflow-auto p-5">
                  {loading && !data ? (
                    <div className="flex h-full items-center justify-center text-sm text-stone-500">Loading dashboard...</div>
                  ) : (
                    <>
                      {activeTab === "overview" && <Overview data={data} />}
                      {activeTab === "registrations" && (
                        <Registrations
                          rows={filteredRegistrations}
                          query={searchQuery}
                          onQuery={setSearchQuery}
                          onCsv={() => downloadCsv(`inception_registrations_${dateStamp()}.csv`, exportRows)}
                          onExcel={() => downloadExcel(`inception_registrations_${dateStamp()}.xls`, exportRows)}
                        />
                      )}
                      {activeTab === "settings" && (
                        <SettingsForm
                          key={data?.settings?.updated_at || "settings"}
                          settings={data?.settings}
                          saving={saving === "settings"}
                          onSave={handleSaveSettings}
                        />
                      )}
                      {activeTab === "content" && (
                        <CmsTab
                          data={data}
                          saving={saving}
                          onSave={handleSaveRecord}
                          onDelete={handleDeleteRecord}
                        />
                      )}
                      {activeTab === "admins" && (
                        <AdminsTab
                          admins={data?.admins || []}
                          email={newAdminEmail}
                          saving={saving === "admins"}
                          onEmail={setNewAdminEmail}
                          onAdd={handleAddAdmin}
                          onRemove={handleRemoveAdmin}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function SetupRequired() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
      <ShieldAlert className="mb-4 text-amber-600" size={34} />
      <h4 className="mb-2 text-base font-black uppercase tracking-wider text-stone-850">Supabase Setup Required</h4>
      <p className="max-w-md text-sm leading-relaxed text-stone-500">
        Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env.local`, run the SQL setup script, then restart the dev server.
      </p>
    </div>
  );
}

function LoginForm({ email, password, loading, error, onEmail, onPassword, onSubmit }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-stone-200 bg-stone-100 text-stone-550">
        <ShieldAlert size={28} />
      </div>
      <h4 className="mb-2 text-base font-bold uppercase tracking-wider text-stone-800">Admin Login</h4>
      <p className="mb-6 max-w-sm text-xs font-light leading-relaxed text-stone-500">
        Sign in with a Supabase Auth user whose email exists in the `admins` table.
      </p>
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-3">
        <input type="email" placeholder="Admin email" value={email} onChange={(e) => onEmail(e.target.value)} required className="input-branded" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => onPassword(e.target.value)} required className="input-branded" />
        {error && <p className="flex items-center justify-center gap-1 text-[11px] text-red-500"><AlertCircle size={12} /> {error}</p>}
        <button type="submit" disabled={loading} className="w-full rounded-xl bg-stone-900 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-stone-800 disabled:opacity-60">
          {loading ? "Signing in..." : "Authenticate Access"}
        </button>
      </form>
    </div>
  );
}

function Overview({ data }) {
  const settings = data?.settings || {};
  const total = data?.registrations?.length || 0;
  const limit = Number(settings.registration_limit) || 0;
  const remaining = Math.max((limit || 0) - total, 0);
  const cards = [
    ["Total Registrations", total],
    ["Registration Limit", limit || "Unlimited"],
    ["Remaining Slots", limit ? remaining : "Open"],
    ["Today's Registrations", data?.todaysRegistrations || 0],
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(([label, value]) => (
        <div key={label} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">{label}</p>
          <p className="mt-2 font-mono text-3xl font-black text-[#ff5500]">{value}</p>
        </div>
      ))}
      <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 sm:col-span-2 lg:col-span-4">
        <p className="text-sm font-semibold text-stone-800">
          Registration is {settings.registration_open ? "open" : "closed"}.
        </p>
        <p className="mt-1 text-xs text-stone-500">Public content changes here are read from Supabase and reflected after refresh without redeployment.</p>
      </div>
    </div>
  );
}

function Registrations({ rows, query, onQuery, onCsv, onExcel }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-3 sm:flex-row">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={14} />
          <input value={query} onChange={(e) => onQuery(e.target.value)} placeholder="Search ID, team, college, email..." className="w-full rounded-xl border border-stone-200 bg-white py-2 pl-9 pr-4 text-xs focus:border-stone-400 focus:outline-none" />
        </div>
        <div className="flex gap-2">
          <button onClick={onCsv} className="flex items-center gap-2 rounded-xl bg-stone-900 px-4 py-2 text-xs font-bold text-white"><Download size={13} /> CSV</button>
          <button onClick={onExcel} className="flex items-center gap-2 rounded-xl border border-stone-200 px-4 py-2 text-xs font-bold text-stone-700"><Download size={13} /> Excel</button>
        </div>
      </div>
      <div className="overflow-auto rounded-2xl border border-stone-200">
        <table className="w-full min-w-[980px] border-collapse bg-white text-left text-xs text-stone-600">
          <thead className="sticky top-0 bg-stone-50 text-[10px] uppercase tracking-wider text-stone-700">
            <tr>
              <th className="px-4 py-3">Registration ID</th>
              <th className="px-4 py-3">Team</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Team Members</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {rows.map((reg) => (
              <tr key={reg.id} className="hover:bg-stone-50">
                <td className="px-4 py-3 font-mono font-bold text-[#ff5500]">{reg.registration_id}</td>
                <td className="px-4 py-3"><p className="font-bold text-stone-850">{reg.team_name}</p><p>{reg.college_name}</p></td>
                <td className="px-4 py-3"><p>{reg.email}</p><p>{reg.mobile_number}</p></td>
                <td className="px-4 py-3">{[reg.member_1, reg.member_2, reg.member_3, reg.member_4].filter(Boolean).join(", ")}</td>
                <td className="px-4 py-3">{new Date(reg.created_at).toLocaleString()}</td>
              </tr>
            ))}
            {!rows.length && (
              <tr><td colSpan="5" className="px-4 py-10 text-center text-stone-400">No registrations found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SettingsForm({ settings = {}, saving, onSave }) {
  const [draft, setDraft] = useState(() => ({
    ...settings,
    themes: Array.isArray(settings.themes) ? settings.themes.join("\n") : settings.themes || "",
    social_links: JSON.stringify(settings.social_links || {}, null, 2),
  }));

  const update = (key, value) => setDraft((prev) => ({ ...prev, [key]: value }));

  return (
    <form onSubmit={(event) => { event.preventDefault(); onSave(draft); }} className="grid gap-4 lg:grid-cols-2">
      <Field label="Hero Title" value={draft.hero_title} onChange={(value) => update("hero_title", value)} />
      <Field label="Contact Email" value={draft.contact_email} onChange={(value) => update("contact_email", value)} />
      <Field label="Hero Subtitle" textarea value={draft.hero_subtitle} onChange={(value) => update("hero_subtitle", value)} />
      <Field label="Contact Phone" value={draft.contact_phone} onChange={(value) => update("contact_phone", value)} />
      <Field label="About Content" textarea value={draft.about_content} onChange={(value) => update("about_content", value)} />
      <Field label="Themes (one per line)" textarea value={draft.themes} onChange={(value) => update("themes", value)} />
      <Field label="Registration Limit" type="number" value={draft.registration_limit} onChange={(value) => update("registration_limit", value)} />
      <label className="flex items-center gap-3 rounded-2xl border border-stone-200 p-4 text-sm font-bold text-stone-700">
        <input type="checkbox" checked={Boolean(draft.registration_open)} onChange={(event) => update("registration_open", event.target.checked)} />
        Open Registration
      </label>
      <Field label="Social Links JSON" textarea value={draft.social_links} onChange={(value) => update("social_links", value)} />
      <div className="lg:col-span-2">
        <button disabled={saving} className="flex items-center gap-2 rounded-xl bg-[#ff5500] px-5 py-3 text-xs font-black uppercase tracking-wider text-white disabled:opacity-60">
          <Save size={14} /> {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </form>
  );
}

function CmsTab({ data, saving, onSave, onDelete }) {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <CollectionEditor title="Announcements" table="announcements" rows={data?.announcements || []} fields={["title", "content"]} empty={emptyRows.announcements} saving={saving === "announcements"} onSave={onSave} onDelete={onDelete} />
      <CollectionEditor title="FAQ" table="faq" rows={data?.faq || []} fields={["question", "answer", "sort_order"]} empty={emptyRows.faq} saving={saving === "faq"} onSave={onSave} onDelete={onDelete} />
      <CollectionEditor title="Timeline" table="timeline" rows={data?.timeline || []} fields={["title", "description", "event_date"]} empty={emptyRows.timeline} saving={saving === "timeline"} onSave={onSave} onDelete={onDelete} />
      <CollectionEditor title="Sponsors" table="sponsors" rows={data?.sponsors || []} fields={["sponsor_name", "sponsor_logo", "sponsor_website"]} empty={emptyRows.sponsors} saving={saving === "sponsors"} onSave={onSave} onDelete={onDelete} />
    </div>
  );
}

function CollectionEditor({ title, table, rows, fields, empty, saving, onSave, onDelete }) {
  const [draft, setDraft] = useState(empty);

  const save = (record) => onSave(table, normalizeRecord(record));

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-4">
      <h4 className="mb-4 text-sm font-black uppercase tracking-wider text-stone-850">{title}</h4>
      <div className="mb-4 space-y-2 rounded-xl bg-stone-50 p-3">
        {fields.map((field) => (
          <input key={field} value={draft[field] || ""} onChange={(event) => setDraft((prev) => ({ ...prev, [field]: event.target.value }))} placeholder={labelize(field)} className="w-full rounded-lg border border-stone-200 px-3 py-2 text-xs focus:outline-none" />
        ))}
        <button onClick={() => { save(draft); setDraft(empty); }} disabled={saving} className="flex items-center gap-2 rounded-lg bg-stone-900 px-3 py-2 text-xs font-bold text-white disabled:opacity-60">
          <Plus size={13} /> Add
        </button>
      </div>
      <div className="space-y-3">
        {rows.map((row) => (
          <EditableRow key={row.id} row={row} fields={fields} saving={saving} onSave={save} onDelete={() => onDelete(table, row.id)} />
        ))}
        {!rows.length && <p className="text-xs text-stone-400">No records yet.</p>}
      </div>
    </div>
  );
}

function EditableRow({ row, fields, saving, onSave, onDelete }) {
  const [draft, setDraft] = useState(row);
  return (
    <div className="rounded-xl border border-stone-100 p-3">
      <div className="grid gap-2">
        {fields.map((field) => (
          <input key={field} value={draft[field] || ""} onChange={(event) => setDraft((prev) => ({ ...prev, [field]: event.target.value }))} className="w-full rounded-lg border border-stone-200 px-3 py-2 text-xs focus:outline-none" />
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        <button onClick={() => onSave(draft)} disabled={saving} className="flex items-center gap-1 rounded-lg bg-[#ff5500] px-3 py-2 text-xs font-bold text-white"><Check size={12} /> Save</button>
        <button onClick={onDelete} disabled={saving} className="flex items-center gap-1 rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-600"><Trash2 size={12} /> Delete</button>
      </div>
    </div>
  );
}

function AdminsTab({ admins, email, saving, onEmail, onAdd, onRemove }) {
  return (
    <div className="max-w-2xl space-y-4">
      <form onSubmit={onAdd} className="flex gap-2 rounded-2xl border border-stone-200 bg-stone-50 p-3">
        <input type="email" value={email} onChange={(event) => onEmail(event.target.value)} placeholder="new-admin@example.com" className="min-w-0 flex-1 rounded-xl border border-stone-200 px-3 py-2 text-sm focus:outline-none" />
        <button disabled={saving} className="flex items-center gap-2 rounded-xl bg-stone-900 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white disabled:opacity-60"><UserPlus size={14} /> Add</button>
      </form>
      <div className="divide-y divide-stone-100 rounded-2xl border border-stone-200 bg-white">
        {admins.map((admin) => (
          <div key={admin.id} className="flex items-center justify-between gap-3 px-4 py-3">
            <div><p className="text-sm font-bold text-stone-800">{admin.email}</p><p className="text-xs text-stone-400">{admin.role}</p></div>
            <button onClick={() => onRemove(admin.id)} disabled={saving} className="rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-600 disabled:opacity-60">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, textarea = false, type = "text" }) {
  const className = "w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 focus:border-[#ff5500] focus:outline-none";
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-stone-500">{label}</span>
      {textarea ? (
        <textarea value={value || ""} onChange={(event) => onChange(event.target.value)} rows={4} className={className} />
      ) : (
        <input type={type} value={value || ""} onChange={(event) => onChange(event.target.value)} className={className} />
      )}
    </label>
  );
}

function normalizeRecord(record) {
  const output = { ...record };
  if ("sort_order" in output) output.sort_order = Number(output.sort_order) || 0;
  return output;
}

function labelize(value) {
  return value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function dateStamp() {
  return new Date().toISOString().slice(0, 10);
}
