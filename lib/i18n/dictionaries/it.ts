/**
 * Italian dictionary — the canonical source of truth. `Dictionary = typeof it`
 * so the English file is structurally checked against this one.
 *
 * Copy is editorial, first-person plural, short. Emphasis words are stored
 * separately (see highlight()) so each language names its own.
 */
export const it = {
  meta: {
    home: {
      title: "Paca's Lab — Built to adapt",
      description:
        "Paca's Lab: abbigliamento contemporaneo Made in Italy. Capi essenziali costruiti per adattarsi, con il camaleonte come firma.",
    },
    manifesto: {
      title: "Manifesto",
      description:
        "Chi siamo, cosa crediamo, perché un camaleonte. Il manifesto di Paca's Lab: capi essenziali Made in Italy, costruiti per adattarsi.",
    },
    collezione: {
      title: "Collezione",
      description:
        "Capsule 01 di Paca's Lab: quattro capi essenziali Made in Italy. Maglie oversize, bucket hat e tote bag con la firma del camaleonte.",
    },
  },

  nav: {
    home: "Home",
    manifesto: "Manifesto",
    collezione: "Collezione",
    menu: "Menu",
    close: "Chiudi",
  },

  lang: {
    label: "Lingua",
    it: "IT",
    en: "EN",
  },

  hero: {
    eyebrow: "Paca's Lab — Capsule 01 · Made in Italy",
    line1: "Built to",
    line2: "adapt",
    lead: "Capi essenziali che cambiano con chi li indossa. Dietro le quinte, una sola firma: il camaleonte.",
    ctaPrimary: "Scopri la collezione",
    ctaSecondary: "Leggi il manifesto",
    scroll: "Scorri",
  },

  intro: {
    eyebrow: "01 — Il laboratorio",
    titleA: "Il capo perfetto non esiste.",
    titleB: "Esiste quello che si adatta.",
    emphasis: "si adatta",
    body: "Paca's Lab nasce come un laboratorio, non come un marchio: piccole serie Made in Italy, cotoni pesanti, tagli netti. Come il camaleonte che ci fa da firma, ogni capo cambia con la persona, il momento, la luce.",
    body2: "Niente stagioni, niente saldi: poche serie pensate per restare. Quando un capo finisce, lascia spazio al prossimo esperimento.",
    pullquote: "«Ogni capo cambia con chi lo indossa.»",
    facts: [
      { k: "Serie", v: "Capsule 01" },
      { k: "Capi", v: "04" },
      { k: "Origine", v: "Made in Italy" },
    ],
    link: "Il nostro manifesto",
    caption: "Backstage — Capsule 01",
  },

  editorial: {
    eyebrow: "02 — La materia",
    over1: "Made",
    over2: "in Italy",
    statement: "Una busta, un gesto, una firma. Tutto ciò che esce dal laboratorio porta con sé la stessa cura: la grammatura piena, la stampa netta, la mano italiana.",
    tag: "Packaging Capsule 01",
    specs: [
      { k: "Materia", v: "Cotone pettinato" },
      { k: "Grammatura", v: "240 g/m²" },
      { k: "Origine", v: "Made in Italy" },
    ],
  },

  diptych: {
    eyebrow: "— In scena",
    lead: "La campagna Capsule 01, dietro le quinte: tende di velluto, luce calda, un solo gesto ripetuto. Le immagini non decorano, raccontano.",
    quote: "Non ci nascondiamo. Ci adattiamo.",
    captionLeft: "In movimento",
    captionRight: "Tra le quinte",
    body: "Dietro ogni capo c'è una persona che si muove nel mondo. Vestirsi non è coprirsi: è scegliere come apparire restando sé stessi.",
  },

  collection: {
    eyebrow: "03 — Collezione",
    title: "Quattro capi, una firma.",
    lead: "Due maglie, un bucket, una tote. Pezzi essenziali che condividono la stessa firma e la stessa promessa: adattarsi a te, non il contrario.",
    count: "04",
    countLabel: "Capi in collezione",
    link: "Vedi tutta la collezione",
  },

  manifestoTeaser: {
    eyebrow: "04 — Manifesto",
    quote1: "«Come il camaleonte:",
    quote2: "mai uguale,",
    quote3: "sempre sé stesso.»",
    body: "Non è uno slogan, è il metodo: disegniamo capi che cambiano ruolo con te e restano riconoscibili in ogni contesto, stagione dopo stagione.",
    attribution: "— Il manifesto",
    link: "Leggi il manifesto completo",
  },

  faq: {
    eyebrow: "05 — FAQ & Atelier",
    titleA: "Dettagli",
    titleB: "dell'Atelier.",
    relationsTitle: "Relazioni & Progetti",
    relationsBody:
      "Un laboratorio in continuo movimento. Per qualsiasi richiesta, informazione o semplicemente per scambiare un'idea, scrivici direttamente.",
    channelTitle: "Canale Diretto",
    channelBody: "Rispondiamo personalmente dal nostro atelier, una conversazione alla volta.",
    channelCta: "Scrivici su Instagram",
    items: [
      {
        q: "Cosa significa “Built to adapt”?",
        a: "I nostri capi sono pensati per durare e cambiare con te. Grazie a vestibilità fluide, cotoni pesanti e un design geometrico pulito, ogni pezzo si adatta a corpi e contesti diversi, superando il concetto di stagione o genere.",
      },
      {
        q: "Come posso mettermi in contatto?",
        a: "Scrivici direttamente in Direct su Instagram. Rispondiamo personalmente dal nostro laboratorio per qualsiasi domanda, dubbio sulle taglie, curiosità o collaborazioni. Nessun bot, solo persone.",
      },
      {
        q: "Dove e come vengono realizzati i capi?",
        a: "L'intera filiera produttiva è dislocata in Italia. Collaboriamo con piccoli laboratori artigianali selezionati per garantire cuciture rinforzate, stampe serigrafiche resistenti e tessuti di cotone pettinato da 240g/m².",
      },
      {
        q: "Come dovrei prendermi cura dei capi?",
        a: "Consigliamo di lavare le maglie e gli accessori al rovescio a 30° con ciclo delicato e asciugare all'aria. La grammatura pesante e le cuciture rinforzate fanno sì che i capi mantengano la forma originaria lavaggio dopo lavaggio.",
      },
    ],
  },

  footer: {
    stayInTouch: "Restiamo in contatto",
    instaCta: "Scrivici su Instagram",
    blurb: "Niente carrello, niente checkout: ogni capo nasce in piccole serie e si ordina con un messaggio.",
    explore: "Esplora",
    social: "Social",
    rights: "Tutti i diritti riservati.",
    backToTop: "Torna su",
  },

  manifesto: {
    cover: {
      eyebrow: "Paca's Lab — Il perché di tutto",
      line1: "Mani",
      line2: "festo.",
      lead: "Quattro capi, una firma, un'idea sola: adattarsi senza smettere di essere sé stessi. Questo è il perché di Paca's Lab, prima ancora del cosa.",
      meta: [
        { k: "Edizione", v: "Capsule 01" },
        { k: "Origine", v: "Made in Italy" },
        { k: "Anno", v: "2026" },
      ],
    },
    chapters: [
      { n: "01", label: "Chi siamo" },
      { n: "02", label: "La visione" },
      { n: "03", label: "Il camaleonte" },
      { n: "04", label: "I valori" },
    ],
    declaration: {
      index: "00",
      kicker: "Dichiarazione",
      line1: "Non inseguiamo",
      line2: "il colore.",
      line3: "Lo diventiamo.",
      body: "Il camaleonte non si nasconde: legge la luce e ne diventa il colore, restando esattamente ciò che è. Abbiamo costruito un guardaroba sullo stesso principio. Non capi che ti travestono, ma capi che ti somigliano in ogni contesto.",
      reject: "Non inseguiamo le mode.",
      choose: "Scegliamo ciò che resta.",
    },
    who: {
      eyebrow: "01 — Chi siamo",
      titleA: "Un laboratorio,",
      titleB: "non un marchio.",
      body1: "Paca's Lab nasce come un esperimento: cucire pochi capi, bene, in Italia, senza inseguire le stagioni. Ogni serie è piccola per scelta; quando finisce, finisce.",
      body2: "Niente logo urlato. Una firma discreta sul cuore, il camaleonte sul retro, e la cura nei dettagli che si scoprono solo da vicino: la grammatura piena, il ricamo tono su tono, l'etichetta interna che ricorda perché esistiamo.",
      body3: "Crediamo che un capo debba migliorare invecchiando, non scadere a fine stagione. Per questo lavoriamo in piccole serie, con materiali onesti e i tempi giusti.",
      pullquote: "«Pochi capi, fatti bene, pensati per durare.»",
      facts: [
        { k: "Fondato", v: "2026 · Italia" },
        { k: "Produzione", v: "Piccole serie" },
        { k: "Promessa", v: "Built to adapt" },
      ],
      caption: "Capsule 01 — dietro le quinte",
      caption2: "In movimento — Capsule 01",
    },
    vision: {
      eyebrow: "02 — La visione",
      titleA: "Adattarsi",
      titleB: "non è scomparire.",
      body1: "È restare sé stessi in ogni contesto. I nostri capi non chiedono attenzione: la ricevono. Tagli che stanno bene su corpi diversi, colori che vivono in ogni luce, tessuti che migliorano con gli anni.",
      body2: "Disegniamo per la persona, non per la passerella: quello che indossi alle nove del mattino deve funzionare anche a mezzanotte.",
      tag: "Un tratto continuo, come la nostra firma.",
    },
    quote: {
      kicker: "Il credo",
      line1: "«Il camaleonte non insegue",
      line2: "il colore. Lo diventa.»",
      body: "Non rincorriamo le tendenze: le lasciamo passare. Quello che resta, quando il rumore si spegne, è il capo giusto, indossato dalla persona giusta, nel momento giusto.",
      attribution: "— Paca's Lab",
    },
    meaning: {
      eyebrow: "03 — Il camaleonte",
      word1: "Adatta",
      word2: "Trasforma",
      word3: "Resta",
      body: "Tre gesti, una sola natura. Abbiamo scelto il camaleonte perché non si traveste: cambia pelle per restare sé stesso. È la promessa cucita dentro ogni capo.",
      defs: [
        { w: "Adatta", d: "Legge il contesto e ci si accorda, senza forzature." },
        { w: "Trasforma", d: "Cambia pelle quando serve, mai identità." },
        { w: "Resta", d: "Riconoscibile in ogni luce, fedele a sé stesso." },
      ],
      caption: "Capsule 01 — la firma",
    },
    values: {
      eyebrow: "04 — I valori",
      titleA: "Quello in cui",
      titleB: "crediamo.",
      lead: "Quattro principi non negoziabili: sono il filtro con cui decidiamo cosa entra in collezione e cosa resta fuori.",
      items: [
        { n: "01", title: "Adattamento", body: "Un guardaroba che si muove con te, non contro di te. Capi che restano attuali quando le mode passano." },
        { n: "02", title: "Essenzialità", body: "Tolto tutto il rumore, resta il capo. Tagli netti, una sola firma, nessun ornamento di troppo." },
        { n: "03", title: "Materia onesta", body: "Cotone pettinato, canvas naturale, ricami fatti per resistere ai lavaggi. Pensati per durare, non per stagioni." },
        { n: "04", title: "Made in Italy", body: "Piccole serie, mani esperte, filiera corta. Ogni pezzo nasce qui, e si vede da vicino." },
      ],
    },
    close: {
      eyebrow: "E adesso",
      titleA: "Cambia pelle,",
      titleB: "mai natura.",
      body: "Il manifesto finisce dove inizia il guardaroba. Guarda come si veste un'idea.",
      body2: "La collezione è il manifesto fatto tessuto: quattro capi, la stessa promessa. Un'idea si capisce davvero solo quando la indossi.",
      signature: "Paca's Lab — Built to adapt",
      cta: "Scopri la collezione",
    },
  },

  collectionPage: {
    eyebrow: "Capsule 01 — serie limitate",
    title: "Collezione.",
    count: "04 capi",
    italy: "Made in Italy",
    finite: "Quando una serie finisce, finisce.",
  },

  productPage: {
    back: "Collezione",
    capsule: "Capsule 01",
    orderCta: "Contattaci su Instagram",
    orderHint: "Scrivici per maggiori dettagli o richieste di informazioni.",
    materials: "Materiali",
    details: "Dettagli",
    sizes: "Taglie e misure",
    fit: "Vestibilità",
    styling: "Come portarla",
    next: "Capo successivo",
  },

  common: {
    builtToAdapt: "Built to adapt",
    builtToAdaptIt: "Costruito per adattarsi",
    madeInItaly: "Made in Italy",
  },

  // Localized product copy keyed by product id. Structural data (image, tone,
  // crop positions, size numbers) lives in lib/products.ts.
  products: {
    "maglia-camaleonte": {
      name: "Maglia Camaleonte",
      colorway: "Avorio",
      tagline: "Stampa sul retro, firma sul cuore.",
      description: "Taglio oversize dal peso pieno. Il camaleonte bordeaux campeggia sul retro; sul fronte, soltanto la firma. Un capo che cambia con chi lo indossa.",
      alt: "Maglia oversize avorio Paca's Lab, fronte con firma e retro con la stampa del camaleonte bordeaux.",
      materials: ["100% cotone pettinato", "Jersey pesante · 240 g/m²", "Vestibilità oversize"],
      details: ["Stampa serigrafica", "Etichetta interna “Built to adapt”", "Made in Italy"],
      cropLabels: ["La firma sul cuore", "Il camaleonte sul retro"],
      fit: "Oversize dichiarata: spalla scesa, corpo ampio, orlo dritto. Per un fit più asciutto scendi di una taglia.",
      styling: [
        "Con denim grezzo e sneaker minimali: la stampa parla da sola.",
        "Sotto una overshirt aperta, il camaleonte si intravede quando ti muovi.",
        "D'estate da sola, d'inverno come strato: nasce per cambiare ruolo.",
      ],
      sizeColumns: ["Taglia", "Petto (cm)", "Lunghezza (cm)"],
      sizeRows: [["S", "58", "70"], ["M", "61", "72"], ["L", "64", "74"], ["XL", "67", "76"]],
      sizeNote: "Misure prese a capo disteso. Nel video della campagna la modella indossa una M.",
    },
    "maglia-firma": {
      name: "Maglia Firma",
      colorway: "Nero",
      tagline: "Nero su nero. Il dettaglio si svela da vicino.",
      description: "La versione essenziale: total black, camaleonte tono su tono sul cuore. Pensata per sparire e adattarsi a tutto ciò che indossi.",
      alt: "Maglia oversize nera Paca's Lab, fronte e retro su fondo scuro con piccolo camaleonte tono su tono.",
      materials: ["100% cotone pettinato", "Jersey pesante · 240 g/m²", "Tinto in capo"],
      details: ["Mark ricamato tono su tono", "Vestibilità oversize", "Made in Italy"],
      cropLabels: ["Camaleonte tono su tono", "Jersey tinto in capo"],
      fit: "Stessa base oversize della Camaleonte: spalla scesa, corpo dritto. Il total black perdona tutto.",
      styling: [
        "Nero su nero con cargo o tailoring rilassato.",
        "Il ricamo si nota solo da vicino: lascialo scoprire.",
        "Con il bucket sabbia per spezzare il monocromo.",
      ],
      sizeColumns: ["Taglia", "Petto (cm)", "Lunghezza (cm)"],
      sizeRows: [["S", "58", "70"], ["M", "61", "72"], ["L", "64", "74"], ["XL", "67", "76"]],
      sizeNote: "Tinto in capo: alla prima lavata può assestarsi di mezzo centimetro.",
    },
    "bucket-hat": {
      name: "Bucket Hat",
      colorway: "Sabbia",
      tagline: "Twill di cotone, camaleonte ricamato.",
      description: "Cappello a tesa morbida in cotone sabbia. Camaleonte ricamato sul fronte, firma sul retro: si adatta alla luce di ogni stagione.",
      alt: "Bucket hat color sabbia Paca's Lab con camaleonte ricamato sul fronte e firma sul retro.",
      materials: ["100% cotone twill", "Fodera interna", "Taglia unica"],
      details: ["Ricamo diretto", "Occhielli di areazione", "Made in Italy"],
      cropLabels: ["Il ricamo sul fronte", "Tesa e impunture"],
      fit: "Taglia unica con tesa morbida: si modella con le mani e tiene la piega che le dai.",
      styling: [
        "Tesa giù e occhiali: l'uniforme da backstage.",
        "Con l'avorio della Camaleonte o con il total black.",
        "In borsa non si rovina: riprende forma da sola.",
      ],
      sizeColumns: ["Taglia", "Circonferenza interna", "Tesa"],
      sizeRows: [["Unica", "58 cm", "6,5 cm"]],
      sizeNote: "Calzata regolare; resta comodo anche con i capelli raccolti.",
    },
    "tote-bag": {
      name: "Tote Bag",
      colorway: "Naturale",
      tagline: "Canvas grezzo, un solo tratto continuo.",
      description: "Shopper in canvas naturale ad alta grammatura. Qui il camaleonte diventa un disegno a tratto continuo, nato da un solo gesto.",
      alt: "Tote bag in canvas naturale Paca's Lab con stampa bordeaux del camaleonte a tratto continuo.",
      materials: ["100% cotone canvas", "280 g/m²", "Manici lunghi rinforzati"],
      details: ["Stampa serigrafica bordeaux", "Cuciture rinforzate", "Made in Italy"],
      cropLabels: ["Il tratto continuo", "La firma"],
      fit: "Porta tutto: un laptop da 15\", un libro, la spesa del mercato. I manici lunghi passano in spalla anche sopra il cappotto.",
      styling: [
        "Al posto dello zaino, con qualsiasi cosa tu indossi.",
        "Lato stampa verso fuori: il tratto continuo fa conversazione.",
        "Si lava in lavatrice a 30°, al rovescio.",
      ],
      sizeColumns: ["Formato", "Larghezza", "Altezza", "Manici"],
      sizeRows: [["Unico", "38 cm", "42 cm", "65 cm"]],
      sizeNote: "Canvas 280 g/m²: più la usi, più diventa morbida.",
    },
  },
};

export type Dictionary = typeof it;
