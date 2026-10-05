import { Product, KarambitVariant, CourierOption } from '../types';

export const KARAMBIT_VARIANTS: KarambitVariant[] = [
  {
    id: 1,
    name: 'Curved Talon Combat Karambit',
    subtitle: 'Tactical Fixed Claw with Contoured G10 Handle',
    pricePKR: 14500,
    spineThickness: '4.5 mm',
    ringDiameter: '25.4 mm (1.0 inch)',
    bladeSteel: 'D2 Cryo-Treated Tool Steel (HRC 60-62)',
    finish: 'Midnight Matte Cerakote',
    weight: '178g',
    curveAngleDeg: 112,
    description: 'Engineered for close-quarter tactical stability. Features a razor-sharp reverse sickle hawkbill profile, precision jimping on the spine, and an integrated glass-breaker impact pommel.',
  },
  {
    id: 2,
    name: 'Folding Safety Ring Karambit',
    subtitle: 'Rapid Emerson-Wave Deployment Folder',
    pricePKR: 11200,
    spineThickness: '3.8 mm',
    ringDiameter: '24.0 mm',
    bladeSteel: 'VG-10 High-Carbon Japanese Core',
    finish: 'DLC Tungsten Carbon Coating',
    weight: '142g',
    curveAngleDeg: 98,
    description: 'Pocket-deployable defense folder with an ambidextrous retention ring and fast pocket-snag draw mechanism. Liner-lock engages with zero blade play.',
  },
  {
    id: 3,
    name: 'Training Blunted Safe Karambit',
    subtitle: 'Zero-Edge Unsharpened Practice Ring Tool',
    pricePKR: 3500,
    spineThickness: '4.0 mm (Rounded Edge)',
    ringDiameter: '26.0 mm',
    bladeSteel: '420J2 High-Impact Stainless (Dull)',
    finish: 'Crimson Anodized Red Accent',
    weight: '165g',
    curveAngleDeg: 108,
    description: 'Designed specifically for martial artists and law enforcement training sessions. Weighted identically to combat variants without cutting risk.',
  },
  {
    id: 4,
    name: 'Fixed Blade Cerakote Tactical',
    subtitle: 'Full-Tang Operator Special with Kydex Sheath',
    pricePKR: 18500,
    spineThickness: '5.0 mm Solid Tang',
    ringDiameter: '25.0 mm',
    bladeSteel: 'CPM-3V High-Toughness Powder Metallurgy',
    finish: 'Desert Sand & Matte Black Dual Cerakote',
    weight: '196g',
    curveAngleDeg: 118,
    description: 'Our most durable fixed karambit built to withstand extreme prying and impact forces. Includes multi-position MOLLE & belt clip Kydex retention sheath.',
  },
  {
    id: 5,
    name: 'Ultra-Compact Skeleton Karambit',
    subtitle: 'Concealable Lightweight Monolithic Steel Ring',
    pricePKR: 6800,
    spineThickness: '3.2 mm',
    ringDiameter: '23.5 mm',
    bladeSteel: '8Cr13MoV Cryo Quenched',
    finish: 'Acid-Etched Stonewashed Grey',
    weight: '88g',
    curveAngleDeg: 94,
    description: 'Ultralightweight skeletonized grip for deep concealment and emergency backup defense. Cord-wrap channels allow personalized paracord wrapping.',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'imvor-karambit-talon-01',
    name: 'IMVOR Talon-V Combat Karambit',
    category: 'karambit',
    categoryLabel: 'Karambit Knives',
    pricePKR: 14500,
    originalPricePKR: 16800,
    rating: 4.9,
    reviewsCount: 142,
    shortDescription: 'Curved talon combat hawkbill with ergonomic retention ring & G10 scales.',
    description: 'The IMVOR Talon-V is the pinnacle of close-quarters tactical ergonomics. Forged from cryo-treated D2 steel with a deep curve angle designed for defensive redirection and continuous retention. Includes custom Kydex locking sheath.',
    image: '/src/assets/images/product_karambit_talon_1791222316800.jpg',
    gallery: [
      '/src/assets/images/product_karambit_talon_1791222316800.jpg',
      '/src/assets/images/hero_tactical_imvor_1791222158030.jpg'
    ],
    inStock: true,
    stockQty: 8,
    isRestrictedItem: true,
    badge: 'Bestseller',
    karambitVariantId: 1,
    specs: [
      { label: 'Blade Material', value: 'D2 Cryo Tool Steel (60 HRC)' },
      { label: 'Blade Length', value: '3.6 inches / 9.1 cm' },
      { label: 'Overall Length', value: '7.8 inches / 19.8 cm' },
      { label: 'Spine Thickness', value: '4.5 mm' },
      { label: 'Retention Ring', value: '25.4 mm (1.0") chamfered' },
      { label: 'Sheath', value: 'Modular Kydex with Tek-Lok' },
    ],
    features: [
      'Ergonomic finger ring prevents weapon disarm during intense defense',
      'Non-reflective Cerakote finish resists corrosion and salt spray',
      'Dual-side thumb jimping for standard and reverse tactical grips',
      'Includes rapid-deploy Kydex hard sheath with belt mount'
    ]
  },
  {
    id: 'imvor-taser-arc-900',
    name: 'Aegis-X High-Voltage Arc Stun Flashlight',
    category: 'stun-taser',
    categoryLabel: 'Stun Guns & Tasers',
    pricePKR: 18500,
    originalPricePKR: 22000,
    rating: 4.8,
    reviewsCount: 89,
    shortDescription: '1,200 Lumen tactical flashlight with high-voltage defensive arc electrodes.',
    description: 'Dual-purpose defense system combining a blinding 1,200 lumen strobe with concealed micro-arc electrodes delivering high-voltage incapacitation without lethal force. Built from T6061 aircraft aluminum.',
    image: '/src/assets/images/product_stun_taser_1791222330635.jpg',
    gallery: [
      '/src/assets/images/product_stun_taser_1791222330635.jpg'
    ],
    inStock: true,
    stockQty: 14,
    isRestrictedItem: true,
    badge: 'Law Enforcement Grade',
    specs: [
      { label: 'Peak Voltage', value: '2.8 Million Volts (Discharge Arc)' },
      { label: 'Lumen Output', value: '1,200 Lumens (Cree XHP50.2)' },
      { label: 'Battery', value: 'USB-C Rechargeable 21700 Li-Ion (5000mAh)' },
      { label: 'Body Material', value: 'Mil-Spec Hard-Anodized T6061 Alloy' },
      { label: 'Safety Switch', value: 'Dual-Stage Mechanical Safety Toggle' },
      { label: 'Water Resistance', value: 'IPX6 Heavy Rain Rated' }
    ],
    features: [
      'Dual-stage trigger prevents accidental electro-discharge',
      'Crenelated strike bezel pommel acts as glass breaker',
      'Micro-arc sound creates immediate psychological deterrent',
      'Fast USB-C charging with real-time LED battery capacity indicator'
    ]
  },
  {
    id: 'imvor-spray-gel-matrix',
    name: 'Vortex-9 Police-Grade Pepper Gel Stream',
    category: 'pepper-spray',
    categoryLabel: 'Pepper Sprays',
    pricePKR: 3400,
    originalPricePKR: 4200,
    rating: 4.9,
    reviewsCount: 215,
    shortDescription: 'Crossfire gel stream with UV marking dye, 18ft ballistic range, zero blowback.',
    description: 'High-density Oleoresin Capsicum (OC) sticky gel formula formulated specifically for outdoor windy environments and enclosed spaces. Does not atomize in headwinds, eliminating friendly contamination.',
    image: '/src/assets/images/product_pepper_spray_1791222348204.jpg',
    gallery: [
      '/src/assets/images/product_pepper_spray_1791222348204.jpg'
    ],
    inStock: true,
    stockQty: 32,
    isRestrictedItem: false,
    badge: 'Popular',
    specs: [
      { label: 'Formulation', value: '1.4% Major Capsaicinoids (Maximum Legal Heat)' },
      { label: 'Effective Range', value: '18 Feet (5.5 Meters)' },
      { label: 'Discharge Bursts', value: 'Up to 25 bursts / 7 seconds continuous' },
      { label: 'Marking Agent', value: 'Invisible UV Forensic Dye (Identifiable 48h)' },
      { label: 'Safety Cap', value: 'Spring-Loaded Flip-Top Mechanism' },
      { label: 'Shelf Life', value: '4 Years Active Expiration Guarantee' }
    ],
    features: [
      'Wind-resistant ballistic gel trajectory prevents blowback indoors or outdoors',
      'Long-lasting UV dye facilitates criminal suspect identification by law enforcement',
      'Ergonomic finger grip enables instant zero-look index aiming in darkness',
      'Fits inside compact glove compartments, purse holsters, or EDC pockets'
    ]
  },
  {
    id: 'imvor-folder-edc-shadow',
    name: 'Spectre Titanium EDC Folding Knife',
    category: 'pocket-knives',
    categoryLabel: 'Pocket Knives',
    pricePKR: 8500,
    originalPricePKR: 9800,
    rating: 4.8,
    reviewsCount: 76,
    shortDescription: 'Liner-lock tactical folding knife with ceramic ball bearings and tungsten carbide pommel.',
    description: 'Everyday carry folder crafted for demanding utility and personal protection. Features smooth-gliding ceramic caged ball bearings, textured G10 grip scales, and a hardened tungsten glass breaker for emergency egress.',
    image: '/src/assets/images/hero_tactical_imvor_1791222158030.jpg',
    gallery: [
      '/src/assets/images/hero_tactical_imvor_1791222158030.jpg'
    ],
    inStock: true,
    stockQty: 19,
    isRestrictedItem: false,
    badge: 'Staff Pick',
    specs: [
      { label: 'Blade Steel', value: '154CM High-Toughness Stainless' },
      { label: 'Blade Length', value: '3.4 inches / 8.6 cm' },
      { label: 'Lock Type', value: 'Reinforced Stainless Liner-Lock' },
      { label: 'Deployment', value: 'Ambidextrous Flipper + Dual Thumb Studs' },
      { label: 'Handle Material', value: 'Black G10 with Skeletonized Steel Liners' },
      { label: 'Clip', value: 'Deep Carry Reversible Stainless Clip' }
    ],
    features: [
      'Tungsten carbide strike point effortlessly shatters vehicle safety glass',
      'Caged ceramic ball bearing pivot ensures lightning-fast single-hand opening',
      'Deep pocket carry clip allows discreet low-profile positioning',
      'Drop-point tactical geometry balances piercing and utility cutting'
    ]
  },
  {
    id: 'imvor-airgun-co2-tactical',
    name: 'IMVOR Stryker .177 CO2 Tactical Air Pistol',
    category: 'airguns',
    categoryLabel: 'Airguns & Precision Targets',
    pricePKR: 42000,
    originalPricePKR: 48000,
    rating: 4.9,
    reviewsCount: 52,
    shortDescription: 'Semi-automatic CO2 pneumatic pistol, blowback action, 450 FPS muzzle velocity.',
    description: 'Designed for lawful target training, precision marksmanship drills, and defense simulation. Full metal slide with realistic blowback recoil, 20-round drop-free magazine, and lower Picatinny accessory rail.',
    image: '/src/assets/images/hero_tactical_imvor_1791222158030.jpg',
    gallery: [
      '/src/assets/images/hero_tactical_imvor_1791222158030.jpg'
    ],
    inStock: true,
    stockQty: 5,
    isRestrictedItem: true,
    badge: 'High Impact',
    specs: [
      { label: 'Caliber', value: '.177 (4.5 mm) Steel BB / Pellet' },
      { label: 'Muzzle Velocity', value: '450 FPS (137 m/s)' },
      { label: 'Power Source', value: 'Standard 12g CO2 Cartridge' },
      { label: 'Magazine Capacity', value: '20 Rounds Drop-Free' },
      { label: 'Action', value: 'Semi-Automatic with Gas Blowback' },
      { label: 'Weight', value: '980g (Realistic Full Steel Feel)' }
    ],
    features: [
      'Full metal frame and slide replicate authentic service sidearm weight',
      'Picatinny under-barrel rail accommodates tactical flashlights and lasers',
      'Textured grip profile prevents slippage during target acquisition drills',
      'Regulated gas valve delivers consistent shot-to-shot trajectory'
    ]
  },
  {
    id: 'imvor-tactical-pen-carbon',
    name: 'Apex-Titanium Tactical Glass Breaker Pen',
    category: 'gadgets',
    categoryLabel: 'Self-Defense Gadgets',
    pricePKR: 2800,
    originalPricePKR: 3500,
    rating: 4.7,
    reviewsCount: 164,
    shortDescription: 'CNC machined aerospace alloy EDC pen with tungsten strike tip & Schmidt pressurized ink.',
    description: 'An innocuous yet devastatingly effective personal defense tool. Conceals a tungsten carbide glass breaker capable of shattering hardened tempered glass, while functioning as a smooth pressurized writing instrument.',
    image: '/src/assets/images/hero_tactical_imvor_1791222158030.jpg',
    gallery: [
      '/src/assets/images/hero_tactical_imvor_1791222158030.jpg'
    ],
    inStock: true,
    stockQty: 40,
    isRestrictedItem: false,
    specs: [
      { label: 'Material', value: '6061-T6 Aircraft Grade Hard Anodized Aluminum' },
      { label: 'Glass Breaker', value: 'Concealed Tungsten Carbide Impact Tip' },
      { label: 'Cartridge', value: 'Schmidt P900M German Pressurized Refill' },
      { label: 'Length', value: '15.2 cm' },
      { label: 'Weight', value: '48g' }
    ],
    features: [
      'Passes through airport security scanners without alarming checkpoints',
      'Writes upside down, underwater, and in extreme temperatures (-35°C to 120°C)',
      'Diamond knurling pattern provides non-slip grip when delivering defensive strikes',
      'Includes 2 extra Schmidt pressurized black ink cartridges'
    ]
  },
  {
    id: 'imvor-baton-telescopic-hardened',
    name: 'Phantom-21 Hardened Steel Expandable Baton',
    category: 'gadgets',
    categoryLabel: 'Self-Defense Gadgets',
    pricePKR: 7400,
    originalPricePKR: 8900,
    rating: 4.8,
    reviewsCount: 93,
    shortDescription: '21-inch friction-lock expandable tactical baton with anti-slip rubberized grip.',
    description: 'Constructed from induction-hardened seamless 4140 chrome-moly steel tubing capable of withstanding heavy impact strikes. Deploys instantly with a flick of the wrist into a rigid 21-inch deterrent.',
    image: '/src/assets/images/product_stun_taser_1791222330635.jpg',
    gallery: [
      '/src/assets/images/product_stun_taser_1791222330635.jpg'
    ],
    inStock: true,
    stockQty: 11,
    isRestrictedItem: true,
    badge: 'High Impact',
    specs: [
      { label: 'Extended Length', value: '21 inches / 53 cm' },
      { label: 'Collapsed Length', value: '8.2 inches / 21 cm' },
      { label: 'Steel Alloy', value: 'Heat-Treated 4140 Chrome Molybdenum' },
      { label: 'Locking Mechanism', value: 'Solid Friction Cone Taper' },
      { label: 'Grip', value: 'Textured Foam-Rubberized Non-Slip Pattern' }
    ],
    features: [
      'Tested to withstand over 3,000 lbs of lateral bending pressure',
      'Solid steel mushroom impact tip concentrates force into defensive zones',
      'Comes with 360-degree rotating belt holster with quick-release lock',
      'Instant wrist-flick expansion creates strong psychological deterrent'
    ]
  },
  {
    id: 'imvor-alarm-130db-siren',
    name: 'SonicShield 130dB Personal Defense Alarm',
    category: 'gadgets',
    categoryLabel: 'Self-Defense Gadgets',
    pricePKR: 1950,
    originalPricePKR: 2400,
    rating: 4.9,
    reviewsCount: 310,
    shortDescription: 'Ear-piercing 130dB siren with disorienting LED strobe and quick pull-pin trigger.',
    description: 'Compact personal security alarm for daily transit, late-night campus walking, or emergency signaling. Emits an unbearable 130dB ear-shattering siren audible up to 600 feet away, coupled with a flashing LED strobe.',
    image: '/src/assets/images/product_pepper_spray_1791222348204.jpg',
    gallery: [
      '/src/assets/images/product_pepper_spray_1791222348204.jpg'
    ],
    inStock: true,
    stockQty: 65,
    isRestrictedItem: false,
    specs: [
      { label: 'Sound Output', value: '130 Decibels (High-Frequency Pitch)' },
      { label: 'Audible Distance', value: '600 Feet / 185 Meters' },
      { label: 'Battery', value: 'Rechargeable USB-C (Stands by for 1 Year)' },
      { label: 'Strobe Flash', value: 'Dual 200 Lumen Warning LEDs' },
      { label: 'Trigger', value: 'Dual-action pull pin or double-tap button' }
    ],
    features: [
      'Simple pull-pin activation is foolproof even when panicking or disoriented',
      'Flashing light attracts immediate bystander attention in dark environments',
      'Compact carabiner attachment clips to backpacks, keychains, and belts',
      'Compliant with all domestic and international flight travel regulations'
    ]
  }
];

export const COURIER_OPTIONS: CourierOption[] = [
  {
    id: 'tcs',
    name: 'TCS Express Logistics',
    estimate: '24–48 Hours (Major Cities)',
    costPKR: 250,
    description: 'Pakistan’s premier courier with real-time SMS tracking and insured parcel handling.'
  },
  {
    id: 'leopards',
    name: 'Leopards Courier Network',
    estimate: '2–3 Business Days',
    costPKR: 220,
    description: 'Extensive delivery network covering over 1,500 cities and towns across Pakistan.'
  },
  {
    id: 'mp',
    name: 'M&P Express Cargo',
    estimate: '24–36 Hours Expedited',
    costPKR: 280,
    description: 'High-security priority dispatch with specialized tamper-evident security tape.'
  }
];

export const PAKISTAN_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Abbottabad',
  'Bahawalpur',
  'Sargodha',
  'Sukkur',
  'Wah Cantt'
];
