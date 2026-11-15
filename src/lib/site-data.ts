// Central data source for the Shakya Bajracharya Samaj Yala website.
// Content is scraped/translated from https://www.shakyabajracharyasamajyala.org.np

export const SITE = {
  nameNe: "शाक्य बज्राचार्य समाज, यल",
  nameEn: "Shakya Bajracharya Samaj Yala",
  fullNameEn: "The Society of Shakya, Bajracharya Lalitpur, Nepal",
  tagline:
    "समुन्नत, सुसंस्कार, सद्भाव र शान्तिपूर्ण समाज समृद्धिका आधार",
  address: "हःखाटोल, वडा १२, ललितपुर, नेपाल",
  phone: "०१-५५४१८६८",
  phoneRaw: "+977-1-5541868",
  email: "shakyabajracharyasamajyala@gmail.com",
  registration: "दर्ता नं. ५५८७/२०७५ — जिल्ला प्रशासन कार्यालय, ललितपुर",
  pan: "स्थायी लेखा नं. (पायन) ६१३३२६११९",
  establishedNe: "नें.सं. ११३८, बु.सं. २५६२, वि.सं. २०७५",
};

export const NAV_LINKS: { href: string; label: string }[] = [
  { href: "/", label: "गृहपृष्ठ" },
  { href: "/about", label: "समाजको परिचय" },
  { href: "/objectives", label: "समाजको उद्देश्य" },
  { href: "/committee", label: "कार्यसमिति" },
  { href: "/activities", label: "गतिविधि" },
  { href: "/notices", label: "सूचना" },
  { href: "/gallery", label: "तस्वीर संग्रह" },
  { href: "/donate", label: "आर्थिक सहयोग" },
  { href: "/contact", label: "सम्पर्क" },
];

export const OBJECTIVES: string[] = [
  "यो समाज मुनाफा रहित शुद्ध र सामाजिक संस्था हुनेछ ।",
  "ललितपुर जिल्लावासी समग्र शाक्य बज्राचार्य समुदायको धार्मिक, सामाजिक, साँस्कृतिक, आर्थिक, प्राविधिक, नैतिक, शैक्षिक आदिको उन्नति विकास र सम्बर्द्धनको लागि हित कल्याणकारी काम गर्ने ।",
  "यस शाक्य, बज्राचार्य समुदायभित्र परम्परादेखि अविच्छिन्न रूपले चलिआएको संस्कारित कर्म, पूजाविधि आदिको जगेर्ना गरी निरन्तरता दिने कार्यमा मद्दत गर्ने ।",
  "स्वास्थ्य तथा शिक्षा पहुँच नपुगेका यस समाजका सदस्यहरुलाई स्वास्थ्य ज्ञान र शिक्षाको जनचेतनामूलक कार्यक्रम तथा विभिन्न शिविरहरु सञ्चालन गर्ने र स्वास्थ्य सम्बन्धी आवश्यक व्यवस्थापन गर्न सहयोग पुर्‍याउने ।",
  "यस समाजका वृद्धवृद्धा, अपाङ्ग र अशक्त व्यक्तिहरुको लागि आवश्यक कार्यक्रम एवं उचित व्यवस्थापन गर्ने ।",
  "समाजमा विकृतिको रूपमा रहेको तडकभडक व्यवहार, विसंगति र कुसंस्कृति एवं संस्कारलाई हटाई सभ्य र सुसंस्कृत समाजको सिर्जना गर्ने ।",
  "समाजका विभिन्न वर्ग र सदस्यहरुलाई लक्षित गरी वर्तमान समयमा उपलब्ध नविनतम ज्ञान परिचालन गरी सिपमूलक कार्यक्रम मार्फत उनीहरुको जीवनस्तर आर्थिक रूपमा उन्नति र अभिवृद्धि गर्ने ।",
  "शाक्य, बज्राचार्य समुदायमा परापूर्वकालदेखि मूल्य-मान्यताको रूपमा चल्दै आएका पूजाविधि तथा परम्परागत कार्यलाई निरन्तरताको लागि आवश्यक सल्लाह-छलफल गरी सघाउने र सहयोग पुर्‍याउने ।",
  "शाक्य, बज्राचार्यको महत्त्व र पूजाविधिबारे अध्ययन-अध्यापनको व्यवस थापना गर्ने ।",
  "शाक्य, बज्राचार्य समाजका क्षेत्रको विकास र स्थापना गरी आवश्यक विचार-परामर्श, कार्ययोजना तयार गर्ने तथा मैत्रीभाव जगाई कार्यमा मद्दत पुर्‍याउने ।",
];

export const MEMBERSHIP_TYPES = [
  {
    title: "साधारण सदस्य",
    desc: "विधानको दफा ७ बमोजिम योग्यता पुगेको कुनै पनि नेपाली नागरिकले तोकिएको प्रक्रिया अन्तर्गत आवेदन दिन सक्नेछन् ।",
  },
  {
    title: "संस्थापक सदस्य",
    desc: "संस्था स्थापनाको समयमा तदर्थ समितिमा रहेका सदस्यहरु संस्थापक सदस्य हुनेछन् ।",
  },
  {
    title: "मानार्थ सदस्य",
    desc: "संस्थाको उद्देश्यमा आस्था राखी सहयोग प्रदान गर्ने विशिष्ट व्यक्ति मानार्थ सदस्य बन्न सक्नेछन् ।",
  },
  {
    title: "आजीवन सदस्य",
    desc: "समाजलाई विशेष योगदान गर्ने व्यक्तिलाई आजीवन सदस्य दिन सकिनेछ ।",
  },
  {
    title: "सल्लाहकार",
    desc: "संस्थाका पूर्व पदाधिकारी तथा विशिष्ट व्यक्तित्वहरुलाई सल्लाहकारमा नियुक्ति गर्न सकिनेछ ।",
  },
];

export type Member = {
  name: string;
  position: string;
  image: string;
};

export const COMMITTEE: Member[] = [
  {
    name: "जगतमुनि शाक्य",
    position: "अध्यक्ष",
    image:
      "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2025/10/viber_image_2025-10-12_18-19-55-867.jpg",
  },
  {
    name: "आशा रत्न शाक्य",
    position: "प्रथम उपाध्यक्ष",
    image:
      "http://shakyabajracharyasamajyala.org.np/wp-content/uploads/2020/06/4-maha-sachib-aasha-ratna.jpg",
  },
  {
    name: "रविन्द्र शाक्य",
    position: "द्वितीय उपाध्यक्ष",
    image:
      "http://shakyabajracharyasamajyala.org.np/wp-content/uploads/2020/06/11-rabindra.jpg",
  },
  {
    name: "रमिता बज्राचार्य",
    position: "सह-सचिव",
    image:
      "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2025/12/ramita.jpg",
  },
  {
    name: "रत्नशोभा शाक्य",
    position: "कोषाध्यक्ष",
    image:
      "http://shakyabajracharyasamajyala.org.np/wp-content/uploads/2020/06/13-ratna-shova.jpg",
  },
  {
    name: "शरण कुमार शाक्य",
    position: "निवर्तमान अध्यक्ष",
    image:
      "http://shakyabajracharyasamajyala.org.np/wp-content/uploads/2020/06/1-adhyakxe-sharan-kumar.jpg",
  },
  {
    name: "चन्द्रमान शाक्य",
    position: "का.स. सदस्य",
    image:
      "http://shakyabajracharyasamajyala.org.np/wp-content/uploads/2020/06/10-chandra-man.jpg",
  },
  {
    name: "भाजु रत्न शाक्य",
    position: "का.स. सदस्य",
    image:
      "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2025/12/bhaju.jpg",
  },
  {
    name: "सन्नि शाक्य",
    position: "का.स. सदस्य",
    image:
      "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2025/10/0-02-03-0b5f44af59bd4e8c30ba6b69c0a49ad1863b083f80ea9e3a63fdfac4c875cf84_270f058048c32af4.jpg",
  },
  {
    name: "सरिता बज्राचार्य",
    position: "का.स. सदस्य",
    image:
      "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2025/10/0-02-03-7372226de57dd1f891d472afa052c1f1551e601849ace3d7f90eb289c8a3c034_a4cf9a0dd8409569.jpg",
  },
];

export type Activity = {
  slug: string;
  title: string;
  dateNe: string;
  dateEn: string;
  cover: string;
  excerpt: string;
  body: string[];
  gallery?: string[];
};

export const ACTIVITIES: Activity[] = [
  {
    slug: "buddha-jayanti-1144",
    title: "बुद्ध जयन्तीको अवसरमा शुभकामना आदानप्रदान कार्यक्रम",
    dateNe: "२०८१ बैशाख २७",
    dateEn: "May 12, 2024",
    cover:
      "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2024/05/0-02-03-6115bbd49912c35a09381afcdf3b334878dfae941281da301c0ff0e968004acb_73b8b8fd.jpg",
    excerpt:
      "तथागत शाक्यमुनि बुद्ध भगवानको २६४८ औं जन्म, २६१३ औं बोधिज्ञान लाभ र २५६८ औं महापरिनिर्वाण त्रिसंयोगको अवसरमा शुभकामना आदानप्रदान कार्यक्रम सम्पन्न।",
    body: [
      "मिति २०८१ बैशाख २७ गते विहीवारका दिन तथागत शाक्यमुनि बुद्ध भगवानको २६४८ औं जन्म, २६१३ औं बोधिज्ञान लाभ र २५६८ औं महापरिनिर्वाण त्रिसंयोगको दिन बैशाख पूर्णिमाको अवसरमा ऐतिहासिक मयूरवर्ण महाविहार, भिन्छेबाहा:, ललितपुरको व्यवस्थापन र यस समाजको आयोजनामा राष्ट्रिय सभाका सांसद माननीय डा. अन्जान शाक्यज्यू र बागमती प्रदेश – ३ का संस्कृति, पर्यटन तथा सहकारी मन्त्री माननीय शैलेन्द्र मान बज्राचार्यज्यूहरुको विशेष आतिथ्यतामा शुभकामना आदानप्रदान विशेष कार्यक्रम - ११४४ सभ्य, भव्य र शान्तपूर्वक सम्पन्न भयो ।",
    ],
    gallery: [
      "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2024/05/0-02-03-f9fac3b8bcd5a6bf3392bdcae09dafe764520fdaed62260b3a98d4bd03b70d17_3dcbede9.jpg",
      "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2024/05/0-02-03-8854888ad092cedc4251da30d5ae39f0c2f5c88a59dd60e6af2536b7d7cd7664_34cc85e8.jpg",
      "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2024/05/0-02-03-dabeca6c3ad41851748818cc861cea34f697ebdb8083958f01bccae861f2dc97_9300a606.jpg",
      "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2024/05/0-02-03-e9660c9938ab0ab4f1378ec6d151ea2373a4d208e4bdb3c172a4a9ca4774a0ac_99b355a3.jpg",
      "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2024/05/0-02-03-49faaef135781188b152c2815068a4750f6bfb3e4abb1d5c240749ecdf41a288_5f4054a.jpg",
      "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2024/05/0-02-03-99c62b055fac54aa6277390e5c148f911b2dbe5611672e84a404e1ac52c7ff36_c3dac13c.jpg",
    ],
  },
  {
    slug: "bhittepatra-2081",
    title: "२०८१ साल नववर्षको भित्तेपात्र प्रकाशन",
    dateNe: "२०८१ बैशाख",
    dateEn: "April 12, 2024",
    cover:
      "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2024/05/0-02-03-2c093e32f5ee18e3db7fea342d8f6a3b672189ba7f837423fd4569ab7015f1c3_33e1abe5-960x750.jpg",
    excerpt:
      "२०८१ साल नववर्षको भित्तेपात्र प्रकाशन भएको छ । सबैलाई नयाँ वर्षको हार्दिक मंगलमय शुभकामना।",
    body: [
      "२०८१ साल नववर्षको उपलक्ष्यमा शाक्य बज्राचार्य समाज यल, ललितपुरले भित्तेपात्र प्रकाशन गरेको छ । सम्पूर्ण समुदायलाई नयाँ वर्षको हार्दिक मंगलमय शुभकामना व्यक्त गर्दछौं ।",
    ],
  },
  {
    slug: "samyak-mahadan-2080",
    title: "सम्यक महादान पर्वमा सेवा प्रदान",
    dateNe: "२०८० फागुन ३० – चैत्र १",
    dateEn: "March 12, 2024",
    cover:
      "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2024/05/0-02-03-41b7ce566521e463ce1597e3c2b98f5aafab6cb96abdf5550974742a08f49037_e8c22cd0.jpg",
    excerpt:
      "प्रत्येक पाँच वर्षमा हुने सम्यक महादान पर्व नागबहालमा भव्य रूपमा सम्पन्न भयो ।",
    body: [
      "प्रत्येक पाँच वर्षमा हुने सम्यक महादान पर्व यस २०८० फागुन ३० गते बुधवार र २०८० चैत्र ०१ गते विहीवार नागबहालमा सम्पन्न भएको छ । उक्त कार्यक्रममा यस समाजका पदाधिकारीहरु तथा सदस्यहरुले सक्रिय रूपमा सहभागिता जनाई सेवा प्रदान गर्नुभएको थियो ।",
    ],
  },
  {
    slug: "panchau-sadharan-sabha",
    title: "पाँचौं बार्षिक साधारण सभा भव्य रूपमा सम्पन्न",
    dateNe: "२०८० आश्विन २७",
    dateEn: "October 14, 2023",
    cover:
      "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2023/10/387200275_6466978586746121_3070525694860523102_n.jpg",
    excerpt:
      "वागमती प्रदेशका मन्त्री माननीय श्री रामकृष्ण चित्रकारज्यूको प्रमुख आतिथ्यतामा पाँचौं बार्षिक साधारण सभा सम्पन्न ।",
    body: [
      "मिति २०८० आश्विन २७ गते शनिवार घटस्थापनाको दिन शाक्य बज्राचार्य समाज यल, ललितपुरको पाँचौं बार्षिक साधारण सभा नागबहालको गगन बातिकामा भव्य रूपमा सम्पन्न भएको छ ।",
      "वागमती प्रदेशका उद्योग, वाणिज्य, भूमि तथा प्रशासन मन्त्री माननीय श्री रामकृष्ण चित्रकारज्यूको प्रमुख आतिथ्यतामा भएको यस कार्यक्रममा समाजका अनुभवी एवं बौद्धिक व्यक्तित्वहरुको गरिमामय उपस्थिति रहेको थियो ।",
      "अध्यक्ष शरण कुमार शाक्यज्यूको सभापतित्वमा सुरु भएको यस सभालाई महासचिव जगतमुनि शाक्यज्यूले सञ्चालन गर्नुभएको थियो । आर्थिक प्रतिवेदन कार्यबाहक कोषाध्यक्ष उत्तम बज्राचार्यज्यूले प्रस्तुत गर्नुभएको थियो ।",
    ],
  },
  {
    slug: "lok-sewa-orientation",
    title: "लोक सेवाको परीक्षा सम्बन्धी अभिमुखीकरण कार्यक्रम",
    dateNe: "२०८० बैशाख",
    dateEn: "April 12, 2023",
    cover:
      "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2023/10/IMG_1466-150x150.jpg",
    excerpt:
      "समाजका युवा सदस्यहरुका लागि लोक सेवा आयोगको परीक्षा सम्बन्धी अभिमुखीकरण कार्यक्रम आयोजना।",
    body: [
      "समाजका युवा सदस्यहरुलाई लोक सेवा आयोगको परीक्षामा सहभागी हुन प्रोत्साहन दिने उद्देश्यले लोक सेवा परीक्षा सम्बन्धी अभिमुखीकरण कार्यक्रम आयोजना गरिएको थियो । कार्यक्रममा अनुभवी प्रशिक्षकहरुबाट परीक्षाको तयारी, पाठ्यक्रम र रणनीति बारे विस्तृत जानकारी प्रदान गरिएको थियो ।",
    ],
  },
  {
    slug: "bhittepatra-2080",
    title: "२०८० साल नववर्षको भित्तेपात्र प्रकाशन",
    dateNe: "२०८० बैशाख",
    dateEn: "April 3, 2023",
    cover:
      "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2023/10/2080-calender-1024x480.jpg",
    excerpt:
      "शाक्य बज्राचार्य समाज यल, ललितपुरले वि.सं. २०८० नव वर्षको उपलक्ष्यमा भित्तेपात्र प्रकाशन गरेको छ ।",
    body: [
      "शाक्य बज्राचार्य समाज यल, ललितपुरले विसं २०८० नव वर्षको उपलक्ष्यमा भित्तेपात्र प्रकाशन गरेको छ । यस अवसरमा सबैलाई हार्दिक मंगलमय शुभकामना । धन्यवाद ।",
    ],
  },
];

export type Notice = {
  title: string;
  dateNe: string;
  body: string[];
  image?: string;
};

export const NOTICES: Notice[] = [
  {
    title: "जरुरी सूचना — मूल विहारका आजुहरुका लागि सहयोग अभियान",
    dateNe: "२०७७ कार्तिक",
    body: [
      "कोभिड-१९ को यस असहज परिस्थितिमा यस शाक्य, बज्राचार्य समाज, यल ललितपुरले ललितपुर महानगरपालिका भित्रका १५ वटा मूल विहारका श्रद्धेय आजुहरुको सुस्वास्थ्यको कामना सहित उहाँहरुले दिनहुँ सेवन गर्नुपर्ने औषधिका लागि सहयोग र यथाश्रद्धा दानप्रदानका लागि हामी शीघ्र सबैको सम्पर्कमा आउँदैछौं ।",
      "सम्पूर्ण समुदायलाई यस पुण्यकार्यमा सहभागिता जनाउन हार्दिक अनुरोध गर्दछौं ।",
    ],
    image:
      "http://shakyabajracharyasamajyala.org.np/wp-content/uploads/2020/10/shakya-baj-notice1-1024x885.jpg",
  },
];

export const GALLERY_IMAGES: { src: string; caption: string }[] = [
  {
    src: "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2025/10/board-724x1024.jpg",
    caption: "वर्तमान कार्यसमिति",
  },
  {
    src: "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2020/09/karyesamiti.jpg",
    caption: "कार्यसमिति बैठक",
  },
  {
    src: "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2023/10/387200275_6466978586746121_3070525694860523102_n.jpg",
    caption: "पाँचौं बार्षिक साधारण सभा",
  },
  {
    src: "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2023/10/387065691_6466979410079372_8263241870097714917_n-710x1024.jpg",
    caption: "साधारण सभा तस्वीर",
  },
  {
    src: "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2024/05/0-02-03-6115bbd49912c35a09381afcdf3b334878dfae941281da301c0ff0e968004acb_73b8b8fd.jpg",
    caption: "बुद्ध जयन्ती कार्यक्रम",
  },
  {
    src: "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2024/05/0-02-03-f9fac3b8bcd5a6bf3392bdcae09dafe764520fdaed62260b3a98d4bd03b70d17_3dcbede9.jpg",
    caption: "शुभकामना आदानप्रदान",
  },
  {
    src: "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2024/05/0-02-03-8854888ad092cedc4251da30d5ae39f0c2f5c88a59dd60e6af2536b7d7cd7664_34cc85e8.jpg",
    caption: "बुद्ध जयन्ती",
  },
  {
    src: "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2024/05/0-02-03-dabeca6c3ad41851748818cc861cea34f697ebdb8083958f01bccae861f2dc97_9300a606.jpg",
    caption: "समुदायको उपस्थिति",
  },
  {
    src: "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2024/05/0-02-03-2c093e32f5ee18e3db7fea342d8f6a3b672189ba7f837423fd4569ab7015f1c3_33e1abe5-960x750.jpg",
    caption: "भित्तेपात्र प्रकाशन २०८१",
  },
  {
    src: "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2024/05/0-02-03-41b7ce566521e463ce1597e3c2b98f5aafab6cb96abdf5550974742a08f49037_e8c22cd0.jpg",
    caption: "सम्यक महादान पर्व",
  },
  {
    src: "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2024/05/0-02-03-99c62b055fac54aa6277390e5c148f911b2dbe5611672e84a404e1ac52c7ff36_c3dac13c.jpg",
    caption: "बुद्ध जयन्ती समारोह",
  },
  {
    src: "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2024/05/0-02-03-e9660c9938ab0ab4f1378ec6d151ea2373a4d208e4bdb3c172a4a9ca4774a0ac_99b355a3.jpg",
    caption: "सामुदायिक भेला",
  },
];
