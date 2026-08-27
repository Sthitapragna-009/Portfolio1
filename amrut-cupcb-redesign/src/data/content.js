// Source content adapted from the official AMRUT Centre of Urban Planning for
// Capacity Building (CUPCB) page at IIT Roorkee. This is an unofficial
// concept redesign built as a portfolio case study — not affiliated with,
// endorsed by, or published on behalf of IIT Roorkee.

export const siteInfo = {
  shortName: "CUPCB",
  longName: "Centre of Urban Planning for Capacity Building",
  program: "AMRUT 2.0",
  institute: "Indian Institute of Technology Roorkee",
  department: "Department of Architecture & Planning",
  established: "2023",
  proposalSubmitted: "November 2022",
  coordinates: "29.8654° N, 77.8965° E",
  room: "Room No. 321, Department of Architecture & Planning, IIT Roorkee",
  phone: "+91-1332-285311",
  email: "registrar@iitr.ac.in",
  mission:
    "ACUPCB's mission is to drive impactful change through research, training, and collaboration, and to be a part of India's urban transformation journey.",
  about:
    "The Centre of Urban Planning for Capacity Building (CUPCB) under AMRUT 2.0 is a beacon of innovation in urban planning and sustainable development. Approved in 2023 following IIT Roorkee's proposal submission in November 2022, the CUPCB focuses on developing India-specific knowledge in urban design, climate-resilient infrastructure, and governance. It aims to deliver certified training to urban stakeholders, including city mayors, municipal commissioners, and planners, to address pressing urban challenges like water scarcity, mobility, and environmental sustainability.",
  aboutExtended:
    "The Centre conducts cutting-edge research on themes such as sustainable urban mobility, resilient infrastructure, and inclusive governance, with tangible outcomes in Indian cities. By integrating advanced tools like GIS-based master planning and community-driven approaches, the Centre ensures that urban solutions are both innovative and practical. Its training programs, supported by the National Institute of Urban Affairs (NIUA), empower Urban Local Bodies (ULBs) with the skills needed to implement AMRUT's objectives effectively. As a hub for transformative urban research and capacity building, the CUPCB is shaping the future of India's cities by fostering sustainable, inclusive, and resilient urban environments.",
};

export const hierarchy = [
  {
    code: "MoHUA",
    name: "Ministry of Housing & Urban Affairs",
    role: "Programme sponsor — AMRUT 2.0",
  },
  {
    code: "IITR",
    name: "Indian Institute of Technology Roorkee",
    role: "Host institute",
  },
  {
    code: "DAP",
    name: "Department of Architecture & Planning",
    role: "Academic home",
  },
  {
    code: "CUPCB",
    name: "Centre of Urban Planning for Capacity Building",
    role: "Established 2023 — Room 321",
  },
];

export const themes = [
  {
    id: "mobility",
    code: "T.01",
    name: "Urban Mobility",
    swatch: "brick",
    summary:
      "Enhancing the quality and accessibility of public transport in urban areas.",
    body:
      "The initiative focuses on enhancing the quality and accessibility of public transport in urban areas, ensuring a more convenient and dependable commuting experience for all citizens. AMRUT promotes sustainable urban transport solutions, which encourages the development of infrastructure and facilities for walking and cycling, promoting these as sustainable and healthy modes of transport. By improving public transport and promoting non-motorised transport (NMT), AMRUT aims to reduce traffic congestion, which in turn leads to smoother traffic flow and reduced travel times. The focus on public transport and NMT significantly contributes to a reduction in reliance on private vehicles, lowering congestion levels as well as air pollution, for a more environmentally friendly urban environment.",
  },
  {
    id: "resilience",
    code: "T.02",
    name: "Resilience",
    swatch: "mustard",
    summary:
      "Strengthening cities' capacity to withstand climate change and environmental risk.",
    body:
      "Resilience aims to strengthen cities' capacity to withstand climate change, natural disasters, and environmental risks through adaptive infrastructure. It involves integrating sustainable design, early warning systems, and community engagement into urban planning. Resilient cities prioritise risk assessment, resource efficiency, and ecosystem preservation. By fostering flexibility and preparedness, resilience ensures long-term urban stability and safety for future generations.",
  },
  {
    id: "governance",
    code: "T.03",
    name: "Governance",
    swatch: "moss",
    summary:
      "Efficient, transparent, and inclusive institutional frameworks for urban transformation.",
    body:
      "Governance forms a vital pillar of the AMRUT mission, ensuring that urban transformation is efficient, transparent, and inclusive. The mission strengthens institutional frameworks by offering training, technical support, and capacity-building programs to improve governance efficiency and urban management. AMRUT mandates regular monitoring of urban services like water supply, sewerage, and mobility using Service Level Benchmarks (SLBs), ensuring transparency, accountability, and performance-based governance. By empowering Urban Local Bodies, encouraging citizen participation, and adopting digital tools for planning and monitoring, AMRUT strengthens the governance ecosystem.",
  },
];

export const projects = {
  ongoingResearch: [
    {
      title: "GIS-Based Master Plan for 14 Towns in Punjab",
      note:
        "Action research under AMRUT 2.0, developing GIS-based master plans for 14 towns across the state of Punjab, in coordination with state town planning officials.",
    },
  ],
  ongoingConsultancy: [
    {
      title: "Consultancy Engagements — AMRUT 2.0 ULBs",
      note:
        "Technical advisory support to Urban Local Bodies on planning and capacity-building deliverables under AMRUT 2.0.",
    },
  ],
  upcoming: [],
  completed: [],
};

export const workshops = [
  {
    title: "Urban Mobility Solutions for India: Policies & Strategies",
    date: "12 September 2025",
    detail:
      "A workshop conducted by Prof. Sharat Chander, organised by the AMRUT Centre of Urban Planning for Capacity Building, IIT Roorkee.",
  },
  {
    title: "Faculty Development Program — in collaboration with NIUA",
    date: "2025",
    detail:
      "A faculty development program conducted in coordination with the National Institute of Urban Affairs (NIUA).",
  },
  {
    title: "Orientation Workshop on GIS-Based Master Planning in Punjab",
    date: "2025",
    detail:
      "Orientation workshop on the GIS-based Master Plan for 14 Towns in Punjab under AMRUT 2.0, for officials from the town planning department.",
  },
  {
    title: "GIS and Big Data Integration for Spatial Solutions",
    date: "2025",
    detail:
      "3-day capacity-building workshop for policymakers, equipping urban development professionals with data-driven planning tools.",
  },
];

export const conferences = [
  {
    title: "Urban Informality, Inclusive Policy, Planning and Design",
    date: "2025",
    detail:
      "2-day international conference organised by the Department of Architecture & Planning in collaboration with SPARC (Scheme for Promotion of Academic and Research Collaboration).",
  },
  {
    title: "Roorkee Urban Symposium",
    date: "Annual",
    detail:
      "Brings together accomplished academic researchers, research scholars, and students from urban-studies-related disciplines to share and exchange research findings across a wide range of themes.",
  },
];

export const specialLectures = [
  {
    title: "Policy Dialogue: Rethinking Cities",
    speaker: "Prof. Aggarwal",
    detail:
      "Insights on how Indian cities must evolve to address emerging urban challenges, rethink governance structures, and adopt people-centric planning approaches.",
  },
  {
    title: "Should You Buy or Rent Your Home?",
    speaker: "Dr. Das",
    detail:
      "Examined the economic, financial, and urban planning factors behind modern buy-versus-rent decisions — market dynamics, affordability, interest rates, policy frameworks, and urban growth.",
  },
  {
    title: "Understanding Housing Project Feasibility: Why & How",
    speaker: "",
    detail:
      "Feasibility isn't just a hurdle — it's the foundation of successful housing projects. Financing determines the scale, speed, and quality of construction.",
  },
  {
    title: "Parallels and Contrasts: The Architecture of Housing in India & the Netherlands",
    speaker: "",
    detail:
      "A comparative look at housing architecture and policy across two very different urban contexts.",
  },
  {
    title: "Introduction to Urban Informatics",
    speaker: "",
    detail:
      "A comprehensive look into how data-driven solutions and analytics are actively shaping the future of urban infrastructure and smart mobility.",
  },
  {
    title: "Viksit Bharat 2047: Development & Planning Agenda for Indian Cities",
    speaker: "",
    detail:
      "Key takeaways on planning agendas for Indian cities on the road to 2047, framed through NEP 2020 and Indian Knowledge Systems.",
  },
];

export const capacityBuildingInteractions = [
  {
    title: "Roorkee Urban Symposium",
    detail:
      "Bringing together academic researchers, research scholars, and students from urban-studies disciplines to exchange findings across multiple themes.",
  },
  {
    title: "First Dissemination Meeting with Faculties",
    detail:
      "An internal dissemination session sharing early Centre findings and direction with faculty across the Department of Architecture & Planning.",
  },
  {
    title: "Joint Magistrate's Visit",
    detail:
      "A deep-dive discussion on collaboration and implementation of projects in the city of Roorkee.",
  },
];

export const peopleGroups = [
  {
    id: "faculty",
    label: "Faculty",
    note:
      "The Centre's activities are led by experts from the Department of Architecture & Planning and allied disciplines, specialising in urban planning, infrastructure development, transportation, sustainability, and governance.",
  },
  {
    id: "non-teaching",
    label: "Non-Teaching Staff",
    note:
      "Managerial and administrative staff supporting the Centre's day-to-day operations, coordination, and outreach.",
  },
  {
    id: "research",
    label: "Research Staff",
    note:
      "Research associates and project staff working across ongoing action-research and consultancy projects.",
  },
];

export const repositoryResources = [
  {
    code: "R.01",
    title: "GIS & Spatial Data Lab",
    detail:
      "Infrastructure supporting GIS-based master planning, spatial analysis, and big-data integration for ongoing state-level projects.",
  },
  {
    code: "R.02",
    title: "Publications & Reports",
    detail:
      "Research outputs, workshop proceedings, and technical reports produced by the Centre and its collaborators.",
  },
  {
    code: "R.03",
    title: "Training & Conference Facilities",
    detail:
      "Seminar and training spaces used for workshops, faculty development programs, and the Roorkee Urban Symposium.",
  },
];

export const highlights = [
  {
    tag: "Centre",
    title: "Set-Up of the Centre of Excellence for the AMRUT Division",
    detail:
      "The Department of Architecture and Planning at IIT Roorkee established the AMRUT-funded Centre of Urban Planning for Capacity Building — AMRUT Division, Room No. 321, Department of Architecture & Planning.",
  },
  {
    tag: "Workshops",
    title: "Urban Mobility Solutions for India: Policies & Strategies",
    detail:
      "A workshop organised on 12th September 2025, conducted by Prof. Sharat Chander.",
  },
  {
    tag: "Workshops",
    title: "Faculty Development Program in Collaboration with NIUA",
    detail:
      "Conducted in coordination with the National Institute of Urban Affairs.",
  },
  {
    tag: "Conferences",
    title: "Urban Informality, Inclusive Policy, Planning and Design",
    detail:
      "A 2-day international conference in collaboration with SPARC.",
  },
  {
    tag: "Workshops",
    title: "Orientation Workshop on GIS-Based Master Planning in Punjab",
    detail:
      "For officials from the town planning department, on the 14-towns AMRUT 2.0 master plan.",
  },
  {
    tag: "Workshops",
    title: "GIS and Big Data Integration for Spatial Solutions",
    detail: "A 3-day capacity-building workshop for policymakers.",
  },
];
