import { db } from "@/db";
import {
  adminUsers,
  activities,
  galleryItems,
  notices,
  committeeMembers,
  siteSettings,
  members,
} from "@/db/schema";
import { sql } from "drizzle-orm";
import { ACTIVITIES, COMMITTEE, GALLERY_IMAGES, NOTICES, SITE } from "./site-data";
import { DEFAULT_ADMIN_PASS, DEFAULT_ADMIN_USER, hashPassword } from "./auth";

let isSeeding = false;

const SAMPLE_MEMBERS = [
  {
    membershipNo: "SBS-FM-001",
    membershipType: "founder",
    name: "Sharan Kumar Shakya",
    nameNe: "शरण कुमार शाक्य",
    email: "sharan.shakya@example.com",
    password: "member123",
    phone: "9851000001",
    photo: "http://shakyabajracharyasamajyala.org.np/wp-content/uploads/2020/06/1-adhyakxe-sharan-kumar.jpg",
    education: "Master's in Buddhist Studies, Tribhuvan University",
    profession: "Founder President & Cultural Researcher, Shakya Bajracharya Samaj",
    address: "Ha:kha Tole, Ward-12, Lalitpur",
    bahalBahi: "Mayurvarna Mahavihar (Bhinchhebahal)",
    bio: "Dedicated cultural researcher and founder president of Shakya Bajracharya Samaj Yala, working for over 30 years in preserving Newar Buddhist heritage and community welfare.",
    cvData: JSON.stringify({
      title: "Senior Cultural Researcher & Buddhist Heritage Specialist",
      summary: "Over 30 years of dedicated leadership in Newar Buddhist traditions, monastic preservation, community empowerment, and historical manuscript documentation in Lalitpur.",
      dob: "1965-04-14",
      bloodGroup: "O+",
      languages: ["Newar (Nepal Bhasa)", "Nepali", "English", "Sanskrit (Reading)"],
      nationality: "Nepali",
      fatherName: "Late Ratna Man Shakya",
      motherName: "Late Maya Devi Shakya",
      spouseName: "Shanti Shakya",
      educationHistory: [
        {
          degree: "Master of Arts in Buddhist Studies",
          institution: "Central Department of Buddhist Studies, Tribhuvan University",
          year: "1992",
          grade: "First Division",
        },
        {
          degree: "Bachelor of Arts (Humanities & Social Sciences)",
          institution: "Patan Multiple Campus, Lalitpur",
          year: "1988",
          grade: "First Division",
        },
      ],
      experienceHistory: [
        {
          jobTitle: "Founder President",
          company: "Shakya Bajracharya Samaj Yala (Lalitpur)",
          fromDate: "2018",
          toDate: "2023",
          current: false,
          responsibilities: "Led the formal legal registration, constitution formulation, community welfare fund establishment, and heritage preservation initiatives.",
        },
        {
          jobTitle: "Senior Heritage Consultant",
          company: "Lalitpur Buddhist Heritage Council",
          fromDate: "2000",
          toDate: "Present",
          current: true,
          responsibilities: "Guiding the restoration of ancient Chaityas, Baha/Bahi monasteries, and traditional Choodakarma rites.",
        },
      ],
      skills: [
        "Newar Buddhist Rituals & Traditions",
        "Community Leadership & Governance",
        "Ancient Manuscript Preservation (Ranjana Script)",
        "Social Welfare Program Management",
        "Public Speaking & Cultural Advocacy",
      ],
      awardsAchievements: [
        "Lalitpur Municipal Cultural Excellence Award (2022)",
        "National Buddhist Heritage Contribution Recognition (2019)",
        "Keynote Speaker at International Newar Buddhist Conference",
      ],
    }),
  },
  {
    membershipNo: "SBS-FM-002",
    membershipType: "founder",
    name: "Jagat Muni Shakya",
    nameNe: "जगतमुनि शाक्य",
    email: "jagat.shakya@example.com",
    password: "member123",
    phone: "9851000002",
    photo: "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2025/10/viber_image_2025-10-12_18-19-55-867.jpg",
    education: "Master of Business Administration (MBA), Kathmandu University",
    profession: "President, Shakya Bajracharya Samaj / Managing Director, Shakya Arts",
    address: "Nagbahal, Lalitpur-16",
    bahalBahi: "Nagbahal Mahavihar",
    bio: "Executive president and social entrepreneur dedicated to advancing youth empowerment, technology adoption, and cultural preservation in Patan.",
    cvData: JSON.stringify({
      title: "Executive President & Enterprise Director",
      summary: "Accomplished administrator, entrepreneur, and community leader with expertise in organizational leadership, international Buddhist art trade, and modern institutional management.",
      dob: "1972-08-20",
      bloodGroup: "B+",
      languages: ["Nepal Bhasa", "Nepali", "English"],
      nationality: "Nepali",
      educationHistory: [
        {
          degree: "Master of Business Administration (MBA)",
          institution: "Kathmandu University School of Management",
          year: "1998",
          grade: "Distinction",
        },
      ],
      experienceHistory: [
        {
          jobTitle: "President",
          company: "Shakya Bajracharya Samaj Yala",
          fromDate: "2023",
          toDate: "Present",
          current: true,
          responsibilities: "Leading current executive committee, spearheading youth employment initiatives, and digitizing community services.",
        },
      ],
      skills: ["Executive Management", "Traditional Metal Craft Trade", "Strategic Planning", "Community Relations"],
      awardsAchievements: ["Presidential Service Medal (2024)", "Patan Chamber of Commerce Recognition"],
    }),
  },
  {
    membershipNo: "SBS-HM-001",
    membershipType: "honorary",
    name: "Dr. Anjan Shakya",
    nameNe: "माननीय डा. अन्जान शाक्य",
    email: "anjan.shakya@example.com",
    password: "member123",
    phone: "9851000003",
    photo: "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2024/05/0-02-03-6115bbd49912c35a09381afcdf3b334878dfae941281da301c0ff0e968004acb_73b8b8fd.jpg",
    education: "Ph.D. in Management & International Relations",
    profession: "Honorable Member of National Assembly / Former Ambassador of Nepal to Israel",
    address: "Kupondole, Lalitpur",
    bahalBahi: "Patan Shakya Sangha",
    bio: "Honorable Member of the National Assembly and former Ambassador of Nepal to Israel. A distinguished scholar, diplomat, and honorary patron of Shakya Bajracharya Samaj.",
    cvData: JSON.stringify({
      title: "Diplomat, Scholar & Parliamentarian",
      summary: "Distinguished diplomat, academician, and member of the National Assembly of Nepal with exemplary service in foreign diplomacy, peace advocacy, and cultural diplomacy.",
      dob: "1975-01-15",
      bloodGroup: "A+",
      languages: ["English", "Nepali", "Nepal Bhasa", "Hindi"],
      nationality: "Nepali",
      educationHistory: [
        {
          degree: "Doctor of Philosophy (Ph.D.)",
          institution: "Tribhuvan University",
          year: "2008",
          grade: "First Division",
        },
      ],
      experienceHistory: [
        {
          jobTitle: "Member of Parliament (National Assembly)",
          company: "Federal Parliament of Nepal",
          fromDate: "2024",
          toDate: "Present",
          current: true,
          responsibilities: "Formulating national policies, legislative scrutiny, and advocating for cultural heritage preservation.",
        },
        {
          jobTitle: "Ambassador of Nepal to Israel",
          company: "Ministry of Foreign Affairs, Government of Nepal",
          fromDate: "2019",
          toDate: "2021",
          current: false,
          responsibilities: "Represented Nepal abroad, fostered international relations and bilateral labor, agriculture, and cultural agreements.",
        },
      ],
      skills: ["Diplomatic Relations", "Public Policy", "International Negotiations", "Academic Research"],
      awardsAchievements: ["Ambassador of the Year Recognition", "National Academic Excellence Medal"],
    }),
  },
  {
    membershipNo: "SBS-HM-002",
    membershipType: "honorary",
    name: "Shailendra Man Bajracharya",
    nameNe: "माननीय शैलेन्द्र मान बज्राचार्य",
    email: "shailendra.bajracharya@example.com",
    password: "member123",
    phone: "9851000004",
    photo: "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2024/05/0-02-03-8854888ad092cedc4251da30d5ae39f0c2f5c88a59dd60e6af2536b7d7cd7664_34cc85e8.jpg",
    education: "Master's Degree in Public Administration",
    profession: "Minister for Culture, Tourism & Cooperatives, Bagmati Province",
    address: "Gabahal, Lalitpur-18",
    bahalBahi: "Rudra Varna Mahavihar (Ukubahal)",
    bio: "Provincial Minister and esteemed patron who actively promotes the preservation of intangible Newar Vajrayana rituals and heritage tourism in Lalitpur.",
    cvData: JSON.stringify({
      title: "Minister of Culture, Tourism & Cooperatives",
      summary: "Dedicated political leader and cultural steward promoting Buddhist heritage preservation, tourism development, and social harmony across Bagmati Province.",
      educationHistory: [
        { degree: "Master in Public Administration (MPA)", institution: "Tribhuvan University", year: "2004", grade: "First Division" }
      ],
      experienceHistory: [
        {
          jobTitle: "Minister for Culture, Tourism & Cooperatives",
          company: "Bagmati Provincial Government",
          fromDate: "2023",
          toDate: "Present",
          current: true,
          responsibilities: "Overseeing provincial heritage conservation projects, tourism promotion, and cooperative reforms.",
        }
      ],
      skills: ["Public Administration", "Policy Formulation", "Cultural Tourism Strategy"],
      awardsAchievements: ["Bagmati Province Cultural Steward Honor"],
    }),
  },
  {
    membershipNo: "SBS-LM-001",
    membershipType: "life",
    name: "Asha Ratna Shakya",
    nameNe: "आशा रत्न शाक्य",
    email: "asharatna.shakya@example.com",
    password: "member123",
    phone: "9851000005",
    photo: "http://shakyabajracharyasamajyala.org.np/wp-content/uploads/2020/06/4-maha-sachib-aasha-ratna.jpg",
    education: "B.Sc. & Diploma in Gemology",
    profession: "1st Vice-President / Senior Gemologist, Shakya Gems & Jewelry",
    address: "Mangalbazar, Lalitpur-11",
    bahalBahi: "Kwa Baha (Hiranya Varna Mahavihar)",
    bio: "Life member, 1st Vice-President, and renowned gemologist working actively to preserve traditional Shakya metallurgical knowledge and jewelry crafts.",
    cvData: JSON.stringify({
      title: "Senior Gemologist & Heritage Artisan",
      summary: "35+ years of mastery in Himalayan gems, traditional Buddhist iconography casting, and community leadership.",
      educationHistory: [
        { degree: "Bachelor of Science", institution: "Amrit Science Campus", year: "1989", grade: "First Division" },
        { degree: "Diploma in Gemology", institution: "Asian Institute of Gemological Sciences", year: "1994", grade: "Distinction" }
      ],
      experienceHistory: [
        {
          jobTitle: "1st Vice-President",
          company: "Shakya Bajracharya Samaj Yala",
          fromDate: "2023",
          toDate: "Present",
          current: true,
          responsibilities: "Coordinating executive committees and organizing Buddhist life-cycle ritual workshops.",
        }
      ],
      skills: ["Gemology", "Traditional Sculpture Appraisal", "Monastery Management"],
      awardsAchievements: ["Master Craftsman Award (2018)"],
    }),
  },
  {
    membershipNo: "SBS-LM-002",
    membershipType: "life",
    name: "Ramita Bajracharya",
    nameNe: "रमिता बज्राचार्य",
    email: "ramita.bajracharya@example.com",
    password: "member123",
    phone: "9851000006",
    photo: "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2025/12/ramita.jpg",
    education: "Master of Education (M.Ed.), Tribhuvan University",
    profession: "Joint Secretary / Principal, Lalit Buddhist Academy",
    address: "Sundhara, Ward-7, Lalitpur",
    bahalBahi: "I Bahi (I Baha Bahi)",
    bio: "Life member, educator, and Joint Secretary committed to women empowerment, children's Buddhist education, and literacy in Nepal Bhasa.",
    cvData: JSON.stringify({
      title: "Educator, Principal & Joint Secretary",
      summary: "Over 20 years in educational leadership, curriculum design for moral education, and social empowerment programs for Buddhist families.",
      educationHistory: [
        { degree: "Master of Education (M.Ed.)", institution: "Tribhuvan University", year: "2006", grade: "First Division" }
      ],
      experienceHistory: [
        {
          jobTitle: "Joint Secretary",
          company: "Shakya Bajracharya Samaj Yala",
          fromDate: "2023",
          toDate: "Present",
          current: true,
          responsibilities: "Directing women development initiatives and youth education programs.",
        }
      ],
      skills: ["Educational Leadership", "Child Psychology", "Community Mobilization"],
      awardsAchievements: ["Best Educator Award Lalitpur (2021)"],
    }),
  },
  {
    membershipNo: "SBS-GM-001",
    membershipType: "general",
    name: "Sunil Shakya",
    nameNe: "सुनिल शाक्य",
    email: "sunil.shakya@example.com",
    password: "member123",
    phone: "9851000007",
    photo: "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2025/10/0-02-03-0b5f44af59bd4e8c30ba6b69c0a49ad1863b083f80ea9e3a63fdfac4c875cf84_270f058048c32af4.jpg",
    education: "Bachelor of Information Technology (BIT)",
    profession: "Senior Software Engineer, Tech Himalaya / Freelance Web Architect",
    address: "Chakupat, Lalitpur-10",
    bahalBahi: "Mayurvarna Mahavihar",
    bio: "General member, technology enthusiast, and software engineer supporting the digitization of Buddhist archives and Samaj IT platforms.",
    cvData: JSON.stringify({
      title: "Senior Fullstack Software Engineer",
      summary: "Fullstack software engineer with 7+ years of experience developing modern web applications, cloud architectures, and digital archiving platforms.",
      dob: "1994-06-11",
      bloodGroup: "O+",
      languages: ["English", "Nepali", "Nepal Bhasa"],
      nationality: "Nepali",
      educationHistory: [
        { degree: "Bachelor of Information Technology (BIT)", institution: "Patan College for Professional Studies", year: "2016", grade: "Distinction" }
      ],
      experienceHistory: [
        {
          jobTitle: "Senior Software Engineer",
          company: "Tech Himalaya",
          fromDate: "2020",
          toDate: "Present",
          current: true,
          responsibilities: "Leading web engineering teams, building scalable microservices, and architecting database solutions.",
        }
      ],
      skills: ["React & Next.js", "TypeScript & Node.js", "PostgreSQL & Cloud Infrastructure", "Digital Preservation"],
      awardsAchievements: ["Hackathon Winner (2020)"],
    }),
  },
  {
    membershipNo: "SBS-GM-002",
    membershipType: "general",
    name: "Sarita Bajracharya",
    nameNe: "सरिता बज्राचार्य",
    email: "sarita.bajracharya@example.com",
    password: "member123",
    phone: "9851000008",
    photo: "https://shakyabajracharyasamajyala.org.np/wp-content/uploads/2025/10/0-02-03-7372226de57dd1f891d472afa052c1f1551e601849ace3d7f90eb289c8a3c034_a4cf9a0dd8409569.jpg",
    education: "Bachelor of Business Studies (BBS), Tribhuvan University",
    profession: "Executive Member & Senior Accountant, Patan Cooperative Ltd",
    address: "Thaina, Lalitpur-14",
    bahalBahi: "Subarna Varna Mahavihar",
    bio: "General member and active social worker specializing in financial literacy and women micro-enterprise development.",
    cvData: JSON.stringify({
      title: "Senior Accountant & Financial Specialist",
      summary: "12+ years in financial auditing, cooperative governance, and community saving-credit mobilization.",
      educationHistory: [
        { degree: "Bachelor of Business Studies (BBS)", institution: "Patan Multiple Campus", year: "2012", grade: "First Division" }
      ],
      experienceHistory: [
        {
          jobTitle: "Senior Accountant",
          company: "Patan Cooperative Ltd",
          fromDate: "2015",
          toDate: "Present",
          current: true,
          responsibilities: "Managing financial statements, auditing, and member dividend disbursements.",
        }
      ],
      skills: ["Financial Accounting", "Audit Compliance", "Cooperative Management"],
      awardsAchievements: ["Exemplary Cooperative Staff Honor (2023)"],
    }),
  },
];

export async function ensureSeeded() {
  if (isSeeding) return;
  isSeeding = true;
  try {
    // 1. Ensure admin user exists
    const [adminCount] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(adminUsers);

    if (!adminCount || adminCount.count === 0) {
      await db.insert(adminUsers).values({
        username: DEFAULT_ADMIN_USER,
        name: "प्रशासक (Administrator)",
        passwordHash: hashPassword(DEFAULT_ADMIN_PASS),
      });
    }

    // 2. Ensure members exist
    const [memCount] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(members);

    if (!memCount || memCount.count === 0) {
      for (const m of SAMPLE_MEMBERS) {
        await db.insert(members).values({
          membershipNo: m.membershipNo,
          membershipType: m.membershipType,
          name: m.name,
          nameNe: m.nameNe,
          email: m.email,
          passwordHash: hashPassword(m.password),
          phone: m.phone,
          photo: m.photo,
          education: m.education,
          profession: m.profession,
          address: m.address,
          bahalBahi: m.bahalBahi,
          bio: m.bio,
          cvData: m.cvData,
          status: "active",
        });
      }
    }

    // 3. Ensure activities exist
    const [actCount] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(activities);

    if (!actCount || actCount.count === 0) {
      for (const act of ACTIVITIES) {
        await db.insert(activities).values({
          slug: act.slug,
          title: act.title,
          dateNe: act.dateNe,
          dateEn: act.dateEn,
          cover: act.cover,
          excerpt: act.excerpt,
          body: JSON.stringify(act.body),
          gallery: act.gallery ? JSON.stringify(act.gallery) : null,
          published: true,
        });
      }
    }

    // 4. Ensure gallery exists
    const [galCount] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(galleryItems);

    if (!galCount || galCount.count === 0) {
      for (const item of GALLERY_IMAGES) {
        await db.insert(galleryItems).values({
          src: item.src,
          caption: item.caption,
          category: "कार्यक्रम",
        });
      }
    }

    // 5. Ensure notices exist
    const [notCount] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(notices);

    if (!notCount || notCount.count === 0) {
      for (const n of NOTICES) {
        await db.insert(notices).values({
          title: n.title,
          dateNe: n.dateNe,
          body: JSON.stringify(n.body),
          image: n.image || null,
          isActive: true,
        });
      }
    }

    // 6. Ensure committee members exist
    const [comCount] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(committeeMembers);

    if (!comCount || comCount.count === 0) {
      let order = 1;
      for (const c of COMMITTEE) {
        await db.insert(committeeMembers).values({
          name: c.name,
          position: c.position,
          image: c.image,
          orderNum: order++,
        });
      }
    }

    // 7. Ensure default site settings exist
    const defaultSettings = [
      {
        key: "marquee_text",
        value:
          "✦ मूल विहारका आजुहरुका लागि सहयोग अभियान जारी छ ✦ बुद्ध जयन्ती कार्यक्रम सम्पन्न ✦ २०८१ भित्तेपात्र प्रकाशित ✦ सम्यक महादान पर्व सम्पन्न ✦ पाँचौं बार्षिक साधारण सभा सम्पन्न ✦",
      },
      { key: "phone", value: SITE.phone },
      { key: "phone_raw", value: SITE.phoneRaw },
      { key: "email", value: SITE.email },
      { key: "address", value: SITE.address },
      { key: "tagline", value: SITE.tagline },
    ];

    for (const s of defaultSettings) {
      await db
        .insert(siteSettings)
        .values(s)
        .onConflictDoNothing({ target: siteSettings.key });
    }
  } catch (err) {
    console.error("ensureSeeded error:", err);
  } finally {
    isSeeding = false;
  }
}
