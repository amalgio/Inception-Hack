const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || "").replace(/\/$/, "");
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const DEFAULT_SETTINGS = {
  registration_limit: 500,
  registration_open: true,
  hero_title: "INCEPTION",
  hero_subtitle:
    "A premium 24-hour inter-college hackathon crafted for developers and engineers who build.",
  contact_email: "ece@licet.ac.in",
  contact_phone: "+91 00000 00000",
  social_links: {},
  about_content: "",
  themes: [],
};

export function isSupabaseConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

function assertConfigured() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
  }
}

function cleanText(value) {
  return String(value || "")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeMobile(value) {
  return String(value || "").replace(/[^\d+]/g, "").trim();
}

function headers(token, extra = {}) {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${token || SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

async function supabaseFetch(path, options = {}) {
  assertConfigured();
  const response = await fetch(`${SUPABASE_URL}${path}`, {
    ...options,
    headers: headers(options.token, options.headers),
  });

  if (!response.ok) {
    let detail = "Request failed";
    try {
      const data = await response.json();
      detail = data.message || data.error_description || data.error || detail;
    } catch {
      detail = await response.text();
    }
    throw new Error(detail);
  }

  if (response.status === 204 || options.method === "HEAD") {
    return { count: parseCount(response.headers.get("content-range")) };
  }

  return response.json();
}

function parseCount(contentRange) {
  if (!contentRange) return 0;
  const match = contentRange.match(/\/(\d+)$/);
  return match ? Number(match[1]) : 0;
}

export function validateRegistration(data) {
  const errors = {};
  const required = [
    ["teamName", "Team Name is required"],
    ["collegeName", "College Name is required"],
    ["email", "Email is required"],
    ["phone", "Mobile number is required"],
    ["leaderName", "Member 1 is required"],
    ["member2Name", "Member 2 is required"],
    ["member3Name", "Member 3 is required"],
    ["member4Name", "Member 4 is required"],
  ];

  required.forEach(([key, message]) => {
    if (!cleanText(data[key])) errors[key] = message;
  });

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanText(data.email))) {
    errors.email = "Enter a valid email address";
  }

  const mobile = normalizeMobile(data.phone);
  if (data.phone && !/^(?:\+91)?[6-9]\d{9}$/.test(mobile)) {
    errors.phone = "Enter a valid Indian mobile number";
  }

  return errors;
}

export function toRegistrationPayload(data) {
  return {
    team_name: cleanText(data.teamName),
    college_name: cleanText(data.collegeName),
    email: cleanText(data.email).toLowerCase(),
    mobile_number: normalizeMobile(data.phone),
    member_1: cleanText(data.leaderName),
    member_2: cleanText(data.member2Name),
    member_3: cleanText(data.member3Name),
    member_4: cleanText(data.member4Name),
  };
}

export async function getPublicState() {
  if (!isSupabaseConfigured()) {
    return {
      settings: DEFAULT_SETTINGS,
      registrationCount: 0,
      announcements: [],
      faq: [],
      timeline: [],
      sponsors: [],
    };
  }

  const [settingsRows, announcements, faq, timeline, sponsors, countResult] = await Promise.all([
    supabaseFetch("/rest/v1/website_settings?select=*&id=eq.default&limit=1"),
    supabaseFetch("/rest/v1/announcements?select=*&order=created_at.desc&limit=6"),
    supabaseFetch("/rest/v1/faq?select=*&order=sort_order.asc,created_at.asc"),
    supabaseFetch("/rest/v1/timeline?select=*&order=event_date.asc"),
    supabaseFetch("/rest/v1/sponsors?select=*&order=sponsor_name.asc"),
    supabaseFetch("/rest/v1/registrations?select=id", {
      method: "HEAD",
      headers: { Prefer: "count=exact" },
    }),
  ]);

  return {
    settings: { ...DEFAULT_SETTINGS, ...(settingsRows[0] || {}) },
    registrationCount: countResult.count || 0,
    announcements,
    faq,
    timeline,
    sponsors,
  };
}

export async function submitRegistration(formData) {
  const errors = validateRegistration(formData);
  if (Object.keys(errors).length) {
    const error = new Error("Please fix the highlighted fields.");
    error.fieldErrors = errors;
    throw error;
  }

  const rows = await supabaseFetch("/rest/v1/rpc/register_team", {
    method: "POST",
    body: JSON.stringify({ payload: toRegistrationPayload(formData) }),
  });

  return Array.isArray(rows) ? rows[0] : rows;
}

export async function signInAdmin(email, password) {
  assertConfigured();
  const auth = await supabaseFetch("/auth/v1/token?grant_type=password", {
    method: "POST",
    body: JSON.stringify({ email: cleanText(email).toLowerCase(), password }),
  });

  const admins = await supabaseFetch(
    `/rest/v1/admins?select=*&email=eq.${encodeURIComponent(auth.user.email)}&limit=1`,
    { token: auth.access_token }
  );

  if (!admins.length) {
    throw new Error("This account is not listed as an INCEPTION admin.");
  }

  return auth;
}

export async function getAdminData(token) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [registrations, settingsRows, announcements, faq, timeline, sponsors, admins] =
    await Promise.all([
      supabaseFetch("/rest/v1/registrations?select=*&order=created_at.desc", { token }),
      supabaseFetch("/rest/v1/website_settings?select=*&id=eq.default&limit=1", { token }),
      supabaseFetch("/rest/v1/announcements?select=*&order=created_at.desc", { token }),
      supabaseFetch("/rest/v1/faq?select=*&order=sort_order.asc,created_at.asc", { token }),
      supabaseFetch("/rest/v1/timeline?select=*&order=event_date.asc", { token }),
      supabaseFetch("/rest/v1/sponsors?select=*&order=sponsor_name.asc", { token }),
      supabaseFetch("/rest/v1/admins?select=*&order=created_at.desc", { token }),
    ]);

  return {
    registrations,
    settings: { ...DEFAULT_SETTINGS, ...(settingsRows[0] || {}) },
    announcements,
    faq,
    timeline,
    sponsors,
    admins,
    todaysRegistrations: registrations.filter((item) => new Date(item.created_at) >= today).length,
  };
}

export async function updateSettings(token, settings) {
  const body = {
    id: "default",
    registration_limit: Number(settings.registration_limit) || 0,
    registration_open: Boolean(settings.registration_open),
    hero_title: cleanText(settings.hero_title),
    hero_subtitle: cleanText(settings.hero_subtitle),
    contact_email: cleanText(settings.contact_email),
    contact_phone: cleanText(settings.contact_phone),
    about_content: cleanText(settings.about_content),
    themes: parseLines(settings.themes),
    social_links: parseJson(settings.social_links, {}),
    updated_at: new Date().toISOString(),
  };

  return supabaseFetch("/rest/v1/website_settings?id=eq.default", {
    method: "PATCH",
    token,
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(body),
  });
}

export async function upsertRecord(token, table, record) {
  const id = record.id;
  const method = id ? "PATCH" : "POST";
  const path = id ? `/rest/v1/${table}?id=eq.${encodeURIComponent(id)}` : `/rest/v1/${table}`;
  const body = { ...record };
  if (!id) delete body.id;

  return supabaseFetch(path, {
    method,
    token,
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(body),
  });
}

export async function deleteRecord(token, table, id) {
  return supabaseFetch(`/rest/v1/${table}?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    token,
  });
}

export async function addAdmin(token, email) {
  return supabaseFetch("/rest/v1/admins", {
    method: "POST",
    token,
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({ email: cleanText(email).toLowerCase(), role: "admin" }),
  });
}

export async function removeAdmin(token, id) {
  return deleteRecord(token, "admins", id);
}

export function parseLines(value) {
  if (Array.isArray(value)) return value.map(cleanText).filter(Boolean);
  return String(value || "")
    .split(/\r?\n|,/)
    .map(cleanText)
    .filter(Boolean);
}

function parseJson(value, fallback) {
  if (!value) return fallback;
  if (typeof value === "object") return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function downloadCsv(filename, rows) {
  const csv = rows
    .map((row) =>
      row
        .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\n");
  downloadBlob(filename, csv, "text/csv;charset=utf-8;");
}

export function downloadExcel(filename, rows) {
  const htmlRows = rows
    .map(
      (row) =>
        `<tr>${row
          .map((value) => `<td>${String(value ?? "").replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]))}</td>`)
          .join("")}</tr>`
    )
    .join("");
  const html = `<html><head><meta charset="utf-8"></head><body><table>${htmlRows}</table></body></html>`;
  downloadBlob(filename, html, "application/vnd.ms-excel;charset=utf-8;");
}

function downloadBlob(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
