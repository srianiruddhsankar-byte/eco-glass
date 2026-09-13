// Shared data for both labs — materials, literature citations, and rule sets.
// Nothing here is framework-specific; plain ES module, imported by both pages.

// Quantitative crack-deflection threshold: Γinterface/Γbulk below this ratio means
// a crack deflects along the interface instead of punching through it.
// IMPORTANT ATTRIBUTION FIX: this energy-based ratio and the ~1/4 (isotropic-case)
// number come from He & Hutchinson (1989), Int. J. Solids Structures 25(9):1053–1067
// — not from Cook & Gordon (1964). Cook & Gordon's original paper proposed the
// *qualitative* deflection mechanism using a different, stress-based argument
// (interface strength needs to be roughly 5x weaker than the bulk material's
// strength) — it does not contain an energy-ratio number at all, let alone 1/(2π).
// This site previously mislabeled He & Hutchinson's number as "Cook & Gordon (1964)
// ≈ 0.159" — corrected here to the real citation and the real isotropic-case value.
export const INTERFACE_TOUGHNESS_THRESHOLD = 1 / 4; // He & Hutchinson (1989), isotropic case
export const COOK_GORDON_THRESHOLD = INTERFACE_TOUGHNESS_THRESHOLD; // kept for backward compatibility

// Fiber-layer materials. interfaceRatio = Γ_interface / Γ_bulk relative to the
// layer it sits against — used by the crack sim to decide deflect vs punch-through.
export const fiberMaterials = {
  silica: {
    label: "Silica (natural, silicatein-grown)",
    color: 0x5dcaa5,
    toughness: 1.0,
    clarity: 1.0,
    interfaceRatio: 1.0
  },
  chitin: {
    label: "Chitin interface layer",
    color: 0xf0997b,
    toughness: 1.6,
    clarity: 0.65,
    interfaceRatio: 0.11
  },
  plainGlass: {
    label: "Plain fused quartz (control)",
    color: 0xb4b2a9,
    toughness: 0.55,
    clarity: 1.0,
    interfaceRatio: 1.0
  },
  titaniumMesh: {
    label: "Titanium mesh (experimental)",
    color: 0x85b7eb,
    toughness: 3.1,
    clarity: 0.0,
    interfaceRatio: 0.4
  },
  kevlar: {
    label: "Kevlar weave (experimental)",
    color: 0xef9f27,
    toughness: 2.5,
    clarity: 0.08,
    interfaceRatio: 0.35
  }
};

// 8 representative fiber layers standing in for the 16-layer real design
// (each entry = one silica/organic pair collapsed to one visible shell).
export const fiberLayers = [
  { name: "Core (8 μm)", desc: "Silicatein-grown silica filament — carries the optical signal.", mat: "silica" },
  { name: "Interface 1", desc: "First crack-arrest boundary against the core.", mat: "chitin" },
  { name: "Shell 1", desc: "Silica shell, sets local refractive index.", mat: "silica" },
  { name: "Interface 2", desc: "Deflects fractures propagating from Shell 1.", mat: "chitin" },
  { name: "Shell 2", desc: "Adds rigidity, resists bending under cable movement.", mat: "silica" },
  { name: "Interface 3", desc: "Absorbs shear stress from pressure cycling.", mat: "chitin" },
  { name: "Shell 3", desc: "Secondary index-gradient control layer.", mat: "silica" },
  { name: "Outer boundary", desc: "Low-index cladding edge — keeps light reflecting inward.", mat: "chitin" }
];

// Locked quartz baseline — every layer is plain fused quartz, no organic interfaces.
export const quartzBaseline = fiberLayers.map(() => "plainGlass");

// Real subsea cable layers (outside-in), per patent/engineering references.
export const cableLayers = [
  { name: "Polyethylene jacket", desc: "Outer abrasion and corrosion barrier.", color: 0x2c2c2a, r: 1.0 },
  { name: "Mylar tape wrap", desc: "Holds the wire armor bundle together.", color: 0x63625c, r: 0.86 },
  { name: "Stranded steel wires", desc: "Tensile strength — resists anchor and trawler snags.", color: 0x378add, r: 0.74 },
  { name: "Aluminum water barrier", desc: "Blocks moisture ingress, spreads radial load.", color: 0xb4b2a9, r: 0.6 },
  { name: "Polycarbonate insulation", desc: "Dielectric layer around the conductive tube.", color: 0x888780, r: 0.48 },
  { name: "Copper / aluminum tube", desc: "Carries repeater power, crush-resistant.", color: 0xef9f27, r: 0.36 },
  { name: "Petroleum jelly filler", desc: "Prevents water ingress if the tube is breached.", color: 0x412402, r: 0.22 },
  { name: "Optical fiber bundle", desc: "Your biophotonic fiber design lives here.", color: 0x5dcaa5, r: 0.1 }
];

// Literature backing the rule set. Every rule below cites one of these.
// Two tiers, kept deliberately visible rather than blended together:
//  - Telecom/cable standards (ITU-T etc.) = validated, apply to any fiber/cable
//  - Sponge biomechanics papers = the biomimetic HYPOTHESIS this project is testing,
//    not yet confirmed to translate into a working telecom-grade fiber
export const citations = {
  // --- biomimetic mechanism (hypothesis tier) ---
  cookGordon: {
    label: "Cook & Gordon (1964), Proc. Roy. Soc. A 282: 508–520",
    note: "Established the qualitative mechanism: a crack approaching a weak interface can deflect along it instead of punching through, because the stress acting along the interface direction is only about 1/5 of the stress driving the crack forward. This is a stress-based argument, not a fracture-energy ratio — the specific Γinterface/Γbulk threshold this simulator uses for the deflection test comes from a later, more rigorous paper (see He & Hutchinson below), not from this one."
  },
  heHutchinson1989: {
    label: "He & Hutchinson (1989), Int. J. Solids Structures 25(9): 1053–1067",
    note: "Derived the energy-based crack deflection criterion this simulator actually uses: for isotropic materials with no elastic mismatch across the interface, a crack deflects along the interface rather than penetrating it when the interface fracture toughness is below about 1/4 of the bulk material's toughness. This is the real source of the numeric threshold — it does not appear in the original 1964 Cook & Gordon paper, which used a different (stress-based) argument."
  },
  aizenberg2005: {
    label: "Aizenberg et al. (2005), Science 309: 275–278",
    note: "SEM evidence of stair-step crack deflection through the organic interlayers of Euplectella aspergillum spicules."
  },
  miserez2008: {
    label: "Miserez et al. (2008), Adv. Funct. Mater. 18: 1241",
    note: "Found biogenic silica has lower intrinsic modulus, hardness, and fracture toughness than synthetic glass — toughening comes from the laminate architecture, not the material itself. The magnitude of any real-world gain is still an open question, not a settled 400 percent figure."
  },
  shimizu1998: {
    label: "Shimizu, Cha, Stucky & Morse (1998), PNAS 95: 6234–6238",
    note: "Identified silicatein and confirmed it catalyzes silica polymerization at ambient temperature and neutral pH — the biological basis for room-temperature fiber synthesis."
  },
  bendingReview: {
    label: "Microstructural hierarchy of E. aspergillum review, IOP Bioinspir. Biomim. (2025)",
    note: "Reports spicules survive roughly 3x greater strain in bending than in tension before fracture, consistent with the sponge's natural bending-dominated stress environment."
  },
  // --- validated telecom-fiber standards ---
  ituG6501: {
    label: "ITU-T G.650.1 (01/2024), Definitions and test methods for single-mode fibre",
    note: "Standardizes how attenuation, macrobending loss, proof-test stress, and stress-corrosion (crack growth) parameters are measured — independent of what the fibre is made from."
  },
  ituG652: {
    label: "ITU-T G.652 (08/2024), Characteristics of a single-mode optical fibre and cable",
    note: "Sets reference values for conventional telecom fibre (categories A–D): a minimum proof stress of 0.69 GPa, and a macrobend test of 100 turns at 30 mm radius with a max added loss around 0.1 dB at 1550/1625 nm — real, unchanged across editions back to the 1990s."
  },
  ituG657: {
    label: "ITU-T G.657 (08/2024), Bending-loss-insensitive single-mode fibre",
    note: "A fibre category engineered to tolerate much tighter bend radii (down to 5–15 mm) for a given added loss — shows how much macrobending performance already varies among conventional, non-biomimetic fibres."
  },
  gardnerMarcuse: {
    label: "Gardner (1975) & Marcuse (1976), Bell System Technical Journal",
    note: "Foundational analysis of microbending loss: light escaping the core from microscopic axial distortions, not a visible large-radius bend — relevant to any multi-layer or laminated fibre design."
  },
  ituG978: {
    label: "ITU-T G.978 (05/2025), Characteristics of optical fibre submarine cables",
    note: "Defines submarine cable protection classes (LW, LWP, SA, DA, RA), the mechanical tension parameters (NTTS/NOTS/NPTS), and requirements for water, hydrogen and pressure protection around the fibre. Note: ITU-T leaves the actual kN values 'for further study' per system — real cables cite manufacturer-specific numbers within this framework, not one universal figure."
  },
  ituGsup41: {
    label: "ITU-T G Suppl. 41 (07/2024), Design guidelines for submarine cable systems",
    note: "Reports that the large majority of real subsea cable faults trace to fishing activity and ship anchors, not material fatigue — the basis for treating anchor/trawler strikes as the dominant real-world hazard."
  }
};

/* Cable armor rule set, based on ITU-T G.978's actual submarine-cable framework.
   "computed: true" rules are evaluated numerically by the sliders in this simulator;
   "computed: false" rules are real G.978 requirements this dry-lab tool doesn't
   have the sliders/data to test — shown for accuracy, not faked with a number. */
export const cableRules = [
  { id: "C1", computed: true, text: "Tensile strength: if anchor/trawler tension exceeds the wire armor's tensile capacity, the cable is severed outright — no inner-layer choice changes this. G.978 itself leaves the actual kN values 'for further study'; real manufacturer datasheets fill that gap — e.g. one commercial double-armoured design lists a Nominal Permanent Tensile Strength (NPTS) of 50 kN, a Nominal Operating Tensile Strength (NOTS) of 80 kN, and a Nominal Transient Tensile Strength (NTTS) of 150 kN. This simulator scales anchor force and armor capacity to a relative 0–100 scale rather than raw kN.", cite: "ituG978" },
  { id: "C2", computed: false, text: "Minimum bend radius: G.978 requires the cable stay above a specified minimum bend radius during laying, recovery and repair — tighter bends risk both the armor and the fibre inside it. Not modeled here (no bend-radius control on this page); see the standard for real test conditions.", cite: "ituG978" },
  { id: "C3", computed: true, text: "Water/pressure protection: if hydrostatic pressure at depth exceeds the water-barrier and tube layer's crush threshold, water ingress risk dominates regardless of fiber toughness.", cite: "ituG978" },
  { id: "C4", computed: true, text: "External protection: G.978 defines protection classes from lightweight (LW) to rock-armored (RA) for resisting abrasion, fish bite and ship activity. This simulator's jacket abrasion capacity is a stand-in for that class system, not an official class rating.", cite: "ituG978" },
  { id: "C5", computed: false, text: "External hazards: fishing trawlers and ship anchors — not material fatigue — cause the large majority of real subsea cable faults. This simulator treats anchor strikes as a hard cutoff (rule C1) for that reason, but doesn't separately model trawl vs. anchor vs. geological hazard.", cite: "ituGsup41" },
  { id: "C6", computed: false, text: "Fibre–cable strain coupling: G.978 distinguishes 'tight' structures (fibre elongation tracks cable elongation) from 'loose' ones (fibre stays slack until cable strain passes a threshold). Not modeled here — this simulator treats the fiber core as a separate pass/fail handed off from the cable lab, not as continuously strain-coupled.", cite: "ituG978" },
  { id: "C7", computed: false, text: "Hydrogen / chemical ageing: G.978 requires minimizing hydrogen penetration and generation inside the cable over its design life, since hydrogen exposure raises fibre attenuation over time. Not modeled here — would require real material outgassing data.", cite: "ituG978" },
  { id: "C8", computed: false, text: "Optical performance after cabling: G.978 requires that putting the bare fibre inside the finished cable adds only a small, bounded increase in attenuation (Δα = α_cabled − α_bare). This is effectively what the Fiber lab's own signal-loss test (rule F1) is checking on the other side of this handoff.", cite: "ituG978" }
];

/* Fiber core rule set — replaces the old, unsourced F1–F5. Every numeric bar
   below (0.69 GPa, 0.1 dB macrobend, 0.4 dB/km attenuation) is a real ITU-T
   reference value, not an invented threshold. Where this simulator can't
   measure the real physical quantity (actual GPa, actual dB/km from real
   optical power), the rule says so explicitly rather than faking precision. */
export const fiberRules = [
  { id: "F1", computed: true, text: "Attenuation: real fibre attenuation is α = 10/L·log10(Pin/Pout) dB/km, judged against a telecom bar around 0.3–0.4 dB/km (ITU-T G.652.B). This simulator estimates an equivalent dB/km from layer clarity loss and temperature deviation as a heuristic proxy — it is not a measured optical result.", cite: "ituG652" },
  { id: "F2", computed: true, text: "Macrobending: G.652/G.657 test fibre by wrapping it 100 turns around a 30 mm radius mandrel and capping added loss near 0.1 dB. This simulator maps bend-cycle load onto an equivalent macrobend penalty and checks it against that same 0.1 dB bar.", cite: "ituG657" },
  { id: "F3", computed: true, text: "Microbending: even without a visible large-radius bend, microscopic axial irregularities couple light out of the core — a bigger risk for a multi-interface laminate than for uniform quartz. This simulator flags it whenever organic interfaces are present, as a qualitative risk note, not a dB figure — the real magnitude needs physical measurement.", cite: "gardnerMarcuse" },
  { id: "F4", computed: true, text: "Mechanical proof test: real fibre is proof-tested to a minimum tensile stress (0.69 GPa for G.652.B) to weed out flaws. This simulator's toughness score is a relative margin against the quartz baseline, not a measured GPa figure — an actual proof stress requires a physical prototype on a tensile rig.", cite: "ituG652" },
  { id: "F5", computed: true, text: "Environmental fatigue: applied stress plus exposure time and environmental severity (humidity, temperature) drive stress-corrosion crack growth in glass over time. This simulator raises failure risk with combined depth + bend load as a stand-in for that effect — it does not model a specific lifetime in years.", cite: "ituG6501" },
  { id: "F6", computed: false, text: "Chromatic dispersion / PMD: a real telecom fibre also has to preserve signal quality over distance, not just survive physically. Not modeled in this simulator — no wavelength or bit-rate simulation exists here yet.", cite: "ituG6501" }
];

// Group B — experiments that cannot be settled on paper, only in a physical lab.
// Each is rendered as its own virtual "dry lab" module.
/* ---------- persistent test log (saved in this browser only) ---------- */
const LOG_KEY = "abyssalglass_log_v1";

export function loadLog() {
  try {
    const raw = localStorage.getItem(LOG_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
}

export function saveLogEntry(entry) {
  const log = loadLog();
  const record = {
    id: "t" + Date.now() + Math.floor(Math.random() * 1000),
    name: entry.name || defaultRunName(entry.lab),
    lab: entry.lab, // "fiber" | "cable"
    timestamp: Date.now(),
    params: entry.params,
    results: entry.results
  };
  log.unshift(record);
  localStorage.setItem(LOG_KEY, JSON.stringify(log));
  return record;
}

export function renameLogEntry(id, newName) {
  const log = loadLog().map(r => r.id === id ? { ...r, name: newName } : r);
  localStorage.setItem(LOG_KEY, JSON.stringify(log));
}

export function deleteLogEntry(id) {
  const log = loadLog().filter(r => r.id !== id);
  localStorage.setItem(LOG_KEY, JSON.stringify(log));
}

export function clearLog(lab) {
  const log = lab ? loadLog().filter(r => r.lab !== lab) : [];
  localStorage.setItem(LOG_KEY, JSON.stringify(log));
}

let runCounters = { fiber: 0, cable: 0 };
function defaultRunName(lab) {
  runCounters[lab] = (runCounters[lab] || 0) + 1;
  return (lab === "fiber" ? "Fiber" : "Cable") + " run " + runCounters[lab];
}

export const validationExperiments = [
  {
    id: "V1",
    title: "Mechanical–optical trade-off",
    question: "Is the toughness gain worth the optical loss it causes?",
    method: "Vary organic interface count (0/4/8/16) and plot simulated attenuation against fracture toughness.",
    status: "simulated"
  },
  {
    id: "V2",
    title: "Fracture toughness magnitude",
    question: "Is +400% real, or a modest, literature-consistent gain?",
    method: "Three-point bend / crack-propagation test on real prototype samples, compared against Miserez et al. baseline data.",
    status: "requires-prototype"
  },
  {
    id: "V3",
    title: "Telecom-grade performance",
    question: "Can it carry data over distance at usable speed?",
    method: "Measure attenuation (dB/km) and bandwidth directly, compare against IEC/ITU-T fiber standards.",
    status: "requires-prototype"
  },
  {
    id: "V4",
    title: "Long-term reliability (~25 yr)",
    question: "Do organic interfaces degrade over decades?",
    method: "Accelerated aging: heat cycling, humidity/seawater exposure, extrapolate degradation rate.",
    status: "requires-prototype"
  },
  {
    id: "V5",
    title: "Deep-sea pressure survival",
    question: "Does the layered structure hold under hydrostatic pressure at depth?",
    method: "High-pressure chamber testing simulating seabed conditions.",
    status: "requires-prototype"
  },
  {
    id: "V6",
    title: "Fatigue under repeated bending",
    question: "Does it survive thousands to millions of bend cycles, not just one?",
    method: "Cyclic flex-fatigue testing until failure, compared against conventional fiber cycle counts.",
    status: "requires-prototype"
  },
  {
    id: "V7",
    title: "Cost at scale",
    question: "Is enzymatic synthesis actually cheaper once scaled?",
    method: "Techno-economic analysis once a pilot-scale process exists — cannot be answered on paper.",
    status: "requires-pilot"
  },
  {
    id: "V8",
    title: "Carbon / energy savings",
    question: "Does skipping the 2000°C furnace net a smaller footprint once enzyme production is counted?",
    method: "Full life-cycle assessment: raw material through synthesis, drawing, and coating, cradle-to-cradle vs. conventional fiber.",
    status: "requires-pilot"
  },
  {
    id: "V9",
    title: "Interface bonding strength",
    question: "What's the right balance — too strong and cracks cross anyway, too weak and layers delaminate?",
    method: "Empirically test a range of interface chemistries, measure which resists both failure modes.",
    status: "requires-prototype"
  }
];