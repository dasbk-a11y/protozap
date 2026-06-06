import { useState, useEffect } from "react";

const MATS = ["Mild Steel (MS)","Stainless Steel 304","Stainless Steel 316","Aluminium 5052","Aluminium 6061","Galvanised Iron (GI)","Copper","Brass","Other"];
const FINS = ["None / Raw","Powder Coating","Electro Plating","Hot-Dip Galvanizing","Spray Painting","Anodizing","Other"];
const PROCS = [
  {n:"CNC Turret Punching",c:"CUTTING",d:"High-speed punching of holes, slots, notches, and louvers on sheet metal. CNC-controlled for repeatability across large batches or single prototypes."},
  {n:"NC Shearing",c:"CUTTING",d:"Straight-line cuts on mild steel, stainless, and aluminium sheets. Fast and accurate for blanks and strip preparation."},
  {n:"Laser Cutting",c:"CUTTING",d:"High-precision laser cutting for intricate profiles, tight tolerances, and contours that punching cannot achieve."},
  {n:"CNC Bending",c:"FORMING",d:"Press brake bending with CNC backstop control for accurate angles, boxes, and complex multi-bend profiles."},
  {n:"Power Press",c:"FORMING",d:"Blanking, piercing, embossing, and forming on mechanical and hydro-pneumatic presses. Suitable for medium to high volumes."},
  {n:"Deep Drawing",c:"FORMING",d:"Hydraulic press drawing for cups, shells, and enclosures. Controlled material flow for wrinkle-free surfaces."},
  {n:"MIG Welding",c:"JOINING",d:"GMAW process for mild steel structural welding. Good deposition rates and solid fusion for brackets, frames, and enclosures."},
  {n:"TIG Welding",c:"JOINING",d:"GTAW process for stainless steel and aluminium. Precision, clean beads, and excellent for thin gauges."},
  {n:"Spot & Projection Welding",c:"JOINING",d:"Resistance spot welding for rapid sheet-to-sheet joining. Projection welding for nuts, studs, and bosses."},
  {n:"Stud Welding",c:"JOINING",d:"Drawn-arc and capacitor-discharge stud welding for threaded studs, pins, and standoffs on sheet surfaces."},
  {n:"Pop Nut & Stud Clinching",c:"ASSEMBLY",d:"PEM and equivalent clinching of rivet nuts, studs, standoffs, and clinch nuts into sheet without secondary welding."},
  {n:"Tapping & Drilling",c:"MACHINING",d:"Thread tapping, up-burring, and precision drilling for fastener-ready holes and clearance features."},
  {n:"CNC Turning & Milling",c:"MACHINING",d:"Rotational and prismatic machining for shafts, bushes, brackets, and machined faces on fabricated assemblies."},
  {n:"Gasket Foaming",c:"SEALING",d:"In-place polyurethane foam-in-place gaskets for sealed enclosures, cabinets, and housing covers."},
  {n:"Powder Coating",c:"FINISHING",d:"Electrostatic powder application and oven cure for durable, corrosion-resistant colour finishes on steel and aluminium."},
  {n:"Electro Plating",c:"FINISHING",d:"Zinc, nickel, and chrome electroplating for corrosion protection and surface hardness."},
  {n:"Hot-Dip Galvanizing",c:"FINISHING",d:"Full immersion zinc galvanizing for maximum outdoor corrosion protection on structural steel components."},
  {n:"Spray Painting",c:"FINISHING",d:"Liquid spray painting in dedicated booths for decorative and protective finishes, including two-pack epoxy systems."},
  {n:"Assembly",c:"ASSEMBLY",d:"Electro-mechanical sub-assembly and final assembly on dedicated lines with EOT crane support for large or heavy fabrications."},
];

const SERVICES = [
  {num:"01",title:"CNC Punching & Bending",desc:"CNC turret punching for holes, slots, and louvers. Precision press brake bending for complex profiles and tight angular tolerances.",tag:"FORMING"},
  {num:"02",title:"CNC Turning & Milling",desc:"Multi-axis turning, DRO milling, and surface grinding for rotational and prismatic components with precise finishes.",tag:"MACHINING"},
  {num:"03",title:"MIG, TIG & Spot Welding",desc:"MIG for mild steel structures. TIG for stainless and aluminium. Spot, projection, and stud welding for high-speed fastening.",tag:"JOINING"},
  {num:"04",title:"Press Operations",desc:"Blanking, piercing, forming, and deep drawing on mechanical and hydro-pneumatic presses for enclosures and panels.",tag:"FORMING"},
  {num:"05",title:"Electro-Mechanical Assembly",desc:"Complete sub-assembly and final assembly on dedicated lines. EOT crane support for large and heavy fabrications.",tag:"ASSEMBLY"},
  {num:"06",title:"Surface Finishing",desc:"Powder coating, electro plating, hot-dip galvanizing. Spray painting, screen printing, stickering, and laser printing.",tag:"FINISHING"},
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;700&family=Share+Tech+Mono&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --steel: #1c1f22; --plate: #252a2e; --panel: #2d3338;
    --edge: #3a4149; --mark: #4a5260; --dim: #6b7a8a;
    --text: #c8cfd8; --bright: #dde4ec;
    --red: #c0392b; --sky: #2980b9; --yellow: #d4ac0d;
  }
  body { background: var(--steel); color: var(--text); font-family: 'Share Tech Mono', monospace; font-size: 14px; }
  input, select, textarea, button { font-family: 'Share Tech Mono', monospace; }
  input, select, textarea { -webkit-appearance: none; border-radius: 0; }
`;

// ── Mobile hook ───────────────────────────────────────────────────
function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 640);
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 640);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return mobile;
}

// ── Nav ──────────────────────────────────────────────────────────
function Nav({ active, goTo }) {
  const links = ["home","services","capabilities","about","certs","quote"];
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleNav = (l) => { goTo(l); setOpen(false); };

  return (
    <>
      <nav style={{ background:"var(--plate)", borderBottom:"3px solid var(--red)", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 20px", height:56, position:"sticky", top:0, zIndex:99 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div onClick={() => handleNav("home")} style={{ width:36, height:36, background:"var(--red)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Oswald,sans-serif", fontWeight:700, fontSize:16, color:"#fff", letterSpacing:1, clipPath:"polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)", cursor:"pointer", flexShrink:0 }}>PZ</div>
          <span style={{ fontFamily:"Oswald,sans-serif", fontWeight:700, fontSize:20, color:"var(--bright)", letterSpacing:3 }}>PROTOZAP</span>
        </div>
        {isMobile ? (
          <button onClick={() => setOpen(o => !o)} style={{ background:"transparent", border:"none", color:"var(--bright)", cursor:"pointer", padding:"8px 4px", display:"flex", flexDirection:"column", gap:5, alignItems:"center" }} aria-label="Menu">
            {open
              ? <span style={{ fontFamily:"Oswald,sans-serif", fontWeight:700, fontSize:20, lineHeight:1, color:"var(--dim)" }}>✕</span>
              : <>{[0,1,2].map(i => <span key={i} style={{ display:"block", width:22, height:2, background:"var(--bright)" }} />)}</>
            }
          </button>
        ) : (
          <div style={{ display:"flex" }}>
            {links.map(l => (
              <button key={l} onClick={() => handleNav(l)} style={{
                background:"transparent", border:"none", borderLeft:"1px solid var(--edge)",
                borderBottom: active===l ? "3px solid var(--red)" : "none",
                marginBottom: active===l ? -3 : 0,
                color: l==="quote" ? "var(--red)" : active===l ? "var(--red)" : "var(--dim)",
                fontFamily:"Oswald,sans-serif", fontWeight:500, fontSize:13, letterSpacing:2,
                padding:"18px 16px", cursor:"pointer", textTransform:"uppercase",
              }}>{l}</button>
            ))}
          </div>
        )}
      </nav>
      {isMobile && open && (
        <div style={{ position:"fixed", top:56, left:0, right:0, background:"var(--plate)", borderBottom:"2px solid var(--red)", zIndex:98, boxShadow:"0 8px 24px rgba(0,0,0,.5)" }}>
          {links.map(l => (
            <button key={l} onClick={() => handleNav(l)} style={{
              display:"block", width:"100%", background: active===l ? "rgba(192,57,43,.12)" : "transparent",
              border:"none", borderBottom:"1px solid var(--edge)",
              color: l==="quote" ? "var(--red)" : active===l ? "var(--red)" : "var(--bright)",
              fontFamily:"Oswald,sans-serif", fontWeight:500, fontSize:14, letterSpacing:3,
              padding:"16px 20px", cursor:"pointer", textTransform:"uppercase", textAlign:"left",
            }}>{l}</button>
          ))}
        </div>
      )}
    </>
  );
}

// ── Home ─────────────────────────────────────────────────────────
function Home({ goTo }) {
  const isMobile = useIsMobile();
  const px = isMobile ? 16 : 28;
  return (
    <div style={{ padding:`${isMobile ? 40 : 64}px ${px}px 48px`, maxWidth:900, margin:"0 auto" }}>
      <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"var(--panel)", border:"1px solid var(--edge)", padding:"5px 14px", marginBottom:24 }}>
        <div style={{ width:7, height:7, background:"var(--red)", flexShrink:0 }} />
        <span style={{ fontSize:11, letterSpacing:2, color:"var(--yellow)" }}>QUOTES IN AS LITTLE AS 24 HOURS</span>
      </div>
      <h1 style={{ fontFamily:"Oswald,sans-serif", fontWeight:700, fontSize:"clamp(32px,8vw,64px)", lineHeight:1, color:"var(--bright)", letterSpacing:2, textTransform:"uppercase", marginBottom:8 }}>
        PRECISION<br /><span style={{ color:"var(--sky)" }}>SHEET METAL</span><br />FABRICATION
      </h1>
      <p style={{ fontSize:13, color:"var(--dim)", lineHeight:1.8, maxWidth:520, margin:"20px 0 32px", borderLeft:"3px solid var(--red)", paddingLeft:14 }}>
        Low-volume. Fast turnaround. Every process in-house — from CNC punching and bending to welding, press operations, finishing, and assembly.
      </p>
      <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
        <button onClick={() => goTo("quote")} style={{ background:"var(--red)", color:"#fff", border:"none", fontFamily:"Oswald,sans-serif", fontWeight:700, fontSize:14, letterSpacing:2, textTransform:"uppercase", padding:"12px 26px", cursor:"pointer", clipPath:"polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)" }}>
          GET A QUOTE ›
        </button>
        <button onClick={() => goTo("services")} style={{ background:"transparent", color:"var(--sky)", border:"1px solid var(--sky)", fontFamily:"Oswald,sans-serif", fontWeight:700, fontSize:14, letterSpacing:2, textTransform:"uppercase", padding:"12px 26px", cursor:"pointer" }}>
          OUR SERVICES
        </button>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", marginTop:48, border:"1px solid var(--edge)", width: isMobile ? "100%" : "fit-content" }}>
        {[["24H","QUOTE TURNAROUND"],["15+","YEARS EXPERIENCE"],["500+","HAPPY CLIENTS"],["1PC","MINIMUM ORDER"]].map(([n,l],i) => (
          <div key={l} style={{ padding: isMobile ? "16px 20px" : "18px 32px", borderRight: i%2===0 ? "1px solid var(--edge)" : "none", borderBottom: i < 2 ? "1px solid var(--edge)" : "none" }}>
            <div style={{ fontFamily:"Oswald,sans-serif", fontWeight:700, fontSize: isMobile ? 26 : 32, color:"var(--red)" }}>{n}</div>
            <div style={{ fontSize:10, letterSpacing:2, color:"var(--dim)", marginTop:2 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Section Header ───────────────────────────────────────────────
function SecHead({ label, title }) {
  const isMobile = useIsMobile();
  return (
    <div style={{ padding:`48px ${isMobile ? 16 : 28}px 0`, maxWidth:900, margin:"0 auto 36px" }}>
      <div style={{ fontSize:10, letterSpacing:3, color:"var(--red)", marginBottom:10 }}>{label}</div>
      <h2 style={{ fontFamily:"Oswald,sans-serif", fontWeight:700, fontSize: isMobile ? 22 : 28, color:"var(--bright)", textTransform:"uppercase", letterSpacing:2, paddingBottom:12, borderBottom:"2px solid var(--edge)", display:"flex", alignItems:"center", gap:12 }}>
        <span style={{ color:"var(--mark)", fontSize:20 }}>{"//"}</span>{title}
      </h2>
    </div>
  );
}

// ── Services ─────────────────────────────────────────────────────
function Services() {
  const [hov, setHov] = useState(null);
  const isMobile = useIsMobile();
  return (
    <div>
      <SecHead label="// WHAT WE DO" title="Services" />
      <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit,minmax(260px,1fr))", gap:2, maxWidth:900, margin:"0 auto", padding:`0 ${isMobile ? 16 : 28}px 48px` }}>
        {SERVICES.map((s,i) => (
          <div key={s.num} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
            style={{ background:"var(--panel)", border:`1px solid ${hov===i?"var(--sky)":"var(--edge)"}`, padding:"24px 22px", position:"relative", overflow:"hidden", transition:"border-color .2s" }}>
            <div style={{ position:"absolute", top:12, right:14, fontFamily:"Oswald,sans-serif", fontWeight:700, fontSize:36, color:"var(--edge)", lineHeight:1 }}>{s.num}</div>
            <h3 style={{ fontFamily:"Oswald,sans-serif", fontWeight:700, fontSize:16, color:"var(--bright)", letterSpacing:1, textTransform:"uppercase", marginBottom:8 }}>{s.title}</h3>
            <p style={{ fontSize:12, color:"var(--dim)", lineHeight:1.8 }}>{s.desc}</p>
            <div style={{ display:"inline-block", marginTop:14, fontSize:10, letterSpacing:2, color:"var(--yellow)", background:"rgba(212,172,13,.1)", border:"1px solid rgba(212,172,13,.3)", padding:"3px 10px" }}>{s.tag}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Capabilities ─────────────────────────────────────────────────
function Capabilities() {
  const [open, setOpen] = useState(null);
  const isMobile = useIsMobile();
  return (
    <div>
      <SecHead label="// MACHINES & PROCESSES" title="Capabilities" />
      <div style={{ maxWidth:900, margin:"0 auto", padding:`0 ${isMobile ? 16 : 28}px 48px` }}>
        {PROCS.map((p,i) => (
          <div key={p.n} onClick={() => setOpen(open===i?null:i)}
            style={{ borderBottom:`1px solid ${open===i?"var(--sky)":"var(--edge)"}`, cursor:"pointer", background: open===i?"rgba(41,128,185,.06)":"transparent", transition:"background .15s" }}>
            <div style={{ display:"flex", alignItems:"flex-start" }}>
              <div style={{ fontFamily:"Oswald,sans-serif", fontWeight:700, fontSize:13, color:"var(--mark)", minWidth:isMobile ? 36 : 52, padding:"16px 0" }}>{String(i+1).padStart(2,"0")}</div>
              <div style={{ fontFamily:"Oswald,sans-serif", fontWeight:500, fontSize: isMobile ? 13 : 15, color:"var(--bright)", flex:1, padding:"16px 0", letterSpacing:1, textTransform:"uppercase", paddingRight:8 }}>{p.n}</div>
              {!isMobile && <div style={{ fontSize:10, color:"var(--sky)", letterSpacing:2, padding:"18px 0 16px", minWidth:100, textAlign:"right" }}>{p.c}</div>}
            </div>
            {isMobile && open===i && <div style={{ fontSize:10, color:"var(--sky)", letterSpacing:2, paddingBottom:4, paddingLeft:36 }}>{p.c}</div>}
            {open===i && <div style={{ fontSize:12, color:"var(--dim)", lineHeight:1.8, padding:`0 0 14px ${isMobile ? 36 : 52}px` }}>{p.d}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── About ────────────────────────────────────────────────────────
function About() {
  const isMobile = useIsMobile();
  const facts = [["LOCATION","India"],["FOUNDED","2009"],["MIN ORDER","1 piece"],["LEAD TIME","3–10 working days"],["QUOTE TIME","As little as 24 hours"],["MATERIALS","MS, SS 304/316, Al 5052/6061, GI, Copper, Brass"],["FILE FORMATS","STEP, STP, DXF, IGES"],["EMAIL","proto@protozap.com"]];
  return (
    <div>
      <SecHead label="// WHO WE ARE" title="About Protozap" />
      <div style={{ maxWidth:900, margin:"0 auto", padding:`0 ${isMobile ? 16 : 28}px 60px` }}>
        <PlateBlock title="// Overview">
          <p style={{ fontSize:13, color:"var(--dim)", lineHeight:1.9 }}>
            Protozap is a precision sheet metal fabrication shop built for engineers and product teams who need fast, reliable parts without high minimums. We run every process in-house — cutting, forming, welding, assembly, and finishing — so your parts move through production without delays.<br /><br />
            We specialise in low-volume orders from single prototypes to batches of 500 units. Upload your STEP file, tell us the material and thickness, and receive a quote within 24 hours.
          </p>
        </PlateBlock>
        <PlateBlock title="// Key Facts">
          <table style={{ width:"100%", borderCollapse:"collapse", marginTop:14 }}>
            <tbody>
              {facts.map(([k,v]) => (
                <tr key={k}>
                  <td style={{ padding:"9px 12px", borderBottom:"1px solid var(--edge)", fontSize:12, color:"var(--dim)", width: isMobile ? 110 : 140, verticalAlign:"top" }}>{k}</td>
                  <td style={{ padding:"9px 12px", borderBottom:"1px solid var(--edge)", fontSize:12, color:"var(--bright)" }}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </PlateBlock>
      </div>
    </div>
  );
}

function PlateBlock({ title, children }) {
  return (
    <div style={{ background:"var(--panel)", border:"1px solid var(--edge)", padding:"28px", marginBottom:14, position:"relative" }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"var(--sky)" }} />
      <div style={{ fontFamily:"Oswald,sans-serif", fontWeight:700, fontSize:13, color:"var(--sky)", letterSpacing:3, textTransform:"uppercase", marginBottom:14 }}>{title}</div>
      {children}
    </div>
  );
}

// ── Certifications ───────────────────────────────────────────────
function Certs() {
  const certs = [
    {code:"ISO 9001:2015",label:"Quality Management System — consistent processes and continual improvement.",status:"CERTIFIED"},
    {code:"ISO 14001:2015",label:"Environmental Management System — responsible handling of materials, waste, and energy.",status:"IN PROGRESS"},
    {code:"MSME",label:"Registered Micro, Small & Medium Enterprise under Government of India.",status:"REGISTERED"},
    {code:"GST",label:"Goods & Services Tax registered and fully compliant — GSTIN verified.",status:"VERIFIED"},
  ];
  const [hov, setHov] = useState(null);
  const isMobile = useIsMobile();
  return (
    <div>
      <SecHead label="// QUALITY & COMPLIANCE" title="Certifications" />
      <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fit,minmax(200px,1fr))", gap:2, maxWidth:900, margin:"0 auto", padding:`0 ${isMobile ? 16 : 28}px 24px` }}>
        {certs.map((c,i) => (
          <div key={c.code} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
            style={{ background:"var(--panel)", border:`1px solid ${hov===i?"var(--sky)":"var(--edge)"}`, padding: isMobile ? "16px 14px" : "22px 20px", transition:"border-color .2s" }}>
            <div style={{ display:"flex", gap:8, marginBottom:10 }}>
              {[0,1].map(j => <div key={j} style={{ width:8, height:8, borderRadius:"50%", background:"var(--mark)", border:"1px solid var(--edge)" }} />)}
            </div>
            <div style={{ fontFamily:"Oswald,sans-serif", fontWeight:700, fontSize: isMobile ? 14 : 18, color:"var(--bright)", letterSpacing:1, marginBottom:6 }}>{c.code}</div>
            <div style={{ fontSize:11, color:"var(--dim)", lineHeight:1.6, marginBottom:10 }}>{c.label}</div>
            <div style={{ fontSize:10, letterSpacing:2, color:"var(--yellow)" }}>{c.status}</div>
          </div>
        ))}
      </div>
      <div style={{ maxWidth:900, margin:"0 auto", padding:`0 ${isMobile ? 16 : 28}px 60px` }}>
        <PlateBlock title="// Quality Assurance">
          <p style={{ fontSize:13, color:"var(--dim)", lineHeight:1.9 }}>Every part is dimensionally inspected before dispatch. We maintain first-article inspection reports, material test certificates, and full traceability records on all orders. Customers can request inspection reports for any batch.</p>
        </PlateBlock>
      </div>
    </div>
  );
}

// ── Quote ────────────────────────────────────────────────────────
// Replace YOUR_FORM_ID with your Formspree form ID (free at formspree.io)
const FORMSPREE_URL = "https://formspree.io/f/YOUR_FORM_ID";

function Quote() {
  const [contact, setContact] = useState({ name:"", company:"", email:"", phone:"" });
  const [parts, setParts] = useState([newPart(1)]);
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);
  const isMobile = useIsMobile();

  function newPart(id) { return { id, file:null, material:MATS[0], thickness:"", finish:FINS[0], qty:"1", notes:"" }; }

  const addPart = () => setParts(p => [...p, newPart(Date.now())]);
  const removePart = id => setParts(p => p.filter(x => x.id !== id));
  const updatePart = (id, field, val) => setParts(p => p.map(x => x.id===id ? {...x,[field]:val} : x));
  const onFile = (id, e) => { const f = e.target.files[0]; if (f) updatePart(id,"file",f); };

  const submit = async () => {
    if (!contact.name || !contact.email) { alert("Please enter your name and email."); return; }
    setSending(true);
    const fd = new FormData();
    fd.append("name", contact.name);
    fd.append("company", contact.company || "—");
    fd.append("_replyto", contact.email);
    fd.append("phone", contact.phone || "—");
    fd.append("_subject", `Quote Request — ${contact.name}`);
    parts.forEach((p, i) => {
      if (p.file) fd.append(`part_${i+1}_file`, p.file, p.file.name);
      fd.append(`part_${i+1}_material`, p.material);
      fd.append(`part_${i+1}_thickness`, `${p.thickness} mm`);
      fd.append(`part_${i+1}_finish`, p.finish);
      fd.append(`part_${i+1}_qty`, p.qty);
      if (p.notes) fd.append(`part_${i+1}_notes`, p.notes);
    });
    try {
      const res = await fetch(FORMSPREE_URL, { method:"POST", body:fd, headers:{ Accept:"application/json" } });
      if (res.ok) { setSuccess(true); }
      else { alert("Submission failed. Please email proto@protozap.com directly."); }
    } catch { alert("Network error. Please email proto@protozap.com directly."); }
    setSending(false);
  };

  const inp = { width:"100%", background:"var(--plate)", border:"1px solid var(--edge)", color:"var(--bright)", fontFamily:"'Share Tech Mono',monospace", fontSize:13, padding:"10px 12px", outline:"none" };
  const lbl = { display:"block", fontSize:10, letterSpacing:2, color:"var(--dim)", marginBottom:6 };
  const px = isMobile ? 16 : 28;

  return (
    <div>
      <SecHead label="// UPLOAD YOUR PARTS" title="Get a Quote" />
      <div style={{ maxWidth:700, margin:"0 auto", padding:`0 ${px}px 60px` }}>
        {success ? (
          <div style={{ background:"rgba(41,128,185,.15)", border:"1px solid var(--sky)", padding:24, textAlign:"center" }}>
            <div style={{ fontFamily:"Oswald,sans-serif", fontWeight:700, fontSize:20, color:"var(--bright)", marginBottom:8 }}>REQUEST SUBMITTED</div>
            <p style={{ fontSize:12, color:"var(--dim)", marginBottom:16 }}>Your files and details have been sent. We respond within 24 hours.</p>
            <button onClick={() => setSuccess(false)} style={{ background:"var(--sky)", color:"#fff", border:"none", fontFamily:"Oswald,sans-serif", fontWeight:700, fontSize:13, letterSpacing:2, padding:"10px 24px", cursor:"pointer" }}>SUBMIT ANOTHER</button>
          </div>
        ) : (
          <>
            {/* Contact */}
            <PlateBlock title="// Contact Details">
              <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:14, marginBottom:14 }}>
                {[["name","FULL NAME *","text"],["company","COMPANY","text"],["email","EMAIL *","email"],["phone","PHONE / WHATSAPP","text"]].map(([f,l,t]) => (
                  <div key={f}>
                    <label style={lbl}>{l}</label>
                    <input type={t} style={inp} value={contact[f]} onChange={e => setContact(c => ({...c,[f]:e.target.value}))} />
                  </div>
                ))}
              </div>
            </PlateBlock>

            {/* Parts */}
            {parts.map((part, idx) => (
              <div key={part.id} style={{ background:"var(--panel)", border:"1px solid var(--edge)", padding:"20px 20px 14px", marginBottom:14 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                  <div style={{ fontFamily:"Oswald,sans-serif", fontWeight:700, fontSize:13, color:"var(--yellow)", letterSpacing:2 }}>{"//"} PART {idx+1}</div>
                  {parts.length > 1 && (
                    <button onClick={() => removePart(part.id)} style={{ background:"transparent", color:"var(--sky)", border:"1px solid var(--sky)", fontFamily:"Oswald,sans-serif", fontWeight:700, fontSize:11, letterSpacing:1, padding:"4px 12px", cursor:"pointer" }}>REMOVE</button>
                  )}
                </div>
                <label style={{ display:"block", border:"1px dashed var(--sky)", padding:18, textAlign:"center", cursor:"pointer", marginBottom:14 }}>
                  <input type="file" accept=".step,.stp,.dxf,.iges,.igs" style={{ display:"none" }} onChange={e => onFile(part.id, e)} />
                  <div style={{ fontSize:11, color:"var(--dim)", letterSpacing:1 }}>TAP TO UPLOAD — STEP / STP / DXF / IGES</div>
                  {part.file && <div style={{ fontSize:12, color:"var(--sky)", marginTop:4 }}>[ {part.file.name} ]</div>}
                </label>
                <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:14, marginBottom:14 }}>
                  <div><label style={lbl}>MATERIAL *</label><select style={{...inp, cursor:"pointer"}} value={part.material} onChange={e => updatePart(part.id,"material",e.target.value)}>{MATS.map(m => <option key={m}>{m}</option>)}</select></div>
                  <div><label style={lbl}>THICKNESS (mm) *</label><input style={inp} placeholder="e.g. 1.5" value={part.thickness} onChange={e => updatePart(part.id,"thickness",e.target.value)} /></div>
                  <div><label style={lbl}>FINISH</label><select style={{...inp, cursor:"pointer"}} value={part.finish} onChange={e => updatePart(part.id,"finish",e.target.value)}>{FINS.map(f => <option key={f}>{f}</option>)}</select></div>
                  <div><label style={lbl}>QUANTITY</label><input type="number" style={inp} min="1" value={part.qty} onChange={e => updatePart(part.id,"qty",e.target.value)} /></div>
                </div>
                <div><label style={lbl}>NOTES</label><textarea style={{...inp, minHeight:72, resize:"vertical"}} value={part.notes} placeholder="Tolerances, colour, thread specs..." onChange={e => updatePart(part.id,"notes",e.target.value)} /></div>
              </div>
            ))}

            <button onClick={addPart} style={{ width:"100%", background:"transparent", color:"var(--sky)", border:"1px dashed var(--sky)", fontFamily:"Oswald,sans-serif", fontWeight:700, fontSize:14, letterSpacing:2, padding:14, cursor:"pointer", marginBottom:14 }}>+ ADD PART</button>
            <button onClick={submit} disabled={sending} style={{ width:"100%", background:"var(--red)", color:"#fff", border:"none", fontFamily:"Oswald,sans-serif", fontWeight:700, fontSize:16, letterSpacing:2, padding:16, cursor:sending?"not-allowed":"pointer", clipPath:"polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)", opacity:sending?0.7:1 }}>{sending ? "SENDING…" : "SUBMIT QUOTE REQUEST ›"}</button>
            <p style={{ textAlign:"center", fontSize:10, color:"var(--mark)", letterSpacing:1, marginTop:10 }}>REQUEST SENT TO proto@protozap.com — RESPONSE WITHIN 24 HOURS</p>
          </>
        )}
      </div>
    </div>
  );
}

// ── Footer ───────────────────────────────────────────────────────
function Footer() {
  return (
    <div style={{ background:"var(--plate)", borderTop:"3px solid var(--edge)", padding:28, textAlign:"center" }}>
      <div style={{ fontFamily:"Oswald,sans-serif", fontWeight:700, fontSize:18, color:"var(--bright)", letterSpacing:4, marginBottom:6 }}>PROTOZAP</div>
      <div style={{ fontSize:11, color:"var(--mark)", letterSpacing:1 }}>PRECISION SHEET METAL FABRICATION — INDIA — proto@protozap.com — © {new Date().getFullYear()}</div>
    </div>
  );
}

// ── App ──────────────────────────────────────────────────────────
const SECTIONS = { home: Home, services: Services, capabilities: Capabilities, about: About, certs: Certs, quote: Quote };

export default function App() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const Section = SECTIONS[active];
  return (
    <div style={{ backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 47px,var(--edge) 47px,var(--edge) 48px),repeating-linear-gradient(90deg,transparent,transparent 47px,var(--edge) 47px,var(--edge) 48px)", minHeight:"100vh", display:"flex", flexDirection:"column" }}>
      <Nav active={active} goTo={setActive} />
      <div style={{ flex:1 }}>
        <Section goTo={setActive} />
      </div>
      <Footer />
    </div>
  );
}
