// Product catalog for ElectroKart.
// entityId matches the "id" field — use this as the Recommendations
// entity.id parameter when wiring up Adobe Target Recommendations.
//
// Brand names here (Voltrix, Nimbus, Pulsewave, etc.) are invented for
// this demo store — not real brands — so the catalog is free to publish
// without trademark concerns. Titles follow the long, keyword-and-spec
// style used by Amazon/Flipkart listings on purpose, for realism.

export const categories = [
  { id: "audio", name: "Audio" },
  { id: "computing", name: "Computing" },
  { id: "mobiles", name: "Mobiles & Tablets" },
  { id: "wearables", name: "Wearables" },
  { id: "imaging", name: "Cameras & Imaging" },
  { id: "smart-home", name: "Smart Home" },
  { id: "gaming", name: "Gaming" },
];

export const products = [
  // ---------------- AUDIO ----------------
  { id: "EK-A001", name: "Voltrix Halcyon ANC Wireless Headphones (Midnight Black)", category: "audio", price: 249.0, rating: 4.7, reviews: 1812, discountPct: 15, color: "#3a3f4b",
    specs: { "Driver": "40mm dynamic", "ANC": "Adaptive, -32dB", "Battery": "38 hrs", "Weight": "268g" },
    blurb: "Adaptive noise cancelling with a warm, detailed soundstage tuned for long listening sessions." },
  { id: "EK-A002", name: "Nimbus Cove Truly Wireless Earbuds with Charging Case (Pearl White)", category: "audio", price: 129.0, rating: 4.4, reviews: 3203, discountPct: 0, color: "#20232a",
    specs: { "Driver": "11mm dynamic", "ANC": "Hybrid, -28dB", "Battery": "7h + 24h case", "Weight": "5.4g each" },
    blurb: "Compact everyday earbuds with a secure fit and surprisingly deep bass." },
  { id: "EK-A003", name: "Pulsewave Ridge Portable Bluetooth Speaker, 30W (Forest Green)", category: "audio", price: 99.0, rating: 4.5, reviews: 5544, discountPct: 25, color: "#4a4e58",
    specs: { "Output": "30W", "Battery": "20 hrs", "Rating": "IP67", "Pairing": "Stereo link x2" },
    blurb: "Loud enough for a backyard, tough enough for a trailhead." },
  { id: "EK-A004", name: "Orbital Bassline Over-Ear Wired Headphones with Mic (Red)", category: "audio", price: 45.0, rating: 4.1, reviews: 962, discountPct: 10, color: "#2b2e35",
    specs: { "Driver": "50mm dynamic", "Cable": "1.2m braided", "Impedance": "32 Ohm", "Weight": "220g" },
    blurb: "Budget-friendly wired cans with punchy bass for gaming and calls alike." },
  { id: "EK-A005", name: "Nimbus Anchor Neckband Bluetooth Earphones, 40 Hours Battery (Blue)", category: "audio", price: 34.0, rating: 4.2, reviews: 2210, discountPct: 30, color: "#3f4450",
    specs: { "Battery": "40 hrs", "Charging": "10 min = 5 hrs", "Water rating": "IPX5", "Driver": "10mm" },
    blurb: "All-day neckband with fast charging for people who forget to charge things." },
  { id: "EK-A006", name: "Voltrix Summit Studio Monitor Speakers, Pair (Black)", category: "audio", price: 189.0, rating: 4.6, reviews: 411, discountPct: 0, color: "#1f2127",
    specs: { "Power": "50W per channel", "Woofer": "5-inch", "Inputs": "XLR, TRS, RCA", "Frequency": "45Hz–20kHz" },
    blurb: "Flat, accurate monitoring for home studio setups and serious listening." },
  { id: "EK-A007", name: "Ridge Companion Mini Bluetooth Speaker, Waterproof (Sunset Orange)", category: "audio", price: 39.0, rating: 4.3, reviews: 1877, discountPct: 12, color: "#5a5a5a",
    specs: { "Output": "10W", "Battery": "12 hrs", "Rating": "IPX7", "Weight": "180g" },
    blurb: "Pocket-sized speaker that survives the shower and the pool." },
  { id: "EK-A008", name: "Orbital Clarity Gaming Headset with Detachable Mic (Black/Red)", category: "audio", price: 79.0, rating: 4.4, reviews: 1345, discountPct: 18, color: "#25272c",
    specs: { "Driver": "50mm", "Surround": "7.1 virtual", "Mic": "Detachable, noise-cancelling", "Compatibility": "PC/Console" },
    blurb: "Positional audio and a mic that actually filters out keyboard clatter." },

  // ---------------- COMPUTING ----------------
  { id: "EK-C001", name: "Meridian 14 Ultrabook, 8-Core, 16GB RAM, 1TB SSD (Slate Grey)", category: "computing", price: 1399.0, rating: 4.6, reviews: 821, discountPct: 10, color: "#4a4e58",
    specs: { "CPU": "8-core, 3.6GHz", "RAM": "16GB", "Storage": "1TB NVMe", "Display": "14in 2.8K OLED" },
    blurb: "A thin, quiet ultrabook built for people who live in fifteen tabs and a terminal." },
  { id: "EK-C002", name: "Basecamp 75% Mechanical Keyboard, Hot-Swappable Switches (RGB)", category: "computing", price: 159.0, rating: 4.8, reviews: 2967, discountPct: 0, color: "#2b2e35",
    specs: { "Switches": "Tactile brown", "Layout": "75%", "Connection": "USB-C / BT 5.1", "Backlight": "RGB, per-key" },
    blurb: "Hot-swappable switches and a machined aluminum frame for a keyboard that outlives your laptop." },
  { id: "EK-C003", name: "Fieldnote 27-inch QHD Monitor, 165Hz (Black)", category: "computing", price: 449.0, rating: 4.5, reviews: 1288, discountPct: 12, color: "#1f2127",
    specs: { "Panel": "27in IPS QHD", "Refresh": "165Hz", "Response": "1ms GtG", "Ports": "USB-C 90W PD" },
    blurb: "Color-accurate QHD panel with fast refresh — equally at home in a design studio or a ranked match." },
  { id: "EK-C004", name: "Meridian Air 13 Thin & Light Laptop, 512GB SSD (Silver)", category: "computing", price: 999.0, rating: 4.4, reviews: 634, discountPct: 8, color: "#5a5e68",
    specs: { "CPU": "6-core, 3.2GHz", "RAM": "8GB", "Storage": "512GB NVMe", "Weight": "1.2kg" },
    blurb: "An everyday laptop that's easy to carry and doesn't get in your way." },
  { id: "EK-C005", name: "Basecamp Glide Wireless Mouse, Silent Click (Charcoal)", category: "computing", price: 29.0, rating: 4.3, reviews: 4102, discountPct: 20, color: "#3a3f4b",
    specs: { "DPI": "800–4800", "Battery": "Up to 12 months", "Buttons": "6 programmable", "Connection": "2.4GHz + BT" },
    blurb: "A quiet-click mouse for open offices and late-night work sessions." },
  { id: "EK-C006", name: "Fieldnote Pro 32-inch 4K Monitor with USB-C Hub (Black)", category: "computing", price: 599.0, rating: 4.7, reviews: 512, discountPct: 5, color: "#111318",
    specs: { "Panel": "32in IPS 4K", "Refresh": "60Hz", "Ports": "USB-C, HDMI x2, DP", "Color": "99% sRGB" },
    blurb: "Sharp enough for photo editing, wide enough for two windows side by side." },
  { id: "EK-C007", name: "Basecamp Portable SSD, 1TB, USB-C (Space Grey)", category: "computing", price: 89.0, rating: 4.6, reviews: 2233, discountPct: 15, color: "#2b2e35",
    specs: { "Capacity": "1TB", "Speed": "Up to 1050MB/s", "Interface": "USB-C 3.2", "Size": "Credit card sized" },
    blurb: "Fast enough to edit video straight off the drive, small enough to lose in a bag." },
  { id: "EK-C008", name: "Meridian Dock Pro USB-C Docking Station, 12-in-1", category: "computing", price: 69.0, rating: 4.2, reviews: 876, discountPct: 0, color: "#3f4450",
    specs: { "Ports": "HDMI x2, USB-A x4, Ethernet, SD", "Power delivery": "100W passthrough", "Compatibility": "USB-C laptops" },
    blurb: "Turns one cable into an entire desk setup." },
  { id: "EK-C009", name: "Basecamp Ergo Wireless Keyboard & Mouse Combo (White)", category: "computing", price: 55.0, rating: 4.1, reviews: 1104, discountPct: 10, color: "#e8e9ed",
    specs: { "Layout": "Full-size", "Battery": "18 months (keyboard)", "Connection": "2.4GHz wireless", "Compatibility": "Windows/Mac" },
    blurb: "A comfortable everyday combo that doesn't try too hard." },

  // ---------------- MOBILES & TABLETS ----------------
  { id: "EK-M001", name: "Nimbus Pixelay 12 Pro, 256GB, 5G (Cosmic Blue)", category: "mobiles", price: 899.0, rating: 4.6, reviews: 4521, discountPct: 10, color: "#2b2e6b",
    specs: { "Display": "6.5in AMOLED, 120Hz", "Camera": "50MP triple", "Battery": "5000mAh", "Storage": "256GB" },
    blurb: "Flagship cameras and a battery that survives a full day of actually using them." },
  { id: "EK-M002", name: "Voltrix Aura 8, 128GB (Sandstone Beige)", category: "mobiles", price: 449.0, rating: 4.3, reviews: 3877, discountPct: 15, color: "#c9a876",
    specs: { "Display": "6.1in LCD, 90Hz", "Camera": "48MP dual", "Battery": "4500mAh", "Storage": "128GB" },
    blurb: "A mid-range phone that covers the basics well without the flagship price tag." },
  { id: "EK-M003", name: "Nimbus Slate 11 Tablet, 128GB, Wi-Fi (Graphite)", category: "mobiles", price: 379.0, rating: 4.5, reviews: 1654, discountPct: 12, color: "#3a3f4b",
    specs: { "Display": "11in LCD, 90Hz", "Storage": "128GB", "Battery": "8 hrs video", "Weight": "480g" },
    blurb: "A big, bright tablet built for reading, streaming, and the occasional spreadsheet." },
  { id: "EK-M004", name: "Voltrix Aura Lite, 64GB (Mint Green)", category: "mobiles", price: 229.0, rating: 4.0, reviews: 2988, discountPct: 20, color: "#7fc9a0",
    specs: { "Display": "6.4in LCD, 60Hz", "Camera": "13MP dual", "Battery": "5000mAh", "Storage": "64GB" },
    blurb: "An affordable second phone or a first phone that doesn't feel like a compromise." },
  { id: "EK-M005", name: "Pixelay Buds Case & Wireless Charger Combo (White)", category: "mobiles", price: 39.0, rating: 4.2, reviews: 998, discountPct: 0, color: "#e8e9ed",
    specs: { "Charging": "15W wireless", "Compatibility": "Qi-enabled phones", "Case included": "Yes" },
    blurb: "A charging pad and a case, sold as the pair everyone actually needs." },
  { id: "EK-M006", name: "Nimbus Slate Mini 8-inch Tablet, 64GB (Lavender)", category: "mobiles", price: 199.0, rating: 4.1, reviews: 743, discountPct: 18, color: "#a89bd8",
    specs: { "Display": "8in LCD", "Storage": "64GB", "Battery": "10 hrs", "Weight": "320g" },
    blurb: "Small enough for one hand, big enough for a proper reading session." },

  // ---------------- WEARABLES ----------------
  { id: "EK-W001", name: "Pulse Fitness Watch, AMOLED, GPS (Onyx Black)", category: "wearables", price: 219.0, rating: 4.3, reviews: 3654, discountPct: 20, color: "#3f4450",
    specs: { "Display": "1.4in AMOLED", "Battery": "9 days", "Sensors": "HR, SpO2, GPS", "Water rating": "5ATM" },
    blurb: "Tracks the metrics that actually change your training, without the phone tethered to your wrist." },
  { id: "EK-W002", name: "Anchor Smart Ring, Titanium, Size 6-13 (Matte Grey)", category: "wearables", price: 279.0, rating: 4.1, reviews: 890, discountPct: 0, color: "#5a5a5a",
    specs: { "Battery": "6 days", "Sensors": "HR, temp, HRV", "Material": "Titanium", "Sizes": "6–13" },
    blurb: "Sleep and recovery tracking in a ring you'll forget you're wearing." },
  { id: "EK-W003", name: "Pulse Junior Kids Smartwatch with GPS Tracking (Sky Blue)", category: "wearables", price: 89.0, rating: 4.2, reviews: 1211, discountPct: 15, color: "#5aa8d8",
    specs: { "Display": "1.3in color", "Battery": "3 days", "Features": "GPS, SOS button, calling", "Water rating": "IP67" },
    blurb: "Peace of mind for parents, a cool watch for kids — everyone wins." },
  { id: "EK-W004", name: "Pulse Active Band, Slim Fitness Tracker (Coral)", category: "wearables", price: 49.0, rating: 4.0, reviews: 2540, discountPct: 25, color: "#e8836b",
    specs: { "Display": "AMOLED strip", "Battery": "14 days", "Sensors": "HR, sleep", "Water rating": "5ATM" },
    blurb: "A simple, slim tracker for people who just want steps and sleep, nothing else." },
  { id: "EK-W005", name: "Voltrix Horizon Smartwatch, Bluetooth Calling (Rose Gold)", category: "wearables", price: 159.0, rating: 4.4, reviews: 1932, discountPct: 10, color: "#c9a0a0",
    specs: { "Display": "1.43in AMOLED", "Battery": "7 days", "Features": "Bluetooth calling, 100+ sport modes", "Water rating": "IP68" },
    blurb: "Take calls from your wrist without reaching for your phone." },

  // ---------------- CAMERAS & IMAGING ----------------
  { id: "EK-I001", name: "Aperture X Mirrorless Camera, 33MP Full-Frame (Body Only)", category: "imaging", price: 1899.0, rating: 4.9, reviews: 543, discountPct: 8, color: "#25272c",
    specs: { "Sensor": "33MP full-frame", "ISO": "100–51200", "Video": "6K/30p", "Stabilization": "5-axis IBIS" },
    blurb: "A full-frame body built for photographers who notice the difference in the shadows." },
  { id: "EK-I002", name: "Loupe 55mm f/1.4 Prime Lens, FR Universal Mount", category: "imaging", price: 599.0, rating: 4.7, reviews: 298, discountPct: 0, color: "#111318",
    specs: { "Aperture": "f/1.4", "Focus": "Silent AF motor", "Mount": "FR Universal", "Weight": "410g" },
    blurb: "A classic focal length rendered with clinical sharpness wide open." },
  { id: "EK-I003", name: "Aperture Go Compact Camera, 20MP, 4x Zoom (Black)", category: "imaging", price: 449.0, rating: 4.3, reviews: 621, discountPct: 15, color: "#2b2e35",
    specs: { "Sensor": "20MP 1-inch", "Zoom": "4x optical", "Video": "4K/30p", "Weight": "310g" },
    blurb: "Pocketable enough for every day, sharp enough to actually replace your phone camera." },
  { id: "EK-I004", name: "Steadyframe 3-Axis Gimbal Stabilizer for Smartphones (Black)", category: "imaging", price: 119.0, rating: 4.4, reviews: 1043, discountPct: 20, color: "#1f2127",
    specs: { "Axes": "3-axis stabilization", "Battery": "12 hrs", "Payload": "Up to 280g", "App": "Motion tracking, timelapse" },
    blurb: "Turns shaky phone footage into something that looks intentional." },
  { id: "EK-I005", name: "Aperture Vlogging Tripod Kit with LED Light and Mic", category: "imaging", price: 59.0, rating: 4.1, reviews: 1587, discountPct: 30, color: "#3a3f4b",
    specs: { "Height": "Extends to 1.6m", "Light": "Dimmable LED panel", "Mic": "Clip-on lavalier", "Mount": "Universal phone clamp" },
    blurb: "Everything a first-time creator needs in one box, minus the overthinking." },

  // ---------------- SMART HOME ----------------
  { id: "EK-S001", name: "Hearth Smart Thermostat, Wi-Fi + Thread (White)", category: "smart-home", price: 179.0, rating: 4.4, reviews: 2112, discountPct: 18, color: "#3a3f4b",
    specs: { "Learning": "Adaptive schedule", "Sensors": "Occupancy, humidity", "Connectivity": "Wi-Fi, Thread", "Install": "No C-wire needed" },
    blurb: "Learns your week in about nine days and quietly starts saving you money." },
  { id: "EK-S002", name: "Latch Video Doorbell, 2K HDR, Wired or Battery (Black)", category: "smart-home", price: 149.0, rating: 4.2, reviews: 3033, discountPct: 0, color: "#2b2e35",
    specs: { "Resolution": "2K HDR", "Field of view": "160°", "Power": "Wired or battery", "Storage": "Local + cloud" },
    blurb: "Sharp footage day or night, with package-detection that isn't just a motion alert." },
  { id: "EK-S003", name: "Hearth Smart Plug, 4-Pack, Wi-Fi (White)", category: "smart-home", price: 34.0, rating: 4.1, reviews: 4890, discountPct: 22, color: "#e8e9ed",
    specs: { "Control": "App + voice assistant", "Max load": "15A", "Schedule": "Yes", "Setup": "No hub required" },
    blurb: "The easiest first step into a smart home, four outlets at a time." },
  { id: "EK-S004", name: "Latch Indoor Security Camera, 1080p, Pan & Tilt (White)", category: "smart-home", price: 45.0, rating: 4.3, reviews: 2765, discountPct: 12, color: "#f0f0f0",
    specs: { "Resolution": "1080p", "Field of view": "360° pan, 96° tilt", "Night vision": "Yes", "Two-way audio": "Yes" },
    blurb: "Keeps an eye on the living room, the dog, or both." },
  { id: "EK-S005", name: "Hearth Smart Bulb, Color, 4-Pack (E27)", category: "smart-home", price: 39.0, rating: 4.0, reviews: 3421, discountPct: 25, color: "#d8a8e8",
    specs: { "Brightness": "800 lumens", "Colors": "16 million", "Control": "App + voice assistant", "Lifespan": "25,000 hrs" },
    blurb: "Sets the mood without getting up off the couch." },
  { id: "EK-S006", name: "Latch Smart Lock, Keypad & App Entry (Matte Black)", category: "smart-home", price: 199.0, rating: 4.5, reviews: 1298, discountPct: 10, color: "#111318",
    specs: { "Entry": "Keypad, app, physical key backup", "Battery": "6 months", "Install": "Fits standard deadbolts", "Logs": "Entry history in app" },
    blurb: "Give guests a code instead of a spare key that never comes back." },

  // ---------------- GAMING ----------------
  { id: "EK-G001", name: "Orbital Nova Wireless Gaming Controller (Cosmic Purple)", category: "gaming", price: 69.0, rating: 4.6, reviews: 2871, discountPct: 15, color: "#5a3f7a",
    specs: { "Connection": "Bluetooth + USB-C", "Battery": "20 hrs", "Compatibility": "PC, console, mobile", "Feedback": "Adaptive triggers" },
    blurb: "A controller that actually feels different depending on what you're shooting." },
  { id: "EK-G002", name: "Fieldnote Vantage 24-inch Gaming Monitor, 180Hz (Black)", category: "gaming", price: 229.0, rating: 4.5, reviews: 1543, discountPct: 12, color: "#1f2127",
    specs: { "Panel": "24in Fast IPS FHD", "Refresh": "180Hz", "Response": "1ms MPRT", "Sync": "Adaptive sync" },
    blurb: "Fast enough that you stop blaming the monitor for your K/D ratio." },
  { id: "EK-G003", name: "Basecamp Arcade Mechanical Keyboard, Linear Switches (White/RGB)", category: "gaming", price: 129.0, rating: 4.5, reviews: 987, discountPct: 0, color: "#e8e9ed",
    specs: { "Switches": "Linear red", "Layout": "Full-size", "Polling rate": "1000Hz", "Backlight": "Per-key RGB" },
    blurb: "Fast, quiet-ish linear switches built for reaction time, not typing feel." },
  { id: "EK-G004", name: "Orbital Grip Gaming Mouse, 26000 DPI, Ultralight (Black)", category: "gaming", price: 59.0, rating: 4.7, reviews: 1765, discountPct: 20, color: "#111318",
    specs: { "DPI": "Up to 26000", "Weight": "58g", "Sensor": "Optical", "Buttons": "6 programmable" },
    blurb: "Light enough to disappear in your hand until you actually need it." },
  { id: "EK-G005", name: "Nimbus Handheld Gaming Console, 128GB (Cloud Grey)", category: "gaming", price: 349.0, rating: 4.4, reviews: 1122, discountPct: 8, color: "#8a8f98",
    specs: { "Display": "7in LCD, 120Hz", "Storage": "128GB (expandable)", "Battery": "6-8 hrs", "Weight": "398g" },
    blurb: "A proper handheld for people who want console games without a console." },
  { id: "EK-G006", name: "Orbital Clarity Gaming Headset with Detachable Mic (White/Blue)", category: "gaming", price: 79.0, rating: 4.4, reviews: 1345, discountPct: 18, color: "#5aa8d8",
    specs: { "Driver": "50mm", "Surround": "7.1 virtual", "Mic": "Detachable, noise-cancelling", "Compatibility": "PC/Console" },
    blurb: "Same great headset, colorway for the RGB-and-white desk setup." },
];

export function getProductById(id) {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(product, count = 4) {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, count)
    .concat(products.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, count);
}

export function discountedPrice(product) {
  if (!product.discountPct) return product.price;
  return +(product.price * (1 - product.discountPct / 100)).toFixed(2);
}
