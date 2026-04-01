import { useState, useRef, useEffect } from "react";
import axios from "axios";

// ─────────────────────────────────────────────────────────────────
//  CONFIG — adjust these two lines to match your setup
// ─────────────────────────────────────────────────────────────────
const API_BASE = import.meta.env.VITE_API_URL
const CERT_IMAGE_SRC = "/certificate.jpg"; // must be in /public

// ─────────────────────────────────────────────────────────────────
//  Text positions — styled to match reference certificate
//
//  Dotted lines:
//    Name line      → y=776   sits ON the line
//    Institute line → y=833   sits ON the line, clear gap after "from"
//    Role line      → y=884   sits ON the line, pushed lower
// ─────────────────────────────────────────────────────────────────
const TEXT_CONFIG = {
  name: {
    x: 1000,
    y: 768,
    font: '400 32px "Times New Roman", Times, serif',
    color: "#1a56db",   // blue matching reference
    align: "center",
  },
  institute: {
    x: 280,
    y: 825,
    font: '400 32px "Times New Roman", Times, serif',
    color: "#1a56db",   // blue matching reference
    align: "left",
  },
  role: {
    x: 310,
    y: 884,
    font: '400 32px "Times New Roman", Times, serif',
    color: "#be123c",   // rose-700
    align: "left",
  },
};

export default function CertificateGenerator() {
  const canvasRef    = useRef(null);
  const certImgRef   = useRef(null);

  const [form, setForm]       = useState({ Full_Name: "", Institute: "", Role: "" });
  const [status, setStatus]   = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [generated, setGenerated] = useState(false);

  // ── Load the JPG once on mount ──────────────────────────────
  useEffect(() => {
    const img = new Image();
    img.src = CERT_IMAGE_SRC;
    img.onload = () => {
      certImgRef.current = img;
      drawCanvas("", "", "");
    };
    img.onerror = () => {
      console.error(
        `[CertificateGenerator] Could not load image at "${CERT_IMAGE_SRC}". ` +
        `Make sure the JPG is inside your /public folder.`
      );
    };
  }, []);

  // ── Redraw whenever form values change (live preview) ───────
  useEffect(() => {
    drawCanvas(form.Full_Name, form.Institute, form.Role);
  }, [form]);

  // ── Core canvas draw ─────────────────────────────────────────
  function drawCanvas(name, institute, role) {
    const canvas = canvasRef.current;
    const img    = certImgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const writeText = (text, cfg) => {
      if (!text.trim()) return;
      ctx.font         = cfg.font;
      ctx.fillStyle    = cfg.color;
      ctx.textAlign    = cfg.align;
      ctx.textBaseline = "alphabetic";
      ctx.fillText(text, cfg.x, cfg.y);
    };

    writeText(name,      TEXT_CONFIG.name);
    writeText(institute, TEXT_CONFIG.institute);
    writeText(role,      TEXT_CONFIG.role);
  }

  // ── Input change ─────────────────────────────────────────────
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (generated) setGenerated(false);
    if (status !== "idle") setStatus("idle");
  }

  // ── Form submit → POST to backend ────────────────────────────
  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const endpoint = `${API_BASE}/certificate`;

    // Always logs in console — helps debug 404s instantly
    console.log("[CertificateGenerator] POST →", endpoint);
    console.log("[CertificateGenerator] Payload →", {
      Full_Name: form.Full_Name.trim(),
      Institute: form.Institute.trim(),
      Role:      form.Role.trim(),
    });

    try {
      const { data } = await axios.post(endpoint, {
        Full_Name: form.Full_Name.trim(),
        Institute: form.Institute.trim(),
        Role:      form.Role.trim(),
      });

      console.log("[CertificateGenerator] Success →", data);

      drawCanvas(form.Full_Name, form.Institute, form.Role);
      setGenerated(true);
      setStatus("success");
    } catch (err) {
      const httpStatus = err?.response?.status;
      const serverMsg  = err?.response?.data?.message;

      console.error(
        `[CertificateGenerator] ${httpStatus ?? "Network"} error →`,
        err?.response?.data ?? err.message
      );

      // Show specific, actionable errors instead of generic message
      if (!httpStatus) {
        setErrorMsg("Cannot reach the server. Is your backend running?");
      } else if (httpStatus === 404) {
        setErrorMsg(
          `404 — Route not found. Check: (1) app.use('/api', certificateRouter) is in server.js, ` +
          `(2) VITE_API_URL=${API_BASE} is correct in .env`
        );
      } else if (httpStatus === 400 || httpStatus === 422) {
        setErrorMsg(serverMsg || "Validation error. Check all fields.");
      } else {
        setErrorMsg(serverMsg || `Server error (${httpStatus}). Check backend logs.`);
      }

      setStatus("error");
    }
  }

  // ── Download PNG ─────────────────────────────────────────────
  function handleDownload() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link    = document.createElement("a");
    link.download = `Certificate_${form.Full_Name.replace(/\s+/g, "_") || "download"}.png`;
    link.href     = canvas.toDataURL("image/png");
    link.click();
  }

  const allFilled = form.Full_Name.trim() && form.Institute.trim() && form.Role.trim();

  return (
    <div style={s.page}>

      {/* ── Header ── */}
      <div style={s.header}>
        <span style={s.badge}>ICABMET-2027 · CERADA</span>
        <h1 style={s.h1}>Certificate of Appreciation</h1>
        <p style={s.subtitle}>Fill in your details · Preview live · Download instantly</p>
      </div>

      <div style={s.layout}>

        {/* ── Form Panel ── */}
        <form onSubmit={handleSubmit} style={s.formPanel} noValidate>
          <h2 style={s.panelTitle}>Your Details</h2>
          <p style={s.panelSub}>All 3 fields are required</p>

          {FIELDS.map((field, i) => (
            <div key={field.name} style={s.fieldWrap}>
              <div style={s.fieldRow}>
                <span style={s.stepNum}>{i + 1}</span>
                <div style={{ flex: 1 }}>
                  <label htmlFor={field.name} style={s.label}>{field.label}</label>
                  <p style={s.hint}>{field.hint}</p>
                  <input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder={field.placeholder}
                    value={form[field.name]}
                    onChange={handleChange}
                    required
                    maxLength={80}
                    style={s.input}
                    onFocus={(e) => Object.assign(e.target.style, { borderColor: "#c0392b", boxShadow: "0 0 0 3px rgba(192,57,43,0.10)" })}
                    onBlur={(e)  => Object.assign(e.target.style, { borderColor: "#e0d6cc", boxShadow: "none" })}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Role dropdown */}
          <div style={s.fieldWrap}>
            <div style={s.fieldRow}>
              <span style={s.stepNum}>3</span>
              <div style={{ flex: 1 }}>
                <label htmlFor="Role" style={s.label}>Role in Conference</label>
                <p style={s.hint}>Select your role at ICABMET-2027</p>
                <select
                  id="Role"
                  name="Role"
                  value={form.Role}
                  onChange={handleChange}
                  required
                  style={{
                    ...s.input,
                    cursor: "pointer",
                    appearance: "none",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23a09080' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 13px center",
                    paddingRight: "36px",
                    color: form.Role ? "#1a0f00" : "#bbb",
                  }}
                  onFocus={(e) => Object.assign(e.target.style, { borderColor: "#c0392b", boxShadow: "0 0 0 3px rgba(192,57,43,0.10)" })}
                  onBlur={(e)  => Object.assign(e.target.style, { borderColor: "#e0d6cc", boxShadow: "none" })}
                >
                  <option value="" disabled>Select a role…</option>
                  {ROLE_OPTIONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Feedback banners */}
          {status === "error" && (
            <div style={s.errorBox}>
              <IconAlert />
              <span>{errorMsg}</span>
            </div>
          )}
          {status === "success" && (
            <div style={s.successBox}>
              <IconCheck />
              <span>Certificate generated! Download it below.</span>
            </div>
          )}

          {/* Generate */}
          <button
            type="submit"
            disabled={!allFilled || status === "loading"}
            style={{
              ...s.btnPrimary,
              opacity: !allFilled || status === "loading" ? 0.55 : 1,
              cursor:  !allFilled || status === "loading" ? "not-allowed" : "pointer",
            }}
          >
            {status === "loading" ? <><Spinner /> Generating…</> : <><IconGenerate /> Generate Certificate</>}
          </button>

          {/* Download — only visible after successful generation */}
          {generated && (
            <button type="button" onClick={handleDownload} style={s.btnDownload}>
              <IconDownload /> Download Certificate (PNG)
            </button>
          )}
        </form>

        {/* ── Canvas Preview ── */}
        <div style={s.previewPanel}>
          <p style={s.previewLabel}>Live Preview</p>
          <div style={s.canvasWrap}>
            <canvas
              ref={canvasRef}
              width={2000}
              height={1413}
              style={{ display: "block", width: "100%", height: "auto" }}
            />
          </div>
          <div style={s.infoBar}>
            {["PNG output", "2000 × 1413 px", "High-res"].map((t) => (
              <span key={t} style={s.pill}>{t}</span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  Field definitions (keeps JSX clean)
// ─────────────────────────────────────────────────────────────────
const FIELDS = [
  { name: "Full_Name", label: "Full Name",               placeholder: "e.g. Dr. Arjun Krishnamurthy", hint: "As it should appear on the certificate" },
  { name: "Institute", label: "Institute / Organisation", placeholder: "e.g. IIT Madras, Chennai",      hint: "Your affiliated institution"           },
];

const ROLE_OPTIONS = [
  "Session Chair",
  "Conference Chair",
  "Session Speaker",
  "Moderator",
];

// ─────────────────────────────────────────────────────────────────
//  Icons
// ─────────────────────────────────────────────────────────────────
const SvgIcon = ({ children }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);
const IconGenerate = () => <SvgIcon><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M9 12l2 2 4-4"/></SvgIcon>;
const IconDownload = () => <SvgIcon><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></SvgIcon>;
const IconAlert    = () => <SvgIcon><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></SvgIcon>;
const IconCheck    = () => <SvgIcon><polyline points="20 6 9 17 4 12"/></SvgIcon>;

function Spinner() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
      style={{ animation: "certSpin 0.75s linear infinite" }}>
      <style>{`@keyframes certSpin { to { transform: rotate(360deg); } }`}</style>
      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.25"/>
      <path d="M21 12a9 9 0 00-9-9"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────
//  Styles
// ─────────────────────────────────────────────────────────────────
const s = {
  page:        { fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f7f4f0", minHeight: "100vh", padding: "48px 24px 72px", display: "flex", flexDirection: "column", alignItems: "center" },
  header:      { textAlign: "center", marginBottom: "44px" },
  badge:       { display: "inline-block", background: "#c0392b", color: "#fff", fontSize: "10px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", padding: "5px 16px", borderRadius: "20px", marginBottom: "14px" },
  h1:          { fontFamily: "'Georgia', serif", fontSize: "clamp(26px, 4vw, 48px)", fontWeight: 700, color: "#1a0f00", lineHeight: 1.15, margin: 0 },
  subtitle:    { marginTop: "10px", fontSize: "13px", color: "#7a6f60" },
  layout:      { display: "grid", gridTemplateColumns: "380px 1fr", gap: "32px", width: "100%", maxWidth: "1140px", alignItems: "start" },
  formPanel:   { background: "#fff", border: "1px solid #e0d6cc", borderRadius: "14px", padding: "32px 28px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", position: "sticky", top: "24px" },
  panelTitle:  { fontFamily: "'Georgia', serif", fontSize: "20px", fontWeight: 700, color: "#1a0f00", margin: 0 },
  panelSub:    { fontSize: "11px", color: "#a09080", marginTop: "4px", marginBottom: "26px", paddingBottom: "18px", borderBottom: "1px solid #f0e8e0" },
  fieldWrap:   { marginBottom: "20px" },
  fieldRow:    { display: "flex", gap: "14px", alignItems: "flex-start" },
  stepNum:     { width: "28px", height: "28px", background: "#c0392b", color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, flexShrink: 0, marginTop: "2px" },
  label:       { display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.6px", color: "#1a0f00", marginBottom: "4px", textTransform: "uppercase" },
  hint:        { fontSize: "10px", color: "#a09080", margin: "0 0 7px" },
  input:       { width: "100%", background: "#faf7f4", border: "1.5px solid #e0d6cc", borderRadius: "8px", padding: "11px 13px", fontFamily: "inherit", fontSize: "13px", color: "#1a0f00", outline: "none", transition: "border-color 0.2s, box-shadow 0.2s", boxSizing: "border-box" },
  errorBox:    { display: "flex", alignItems: "flex-start", gap: "8px", padding: "11px 14px", background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "8px", fontSize: "12px", color: "#b91c1c", marginBottom: "14px", lineHeight: 1.5 },
  successBox:  { display: "flex", alignItems: "center", gap: "8px", padding: "11px 14px", background: "#f0faf4", border: "1px solid #86efac", borderRadius: "8px", fontSize: "12px", color: "#15803d", marginBottom: "14px" },
  btnPrimary:  { width: "100%", padding: "14px", background: "#c0392b", border: "none", borderRadius: "9px", fontFamily: "inherit", fontSize: "13px", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "background 0.2s", marginBottom: "10px" },
  btnDownload: { width: "100%", padding: "13px", background: "#fff", border: "1.5px solid #c0392b", borderRadius: "9px", fontFamily: "inherit", fontSize: "12px", fontWeight: 700, color: "#c0392b", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", cursor: "pointer" },
  previewPanel:{ position: "sticky", top: "24px" },
  previewLabel:{ fontSize: "10px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#a09080", marginBottom: "12px" },
  canvasWrap:  { width: "100%", borderRadius: "10px", overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.12), 0 0 0 1px #e0d6cc", background: "#eee" },
  infoBar:     { display: "flex", gap: "8px", marginTop: "12px", flexWrap: "wrap" },
  pill:        { background: "#fff", border: "1px solid #e0d6cc", borderRadius: "20px", padding: "4px 12px", fontSize: "11px", color: "#7a6f60" },
};