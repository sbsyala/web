export type Language = "ne" | "en";

export interface TranslationData {
  site: {
    name: string;
    subName: string;
    fullName: string;
    tagline: string;
    address: string;
    phone: string;
    phoneRaw: string;
    email: string;
    registration: string;
    pan: string;
    established: string;
  };
  nav: {
    home: string;
    about: string;
    objectives: string;
    committee: string;
    members: string;
    activities: string;
    notices: string;
    gallery: string;
    donate: string;
    contact: string;
    cpanel: string;
    memberPortal: string;
  };
  memberTypes: {
    all: string;
    founder: string;
    honorary: string;
    life: string;
    general: string;
  };
  membersPage: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    membershipNoLabel: string;
    educationLabel: string;
    professionLabel: string;
    monasteryLabel: string;
    addressLabel: string;
    emptyText: string;
    viewCvNotice: string;
    loginToCvNotice: string;
    memberLoginBtn: string;
    memberCount: string;
  };
  memberPortal: {
    loginTitle: string;
    loginSubtitle: string;
    tabLogin: string;
    tabRegister: string;
    tabReset: string;
    identifierLabel: string;
    identifierPlaceholder: string;
    emailLabel: string;
    passwordLabel: string;
    newPasswordLabel: string;
    confirmPasswordLabel: string;
    fullNameLabel: string;
    fullNameNeLabel: string;
    membershipTypeLabel: string;
    loginBtn: string;
    loggingInBtn: string;
    registerBtn: string;
    registeringBtn: string;
    resetBtn: string;
    resettingBtn: string;
    resetSuccess: string;
    registerSuccess: string;
    forgotPasswordLink: string;
    needAccountLink: string;
    alreadyAccountLink: string;
    demoHintTitle: string;
    demoHintText: string;
    autoFillBtn: string;
    dashboardTitle: string;
    dashboardSubtitle: string;
    editProfileTab: string;
    cvGeneratorTab: string;
    logoutBtn: string;
    saveSuccess: string;
    saveError: string;
    saveProfileBtn: string;
    savingBtn: string;
    // CV Generator
    cvTitle: string;
    cvSubtitle: string;
    chooseTemplate: string;
    template1Name: string;
    template1Desc: string;
    template2Name: string;
    template2Desc: string;
    template3Name: string;
    template3Desc: string;
    printBtn: string;
    personalDetails: string;
    dob: string;
    bloodGroup: string;
    languages: string;
    nationality: string;
    fatherName: string;
    motherName: string;
    spouseName: string;
    educationHistory: string;
    experienceHistory: string;
    skillsHeading: string;
    awardsHeading: string;
    addEducationBtn: string;
    addExperienceBtn: string;
    degreeLabel: string;
    institutionLabel: string;
    yearLabel: string;
    gradeLabel: string;
    jobTitleLabel: string;
    companyLabel: string;
    fromDateLabel: string;
    toDateLabel: string;
    responsibilitiesLabel: string;
    cvSummaryLabel: string;
    cvSummaryPlaceholder: string;
    privacyNote: string;
  };
  home: {
    badge: string;
    heroTitle: string;
    heroSubtitle: string;
    heroQuote: string;
    aboutBtn: string;
    donateBtn: string;
    contactBtn: string;
    tickerLabel: string;
    tickerDefault: string;
    introHeading: string;
    introP1: string;
    readMore: string;
    features: Array<{ icon: string; title: string; desc: string }>;
    objectivesHeading: string;
    objectivesDesc: string;
    allObjectivesBtn: string;
    committeeHeading: string;
    committeeSubtitle: string;
    allCommitteeBtn: string;
    activitiesHeading: string;
    allActivitiesBtn: string;
    ctaHeading: string;
    ctaDesc: string;
  };
  about: {
    pageTitle: string;
    pageSubtitle: string;
    introHeading: string;
    paragraphs: string[];
    facts: Array<{ label: string; value: string; sub?: string }>;
    jurisdictionHeading: string;
    jurisdictionText: string;
    membershipHeading: string;
    memberships: Array<{ title: string; desc: string }>;
  };
  objectives: {
    pageTitle: string;
    pageSubtitle: string;
    introText: string;
    list: string[];
  };
  committee: {
    pageTitle: string;
    pageSubtitle: string;
    rolesHeading: string;
    rolesDesc: string;
    subcommitteeHeading: string;
    subcommitteeDesc: string;
    emptyText: string;
  };
  activities: {
    pageTitle: string;
    pageSubtitle: string;
    readFull: string;
    emptyText: string;
    backBtn: string;
    galleryHeading: string;
    relatedHeading: string;
  };
  notices: {
    pageTitle: string;
    pageSubtitle: string;
    urgentBadge: string;
    thankYou: string;
    footerPrompt: string;
    emptyText: string;
  };
  gallery: {
    pageTitle: string;
    pageSubtitle: string;
    emptyText: string;
    categoryPrefix: string;
    allCategory: string;
  };
  donate: {
    pageTitle: string;
    pageSubtitle: string;
    appealTitle: string;
    p1: string;
    p2: string;
    bankAccountTitle: string;
    accountNameLabel: string;
    bankNameLabel: string;
    bankNameValue: string;
    panLabel: string;
    contactTitle: string;
    contactBtn: string;
    footerBlessing: string;
  };
  contact: {
    pageTitle: string;
    pageSubtitle: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    successMsg: string;
    errorMsg: string;
    validationMsg: string;
    officeAddressTitle: string;
  };
  footer: {
    aboutSnippet: string;
    quickLinks: string;
    contactTitle: string;
    rightsReserved: string;
    cpanelLink: string;
    memberPortalLink: string;
    communityCredit: string;
  };
  positions: Record<string, string>;
  categories: Record<string, string>;
}

export const translations: Record<Language, TranslationData> = {
  ne: {
    site: {
      name: "शाक्य बज्राचार्य समाज, यल",
      subName: "The Society of Shakya, Bajracharya Lalitpur",
      fullName: "शाक्य बज्राचार्य समाज यल ललितपुर, नेपाल",
      tagline: "समुन्नत, सुसंस्कार, सद्भाव र शान्तिपूर्ण समाज समृद्धिका आधार",
      address: "हःखाटोल, वडा १२, ललितपुर, नेपाल",
      phone: "०१-५५४१८६८",
      phoneRaw: "+977-1-5541868",
      email: "shakyabajracharyasamajyala@gmail.com",
      registration: "दर्ता नं. ५५८७/२०७५ — जिल्ला प्रशासन कार्यालय, ललितपुर",
      pan: "स्थायी लेखा नं. (पायन) ६१३३२६११९",
      established: "नें.सं. ११३८, बु.सं. २५६२, वि.सं. २०७५ (Est. 2018)",
    },
    nav: {
      home: "गृहपृष्ठ",
      about: "समाजको परिचय",
      objectives: "समाजको उद्देश्य",
      committee: "कार्यसमिति",
      members: "सदस्यहरुको विवरण",
      activities: "गतिविधि",
      notices: "सूचना",
      gallery: "तस्वीर संग्रह",
      donate: "आर्थिक सहयोग",
      contact: "सम्पर्क",
      cpanel: "CPanel / व्यवस्थापक",
      memberPortal: "सदस्य लगइन (Member Portal)",
    },
    memberTypes: {
      all: "सबै सदस्यहरु (All)",
      founder: "संस्थापक सदस्य (Founder)",
      honorary: "मानार्थ सदस्य (Honorary)",
      life: "आजीवन सदस्य (Life)",
      general: "साधारण सदस्य (General)",
    },
    membersPage: {
      title: "सदस्यहरुको विवरण (Members Profile)",
      subtitle: "शाक्य बज्राचार्य समाज यलका आदरणीय संस्थापक, मानार्थ, आजीवन एवं साधारण सदस्यहरु",
      searchPlaceholder: "सदस्यको नाम, योग्यता वा पेशा खोज्नुहोस्...",
      membershipNoLabel: "सदस्यता नं.",
      educationLabel: "शैक्षिक योग्यता",
      professionLabel: "पेशा / कार्यरत संस्था / व्यवसाय",
      monasteryLabel: "सम्बद्ध बहाः / बही",
      addressLabel: "ठेगाना",
      emptyText: "कुनै सदस्य फेला परेन ।",
      viewCvNotice: "गोपनीयता नीति अनुसार विस्तृत CV सदस्य स्वयंले मात्र लगइन गरी हेर्न तथा प्रिन्ट गर्न सक्नुहुन्छ ।",
      loginToCvNotice: "आफ्नो सम्पूर्ण CV सम्पादन गर्न वा विभिन्न ३ ढाँचामा प्रिन्ट गर्न सदस्य लगइन गर्नुहोस् ।",
      memberLoginBtn: "🔐 सदस्य लगइन / CV जेनेरेटर",
      memberCount: "जम्मा सदस्य",
    },
    memberPortal: {
      loginTitle: "सदस्य पोर्टल (Member Portal)",
      loginSubtitle: "आफ्नो व्यक्तिगत विवरण तथा विस्तृत CV सम्पादन एवं ३ वटा ढाँचामा प्रिन्ट गर्न लगइन वा नयाँ खाता दर्ता गर्नुहोस्",
      tabLogin: "🔑 लगइन (Log In)",
      tabRegister: "📝 नयाँ सदस्य दर्ता (Register)",
      tabReset: "🔄 पासवर्ड बनाउनुहोस् वा रिसेट (Set / Reset Password)",
      identifierLabel: "इमेल वा सदस्यता नम्बर (Email or Membership No.)",
      identifierPlaceholder: "member@example.com वा SBS-GM-001",
      emailLabel: "दर्ता गरिएको इमेल (Email)",
      passwordLabel: "पासवर्ड (Password)",
      newPasswordLabel: "नयाँ पासवर्ड (New Password)",
      confirmPasswordLabel: "पासवर्ड पुन: पुष्टि गर्नुहोस् (Confirm Password)",
      fullNameLabel: "पुरा नाम (Full Name in English)",
      fullNameNeLabel: "नेपालीमा नाम (Name in Nepali)",
      membershipTypeLabel: "सदस्यता प्रकार (Membership Type)",
      loginBtn: "प्रवेश गर्नुहोस् (Log In)",
      loggingInBtn: "लगइन हुँदैछ...",
      registerBtn: "दर्ता गरी लगइन गर्नुहोस् (Create Account & Sign In)",
      registeringBtn: "दर्ता हुँदैछ...",
      resetBtn: "नयाँ पासवर्ड सुरक्षित गर्नुहोस् (Save New Password)",
      resettingBtn: "अपडेट हुँदैछ...",
      resetSuccess: "✅ पासवर्ड सफलतापूर्वक अपडेट भयो! लगइन हुँदैछ...",
      registerSuccess: "✅ सदस्यता सफलतापूर्वक दर्ता भयो! लगइन हुँदैछ...",
      forgotPasswordLink: "पासवर्ड बिर्सनुभयो वा नयाँ बनाउन चाहनुहुन्छ?",
      needAccountLink: "नयाँ सदस्य हुनुहुन्छ? यहाँ दर्ता गर्नुहोस्",
      alreadyAccountLink: "पहिले नै खाता छ? यहाँ लगइन गर्नुहोस्",
      demoHintTitle: "परीक्षणका लागि नमुना सदस्य खाताहरु (Demo Accounts):",
      demoHintText: "तलका कुनै पनि खाता प्रयोग गरी लगइन गर्न सक्नुहुन्छ (Password: member123)",
      autoFillBtn: "स्वतः विवरण भर्नुहोस्",
      dashboardTitle: "सदस्य नियन्त्रण कक्ष (Member Profile & CV Portal)",
      dashboardSubtitle: "आफ्नो प्रोफाइल अपडेट गर्नुहोस् र ३ आकर्षक ढाँचामा व्यावसायिक बायोडाटा (CV) प्रिन्ट गर्नुहोस्",
      editProfileTab: "👤 मेरो प्रोफाइल सम्पादन (Edit Profile)",
      cvGeneratorTab: "📄 बायोडाटा / CV जेनेरेटर (3 Templates)",
      logoutBtn: "🚪 लगआउट (Logout)",
      saveSuccess: "✅ तपाईंको प्रोफाइल सफलतापूर्वक सुरक्षित भयो !",
      saveError: "त्रुटि: प्रोफाइल सुरक्षित गर्न सकिएन ।",
      saveProfileBtn: "💾 प्रोफाइल सुरक्षित गर्नुहोस्",
      savingBtn: "सुरक्षित हुँदैछ...",
      cvTitle: "व्यावसायिक बायोडाटा (Curriculum Vitae)",
      cvSubtitle: "आफ्नो इच्छा अनुसार कुनै १ ढाँचा (Template) छनोट गरी तुरुन्त PDF वा प्रिन्ट गर्नुहोस्",
      chooseTemplate: "ढाँचा छनोट गर्नुहोस् (Choose CV Template):",
      template1Name: "१. परम्परागत बज्रयान (Traditional Maroon & Gold)",
      template1Desc: "नेवार बौद्ध कला, मयूरवर्ण सौन्दर्य र क्लासिक डिजाइन",
      template2Name: "२. आधुनिक कार्यकारी (Modern Corporate Blue)",
      template2Desc: "कर्पोरेट दुई-स्तम्भीय लेआउट, स्पष्ट टाइमलाइन",
      template3Name: "३. शैक्षिक / मिनिमल (Academic Monochrome Clean)",
      template3Desc: "विश्वविद्यालय एवं अन्तर्राष्ट्रिय स्तरको सफा ढाँचा",
      printBtn: "🖨️ बायोडाटा प्रिन्ट / PDF डाउनलोड गर्नुहोस् (Print CV)",
      personalDetails: "व्यक्तिगत विवरण (Personal Details)",
      dob: "जन्म मिति (DOB)",
      bloodGroup: "रक्त समूह (Blood Group)",
      languages: "भाषाहरु (Languages)",
      nationality: "राष्ट्रियता (Nationality)",
      fatherName: "बुबाको नाम (Father's Name)",
      motherName: "आमाको नाम (Mother's Name)",
      spouseName: "पति/पत्नीको नाम (Spouse Name)",
      educationHistory: "शैक्षिक योग्यताको इतिहास (Education History)",
      experienceHistory: "कार्य अनुभवको इतिहास (Work Experience)",
      skillsHeading: "दक्षता एवं सीपहरु (Skills & Competencies)",
      awardsHeading: "पुरस्कार तथा सम्मान (Awards & Honors)",
      addEducationBtn: "+ थप शैक्षिक योग्यता थप्नुहोस्",
      addExperienceBtn: "+ थप कार्य अनुभव थप्नुहोस्",
      degreeLabel: "डिग्री / उपाधि",
      institutionLabel: "शिक्षण संस्था / विश्वविद्यालय",
      yearLabel: "उत्तीर्ण वर्ष",
      gradeLabel: "श्रेणी / GPA",
      jobTitleLabel: "पद (Job Title)",
      companyLabel: "कार्यालय / संस्था (Organization)",
      fromDateLabel: "सुरु वर्ष",
      toDateLabel: "अन्त्य वर्ष (वा हालसम्म)",
      responsibilitiesLabel: "मुख्य जिम्मेवारी / कार्य विवरण",
      cvSummaryLabel: "व्यावसायिक सारंश (Professional Summary / Executive Bio)",
      cvSummaryPlaceholder: "आफ्नो अनुभव र विशेषज्ञताको छोटो सारांश लेख्नुहोस्...",
      privacyNote: "🔒 सुरक्षा जानकारी: तपाईंको विस्तृत CV विवरण (बुबा/आमाको नाम, जन्म मिति, पूर्ण कार्य इतिहास) सुरक्षित छ र तपाईंले मात्र देख्न तथा प्रिन्ट गर्न सक्नुहुन्छ। अन्य सामान्य प्रयोगकर्ताले तपाईंको आधारभूत नाम, शैक्षिक उपाधि र कार्यरत संस्था मात्र देख्नेछन्।",
    },
    home: {
      badge: "☸ नेवार बौद्ध समाज · ललितपुर",
      heroTitle: "शाक्य बज्राचार्य समाज, यल",
      heroSubtitle: "The Society of Shakya, Bajracharya Lalitpur, Nepal",
      heroQuote: "“समुन्नत, सुसंस्कार, सद्भाव र शान्तिपूर्ण समाज समृद्धिका आधार”",
      aboutBtn: "समाजको बारेमा",
      donateBtn: "आर्थिक सहयोग",
      contactBtn: "सम्पर्क गर्नुहोस्",
      tickerLabel: "📢 सूचना",
      tickerDefault:
        "✦ मूल विहारका आजुहरुका लागि सहयोग अभियान जारी छ ✦ बुद्ध जयन्ती कार्यक्रम सम्पन्न ✦ २०८१ भित्तेपात्र प्रकाशित ✦ सम्यक महादान पर्व सम्पन्न ✦ पाँचौं बार्षिक साधारण सभा सम्पन्न ✦",
      introHeading: "समाजको परिचय",
      introP1:
        "हाम्रो देश नेपाल विभिन्न जाति, धर्म, कला, संस्कृति एवं प्राकृतिक साधन र स्रोत आदि विविधताले भरिपूर्ण देश हो । यसै सन्दर्भमा परापूर्वकालदेखि आफ्नो छुट्टै परम्परा, इतिहास र मौलिकता भएको वर्ग, जात र समुदाय मध्येको शाक्य र बज्राचार्य हो । वर्तमान उपत्यकाका शाक्य र बज्राचार्यहरु पूर्णतः आदिवासी समुदाय हुन् र नेवार बौद्ध समाजको एक अभिन्न अङ्ग हुन् ।",
      readMore: "थप पढ्नुहोस् →",
      features: [
        { icon: "🕉", title: "धार्मिक संरक्षण", desc: "बौद्ध पूजाविधि र संस्कारको जगेर्ना" },
        { icon: "📚", title: "शैक्षिक विकास", desc: "युवा सदस्यहरुका लागि अभिमुखीकरण" },
        { icon: "🏥", title: "स्वास्थ्य सेवा", desc: "ज्येष्ठ आजुहरुका लागि सहयोग अभियान" },
        { icon: "🎭", title: "साँस्कृतिक जगेर्ना", desc: "परम्परा र मौलिकताको संवर्द्धन" },
      ],
      objectivesHeading: "हाम्रा उद्देश्यहरु",
      objectivesDesc:
        "“समग्र शाक्य बज्राचार्य समुदायको धार्मिक, सामाजिक, साँस्कृतिक, आर्थिक, प्राविधिक, नैतिक, शैक्षिक आदिको उन्नति, विकास र सम्बर्द्धनका लागि” — यही मूलमन्त्र लिएर यस समाजले कार्य गरिरहेको छ ।",
      allObjectivesBtn: "सम्पूर्ण उद्देश्यहरु →",
      committeeHeading: "वर्तमान कार्यसमिति",
      committeeSubtitle: "पदाधिकारीहरु एवं सदस्यहरु",
      allCommitteeBtn: "सम्पूर्ण कार्यसमिति हेर्नुहोस् →",
      activitiesHeading: "हालसालैका गतिविधिहरु",
      allActivitiesBtn: "सम्पूर्ण गतिविधिहरु हेर्नुहोस् →",
      ctaHeading: "हाम्रो समाजलाई साथ दिनुहोस्",
      ctaDesc:
        "शाक्य एवं बज्राचार्य वर्गको सर्वाङ्गीण विकासका लागि विविध क्रियाकलाप आयोजना गर्नका लागि तपाईंको आर्थिक, भौतिक र वैचारिक सहयोगको सधैँ आवश्यकता पर्दछ ।",
    },
    about: {
      pageTitle: "समाजको परिचय",
      pageSubtitle: "About the Society of Shakya, Bajracharya Lalitpur",
      introHeading: "संस्थाको परिचय",
      paragraphs: [
        "हाम्रो देश नेपाल विभिन्न जाति, धर्म, कला, संस्कृति एवं प्राकृतिक साधन र स्रोत आदि विविधताले भरिपूर्ण देश हो । यसको सही रूपमा सदुपयोग र सम्बर्द्धन गर्न सके हाम्रो राष्ट्रलाई विश्व सामू नमूनाको रूपमा परिचित गराउन सकिन्छ । यसै सन्दर्भमा परापूर्वकालदेखि आफ्नो छुट्टै परम्परा, इतिहास र मौलिकता भएको वर्ग, जात र समुदाय मध्येको शाक्य र बज्राचार्य हो ।",
        "वर्तमान उपत्यकाका शाक्य र बज्राचार्यहरु पूर्णतः आदिवासी समुदाय हुन् । यी शाक्य र बज्राचार्यहरु नेवार समाज, भाषा, संस्कृति र संस्कारको रूपमा आवद्ध एक अभिन्न अङ्ग बनिसकेको छ । जुन समुदायलाई “नेवार बौद्ध समाज” को रूपमा कहलिएको छ । यही नेवार बौद्ध समाज अन्तर्गत रहेको बौद्ध संघ परम्परामा नरहेका शाक्य, बज्राचार्यहरु (अन्तरजातीय) आफ्नो नाम पछाडि शाक्य र बज्राचार्य भए पनि परम्परागत बौद्ध संस्कृति, संस्कार आदि सामाजिक विधि-व्यवहारमा एक्लो अनुभव हुन्छ ।",
        "शाक्य र बज्राचार्यहरु आ-आफ्नो बहाल-बहीहरुमा चूडाकर्म गरिसकेपछि उक्त बहाल-बहीहरुको संघ सदस्य कहलाइन्छ । चूडाकर्म संस्कार अथवा प्रव्रज्या संवर, आचार्यभिषेक आदि बौद्ध संस्कार शाक्य र बज्राचार्यहरुको मौलिक परम्परा एवं पहिचान हो । चूडाकर्म गरेपछि संघमा आजीवन संघ सदस्यको रूपमा रहन्छन् । यसैकारण शाक्य र बज्राचार्यहरुको धर्म, संस्कृति, समाज संघ परम्परा अन्तर्गत रहिआएको देखिन्छ ।",
        "प्राचिन कालदेखि अनुपम कलाकृतिले सुसज्जित रहेको ललितपुरलाई युपग्राम, अशोकपत्तन, ललितपत्तन, ललितपुर, पाटन, यल आदि भनिन्छ । बौद्धधर्म, बौद्ध संस्कृति, बौद्ध संस्कार, बौद्ध कला आदि सम्पदाको संरक्षण र सम्बर्द्धन गर्न पूर्वजहरुले बहाःबही विहार, चुक, ननि र चैत्य, धर्मधातु प्रतिस्थापना गरी त्यसको गुथिगाना र संघको व्यवस्था समेत गरिएको देखिन्छ ।",
        "अतः यसरी इतिहास परम्परा तथा आफ्नै छुट्टै मौलिकता र जीवन्त परम्परा भएर पनि समय सापेक्ष देश-काल परिस्थिति अनुसारको जीवन पद्धतिलाई संस्थागत रूपले नै विकास गरी आफ्नो जीवन्त परम्परा एवं समाज र समुदायको आर्थिक, सामाजिक, साँस्कृतिक रूपले विकास गर्ने उद्देश्यले संस्था दर्ता ऐन २०३४ बमोजिम शाक्य बज्राचार्य समाजको स्थापना गर्ने निर्णय गरियो ।",
      ],
      facts: [
        { label: "संस्थाको नाम", value: "शाक्य बज्राचार्य समाज यल ललितपुर", sub: "The Society of Shakya, Bajracharya Lalitpur, Nepal" },
        { label: "स्थापना", value: "नें.सं. ११३८, बु.सं. २५६२, वि.सं. २०७५", sub: "Established under Organization Registration Act 2034" },
        { label: "दर्ता विवरण", value: "दर्ता नं. ५५८७/२०७५ — जि.प्र.का. ललितपुर", sub: "स्थायी लेखा नं. (PAN): ६१३३२६११९" },
      ],
      jurisdictionHeading: "समाजको कार्यक्षेत्र",
      jurisdictionText:
        "यस समाजको कार्यक्षेत्र ललितपुर महानगरपालिका क्षेत्र भित्र हुनेछ । आवश्यकता अनुसार सम्बन्धित जिल्लाको स्थानीय अधिकारीको स्वीकृति लिई मात्र नेपाल अधिराज्यभित्र संस्थाको कार्यक्षेत्र विस्तार गर्न सकिनेछ । यस महानगरपालिका भित्र वडा, स्थान वा टोलहरुमा इकाई वा शाखा समितिहरु गठन गर्न सकिनेछ ।",
      membershipHeading: "सदस्यताको प्रकार",
      memberships: [
        {
          title: "१. साधारण सदस्य",
          desc: "विधानको दफा ७ बमोजिम योग्यता पुगेको कुनै पनि नेपाली नागरिकले तोकिएको प्रक्रिया अन्तर्गत आवेदन दिन सक्नेछन् ।",
        },
        {
          title: "२. संस्थापक सदस्य",
          desc: "संस्था स्थापनाको समयमा तदर्थ समितिमा रहेका सदस्यहरु संस्थापक सदस्य हुनेछन् ।",
        },
        {
          title: "३. मानार्थ सदस्य",
          desc: "संस्थाको उद्देश्यमा आस्था राखी सहयोग प्रदान गर्ने विशिष्ट व्यक्ति मानार्थ सदस्य बन्न सक्नेछन् ।",
        },
        {
          title: "४. आजीवन सदस्य",
          desc: "समाजलाई विशेष योगदान गर्ने व्यक्तिलाई आजीवन सदस्य दिन सकिनेछ ।",
        },
        {
          title: "५. सल्लाहकार",
          desc: "संस्थाका पूर्व पदाधिकारी तथा विशिष्ट व्यक्तित्वहरुलाई सल्लाहकारमा नियुक्ति गर्न सकिनेछ ।",
        },
      ],
    },
    objectives: {
      pageTitle: "समाजको उद्देश्य",
      pageSubtitle: "Objectives of Shakya, Bajracharya Samaj, Yala (Lalitpur)",
      introText:
        "शाक्य, बज्राचार्य समाज, यल (ललितपुर) का उद्देश्यहरु निम्नानुसार छन् । यी उद्देश्यहरुको मार्गनिर्देशनमा समाजले आफ्नो सम्पूर्ण गतिविधि र कार्यक्रम सञ्चालन गर्दछ ।",
      list: [
        "यो समाज मुनाफा रहित शुद्ध र सामाजिक संस्था हुनेछ ।",
        "ललितपुर जिल्लावासी समग्र शाक्य बज्राचार्य समुदायको धार्मिक, सामाजिक, साँस्कृतिक, आर्थिक, प्राविधिक, नैतिक, शैक्षिक आदिको उन्नति विकास र सम्बर्द्धनको लागि हित कल्याणकारी काम गर्ने ।",
        "यस शाक्य, बज्राचार्य समुदायभित्र परम्परादेखि अविच्छिन्न रूपले चलिआएको संस्कारित कर्म, पूजाविधि आदिको जगेर्ना गरी निरन्तरता दिने कार्यमा मद्दत गर्ने ।",
        "स्वास्थ्य तथा शिक्षा पहुँच नपुगेका यस समाजका सदस्यहरुलाई स्वास्थ्य ज्ञान र शिक्षाको जनचेतनामूलक कार्यक्रम तथा विभिन्न शिविरहरु सञ्चालन गर्ने र स्वास्थ्य सम्बन्धी आवश्यक व्यवस्थापन गर्न सहयोग पुर्‍याउने ।",
        "यस समाजका वृद्धवृद्धा, अपाङ्ग र अशक्त व्यक्तिहरुको लागि आवश्यक कार्यक्रम एवं उचित व्यवस्थापन गर्ने ।",
        "समाजमा विकृतिको रूपमा रहेको तडकभडक व्यवहार, विसंगति र कुसंस्कृति एवं संस्कारलाई हटाई सभ्य र सुसंस्कृत समाजको सिर्जना गर्ने ।",
        "समाजका विभिन्न वर्ग र सदस्यहरुलाई लक्षित गरी वर्तमान समयमा उपलब्ध नविनतम ज्ञान परिचालन गरी सिपमूलक कार्यक्रम मार्फत उनीहरुको जीवनस्तर आर्थिक रूपमा उन्नति र अभिवृद्धि गर्ने ।",
        "शाक्य, बज्राचार्य समुदायमा परापूर्वकालदेखि मूल्य-मान्यताको रूपमा चल्दै आएका पूजाविधि तथा परम्परागत कार्यलाई निरन्तरताको लागि आवश्यक सल्लाह-छलफल गरी सघाउने र सहयोग पुर्‍याउने ।",
        "शाक्य, बज्राचार्यको महत्त्व र पूजाविधिबारे अध्ययन-अध्यापनको व्यवस्था गर्ने ।",
        "शाक्य, बज्राचार्य समाजका क्षेत्रको विकास र स्थापना गरी आवश्यक विचार-परामर्श, कार्ययोजना तयार गर्ने तथा मैत्रीभाव जगाई कार्यमा मद्दत पुर्‍याउने ।",
      ],
    },
    committee: {
      pageTitle: "कार्यसमिति",
      pageSubtitle: "वर्तमान कार्यसमितिका पदाधिकारीहरु एवं सदस्यहरु",
      rolesHeading: "कार्यसमितिको भूमिका",
      rolesDesc:
        "कार्यसमितिले समाजका दैनिक कार्यहरुको सञ्चालन, बार्षिक योजना कार्यान्वयन, सदस्यहरुको हित संरक्षण र समुदायको सर्वाङ्गीण विकासका लागि नीति निर्माण गर्दछ ।",
      subcommitteeHeading: "उपसमितिहरु",
      subcommitteeDesc:
        "विशेष कार्यक्षेत्रमा केन्द्रित रहन कार्यसमिति अन्तर्गत विभिन्न उपसमितिहरु गठन गरिएका छन् — जस्तै आर्थिक, साँस्कृतिक, शैक्षिक, सूचना, तथा प्रकाशन उपसमिति । उपसमितिहरुले आ-आफ्नो कार्यक्षेत्रमा विशेष योजनाहरु तयार पारी लागू गर्दछन् ।",
      emptyText: "कुनै सदस्य विवरण उपलब्ध छैन ।",
    },
    activities: {
      pageTitle: "गतिविधि",
      pageSubtitle: "समाजका हालसालैका कार्यक्रम एवं गतिविधिहरु",
      readFull: "पूरा पढ्नुहोस् →",
      emptyText: "हाल कुनै गतिविधि उपलब्ध छैन ।",
      backBtn: "← सम्पूर्ण गतिविधिहरुमा फर्कनुहोस्",
      galleryHeading: "कार्यक्रमका तस्वीरहरु",
      relatedHeading: "अन्य गतिविधिहरु",
    },
    notices: {
      pageTitle: "सूचना",
      pageSubtitle: "समाजका जरुरी सूचना एवं जानकारीहरु",
      urgentBadge: "📢 जरुरी सूचना",
      thankYou: "— धन्यवाद ।",
      footerPrompt: "थप सूचनाहरुका लागि समय-समयमा यस पृष्ठमा हेर्नुहोस् वा हाम्रो सम्पर्क पृष्ठमा जानुहोस् ।",
      emptyText: "हाल कुनै सक्रिय सूचना उपलब्ध छैन ।",
    },
    gallery: {
      pageTitle: "तस्वीर संग्रह",
      pageSubtitle: "समाजका विभिन्न कार्यक्रम एवं गतिविधिहरुका तस्वीरहरु",
      emptyText: "हाल कुनै तस्वीर उपलब्ध छैन ।",
      categoryPrefix: "वर्ग",
      allCategory: "सबै (All)",
    },
    donate: {
      pageTitle: "आर्थिक सहयोग",
      pageSubtitle: "Support the Shakya, Bajracharya community of Lalitpur",
      appealTitle: "हामीलाई साथ दिनुहोस्",
      p1: "ललितपुरका शाक्य र बज्राचार्यहरुको समग्र विकासमा अग्रगामी भूमिकाका लागि क्रियाशील यस शाक्य, बज्राचार्य समाज, यल (ललितपुर) लाई हर कदममा सम्पूर्ण समुदायको आर्थिक, भौतिक र वैचारिक सहयोगको हमेशा आवश्यकता पर्दछ ।",
      p2: "तपाईंहरु मध्ये इच्छुक महानुभावहरुले हाम्रो समाजको माध्यमबाट शाक्य एवं बज्राचार्य वर्गको सर्वाङ्गीण विकासका लागि विविध क्रियाकलाप आयोजना गर्नका लागि आर्थिक सहयोग गर्न चाहनुभएको अवस्थामा यस समाजको बैंक खातामा रकम दाखिला गरेर हामीलाई साथ दिनुहुनका लागि हार्दिक अनुरोध गर्दछौं ।",
      bankAccountTitle: "बैंक खाता विवरण",
      accountNameLabel: "खाताको नाम",
      bankNameLabel: "बैंक",
      bankNameValue: "कृपया समाज कार्यालयमा सम्पर्क गर्नुहोस्",
      panLabel: "स्थायी लेखा नं. (PAN)",
      contactTitle: "कार्यालय सम्पर्क",
      contactBtn: "सम्पर्क फारम →",
      footerBlessing: "🙏 तपाईंको हरेक सहयोगले हाम्रो समुदायको उन्नति र संस्कृतिको संरक्षणमा महत्वपूर्ण योगदान पुर्‍याउँछ ।",
    },
    contact: {
      pageTitle: "सम्पर्क",
      pageSubtitle: "Reach out to Shakya, Bajracharya Samaj Yala",
      formTitle: "सन्देश पठाउनुहोस्",
      formSubtitle: "तपाईंको जिज्ञासा, सुझाव वा प्रतिक्रिया हामीलाई पठाउनुहोस् । हामी चाँडो सम्पर्कमा रहनेछौं ।",
      nameLabel: "तपाईंको नाम",
      namePlaceholder: "उदा. सञ्जय शाक्य",
      emailLabel: "इमेल ठेगाना",
      emailPlaceholder: "example@gmail.com",
      subjectLabel: "विषय",
      subjectPlaceholder: "उदा. सदस्यता सम्बन्धी सोधपुछ",
      messageLabel: "सन्देश",
      messagePlaceholder: "तपाईंको सन्देश यहाँ लेख्नुहोस्...",
      submitBtn: "सन्देश पठाउनुहोस्",
      submittingBtn: "पठाउँदै...",
      successMsg: "धन्यवाद! तपाईंको सन्देश हामीले प्राप्त गरेका छौं ।",
      errorMsg: "सन्देश पठाउन असफल भयो। कृपया पुनः प्रयास गर्नुहोस् ।",
      validationMsg: "कृपया नाम, इमेल र सन्देश भर्नुहोस् ।",
      officeAddressTitle: "कार्यालयको ठेगाना",
    },
    footer: {
      aboutSnippet: "ललितपुर उपत्यकाका शाक्य र बज्राचार्य समुदायको धार्मिक, सामाजिक, साँस्कृतिक एवं शैक्षिक विकासका लागि क्रियाशील सामाजिक संस्था ।",
      quickLinks: "द्रुत लिङ्कहरु",
      contactTitle: "सम्पर्क",
      rightsReserved: "सर्वाधिकार सुरक्षित ।",
      cpanelLink: "🔐 CPanel / व्यवस्थापक लगइन",
      memberPortalLink: "👤 सदस्य पोर्टल (Member Login)",
      communityCredit: "नेवार बौद्ध समाज · ललितपुर",
    },
    positions: {
      "अध्यक्ष": "अध्यक्ष (President)",
      "प्रथम उपाध्यक्ष": "प्रथम उपाध्यक्ष (1st Vice-President)",
      "द्वितीय उपाध्यक्ष": "द्वितीय उपाध्यक्ष (2nd Vice-President)",
      "सह-सचिव": "सह-सचिव (Joint Secretary)",
      "कोषाध्यक्ष": "कोषाध्यक्ष (Treasurer)",
      "निवर्तमान अध्यक्ष": "निवर्तमान अध्यक्ष (Immediate Past President)",
      "का.स. सदस्य": "का.स. सदस्य (Executive Member)",
      "महासचिव": "महासचिव (General Secretary)",
      "सदस्य": "सदस्य (Member)",
    },
    categories: {
      "कार्यक्रम": "कार्यक्रम",
      "साधारण सभा": "साधारण सभा",
      "पूजाविधि / संस्कार": "पूजाविधि / संस्कार",
      "कार्यसमिति": "कार्यसमिति",
      "सामान्य": "सामान्य",
      "अन्य": "अन्य",
    },
  },
  en: {
    site: {
      name: "Shakya Bajracharya Samaj Yala",
      subName: "The Society of Shakya, Bajracharya Lalitpur",
      fullName: "The Society of Shakya, Bajracharya Lalitpur, Nepal",
      tagline: "Progressive, Cultured, Harmonious & Peaceful Society as the Foundation for Prosperity",
      address: "Ha:kha Tole, Ward No. 12, Lalitpur, Nepal",
      phone: "+977-1-5541868",
      phoneRaw: "+977-1-5541868",
      email: "shakyabajracharyasamajyala@gmail.com",
      registration: "Registration No. 5587/2075 — District Administration Office, Lalitpur",
      pan: "Permanent Account Number (PAN): 613326119",
      established: "N.S. 1138, B.S. 2562, V.S. 2075 (Est. 2018)",
    },
    nav: {
      home: "Home",
      about: "About Society",
      objectives: "Objectives",
      committee: "Executive Committee",
      members: "Members Profile",
      activities: "Activities & News",
      notices: "Notices",
      gallery: "Photo Gallery",
      donate: "Donate & Support",
      contact: "Contact Us",
      cpanel: "CPanel / Admin",
      memberPortal: "Member Portal / Login",
    },
    memberTypes: {
      all: "All Members",
      founder: "Founder Member",
      honorary: "Honorary Member",
      life: "Life Member",
      general: "General Member",
    },
    membersPage: {
      title: "Members Directory & Profiles",
      subtitle: "Esteemed Founder, Honorary, Life, and General Members of Shakya Bajracharya Samaj Yala",
      searchPlaceholder: "Search by member name, degree, or working office/profession...",
      membershipNoLabel: "Membership No.",
      educationLabel: "Education / Degree",
      professionLabel: "Working Office / Profession / Business",
      monasteryLabel: "Affiliated Baha / Bahi",
      addressLabel: "Address",
      emptyText: "No members found in this category.",
      viewCvNotice: "In adherence to member privacy, full Curriculum Vitae (CV) is strictly accessible and printable only by the respective logged-in member.",
      loginToCvNotice: "Members may log in to update their profiles or print their CV choosing from 3 professional templates.",
      memberLoginBtn: "🔐 Member Login / CV Portal",
      memberCount: "Total Members",
    },
    memberPortal: {
      loginTitle: "Member Portal",
      loginSubtitle: "Sign in to manage your profile, create/reset password, or register as a new member",
      tabLogin: "🔑 Sign In (Log In)",
      tabRegister: "📝 Register Member",
      tabReset: "🔄 Create / Reset Password",
      identifierLabel: "Email or Membership Number",
      identifierPlaceholder: "member@example.com or SBS-GM-001",
      emailLabel: "Registered Email Address",
      passwordLabel: "Password",
      newPasswordLabel: "New Password",
      confirmPasswordLabel: "Confirm Password",
      fullNameLabel: "Full Name (in English)",
      fullNameNeLabel: "Name in Nepali (Devanagari)",
      membershipTypeLabel: "Membership Type",
      loginBtn: "Sign In to Portal",
      loggingInBtn: "Signing In...",
      registerBtn: "Create Account & Sign In",
      registeringBtn: "Creating Account...",
      resetBtn: "Save New Password",
      resettingBtn: "Updating Password...",
      resetSuccess: "✅ Password updated successfully! Logging you in...",
      registerSuccess: "✅ Member account registered successfully! Logging you in...",
      forgotPasswordLink: "Forgot your password or need to create one?",
      needAccountLink: "New member? Register your account here",
      alreadyAccountLink: "Already have an account? Sign in here",
      demoHintTitle: "Quick Demo Accounts for Testing:",
      demoHintText: "You may sign in with any of these pre-configured member accounts (Password: member123)",
      autoFillBtn: "Auto Fill",
      dashboardTitle: "Member Control Center & CV Portal",
      dashboardSubtitle: "Update your public profile and generate your printable Curriculum Vitae across 3 professional templates",
      editProfileTab: "👤 Edit Profile & Work Details",
      cvGeneratorTab: "📄 CV Generator & 3 Templates",
      logoutBtn: "🚪 Log Out",
      saveSuccess: "✅ Your profile has been updated successfully!",
      saveError: "Error updating profile. Please try again.",
      saveProfileBtn: "💾 Save Profile Changes",
      savingBtn: "Saving Changes...",
      cvTitle: "Curriculum Vitae (CV / Resume)",
      cvSubtitle: "Choose from 3 beautifully designed templates below and click Print to export to PDF or paper",
      chooseTemplate: "Select CV Template Layout:",
      template1Name: "1. Traditional Vajrayana (Maroon & Gold Heritage)",
      template1Desc: "Newar Buddhist monastic accents, classic serif typography",
      template2Name: "2. Modern Executive (Corporate Blue & Slate)",
      template2Desc: "Clean two-column modern executive layout with skill badges",
      template3Name: "3. Academic Minimalist (Contemporary Monochrome)",
      template3Desc: "Clean, elegant single-column academic format for scholar resumes",
      printBtn: "🖨️ Print CV / Export to PDF",
      personalDetails: "Personal & Biographical Details",
      dob: "Date of Birth (DOB)",
      bloodGroup: "Blood Group",
      languages: "Languages Spoken",
      nationality: "Nationality",
      fatherName: "Father's Name",
      motherName: "Mother's Name",
      spouseName: "Spouse Name",
      educationHistory: "Academic Background (Education History)",
      experienceHistory: "Professional Experience (Career History)",
      skillsHeading: "Core Competencies & Skills",
      awardsHeading: "Honors & Achievements",
      addEducationBtn: "+ Add Academic Record",
      addExperienceBtn: "+ Add Career Experience",
      degreeLabel: "Degree / Qualification",
      institutionLabel: "Institution / Board / University",
      yearLabel: "Completion Year",
      gradeLabel: "Grade / Division",
      jobTitleLabel: "Job Title / Role",
      companyLabel: "Organization / Company",
      fromDateLabel: "Start Year",
      toDateLabel: "End Year (or Present)",
      responsibilitiesLabel: "Key Responsibilities / Impact",
      cvSummaryLabel: "Executive Summary / Bio Statement",
      cvSummaryPlaceholder: "Write a summary of your professional background, expertise, and community leadership...",
      privacyNote: "🔒 Privacy Assurance: Your full CV data (DOB, parent/spouse names, in-depth career timeline) is strictly private to your login. Public visitors only see your public name, education degree, and working office/business name.",
    },
    home: {
      badge: "☸ Newar Buddhist Community · Lalitpur (Patan)",
      heroTitle: "Shakya Bajracharya Samaj Yala",
      heroSubtitle: "The Society of Shakya, Bajracharya Lalitpur, Nepal",
      heroQuote: "“Progressive, Cultured, Harmonious & Peaceful Society as the Foundation for Prosperity”",
      aboutBtn: "About Society",
      donateBtn: "Donate & Support",
      contactBtn: "Contact Us",
      tickerLabel: "📢 Notice",
      tickerDefault:
        "✦ Relief & medicine support initiative for Venerable Ajus of 15 Principal Viharas in progress ✦ Buddha Jayanti celebration concluded ✦ New Year Wall Calendar published ✦ Samyak Mahadan Festival observed ✦ 5th Annual General Assembly concluded ✦",
      introHeading: "Introduction of the Society",
      introP1:
        "Nepal is blessed with rich diversity in ethnicities, religious heritage, arts, and cultures. Among the indigenous communities with centuries of unique heritage, history, and distinct identity are the Shakyas and Bajracharyas of the Kathmandu Valley. As integral pillars of the Newar Buddhist Society, this organization was formally established to safeguard and nurture their shared spiritual and socio-cultural legacy.",
      readMore: "Read More →",
      features: [
        { icon: "🕉", title: "Spiritual Preservation", desc: "Safeguarding Buddhist rituals, prayers & heritage" },
        { icon: "📚", title: "Educational Advancement", desc: "Workshops & orientation for youth empowerment" },
        { icon: "🏥", title: "Healthcare & Welfare", desc: "Care and medicine support for elder monastery Ajus" },
        { icon: "🎭", title: "Cultural Continuity", desc: "Promoting Newar Vajrayana art, language & customs" },
      ],
      objectivesHeading: "Our Core Objectives",
      objectivesDesc:
        "“For the religious, social, cultural, economic, technological, moral, and educational development and preservation of the entire Shakya and Bajracharya community.” — Guided by this founding vision.",
      allObjectivesBtn: "View All Objectives →",
      committeeHeading: "Executive Committee",
      committeeSubtitle: "Current Executive Officers & Committee Members",
      allCommitteeBtn: "View Full Committee →",
      activitiesHeading: "Recent Activities & Events",
      allActivitiesBtn: "View All Activities →",
      ctaHeading: "Support Our Community Initiatives",
      ctaDesc:
        "Your financial, physical, and intellectual contribution helps us organize sustainable community programs, preserve ancient Newar Buddhist monasteries, and empower future generations.",
    },
    about: {
      pageTitle: "About Society",
      pageSubtitle: "The Society of Shakya, Bajracharya Lalitpur, Nepal",
      introHeading: "Background and Identity",
      paragraphs: [
        "Nepal is a nation endowed with rich cultural, religious, and natural diversity. When properly nurtured and preserved, our cultural treasures serve as an exemplary model for the entire world. In this context, the Shakya and Bajracharya communities boast a distinct history, deep-rooted Buddhist philosophy, and an unbroken lineage from antiquity.",
        "The contemporary Shakyas and Bajracharyas of the Kathmandu Valley are indigenous communities that form an inseparable bedrock of Newar society, language, culture, and life-cycle rituals. They are widely revered as the cornerstone of the 'Newar Buddhist Society'. Shakyas and Bajracharyas who may be outside traditional Sangha lineages (such as inter-caste families) often feel disconnected in performing traditional Buddhist rituals and social customs.",
        "Upon undergoing the Choodakarma (Pravrajya Samvara / ordination ritual) or Acharyabhisheka in their respective Bahals and Bahis (monasteries), Shakyas and Bajracharyas become lifelong members of their monastic Sangha. This profound Buddhist ritual constitutes their intrinsic identity and heritage. Thus, preserving individual, family, and collective well-being is vital to keeping the sacred Sangha tradition vibrant.",
        "From ancient times, Lalitpur—historically known as Yupagrama, Ashokapattan, Lalitpattan, Patan, and Yala—has been renowned for its sublime arts and architecture. Our ancestors consecrated Bahals, Bahis, Viharas, courtyards (Chowks, Nanis), Stupas (Chaityas), and Dharmadhatu mandalas, instituting traditional Guthis and monastic Sanghas to safeguard them.",
        "To institutionalize this living heritage in tune with contemporary times and to promote the socio-economic, educational, and cultural advancement of the community, Shakya Bajracharya Samaj Yala was formally registered under the Organization Registration Act 2034.",
      ],
      facts: [
        { label: "Official Name", value: "The Society of Shakya, Bajracharya Lalitpur, Nepal", sub: "शाक्य बज्राचार्य समाज यल ललितपुर" },
        { label: "Establishment", value: "N.S. 1138, B.S. 2562, V.S. 2075 (2018 CE)", sub: "Registered under Organization Registration Act 2034" },
        { label: "Registration Details", value: "Reg. No. 5587/2075 — DAO Lalitpur", sub: "Permanent Account Number (PAN): 613326119" },
      ],
      jurisdictionHeading: "Territorial Jurisdiction",
      jurisdictionText:
        "The primary jurisdiction of this society encompasses the Lalitpur Metropolitan City area. Upon obtaining appropriate approval from the competent local authorities, the society's activities may be extended nationwide across Nepal. Branch and ward units may be constituted in various wards, toles, and localities of Lalitpur.",
      membershipHeading: "Categories of Membership",
      memberships: [
        {
          title: "1. General Member (साधारण सदस्य)",
          desc: "Any eligible Nepali citizen meeting the qualifications stipulated under Clause 7 of the Constitution may apply according to the prescribed procedure.",
        },
        {
          title: "2. Founding Member (संस्थापक सदस्य)",
          desc: "Members who were part of the Ad-hoc Committee at the time of the society's formal inception are recognized as Founding Members.",
        },
        {
          title: "3. Honorary Member (मानार्थ सदस्य)",
          desc: "Distinguished personalities who place faith in the society's objectives and provide notable patronage may be inducted as Honorary Members.",
        },
        {
          title: "4. Life Member (आजीवन सदस्य)",
          desc: "Individuals making extraordinary and dedicated contributions to the society may be conferred Life Membership.",
        },
        {
          title: "5. Advisor (सल्लाहकार)",
          desc: "Former executive officers and renowned scholarly figures in the community may be appointed to the Advisory Council.",
        },
      ],
    },
    objectives: {
      pageTitle: "Society Objectives",
      pageSubtitle: "Guiding Principles of Shakya Bajracharya Samaj Yala (Lalitpur)",
      introText:
        "The foundational aims and objectives of Shakya Bajracharya Samaj Yala are set forth below. All programs and initiatives are guided by these constitutional principles:",
      list: [
        "To function purely as a non-profit, non-political social and cultural organization.",
        "To work for the welfare, preservation, and holistic advancement of the Shakya and Bajracharya community in Lalitpur across religious, social, cultural, economic, technological, moral, and educational spheres.",
        "To safeguard, sustain, and pass down uninterrupted traditional life-cycle rites, puja rituals, and monastic customs of the Shakya and Bajracharya community.",
        "To conduct awareness programs, health clinics, and educational camps for community members lacking adequate access to healthcare and education.",
        "To formulate and manage welfare and social support programs for senior citizens, persons with disabilities, and vulnerable members.",
        "To eradicate ostentatious social malpractices, distortions, and unwholesome trends, fostering a civilized, cultured, and compassionate community.",
        "To implement skill-development and knowledge-enhancement initiatives leveraging modern technology to elevate the livelihood and economic self-reliance of community members.",
        "To provide constructive counsel, dialogue, and institutional support for continuing traditional worship systems and cultural functions passed down from antiquity.",
        "To organize study, research, and educational discourses on the spiritual significance and methodologies of Shakya-Bajracharya Buddhist traditions.",
        "To promote unity, mutual friendship, and structured development across different community wards and monastery associations in Lalitpur.",
      ],
    },
    committee: {
      pageTitle: "Executive Committee",
      pageSubtitle: "Current Executive Officers & Committee Members",
      rolesHeading: "Role of the Executive Committee",
      rolesDesc:
        "The Executive Committee oversees day-to-day administration, formulates annual action plans, implements social welfare policies, and protects community rights and cultural preservation.",
      subcommitteeHeading: "Subcommittees",
      subcommitteeDesc:
        "Specialized subcommittees—such as Finance, Cultural Preservation, Education & Youth, Information & Media, and Publication—are constituted to execute targeted programs efficiently.",
      emptyText: "No committee records found.",
    },
    activities: {
      pageTitle: "Activities & News",
      pageSubtitle: "Recent events, programs, and community updates",
      readFull: "Read Full Story →",
      emptyText: "No activities posted yet.",
      backBtn: "← Back to All Activities",
      galleryHeading: "Event Photo Gallery",
      relatedHeading: "Other Activities",
    },
    notices: {
      pageTitle: "Notices & Announcements",
      pageSubtitle: "Official circulars, urgent announcements, and updates",
      urgentBadge: "📢 Urgent Notice",
      thankYou: "— Thank you.",
      footerPrompt: "Please check this page periodically for updates, or visit our Contact Us page.",
      emptyText: "No active notices at this moment.",
    },
    gallery: {
      pageTitle: "Photo Gallery",
      pageSubtitle: "Visual glimpses of community festivals, rituals, assemblies & events",
      emptyText: "No photos in gallery yet.",
      categoryPrefix: "Category",
      allCategory: "All Categories",
    },
    donate: {
      pageTitle: "Donate & Support",
      pageSubtitle: "Support the Shakya & Bajracharya Community of Lalitpur",
      appealTitle: "Join Hands With Us",
      p1: "Shakya Bajracharya Samaj Yala (Lalitpur) is dedicated to leading the comprehensive development of the community. In every step of our noble journey, the community's financial, material, and intellectual support is vital.",
      p2: "Kind donors and well-wishers who wish to support our diverse socio-cultural, educational, and monastic welfare initiatives are warmly requested to deposit their generous donations directly into our official bank account.",
      bankAccountTitle: "Bank Account Details",
      accountNameLabel: "Account Name",
      bankNameLabel: "Bank & Branch",
      bankNameValue: "Please contact the society office for transfer details",
      panLabel: "Permanent Account Number (PAN)",
      contactTitle: "Office Inquiries",
      contactBtn: "Contact Form →",
      footerBlessing: "🙏 Every contribution, large or small, directly empowers our community and preserves our priceless Vajrayana Buddhist heritage.",
    },
    contact: {
      pageTitle: "Contact Us",
      pageSubtitle: "Reach out to Shakya, Bajracharya Samaj Yala",
      formTitle: "Send Us a Message",
      formSubtitle: "Have an inquiry, feedback, or suggestion? Fill in the form below and we will get back to you promptly.",
      nameLabel: "Your Full Name",
      namePlaceholder: "e.g. Sanjay Shakya",
      emailLabel: "Email Address",
      emailPlaceholder: "example@gmail.com",
      subjectLabel: "Subject",
      subjectPlaceholder: "e.g. Membership Inquiry / Event Information",
      messageLabel: "Message",
      messagePlaceholder: "Write your message here...",
      submitBtn: "Send Message",
      submittingBtn: "Sending...",
      successMsg: "Thank you! Your message has been received successfully.",
      errorMsg: "Failed to send message. Please try again.",
      validationMsg: "Please fill in your name, email, and message.",
      officeAddressTitle: "Office Address",
    },
    footer: {
      aboutSnippet: "A registered social organization dedicated to the religious, socio-cultural, educational, and economic preservation and empowerment of the Shakya and Bajracharya community of Lalitpur, Nepal.",
      quickLinks: "Quick Links",
      contactTitle: "Contact Information",
      rightsReserved: "All Rights Reserved.",
      cpanelLink: "🔐 CPanel / Admin Login",
      memberPortalLink: "👤 Member Portal / Login",
      communityCredit: "Newar Buddhist Community · Lalitpur",
    },
    positions: {
      "अध्यक्ष": "President",
      "प्रथम उपाध्यक्ष": "1st Vice-President",
      "द्वितीय उपाध्यक्ष": "2nd Vice-President",
      "सह-सचिव": "Joint Secretary",
      "कोषाध्यक्ष": "Treasurer",
      "निवर्तमान अध्यक्ष": "Immediate Past President",
      "का.स. सदस्य": "Executive Member",
      "महासचिव": "General Secretary",
      "सदस्य": "Member",
    },
    categories: {
      "कार्यक्रम": "Events & Programs",
      "साधारण सभा": "General Assembly",
      "पूजाविधि / संस्कार": "Rituals & Heritage",
      "कार्यसमिति": "Executive Committee",
      "सामान्य": "General",
      "अन्य": "Other",
    },
  },
};
