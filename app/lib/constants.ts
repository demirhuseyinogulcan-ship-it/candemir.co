/**
 * Site-wide Constants — Single Source of Truth
 * 
 * Navigation items, social links, and site metadata.
 * Change here → changes everywhere.
 */

// ============================================
// SECTION PATHS — Terminal Metaforu
// ============================================
export const SECTION_PATHS = {
  process: "~/candemir/process/",
  expertise: "~/candemir/expertise/",
  work: "~/candemir/work/",
  about: "~/candemir/about/",
  services: "~/candemir/services/",
  contact: "~/candemir/signal/",
} as const;

// ============================================
// NAVIGATION
// ============================================
export const NAV_ITEMS = [
  { label: "Hizmetler", description: "Web, SEO, Fotoğraf, E-Ticaret", href: "/#expertise" },
  { label: "Süreç", description: "Çalışma metodolojisi", href: "/#process" },
  { label: "Seçili İşler", description: "Proje showcase", href: "/#work" },
  { label: "İletişim", description: "Birlikte çalışalım", href: "/#contact" },
] as const;

// ============================================
// SOCIAL LINKS
// ============================================
export const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/demirhuseyinogulcan-ship-it",
    svg: '<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />',
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    svg: '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />',
  },
  {
    label: "Behance",
    href: "https://behance.net",
    svg: '<path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />',
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    svg: '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />',
  },
] as const;

// ============================================
// BRAND
// ============================================
export const BRAND = "candemir.co";

export const GLITCH_PROCESS_WORDS = [
  "discover", "observe", "focus", "think", "frame",
  "design", "code", "launch", "grow",
] as const;

// ============================================
// PROCESS TREE — Metodoloji Dosya Sistemi
// ============================================
export interface ProcessTreeChild {
  name: string;
  comment?: string;
  children?: ProcessTreeChild[];
}

export interface ProcessNode {
  name: string;
  label: string;
  summary: string;
  children: ProcessTreeChild[];
}

export const PROCESS_TREE: ProcessNode[] = [
  {
    name: "discover",
    label: "Keşfet",
    summary: "İşi, sektörü ve mevcut yapıyı tanı.",
    children: [
      { name: "sektörü-tanı.md", comment: "Pazarın dili ne?" },
      { name: "rakipleri-incele.md", comment: "Kim neyi doğru yapıyor?" },
      { name: "iş-modelini-anla.md", comment: "Şirket nasıl para kazanıyor?" },
      { name: "mevcut-varlıkları-listele.md", comment: "Site, katalog, içerik, ekip" },
    ],
  },
  {
    name: "observe",
    label: "Gözlemle",
    summary: "Veriyi, müşteriyi ve tutarsızlıkları oku.",
    children: [
      {
        name: "müşteri-ne-diyor/",
        comment: "Gerçek dil burada çıkar",
        children: [
          { name: "arama-terimleri.md", comment: "Nasıl hitap ediyorlar?" },
          { name: "satış-ekibi-notları.md", comment: "Sahada hangi sorular geliyor?" },
          { name: "müşteri-cümleleri.md", comment: "Markayı nasıl tanımlıyorlar?" },
        ],
      },
      { name: "search-console-verileri.md", comment: "Gerçek talep haritası" },
      { name: "sorunları-tespit-et.md", comment: "Nerede kırılma var?" },
      { name: "algı-tutarsızlığı.md", comment: "Kalite ile görünüm uyuşuyor mu?" },
      { name: "sahadan-notlar.md", comment: "Zihin fotoğrafı" },
    ],
  },
  {
    name: "focus",
    label: "Odaklan",
    summary: "Asıl problemi ayıkla, kapsamı daralt.",
    children: [
      { name: "asıl-sorun-ne.md", comment: "Semptom değil, kök neden" },
      { name: "öncelik-sıralaması.md", comment: "İlk hangi taş oynayacak?" },
      { name: "kapsam-belirle.md", comment: "Neyi şimdi yapıyoruz?" },
    ],
  },
  {
    name: "think",
    label: "Düşün",
    summary: "Stratejiyi, konumlamayı ve riskleri kur.",
    children: [
      { name: "strateji-taslağı.md", comment: "Ne inşa edeceğiz?" },
      { name: "müşteri-algısı-haritası.md", comment: "Zihindeki mevcut resim" },
      { name: "konumlandırma.md", comment: "Nasıl görünmeliyiz?" },
      { name: "risk-analizi.md", comment: "Ne ters gidebilir?" },
    ],
  },
  {
    name: "frame",
    label: "Çerçevele",
    summary: "Mesajı ve görsel hiyerarşiyi netleştir.",
    children: [
      { name: "marka-hikayesi.md", comment: "Neyi anlatıyoruz?" },
      { name: "mesaj-hiyerarşisi.md", comment: "İlk, ikinci, üçüncü mesaj" },
      { name: "görsel-dil.md", comment: "Renk, ton, ritim" },
    ],
  },
  {
    name: "design",
    label: "Tasarla",
    summary: "Arayüzü, akışı ve editoryal yapıyı kur.",
    children: [
      {
        name: "wireframe/",
        comment: "İskelet yapı",
        children: [
          { name: "hero.tsx", comment: "İlk etki" },
          { name: "sections.tsx", comment: "Akış" },
          { name: "cta.tsx", comment: "Dönüşüm" },
        ],
      },
      { name: "renk-paleti.md", comment: "Void + beyaz sistemi" },
      { name: "tipografi.md", comment: "Hiyerarşi ve ritim" },
      { name: "kullanıcı-akışı.md", comment: "Göz nereye gidiyor?" },
    ],
  },
  {
    name: "code",
    label: "İnşa Et",
    summary: "Temiz mimari ile sistemi üret.",
    children: [
      {
        name: "mimari-yapı/",
        comment: "GitHub gibi okunur yapı",
        children: [
          { name: "components/", comment: "Tek sorumluluk" },
          { name: "sections/", comment: "Sayfa blokları" },
          { name: "layout/", comment: "Header / Footer" },
          { name: "lib/", comment: "Token, sabit, helper" },
        ],
      },
      { name: "seo-altyapısı.md", comment: "Schema, meta, robots" },
      { name: "i18n-sistemi.md", comment: "İlk günden" },
      { name: "performans.md", comment: "Hız + sadelik" },
    ],
  },
  {
    name: "launch",
    label: "Yayınla",
    summary: "Kontrol et, yayınla, ilk sinyalleri izle.",
    children: [
      { name: "test-kontrol.md", comment: "Kırık yer kaldı mı?" },
      { name: "analytics-kur.md", comment: "Ölçüm olmadan büyüme yok" },
      { name: "ilk-ölçümler.md", comment: "Ne çalıştı, ne çalışmadı?" },
    ],
  },
  {
    name: "grow",
    label: "Büyüt",
    summary: "Veriyle besle, otomatikleştir, ölçekle.",
    children: [
      { name: "veri-takibi.md", comment: "Hangi sinyalleri izliyoruz?" },
      { name: "otomasyon.md", comment: "İşi insandan sisteme taşı" },
      { name: "yeni-kanallar.md", comment: "SEO, GEO, marketplace" },
      { name: "ölçeklendir.md", comment: "Sistem tekrar çalışsın" },
    ],
  },
];

// ============================================
// PROJECTS
// ============================================
export const PROJECTS = [
  {
    id: "alya",
    number: "01",
    title: "Alya Bıçak / Alya Blade",
    category: "Strateji · Web · Fotoğrafçılık",
    year: "2024",
    stack: ["Next.js", "i18n", "Schema", "SEO", "Fotoğrafçılık"],
    description:
      "Satış destekten yola çıkıp arama verisini okuyarak bıçak tarafı için ayrı bir dijital kimlik kurdum; çift domain, 5 dil, 400+ ürün ve özgün çekimlerle markayı görünür hale getirdim.",
    story:
      "Bu şirkete satış destek olarak başladım, kısa sürede bana Anadolu bölgesi verildi ve bölge satış sorumlusu oldum. Ambalaj, plastik, kağıt, tekstil, gıda, otomotiv gibi sektörlerdeki makinelerin kesici parçalarını yani endüstriyel bıçak ve sanayi jiletlerini satıyordum.\n\nSahada fark ettim ki müşteriye \"bu ürünler İngiltere'den geliyor, Sheffield çeliği, makine duruş sürelerinizi kısaltır\" dediğimde sözlü anlatım yetmiyordu çünkü elimde bunu görsel olarak destekleyecek bir materyal yoktu. Sektörün büyük firmaları numune çalışmalarıyla ürünleri test edip bizden alıyordu ama dışarıdan bakan ya da ihtiyacı olup ürün arayan biri bunu bilemezdi.\n\nGoogle Search Console verilerine baktığımda müşterilerin bizi \"alya bıçak\" olarak aradığını gördüm, fuarlarda da öyle tanınıyorduk ama böyle bir marka, böyle bir domain ya da böyle bir site yoktu. Bıçak tarafının kendi dijital kimliğe ihtiyacı vardı. Bir şey daha fark ettim, firma kendini \"endüstriyel kesici\" olarak konumlandırıyordu ama müşteriler Google'da \"endüstriyel bıçak\" diye arıyordu. Arama verisinden gelen bu farkı içerik diline yansıttığımda tıklamalar arttı.\n\nİlk adımda kamera aldım, Fujifilm X-H2S ile çeliğin dokusunu, jiletlerin keskinliğini ve endüstriyel ölçeği gerçek haliyle çektim. Bu görseller mail kampanyalarında, kataloglarda, fuar panellerinde ve tüm satış ekibinin elinde kullanıldı, artık elimde somut bir şey vardı.\n\nİkinci adımda Next.js ile sıfırdan bir site kurdum. Türkiye pazarı için alyabicak.com ve global pazar için alyablade.com olmak üzere iki ayrı domain aldım. Türkçe, İngilizce, Arapça, Rusça ve Fransızca olmak üzere 5 dilde çeviri altyapısı kurdum, 400'den fazla ürünü katalogladım ve Google'ın bu ürünleri zengin sonuç olarak gösterebilmesi için her birine özel SEO ayarları ile Schema.org işaretlemeleri yazdım. Sadece bugünün arama motorları için değil yapay zeka görünürlük standartlarını da entegre ettim ve e-ticaret eklenebilecek şekilde modüler tuttum.\n\nBıçak markası kendi adıyla kendi sitesiyle ve kendi diliyle ayağa kalktı. Müşteri artık Google'a \"alya bıçak\" yazıp profesyonel bir platformla karşılaşıyor, site 7/24 çalışan uyumayan bir satış altyapısı oldu. Sadece Türkiye'de değil Alya Blade ile global pazarda da erişilebilir oldu.",
    image: "/images/projects/alya/hero.png",
    gallery: [],
    video: null,
    mockupScreenshot: "/images/projects/alya/screenshot.png",
    mockupVideos: ["/videos/alyabicak.mp4", "/videos/alyabicak-2.mp4"],
    url: "https://alyabicak.com",
    metrics: { languages: 5, products: 400, schemas: 8 },
  },
  {
    id: "airehber",
    number: "02",
    title: "AI Rehber",
    category: "Kişisel Platform · Next.js",
    year: "2025",
    stack: ["Next.js", "Otomasyon", "RSS", "AI"],
    description:
      "Günlük haber otomasyonu, sektör analizleri, AI araştırmaları. Mobil öncelikli kompakt yapı — işe gidip gelirken kullanılabilecek kadar hızlı.",
    image: "/images/projects/airehber/screenshot.png",
    gallery: [],
    video: null,
    mockupScreenshot: null,
    mockupVideos: [],
    url: "https://airehber.com",
    metrics: null,
  },
  {
    id: "gamzetango",
    number: "03",
    title: "Gamze Tango",
    category: "Web · SEO · Kişisel Marka",
    year: "2024",
    stack: ["Next.js", "SEO", "Blog", "İçerik Stratejisi"],
    description:
      "Tango eğitmeni için uçtan uca inşa ettiğim platform. Ders sayfaları, blog, lokasyon bazlı SEO, lead toplama — Next.js ile.",
    image: "/images/projects/gamzetango/DSCF4605.JPG",
    imagePosition: "top left",
    gallery: [],
    video: null,
    mockupScreenshot: null,
    mockupVideos: [],
    url: "https://gamzetango.com",
    metrics: null,
  },
  {
    id: "candemir",
    number: "04",
    title: "candemir.co",
    category: "Portfolyo · Tasarım Sistemi",
    year: "2025",
    stack: ["Next.js", "Framer Motion", "Tasarım Sistemi"],
    description:
      "Bu site. Altın oran mimarisi, sinematik geçişler, φ-cascade spacing, sıfırdan tasarım sistemi — zero-dependency.",
    image: "/images/projects/candemir.JPG",
    gallery: [],
    video: null,
    mockupScreenshot: null,
    mockupVideos: [],
    url: "https://candemir.co",
    metrics: null,
  },
  {
    id: "kapsulotel",
    number: "05",
    title: "Kaps\u00fcl Otel Konsept",
    category: "Giri\u015fimcilik \u00b7 Konsept \u00b7 Web",
    year: "2025",
    stack: ["Next.js", "Konsept Tasar\u0131m", "\u0130\u015f Plan\u0131"],
    description:
      "T\u00fcrkiye'nin ilk modüler kapsül otel konsepti. Teknik çizimlerden AI renderlarına, iş planından web sitesine — henüz gerçekleşmemiş ama hazır.",
    image: "/images/projects/kapsulotel/hero.png",
    gallery: [],
    video: null,
    mockupScreenshot: null,
    mockupVideos: [],
    url: null,
    metrics: null,
  },
] as const;

// ============================================
// SERVICES — Hizmet Sayfaları (SEO Köprüleri)
// ============================================
export const SERVICES = [
  {
    slug: "web-development",
    icon: "code",
    proof: "Alya Bıçak — 5 dilli endüstriyel platform, 400+ ürün kataloğu",
  },
  {
    slug: "seo",
    icon: "search",
    proof: "GSC verisinden müşteri algısını çözümledim — sektör 'bıçakçı' derken firma 'tekstil yedek parça' diyordu",
  },
  {
    slug: "photography",
    icon: "lens",
    proof: "Fujifilm X-H2S ile 400+ endüstriyel ürün çekimi — stock değil, gerçek",
  },
  {
    slug: "ecommerce",
    icon: "cart",
    proof: "Hepsiburada, Trendyol entegrasyonları — katalog optimizasyonu, dönüşüm stratejisi",
  },
] as const;

export type ServiceSlug = (typeof SERVICES)[number]["slug"];

// ============================================
// SITE METADATA
// ============================================
export const SITE_META = {
  name: "Can Demir",
  title: "Can Demir — Eksik olanı bulur, inşa ederim.",
  description: "Firmaların dijital varlığını büyüten, sahadan gelen stratejist. Web tasarım, SEO, e-ticaret ve marka fotoğrafçılığı.",
  url: "https://candemir.co",
  locale: "tr_TR",
  email: "demirhuseyinogulcan@gmail.com",
} as const;
