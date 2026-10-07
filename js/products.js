/**
 * HORSEBEAT - EQUESTRIAN ATELIER
 * Products, Collections & Currency Configuration
 */

const CURRENCIES = {
  BDT: { symbol: '৳', rate: 1.0, name: 'BDT (৳ Tk)', code: 'BDT' },
  USD: { symbol: '$', rate: 0.0083, name: 'USD ($)', code: 'USD' },
  EUR: { symbol: '€', rate: 0.0076, name: 'EUR (€)', code: 'EUR' },
  GBP: { symbol: '£', rate: 0.0065, name: 'GBP (£)', code: 'GBP' }
};

const COLLECTIONS = [
  {
    id: 'merlot',
    name: 'The Merlot Velvet Edit',
    subheading: 'Opulent Bordeaux with Warm Rose Gold Accents',
    accentColor: '#68182b',
    hardware: 'Rose Gold',
    image: 'assets/images/merlot_set.jpg',
    description: 'Quilted rich velvet lined with quick-dry bamboo mesh and adorned with our signature mirror-finish rose gold plaque.'
  },
  {
    id: 'sycamore',
    name: 'Sycamore Forest Collection',
    subheading: 'Noble Deep Emerald with Polished Silver Accents',
    accentColor: '#1a4332',
    hardware: 'Chrome Silver',
    image: 'assets/images/sycamore_set.jpg',
    description: 'Noble deep forest green. Ultra-dense diamond quilting with plush vegan fleece wither relief and gleaming chrome hardware.'
  },
  {
    id: 'champagne',
    name: 'Champagne Royale Edition',
    subheading: 'Luminous Golden Beige with Brushed Brass Hardware',
    accentColor: '#d6c4a5',
    hardware: 'Brushed Brass',
    image: 'assets/images/champagne_set.jpg',
    description: 'A timeless classic of Grand Prix elegance. Subtle golden luster satin weave paired with contrasting jet-black velvet piping and high-wither ergonomic clearance.'
  },
  {
    id: 'midnight',
    name: 'Midnight Navy Couture',
    subheading: 'Imperial French Navy with Crisp Contrast Detailing',
    accentColor: '#172338',
    hardware: 'Mirror Silver',
    image: 'assets/images/rider_jacket.jpg',
    description: 'The epitome of equestrian precision. Deep marine hues engineered in high-performance thermo-regulating fabrics for both horse and equestrian athlete.'
  },
  {
    id: 'blush',
    name: 'Desert Rose & Mocha',
    subheading: 'Dusty Rose Technical Layering with Rose Gold Embellishments',
    accentColor: '#b88c8d',
    hardware: 'Rose Gold',
    image: 'assets/images/rider_baselayer.jpg',
    description: 'Soft contemporary earth tones engineered for riders who value understated refinement in the arena and the stable.'
  }
];

const PRODUCTS = [
  {
    id: 'merlot-dressage-pad',
    name: 'Dressage Saddle Pad – Merlot Velvet',
    category: 'saddle-pads',
    discipline: 'dressage',
    collectionId: 'merlot',
    price: 15500,
    rating: 4.9,
    reviewsCount: 142,
    badge: 'BESTSELLER',
    hardware: 'Rose Gold',
    image: 'assets/images/merlot_set.jpg',
    secondaryImage: 'assets/images/hero.jpg',
    colorName: 'Merlot Velvet',
    colorHex: '#68182b',
    sizes: ['Full', 'Cob', 'Pony'],
    description: 'Our iconic dressage saddle pad in opulent deep bordeaux velvet. Features ergonomic high-wither contouring, signature quilted diamond stitching, and an antibacterial bamboo lining that wicks moisture instantly during intensive schooling.',
    features: [
      'Bamboo-charcoal quick dry inner lining',
      'Ergonomic anatomical high wither cut',
      'Solid rose gold Horsebeat atelier metal plaque',
      'Double twisted satin & metallic piping'
    ]
  },
  {
    id: 'sycamore-jump-pad',
    name: 'Jump Saddle Pad – Sycamore Green',
    category: 'saddle-pads',
    discipline: 'jumping',
    collectionId: 'sycamore',
    price: 15500,
    rating: 5.0,
    reviewsCount: 98,
    badge: 'NEW SEASON',
    hardware: 'Silver Chrome',
    image: 'assets/images/sycamore_set.jpg',
    secondaryImage: 'assets/images/hero.jpg',
    colorName: 'Sycamore Forest Green',
    colorHex: '#1a4332',
    sizes: ['Full', 'Cob'],
    description: 'Designed specifically for forward-cut close contact jumping saddles. Crafted in lustrous deep forest emerald velvet with shock-absorbing multi-layer foam and high-tensile girth retention straps.',
    features: [
      'Anatomically shaped to eliminate spinal pressure',
      'Dense anti-shock breathable foam core',
      'Brushed silver chrome atelier badge',
      'Black velvet outer rim with cord piping'
    ]
  },
  {
    id: 'champagne-jump-pad',
    name: 'Jump Saddle Pad – Champagne Royale',
    category: 'saddle-pads',
    discipline: 'jumping',
    collectionId: 'champagne',
    price: 15000,
    rating: 4.8,
    reviewsCount: 114,
    badge: 'LIMITED EDITION',
    hardware: 'Brushed Brass',
    image: 'assets/images/champagne_set.jpg',
    secondaryImage: 'assets/images/lifestyle_warmth.jpg',
    colorName: 'Champagne Beige',
    colorHex: '#d6c4a5',
    sizes: ['Full', 'Cob'],
    description: 'Luminous golden champagne satin pad with luxurious jet black velvet border. Finished with an authentic brushed brass Horsebeat crest and moisture-regulating tech lining.',
    features: [
      'Dirt-repellent silky satin surface weave',
      'Breathable honeycomb underside',
      'Brushed brass logo hardware',
      'Reinforced anti-rub girth protection patch'
    ]
  },
  {
    id: 'merlot-ear-bonnet',
    name: 'Crochet Ear Bonnet – Merlot Velvet',
    category: 'ear-bonnets',
    discipline: 'accessories',
    collectionId: 'merlot',
    price: 7000,
    rating: 4.9,
    reviewsCount: 86,
    badge: 'MATCHING SET',
    hardware: 'Rose Gold',
    image: 'assets/images/merlot_set.jpg',
    secondaryImage: 'assets/images/hero.jpg',
    colorName: 'Merlot',
    colorHex: '#68182b',
    sizes: ['Full', 'Cob'],
    description: 'Handcrafted luxury crochet fly hood with stretchy acoustic elastane ears to dampen arena distractions and flies. Accented with rose gold piping and metallic logo shield.',
    features: [
      'Hand-crocheted organic cotton body',
      'Elastic sound-softening stretch ears',
      'Rose gold metal badge accent',
      'Scalloped edge with double cord trim'
    ]
  },
  {
    id: 'sycamore-brushing-boots',
    name: 'Faux Fur Brushing Boots – Sycamore Green',
    category: 'boots',
    discipline: 'protection',
    collectionId: 'sycamore',
    price: 10500,
    rating: 4.9,
    reviewsCount: 77,
    badge: 'BESTSELLER',
    hardware: 'Silver Chrome',
    image: 'assets/images/sycamore_set.jpg',
    secondaryImage: 'assets/images/merlot_set.jpg',
    colorName: 'Sycamore Green',
    colorHex: '#1a4332',
    sizes: ['Full (Set of 2)', 'Cob (Set of 2)', 'Full (Set of 4)'],
    description: 'Ultimate strike protection with sumptuous ultra-soft faux sheepskin lining. Engineered with reinforced strike plates and heavy-duty elastic velcro closures stamped with our signature crest.',
    features: [
      'Plush cruelty-free synthetic fleece lining',
      'High-impact polyurethane strike shield',
      'Heavy-duty non-slip velcro tabs with badges',
      'Machine washable at 30°C'
    ]
  },
  {
    id: 'denali-navy-jacket',
    name: 'Thermo Winter Riding Jacket – Midnight Navy',
    category: 'rider',
    discipline: 'rider',
    collectionId: 'midnight',
    price: 24000,
    rating: 5.0,
    reviewsCount: 164,
    badge: 'NEW SEASON',
    hardware: 'Silver Chrome',
    image: 'assets/images/rider_jacket.jpg',
    secondaryImage: 'assets/images/hero.jpg',
    colorName: 'Midnight Navy',
    colorHex: '#172338',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Flagship winter riding jacket. Engineered with windproof, water-resistant eco-down filling, articulated sleeves for unrestricted rein movement, and back riding gussets with hidden zippers.',
    features: [
      'Thermal insulation rated down to -15°C',
      'Waterproof rating 10,000mm & taped seams',
      'Double two-way front YKK chrome zipper',
      'Fleece-lined storm collar and zippered pockets'
    ]
  },
  {
    id: 'blush-technical-baselayer',
    name: 'Dynamic Technical Base Layer – Desert Rose',
    category: 'rider',
    discipline: 'rider',
    collectionId: 'blush',
    price: 10800,
    rating: 4.8,
    reviewsCount: 131,
    badge: 'TRENDING',
    hardware: 'Rose Gold',
    image: 'assets/images/rider_baselayer.jpg',
    secondaryImage: 'assets/images/rider_jacket.jpg',
    colorName: 'Desert Rose',
    colorHex: '#b88c8d',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Four-way stretch moisture-management base layer tailored for training. Features an ergonomic standing collar, concealed rose gold zipper, and UPF 50+ UV solar protection.',
    features: [
      '4-way compression stretch microfiber',
      'Breathable underarm mesh ventilation zones',
      'Rose gold lock-zip slider',
      'Anti-odor antimicrobial treatment'
    ]
  },
  {
    id: 'champagne-fleece-bandages',
    name: 'Polo Fleece Bandages – Champagne Royale',
    category: 'boots',
    discipline: 'protection',
    collectionId: 'champagne',
    price: 6500,
    rating: 4.9,
    reviewsCount: 63,
    badge: 'MATCHING SET',
    hardware: 'Brushed Brass',
    image: 'assets/images/champagne_set.jpg',
    secondaryImage: 'assets/images/lifestyle_warmth.jpg',
    colorName: 'Champagne Royale',
    colorHex: '#d6c4a5',
    sizes: ['Set of 4 (3.5m)'],
    description: 'Supreme 380gsm anti-pilling polar fleece polo wraps. Provides optimal tendon support and circulation during schooling, finished with lustrous satin velcro tabs and brass logo badges.',
    features: [
      '380g high-density anti-pilling polar fleece',
      'Satin closure tab with brushed metal crest',
      'Generous 3.5 meter length for perfect wrapping',
      'Includes breathable mesh wash bag'
    ]
  },
  {
    id: 'lifestyle-emerald-heritage-pad',
    name: 'Atelier Dressage Pad – Nordic Forest',
    category: 'saddle-pads',
    discipline: 'dressage',
    collectionId: 'sycamore',
    price: 16500,
    rating: 5.0,
    reviewsCount: 52,
    badge: 'EXCLUSIVE',
    hardware: 'Gold Brass',
    image: 'assets/images/hero.jpg',
    secondaryImage: 'assets/images/lifestyle_warmth.jpg',
    colorName: 'Nordic Emerald',
    colorHex: '#133e2b',
    sizes: ['Full', 'Cob'],
    description: 'The centerpiece of our Grand Prix line. Heavyweight emerald satin with gold rope piping, contoured spine channel, and bespoke gold crest emblem.',
    features: [
      'High-gloss dirt-shedding outer surface',
      'Ergonomic stop-cushions at front wither',
      'Olympic grade breathability and sweat absorption',
      'Finished with hand-stitched gold braiding'
    ]
  }
];

const MATCHING_SETS = [
  {
    id: 'merlot-matching-set',
    title: 'The Merlot Velvet 4-Piece Grand Set',
    collectionName: 'Merlot Velvet',
    colorHex: '#68182b',
    heroImage: 'assets/images/merlot_set.jpg',
    tagline: 'The Signature Coordinated Ensemble',
    description: 'Step into the arena with unmatched poise. When your horse’s saddle pad, ear bonnet, and fleece bandages harmonize flawlessly with your technical equestrian jacket, you create a statement of equestrian perfection.',
    originalPrice: 57000,
    bundlePrice: 48000,
    savingsText: 'Save ৳9,000 (16% Off Complete 4-Piece Set)',
    hardware: 'Rose Gold',
    items: [
      { name: 'Merlot Velvet Dressage Saddle Pad', type: 'Saddle Pad', price: 15500, size: 'Full' },
      { name: 'Merlot Acoustic Ear Bonnet', type: 'Fly Hood', price: 7000, size: 'Full' },
      { name: 'Merlot Luxury Brushing Boots (Set of 4)', type: 'Leg Protection', price: 10500, size: 'Full' },
      { name: 'Midnight Thermo Riding Jacket', type: 'Rider Wear', price: 24000, size: 'M' }
    ]
  },
  {
    id: 'sycamore-matching-set',
    title: 'The Sycamore Forest 4-Piece Grand Set',
    collectionName: 'Sycamore Green',
    colorHex: '#1a4332',
    heroImage: 'assets/images/sycamore_set.jpg',
    tagline: 'Deep Forest Emerald with Polished Silver Accents',
    description: 'Crafted for riders who appreciate dark jewel tones and crisp craftsmanship. Every piece features our mirror-polished chrome hardware and anatomical wither curves.',
    originalPrice: 57000,
    bundlePrice: 48000,
    savingsText: 'Save ৳9,000 (16% Off Complete 4-Piece Set)',
    hardware: 'Silver Chrome',
    items: [
      { name: 'Sycamore Green Jump Saddle Pad', type: 'Saddle Pad', price: 15500, size: 'Full' },
      { name: 'Sycamore Green Ear Bonnet', type: 'Fly Hood', price: 7000, size: 'Full' },
      { name: 'Sycamore Fur Brushing Boots (Set of 4)', type: 'Leg Protection', price: 10500, size: 'Full' },
      { name: 'Dynamic Technical Base Layer – Sycamore', type: 'Rider Wear', price: 24000, size: 'S' }
    ]
  },
  {
    id: 'champagne-matching-set',
    title: 'The Champagne Royale 4-Piece Grand Set',
    collectionName: 'Champagne Royale',
    colorHex: '#d6c4a5',
    heroImage: 'assets/images/champagne_set.jpg',
    tagline: 'Sunlit Warmth with Polished Brass Hardware',
    description: 'Golden champagne tones with black velvet trim that flatter every equine coat color—from glistening dark bays to striking dapple greys and warm chestnuts.',
    originalPrice: 56000,
    bundlePrice: 47000,
    savingsText: 'Save ৳9,000 (16% Off Complete 4-Piece Set)',
    hardware: 'Brushed Brass',
    items: [
      { name: 'Champagne Royale Jump Saddle Pad', type: 'Saddle Pad', price: 15000, size: 'Full' },
      { name: 'Champagne Royale Ear Bonnet', type: 'Fly Hood', price: 6500, size: 'Full' },
      { name: 'Champagne Polo Fleece Bandages (Set of 4)', type: 'Leg Protection', price: 10500, size: 'Full' },
      { name: 'Champagne Hybrid Quilted Riding Vest', type: 'Rider Wear', price: 24000, size: 'M' }
    ]
  }
];

const LOOKBOOK_HOTSPOTS = [
  {
    id: 'spot-1',
    top: '38%',
    left: '42%',
    productId: 'lifestyle-emerald-heritage-pad',
    title: 'Atelier Dressage Pad – Nordic Emerald',
    subtitle: 'High-Wither Anatomical Cut',
    price: 16500
  },
  {
    id: 'spot-2',
    top: '46%',
    left: '75%',
    productId: 'denali-navy-jacket',
    title: 'Thermo Winter Riding Jacket',
    subtitle: 'Windproof & Water-Resistant',
    price: 24000
  },
  {
    id: 'spot-3',
    top: '58%',
    left: '48%',
    productId: 'champagne-fleece-bandages',
    title: 'Pro Fleece Bandages',
    subtitle: 'Anti-Pilling Support',
    price: 6500
  }
];

const REVIEWS = [
  {
    author: 'Astrid Lindqvist',
    location: 'Dhaka Club Equestrian Arena',
    discipline: 'Grand Prix Dressage Rider',
    rating: 5,
    title: 'The fit over the withers is second to none',
    content: 'I have ridden in countless saddle pad brands, but Horsebeat pads remain the only ones that never slip or put pressure on the horse’s spinal canal. Plus, the Merlot velvet with rose gold is pure art in the ring!',
    date: '3 days ago',
    verified: true,
    product: 'Dressage Saddle Pad – Merlot Velvet'
  },
  {
    author: 'Charlotte De Vries',
    location: 'Gulshan Riding Academy',
    discipline: 'Show Jumping Champion',
    rating: 5,
    title: 'Unbelievable durability after dozens of washes',
    content: 'The metallic badge doesn’t tarnish, the velvet doesn’t crush, and the bamboo lining keeps my horses dry and cool even on long competition days. The matching concept makes getting dressed for the arena an absolute joy.',
    date: '1 week ago',
    verified: true,
    product: 'Jump Saddle Pad – Sycamore Green'
  },
  {
    author: 'Eleanor Vance-Clarke',
    location: 'Dhanmondi Equestrian Circle',
    discipline: 'Hunter / Jumper Rider',
    rating: 5,
    title: 'My stable cannot stop complimenting our sets!',
    content: 'Ordered the complete Champagne Royale 4-piece set. The packaging was like opening high couture. The attention to detail—from the stitching to the fleece boots—is extraordinary. Highly recommend!',
    date: '2 weeks ago',
    verified: true,
    product: 'The Champagne Royale 4-Piece Grand Set'
  }
];
