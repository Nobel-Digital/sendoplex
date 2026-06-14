const isEn = (locale: string) => locale === "en-EE" || locale === "en_EE" || locale === "en";
const isFi = (locale: string) => locale === "fi" || locale === "fi-EE" || locale === "fi_EE";
const isRu = (locale: string) => locale === "ru" || locale === "ru-EE" || locale === "ru_EE";

export const t = (locale: string) => ({
  // ── Locations ──────────────────────────────────────────────────────────────
  locationsAddress: isFi(locale) ? "Osoite:" : isRu(locale) ? "Адрес:" : isEn(locale) ? "Address:" : "Aadress:",

  // ── Navigation ─────────────────────────────────────────────────────────────
  navItems: isFi(locale) ? [
    { name: "Varaosat", href: "#varuosad" },
    { name: "Myy autosi", href: "#form" },
    { name: "Meistä", href: "#meist" },
    { name: "Blogi", href: "#blogi" },
    { name: "Yhteystiedot", href: "#kontakt" },
  ] : isRu(locale) ? [
    { name: "Запчасти", href: "#varuosad" },
    { name: "Продать авто", href: "#form" },
    { name: "О нас", href: "#meist" },
    { name: "Блог", href: "#blogi" },
    { name: "Контакт", href: "#kontakt" },
  ] : isEn(locale) ? [
    { name: "Parts", href: "#varuosad" },
    { name: "Sell Your Car", href: "#form" },
    { name: "About", href: "#meist" },
    { name: "Blog", href: "#blogi" },
    { name: "Contact", href: "#kontakt" },
  ] : [
    { name: "Varuosad", href: "#varuosad" },
    { name: "Müü auto", href: "#form" },
    { name: "Meist", href: "#meist" },
    { name: "Blogi", href: "#blogi" },
    { name: "Kontakt", href: "#kontakt" },
  ],

  navOpenMenu:  isFi(locale) ? "Avaa valikko"  : isRu(locale) ? "Открыть меню"  : isEn(locale) ? "Open menu"  : "Ava menüü",
  navCloseMenu: isFi(locale) ? "Sulje valikko" : isRu(locale) ? "Закрыть меню" : isEn(locale) ? "Close menu" : "Sulge menüü",

  // ── Language labels ─────────────────────────────────────────────────────────
  langLabels: {
    et: "Eesti",
    en: "English",
    fi: "Suomi",
    ru: "Русский",
  } as Record<string, string>,

  // ── Cookie consent ─────────────────────────────────────────────────────────
  cookieText: isFi(locale)
    ? "Käytämme kolmansien osapuolten teknologioita palveluidemme tarjoamiseen ja parantamiseen. Vierailemalla sivustolla hyväksyt välttämättömien evästeiden käytön."
    : isRu(locale)
    ? "Мы используем технологии третьих сторон для предоставления и улучшения наших услуг. Посещая сайт, вы соглашаетесь на использование необходимых файлов cookie."
    : isEn(locale)
    ? "We use third-party technologies to provide and improve our services. By visiting the website, you agree to the use of strictly necessary cookies."
    : "Kasutame saidil kolmandate osapoolte veebisaitide tehnoloogiaid, et oma teenuseid pakkuda ja täiustada. Nõustun veebilehte külastades rangelt vajalike küpsiste kasutamisega.",
  cookieAccept:   isFi(locale) ? "Hyväksy"  : isRu(locale) ? "Принять"   : isEn(locale) ? "Accept"    : "Nõustun",
  cookieReadMore: isFi(locale) ? "Lue lisää" : isRu(locale) ? "Подробнее" : isEn(locale) ? "Read more" : "Loe lähemalt",

  // ── BasicForm labels ────────────────────────────────────────────────────────
  formLabelFullName: isFi(locale) ? "Koko nimi"   : isRu(locale) ? "Полное имя" : isEn(locale) ? "Full name"    : "Ees- ja perekonnanimi",
  formLabelCompany:  isFi(locale) ? "Yritys"      : isRu(locale) ? "Компания"   : isEn(locale) ? "Company name" : "Firma nimi",
  formLabelEmail:    isFi(locale) ? "Sähköposti"  : isRu(locale) ? "Эл. почта"  : isEn(locale) ? "Email address" : "E-posti aadress",
  formLabelPhone:    isFi(locale) ? "Puhelin"     : isRu(locale) ? "Телефон"    : isEn(locale) ? "Phone"        : "Telefon",
  formLabelMessage:  isFi(locale) ? "Viesti"      : isRu(locale) ? "Сообщение"  : isEn(locale) ? "Message"      : "Sõnum",

  formPlaceholderFullName: isFi(locale) ? "Esim. Matti Virtanen" : isRu(locale) ? "Напр. Иван Иванов" : isEn(locale) ? "E.g. John Smith" : "Nt. Mari Maasikas",
  formPlaceholderCompany:  isFi(locale) ? "Yritys Oy"            : isRu(locale) ? "ООО Компания"      : isEn(locale) ? "Company Ltd"     : "Ettevõte OÜ",
  formPlaceholderEmail:    isFi(locale) ? "nimi@yritys.fi"        : isRu(locale) ? "имя@компания.ru"   : isEn(locale) ? "name@company.com" : "nimi@ettevotenimi.ee",
  formPlaceholderPhone:    isFi(locale) ? "+358 ..."              : isRu(locale) ? "+7 ..."            : isEn(locale) ? "+44 ..."          : "+372 ...",
  formPlaceholderMessage:  isFi(locale) ? "Kuvaile lyhyesti mitä tarvitset." : isRu(locale) ? "Кратко опишите, что вам нужно." : isEn(locale) ? "Briefly describe what you need." : "Kirjelda lühidalt, mida vajad.",

  formSubmit:          isFi(locale) ? "Lähetä"         : isRu(locale) ? "Отправить"    : isEn(locale) ? "Send"           : "Saada",
  formSubmitting:      isFi(locale) ? "Lähetetään..."  : isRu(locale) ? "Отправка..."  : isEn(locale) ? "Sending..."      : "Saadan...",
  formRequired:        isFi(locale) ? "Pakollinen kenttä" : isRu(locale) ? "Обязательное поле" : isEn(locale) ? "Required field" : "Kohustuslik väli",
  formSuccess:         isFi(locale) ? "Kiitos! Viestisi on lähetetty." : isRu(locale) ? "Спасибо! Ваше сообщение отправлено." : isEn(locale) ? "Thank you! Your message has been sent." : "Aitäh! Teie kiri on saadetud.",
  formErrorValidation: isFi(locale) ? "Täytä kaikki pakolliset kentät oikein." : isRu(locale) ? "Пожалуйста, заполните все обязательные поля правильно." : isEn(locale) ? "Please fill in all required fields correctly." : "Palun täitke kõik nõutud väljad õigesti.",
  formErrorGeneral:    isFi(locale) ? "Tapahtui virhe. Yritä uudelleen." : isRu(locale) ? "Произошла ошибка. Попробуйте снова." : isEn(locale) ? "An error occurred. Please try again." : "Tekkis viga. Palun proovige uuesti.",
  formErrorRetry:      isFi(locale) ? "Tapahtui virhe. Yritä myöhemmin uudelleen." : isRu(locale) ? "Произошла ошибка. Попробуйте позже." : isEn(locale) ? "An error occurred. Please try again later." : "Tekkis viga. Palun proovige hiljem uuesti.",

  // ── Car offer form ──────────────────────────────────────────────────────────
  carFormLabelMark:      isFi(locale) ? "Merkki"      : isRu(locale) ? "Марка"       : isEn(locale) ? "Make"               : "Mark",
  carFormLabelModel:     isFi(locale) ? "Malli"       : isRu(locale) ? "Модель"      : isEn(locale) ? "Model"              : "Mudel",
  carFormLabelYear:      isFi(locale) ? "Vuosimalli"  : isRu(locale) ? "Год"         : isEn(locale) ? "Year"               : "Aasta",
  carFormLabelMileage:   isFi(locale) ? "Kilometrit"  : isRu(locale) ? "Пробег"      : isEn(locale) ? "Mileage"            : "Läbisõit",
  carFormLabelPrice:     isFi(locale) ? "Pyyntihinta" : isRu(locale) ? "Желаемая цена" : isEn(locale) ? "Asking price"     : "Küsitav hind",
  carFormLabelInfo:      isFi(locale) ? "Lisätiedot / kunto" : isRu(locale) ? "Доп. информация / состояние" : isEn(locale) ? "Additional info / condition" : "Lisainfo / seisukord",
  carFormLabelName:      isFi(locale) ? "Etu- ja sukunimi" : isRu(locale) ? "Имя и фамилия" : isEn(locale) ? "Full name"  : "Ees- ja perekonnanimi",
  carFormLabelPhone:     isFi(locale) ? "Puhelin"     : isRu(locale) ? "Телефон"     : isEn(locale) ? "Phone"              : "Telefon",
  carFormLabelEmail:     isFi(locale) ? "Sähköposti"  : isRu(locale) ? "Эл. почта"   : isEn(locale) ? "Email"              : "E-post",
  carFormOptional:       isFi(locale) ? "Valinnainen" : isRu(locale) ? "Необязательно" : isEn(locale) ? "Optional"         : "Valikuline",
  carFormLabelImages:    isFi(locale) ? "Kuvat autosta" : isRu(locale) ? "Фото автомобиля" : isEn(locale) ? "Photos of the car" : "Pildid autost",
  carFormImagesHint:     isFi(locale) ? "Voit lisätä useita kuvia (JPG, PNG)" : isRu(locale) ? "Можно добавить несколько фото (JPG, PNG)" : isEn(locale) ? "You can add several photos (JPG, PNG)" : "Võid lisada mitu pilti (JPG, PNG)",
  carFormImagesChoose:   isFi(locale) ? "Valitse kuvat" : isRu(locale) ? "Выбрать фото" : isEn(locale) ? "Choose photos" : "Vali pildid",
  carFormImagesSelected: isFi(locale) ? "kuvaa valittu" : isRu(locale) ? "фото выбрано" : isEn(locale) ? "photo(s) selected" : "pilti valitud",
  carFormCarDetails:     isFi(locale) ? "Auton tiedot" : isRu(locale) ? "Данные автомобиля" : isEn(locale) ? "Car details" : "Auto andmed",
  carFormContactDetails: isFi(locale) ? "Yhteystietosi" : isRu(locale) ? "Ваши контакты" : isEn(locale) ? "Your contact"  : "Sinu kontakt",
  carFormPill:           isFi(locale) ? "Ilmainen · 2 min" : isRu(locale) ? "Бесплатно · 2 мин" : isEn(locale) ? "Free · 2 min" : "Tasuta · 2 min",
  carFormSubmit:         isFi(locale) ? "Lähetä tarjouspyyntö" : isRu(locale) ? "Отправить запрос" : isEn(locale) ? "Send offer request" : "Saada pakkumine",
  carFormSubmitting:     isFi(locale) ? "Lähetetään…" : isRu(locale) ? "Отправка…"  : isEn(locale) ? "Sending…"           : "Saatmine…",
  carFormConsent:        isFi(locale)
    ? "Painamalla Lähetä tarjouspyyntö hyväksyt, että otamme sinuun yhteyttä tarjouksen toimittamiseksi. Tietojasi ei jaeta kolmansille osapuolille."
    : isRu(locale)
    ? "Нажимая «Отправить запрос», вы соглашаетесь на то, что мы свяжемся с вами для передачи предложения. Мы не передаём данные третьим лицам."
    : isEn(locale)
    ? "By clicking Send offer request you agree that we may contact you to deliver the offer. We do not share your data with third parties."
    : "Vajutades Saada pakkumine nõustud, et võtame Sinuga ühendust pakkumise edastamiseks. Andmeid me kolmandatele osapooltele ei jaga.",
  carFormSuccess:     isFi(locale) ? "Tarjouspyyntö lähetetty" : isRu(locale) ? "Запрос отправлен"    : isEn(locale) ? "Offer request sent"  : "Pakkumise päring saadetud",
  carFormSuccessBody: isFi(locale) ? "Tutustumme tietoihin ja lähetämme sinulle hintaehdotuksen tunnin kuluessa." : isRu(locale) ? "Мы рассмотрим данные и отправим вам предложение в течение часа." : isEn(locale) ? "We'll review the details and send you a price offer within one hour." : "Tutvume andmetega ja saadame Sulle hinnapakkumise ühe tunni jooksul.",
  carFormSendAnother: isFi(locale) ? "Lähetä toinen"           : isRu(locale) ? "Отправить ещё один" : isEn(locale) ? "Send another"        : "Saada veel üks",
  carFormErrorMark:   isFi(locale) ? "Pakollinen" : isRu(locale) ? "Обязательно" : isEn(locale) ? "Required"       : "Vajalik",
  carFormErrorModel:  isFi(locale) ? "Pakollinen" : isRu(locale) ? "Обязательно" : isEn(locale) ? "Required"       : "Vajalik",
  carFormErrorYear:   isFi(locale) ? "1950–2026"  : isRu(locale) ? "1950–2026"   : isEn(locale) ? "1950–2026"      : "1950–2026",
  carFormErrorMileage: isFi(locale) ? "Pakollinen" : isRu(locale) ? "Обязательно" : isEn(locale) ? "Required"      : "Vajalik",
  carFormErrorName:   isFi(locale) ? "Syötä nimesi"             : isRu(locale) ? "Введите имя"          : isEn(locale) ? "Enter your name"   : "Palun sisesta oma nimi",
  carFormErrorPhone:  isFi(locale) ? "Tarkista puhelinnumero"   : isRu(locale) ? "Проверьте номер телефона" : isEn(locale) ? "Check phone number" : "Kontrolli telefoninumbrit",
  carFormErrorEmail:  isFi(locale) ? "Tarkista sähköposti"      : isRu(locale) ? "Проверьте эл. почту"  : isEn(locale) ? "Check email"       : "Kontrolli e-posti",

  // ── Hours ───────────────────────────────────────────────────────────────────
  hoursClosed:   isFi(locale) ? "suljettu"  : isRu(locale) ? "закрыто"    : isEn(locale) ? "closed"   : "suletud",
  hoursHolidays: isFi(locale) ? "Pyhät"     : isRu(locale) ? "Праздники"  : isEn(locale) ? "Holidays" : "Pühad",
  hoursDays: isFi(locale)
    ? { monday: "Ma", tuesday: "Ti", wednesday: "Ke", thursday: "To", friday: "Pe", saturday: "La", sunday: "Su" }
    : isRu(locale)
    ? { monday: "Пн", tuesday: "Вт", wednesday: "Ср", thursday: "Чт", friday: "Пт", saturday: "Сб", sunday: "Вс" }
    : isEn(locale)
    ? { monday: "Mon", tuesday: "Tue", wednesday: "Wed", thursday: "Thu", friday: "Fri", saturday: "Sat", sunday: "Sun" }
    : { monday: "E", tuesday: "T", wednesday: "K", thursday: "N", friday: "R", saturday: "L", sunday: "P" },

  // ── Services ────────────────────────────────────────────────────────────────
  servicesShowMore:    isFi(locale) ? "Näytä enemmän"  : isRu(locale) ? "Показать больше" : isEn(locale) ? "Show more"            : "Näita rohkem",
  servicesHideDetails: isFi(locale) ? "Piilota tiedot" : isRu(locale) ? "Скрыть детали"   : isEn(locale) ? "Hide details"         : "Peida detailid",
  servicesEmpty:       isFi(locale) ? "Ei palveluja"   : isRu(locale) ? "Нет услуг"       : isEn(locale) ? "No services available" : "Teenuseid pole saadaval",
  servicesTableHint:   isFi(locale) ? "(Jos taulukko ei mahdu näytölle, vieritä vaakasuunnassa.)" : isRu(locale) ? "(Если таблица не помещается на экране, прокрутите по горизонтали.)" : isEn(locale) ? "(If the table doesn't fit the screen, scroll horizontally.)" : "(Kui tabel ei mahu ekraanile, libista horisontaalselt.)",

  // ── ChatWidget ──────────────────────────────────────────────────────────────
  chatWidgetOpen:  isFi(locale) ? "Avaa yhteydenottolomake" : isRu(locale) ? "Открыть форму" : isEn(locale) ? "Open contact form" : "Ava kontaktivorm",
  chatWidgetClose: isFi(locale) ? "Sulje"                   : isRu(locale) ? "Закрыть"       : isEn(locale) ? "Close"             : "Sulge",

  // ── ChatForm ────────────────────────────────────────────────────────────────
  chatFormPlaceholderName:    isFi(locale) ? "Nimi *"        : isRu(locale) ? "Имя *"      : isEn(locale) ? "Name *"    : "Nimi *",
  chatFormPlaceholderPhone:   isFi(locale) ? "Puhelin"       : isRu(locale) ? "Телефон"    : isEn(locale) ? "Phone"     : "Telefon",
  chatFormPlaceholderEmail:   isFi(locale) ? "Sähköposti *"  : isRu(locale) ? "Эл. почта *" : isEn(locale) ? "Email *"  : "Email *",
  chatFormPlaceholderMessage: isFi(locale) ? "Viesti *"      : isRu(locale) ? "Сообщение *" : isEn(locale) ? "Message *" : "Päringu sisu *",
  chatFormGdpr: isFi(locale)
    ? "Olen tietoinen ja hyväksyn, että verkkosivusto tallentaa antamani tiedot ottaakseen minuun yhteyttä. *"
    : isRu(locale)
    ? "Я осведомлён и согласен с тем, что веб-сайт хранит введённые данные для связи со мной. *"
    : isEn(locale)
    ? "I am aware and agree that the website stores the entered data to contact me. *"
    : "Olen teadlik ja nõustun, et veebileht talletab sisestatud andmed minuga ühenduse võtmiseks. *",

  // ── Footer ──────────────────────────────────────────────────────────────────
  footerCopyright:    isFi(locale) ? "Kaikki oikeudet pidätetään." : isRu(locale) ? "Все права защищены."              : isEn(locale) ? "All rights reserved." : "Kõik õigused kaitstud.",
  footerPrivacy:      isFi(locale) ? "Tietosuojaseloste"           : isRu(locale) ? "Политика конфиденциальности"      : isEn(locale) ? "Privacy notice"      : "Privaatsusteade",
  footerNavTitle:     isFi(locale) ? "Sivustolla"                  : isRu(locale) ? "На сайте"                         : isEn(locale) ? "On this page"        : "Lehel",
  footerLangTitle:    isFi(locale) ? "Kieli"                       : isRu(locale) ? "Язык"                             : isEn(locale) ? "Language"            : "Keel",
  footerContactTitle: isFi(locale) ? "Yhteystiedot"                : isRu(locale) ? "Контакты"                         : isEn(locale) ? "Contact"             : "Kontakt",
  footerTerms:        isFi(locale) ? "Käyttöehdot"                 : isRu(locale) ? "Условия"                          : isEn(locale) ? "Terms"               : "Tingimused",
  footerCookies:      isFi(locale) ? "Evästeet"                    : isRu(locale) ? "Куки"                             : isEn(locale) ? "Cookies"             : "Küpsised",

  // ── Hero / Banner ─────────────────────────────────────────────────────────
  heroTrust: isFi(locale)
    ? ["OE-koodiin perustuva yhteensopivuus", "Tarkastettu laatu", "Toimitus ympäri Eurooppaa"]
    : isRu(locale)
    ? ["Подбор по OE-коду", "Проверенное качество", "Доставка по всей Европе"]
    : isEn(locale)
    ? ["OE-code based fitment", "Inspected quality", "Delivery across Europe"]
    : ["OE-koodi põhine sobivus", "Kontrollitud kvaliteet", "Tarne üle Euroopa"],
  heroSubCopy:        isFi(locale) ? "Tarkastetut käytetyt ja laadukkaat uudet aftermarket-varaosat. Yli 20 vuoden kokemus Mercedes-Benz-ajoneuvojen varaosista. Tarvittaessa autamme löytämään sopivan ratkaisun myös muille automerkeille." : isRu(locale) ? "Проверенные б/у и качественные новые неоригинальные запчасти. Более 20 лет опыта в области запчастей для автомобилей Mercedes-Benz. При необходимости поможем подобрать решение и для других марок." : isEn(locale) ? "Inspected used and quality new aftermarket parts. Over 20 years of experience with Mercedes-Benz vehicle parts. If needed, we'll help find the right solution for other car makes too." : "Kontrollitud kasutatud ja kvaliteetsed uued aftermarket-varuosad. Üle 20 aasta kogemust Mercedes-Benz sõidukite varuosade valdkonnas. Vajadusel aitame leida sobiva lahenduse ka teistele automarkidele.",

  // ── Parts / Varuosad ────────────────────────────────────────────────────────
  partsNotFoundTitle: isFi(locale) ? "Etkö löytänyt tarvitsemaasi osaa?"      : isRu(locale) ? "Не нашли нужную деталь?"            : isEn(locale) ? "Couldn't find the part you need?" : "Ei leidnud vajalikku osa?",
  partsNotFoundBody:  isFi(locale) ? "Kaikki tarjoamamme varaosat eivät ole vielä näkyvissä verkossa. Jos etsit tiettyä osaa, ota yhteyttä, niin autamme löytämään sopivan ratkaisun." : isRu(locale) ? "Не все предлагаемые нами запчасти пока отображаются на сайте. Если вы ищете конкретную деталь, свяжитесь с нами, и мы поможем найти подходящее решение." : isEn(locale) ? "Not all the parts we offer are visible online yet. If you're looking for a specific part, get in touch and we'll help find the right solution." : "Kõik meie pakutavad varuosad ei ole hetkel veel veebis nähtavad. Kui otsid konkreetset detaili, võta meiega ühendust, aitame leida sobiva lahenduse.",
  partsWriteUs:       isFi(locale) ? "Kirjoita meille"                         : isRu(locale) ? "Написать нам"                      : isEn(locale) ? "Write to us"                      : "Kirjuta meile",
  partsRecommended:   isFi(locale) ? "Suositellut alustat"                     : isRu(locale) ? "Рекомендуемые платформы"           : isEn(locale) ? "Recommended platforms"            : "Soovitatud platvormid",
  partsNoSponsors:    isFi(locale) ? "Ei sponsorisopimuksia — suosittelemme vain mitä itse käytämme" : isRu(locale) ? "Без спонсорских соглашений — рекомендуем только то, чем пользуемся сами" : isEn(locale) ? "No sponsorship agreements — we only recommend what we use ourselves" : "Sponsorlepinguteta — soovitame ainult seda, mida ise kasutame",

  // ── Blog ────────────────────────────────────────────────────────────────────
  blogAllArticles: isFi(locale) ? "Kaikki artikkelit" : isRu(locale) ? "Все статьи" : isEn(locale) ? "All articles" : "Kõik artiklid",
  blogReadMin:     isFi(locale) ? "min"               : isRu(locale) ? "мин"        : isEn(locale) ? "min"          : "min",

  // ── About / stats ───────────────────────────────────────────────────────────
  aboutStats: isFi(locale) ? [
    { number: "20 v",  label: "Kokemus varaosien myynnissä" },
    { number: "4.8",   label: "Keskimääräinen arvosana Googlessa (412 arvostelua)" },
  ] : isRu(locale) ? [
    { number: "20 л",  label: "Опыт в продаже запчастей" },
    { number: "4.8",   label: "Средняя оценка в Google (412 отзывов)" },
  ] : isEn(locale) ? [
    { number: "20 y",  label: "Experience in parts sales" },
    { number: "4.8",   label: "Average rating on Google (412 reviews)" },
  ] : [
    { number: "20 a",  label: "Varuosade müügikogemust" },
    { number: "4.8",   label: "Keskmine hinnang Google'is (412 arvustust)" },
  ],
});
