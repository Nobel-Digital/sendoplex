export interface BlogArticleData {
  slug: string;
  path: string;
  title: string;
  category: string;
  date: string;
  readMinutes: number;
  excerpt: string;
  body: string[]; // paragraphs
  tips?: string[]; // numbered tips or bullet points
  tipsHeading?: string;
}

export const BLOG_ARTICLES: BlogArticleData[] = [
  {
    slug: "kuidas-valmistada-auto-myygiks-ette",
    path: "blogi/kuidas-valmistada-auto-myygiks-ette",
    title: "Kuidas valmistada auto müügiks ette: 7 nõuannet",
    category: "Müügiõpetus",
    date: "Aprill 2026",
    readMinutes: 5,
    excerpt:
      "Väike ettevalmistus enne müüki võib lisada autole sadu eurosid. Siin on seitse asja, mida iga müüja peaks teadma.",
    body: [
      "Auto müümine võib tunduda lihtne — paned pildi üles ja ootad. Tegelikkuses teeb 2–3 tunni ettevalmistus suure vahe: korralikult ette valmistatud auto saab müügis kuni 10–15% parema hinna ja müüb kiiremini.",
      "Me ostame igal kuul kümneid autosid ja näeme selgelt, millised müüjad saavad parima hinna — ning miks. Siin on meie tähelepanekud.",
    ],
    tipsHeading: "7 asja, mis auto väärtust tõstavad",
    tips: [
      "Puhasta auto seest ja väljast põhjalikult. Lihtne pesemine ja salongi tolmuimejaga puhastamine mõjub ostjale professionaalselt. Lisa konditsioneer nahkistmetele, puhasta plastikpinnad.",
      "Vaheta mootoliõli, kui vahetustähtaeg on lähedal. Ostja näeb teenindusstiikerit ja küsib. Värske õlivahetus lisab usaldusväärsust.",
      "Paranda pisivead enne müüki. Katki läinud välispeegel, tuletoru kinnitusklambrid, tühi klaasipesuvedelik — need on väikesed asjad, kuid ostja märkab neid ja kasutab argumendina hinnaalenduseks.",
      "Kogu kõik dokumendid ühte kohta. Tehniline pass, kindlustus, eelmised ülevaatused, tehniline kontroll — olemas ja korraldatud. See näitab, et oled hooliv omanik.",
      "Tee auto tehniline ülevaatus enne müüki. Kehtiv ülevaatus on ostjale kindlus, et auto on korras. Ülevaatuseta autoga hinna üle rääkimine läheb Sulle kallimaks.",
      "Pildistatuna helges ja neutraalses kohas. Päevavalges, parklas või vaiksel tänaval. Väldi garaaži, autopesula tausta ja alavalustust. Hea foto = rohkem huvilisi.",
      "Kirjuta ausalt. Märgi, mis on remonditud, mis vajab tähelepanu. Ostja tuleb ikka vaatama — parem, et info on ees, mitte et tehingust hiljem tüli tuleb.",
    ],
    // continues
  },
  {
    slug: "auto-turuhind-2026",
    path: "blogi/auto-turuhind-2026",
    title: "Mis on minu auto tegelik turuhind aastal 2026?",
    category: "Hindamine",
    date: "Märts 2026",
    readMinutes: 4,
    excerpt:
      "Autoturul on hinnad muutunud. Vaatame, millest kujuneb sinu auto tegelik väärtus täna ja miks autokauplejate pakkumised tihtipeale erinevad.",
    body: [
      // eslint-disable-next-line quotes
      `Üks kõige sagedasemaid küsimusi, mida meile esitatakse: „Mis hinnaga minu auto läheb?" Vastus ei ole kunagi ühene arv — see sõltub mitmest tegurist, mida paljud müüjad ei arvesta.`,
      "2026. aastal on kasutatud autode turg Eestis oluliselt muutunud. Uute autode hindade tõus 2022–2024 aastatel lükkas kasutatud autode nõudluse kõrgemale, kuid 2025. aasta lõpus hakkasid vanemad diislid ja bensiinimudelid odavnema, samas kui hübriidid ja elektriautod hoiavad hinda.",
      "Millest kujuneb Sinu auto hind? Vaatame peamised tegurid läbi:",
    ],
    tips: [
      "Mudel ja aasta — populaarsed mudelid (Toyota, Volkswagen, Skoda) hoiavad väärtust paremini kui eksootilisemad margid.",
      "Läbisõit — rusikareegel on 15 000–20 000 km aastas. Alla selle on pluss, üle on miinus.",
      "Seisukord ja hooldusajalugu — dokumenteeritud hooldus tõstab hinda märgatavalt.",
      "Turu nõudlus praegusel hetkel — sama auto võib olla suvel kallim (kabrioletid, universaalid), talvel odavam.",
      "Varustus — nahkistmed, panoraamkatus, parkimiskaamera lisavad väärtust, kuid mitte alati proportsionaalselt.",
    ],
    tipsHeading: "5 peamist hinda mõjutavat tegurit",
  },
  {
    slug: "eraisik-vs-firma-kellele-myya",
    path: "blogi/eraisik-vs-firma-kellele-myya",
    title: "Eraisik vs. firma: kellele on auto kasulikum müüa?",
    category: "Nõuanded",
    date: "Veebruar 2026",
    readMinutes: 6,
    excerpt:
      "KM-kohustus, käibemaks ja läbirääkimisjõud — selgitame, milline müügivariant jätab rohkem raha taskusse.",
    body: [
      "Kui otsustad autot müüa, seisad sageli küsimuse ees: anda eraisikule või pakkuda firmale? Mõlemal on oma plussid ja miinused, ning vastus sõltub sellest, kui palju Sa hindad oma aega, raha ja vaeva.",
      "Eraisikule müümine annab tihti kõrgema müügihinna — kuulutuse peale võid nõuda rohkem, kuid protsess on aeglasem, läbirääkimised venivad ja garantiivaidluste risk on suurem. Firma ostab kiiremini ja ilma vaevata, kuid pakub tavaliselt 5–15% vähem.",
      "Siin on peamised erinevused:",
    ],
    tipsHeading: "Peamised erinevused eraisiku ja firma vahel",
    tips: [
      "Hind: Eraisikule müünes saad kõrgema brutoösumi, kuid kulutad rohkem aega ja energiat. Firma ostab kiiresti ja kindlalt.",
      "Aeg: Eraisiku kuulutus elab keskmiselt 3–8 nädalat. Firma teeb pakkumise 24 tunni jooksul.",
      "Garantii: Eraisikule müüdes vastutad 2 aasta jooksul peidetud vigade eest. Firmale müünes ei kehti tarbijakaitse samal viisil.",
      "KM: Kui müüd firmale, kes on KM-kohustuslane, võib Sinu autole lisanduda käibemaks — see mõjutab lõpphinda. Eraisik maksab nii nagu on.",
      "Makseviis: Firma maksab ülekandega, eraisik sageli sularahas või osade kaupa. Eelista alati ülekannet.",
    ],
  },
  {
    slug: "kaivitusprobleem-talvel",
    path: "blogi/kaivitusprobleem-talvel",
    title: "Vana auto käivitusprobleemid talvel: 5 levinumat põhjust",
    category: "Tehnika",
    date: "Jaanuar 2026",
    readMinutes: 3,
    excerpt:
      "Külmadel hommikutel keeldub auto käivitumast? Siit leiad kõige sagedasemad põhjused ja mida enne remonditöökotta sõitmist ise kontrollida.",
    body: [
      "Külm talvehommik, kiire tööle jõuda — ja auto ei käivitu. Tuttav olukord. Enamasti on põhjus üks viiest levinumast probleemist, millest paljusid saad ise lahendada enne, kui kulutad remonditöökoja hinnad.",
      "Vana auto talvine käivitusprobleem ei tähenda automaatselt kallist remonti. Tihtipeale on asi akus, küünaldega, mootoriõlis või kütuses. Vaatame järjekindlalt läbi:",
    ],
    tipsHeading: "5 levinumat põhjust ja mida teha",
    tips: [
      "Nõrk aku — kõige sagedasem põhjus. Aku eluiga on 4–6 aastat. Külmas langeb aku võimsus dramaatiliselt. Lahendus: laadi aku üle öö aku laadijaga. Kui see ei aita, vaheta aku.",
      "Kulunud küünlad — diiselmootoril hõõgküünlad, bensiinimootoril süütekuünlad. Kui mootor klõpsub aga ei tule käima, on suur tõenäosus küünla probleem. Vahetus on odav.",
      "Paks mootoriõli — vale viskoosiusega õli muutub külmas paksuks ja ei liigu hästi. Kasuta talvel soovitatavat 0W-30 või 5W-30 õli.",
      "Jäätunud kütusesüsteem — veeaur koguneb kütusepaaki ja jäätub. Lisa kütusevedelikule antigeeli lisand, mida saab osta autopoest paarikümne euroga.",
      "Tühi kütus + külm — üllatavalt sage. Külmas paisub kütusemõõtja metall ja näitab vale taset. Kui käivitusprobleeme, tanka esmalt täis.",
    ],
  },
];
