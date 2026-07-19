export interface Notice {
  id: string;
  date: string;
  category: 'academics' | 'events' | 'admissions' | 'general';
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  isImportant?: boolean;
}

export interface TimelineEvent {
  year: string;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
}

export interface GalleryItem {
  id: string;
  category: 'sports' | 'events' | 'academic';
  titleEn: string;
  titleHi: string;
  colorClass: string;
  emoji: string;
  date: string;
  image?: string;
}

export interface Program {
  id: string;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  emoji: string;
  bgClass: string;
}

export interface Activity {
  id: string;
  titleEn: string;
  titleHi: string;
  emoji: string;
  bgClass: string;
}

export interface Teacher {
  id: string;
  nameEn: string;
  nameHi: string;
  roleEn: string;
  roleHi: string;
  circleColor: string; // yellow, blue, gray, purple, orange color mappings
  initials: string;
}

export interface UpcomingEvent {
  id: string;
  day: string;
  monthEn: string;
  monthHi: string;
  titleEn: string;
  titleHi: string;
  categoryEn: string;
  categoryHi: string;
  timeEn: string;
  timeHi: string;
}

export const statsData = [
  { id: 'students', val: '1,250+', key: 'home.stats.students' },
  { id: 'teachers', val: '45+', key: 'home.stats.teachers' },
  { id: 'years', val: '30+', key: 'home.stats.years' },
  { id: 'results', val: '98.6%', key: 'home.stats.results' }
];

export const noticesData: Notice[] = [
  {
    id: 'n1',
    date: '2026-07-15',
    category: 'events',
    titleEn: 'Independence Day Celebrations - Rehearsal Schedule',
    titleHi: 'स्वतंत्रता दिवस समारोह - रिहर्सल समय-सारणी',
    descEn: 'All students participating in the march-past, choir, and cultural programs must report to the school playground by 7:30 AM in full white uniform as per the rehearsal schedule.',
    descHi: 'मार्च-पास्ट, गान और सांस्कृतिक कार्यक्रमों में भाग लेने वाले सभी छात्रों को रिहर्सल समय-सारणी के अनुसार सुबह 7:30 बजे तक स्कूल के खेल के मैदान में पूर्ण सफेद वर्दी में रिपोर्ट करना होगा।',
    isImportant: true
  },
  {
    id: 'n2',
    date: '2026-07-12',
    category: 'general',
    titleEn: 'Term 2 Fee Submission Deadline Extended',
    titleHi: 'द्वितीय त्रैमासिक शुल्क जमा करने की अंतिम तिथि बढ़ाई गई',
    descEn: 'The last date for submission of Term 2 tuition fees has been extended to July 31, 2026 without any late fine. Parents are requested to clear all dues online or at the school cash counter.',
    descHi: 'सत्र के द्वितीय त्रैमासिक ट्यूशन शुल्क जमा करने की अंतिम तिथि बिना किसी विलंब शुल्क के 31 जुलाई, 2026 तक बढ़ा दी गई है। अभिभावकों से अनुरोध है कि वे सभी बकाया राशि का भुगतान ऑनलाइन या स्कूल कैश काउंटर पर करें।',
    isImportant: false
  },
  {
    id: 'n3',
    date: '2026-07-10',
    category: 'academics',
    titleEn: 'Parent-Teacher Meeting (PTM) for Classes 6 to 8',
    titleHi: 'कक्षा 6 से 8 के लिए अभिभावक-शिक्षक बैठक (PTM)',
    descEn: 'PTM for Classes VI to VIII will be held on Saturday, July 22, 2026 from 8:30 AM to 12:30 PM. Report cards for Unit Test 1 will be shared, and academic progress will be discussed.',
    descHi: 'कक्षा 6 से 8 के लिए अभिभावक-शिक्षक बैठक शनिवार, 22 जुलाई, 2026 को सुबह 8:30 बजे से दोपहर 12:30 बजे तक आयोजित की जाएगी। यूनिट टेस्ट 1 के रिपोर्ट कार्ड साझा किए जाएंगे और शैक्षणिक प्रगति पर चर्चा होगी।',
    isImportant: true
  },
  {
    id: 'n4',
    date: '2026-07-05',
    category: 'admissions',
    titleEn: 'Admissions Open for Session 2026-27: Classes Nursery to IX & XI',
    titleHi: 'प्रवेश सत्र 2026-27 खुला है: कक्षा नर्सरी से 9वीं और 11वीं',
    descEn: 'Online and offline enquiries are open for new admissions. Limited seats are available in Science and Commerce streams for Class XI. Registration forms can be collected from the school counter.',
    descHi: 'नए प्रवेश के लिए ऑनलाइन और offline पूछताछ खुली है। कक्षा 11वीं के विज्ञान और वाणिज्य वर्गों में सीमित सीटें उपलब्ध हैं। पंजीकरण फॉर्म स्कूल काउंटर से प्राप्त किए जा सकते हैं।',
    isImportant: true
  }
];

export const timelineData: TimelineEvent[] = [
  {
    year: '1995',
    titleEn: 'The Humble Beginning',
    titleHi: 'विनम्र शुरुआत',
    descEn: 'Founded by Shri R. K. Pandey with only 50 students in a rented building in Salarpur, Varanasi to provide basic primary education.',
    descHi: 'बुनियादी प्राथमिक शिक्षा प्रदान करने के लिए वाराणसी के सलारपुर में एक किराए के भवन में केवल 50 छात्रों के साथ श्री आर. के. पांडेय द्वारा स्थापित।'
  },
  {
    year: '2002',
    titleEn: 'High School Affiliation (Class 10)',
    titleHi: 'हाई स्कूल संबद्धता (कक्षा 10)',
    descEn: 'Recognized by the Uttar Pradesh Board of High School and Intermediate Education, graduating our first Class 10 board batch.',
    descHi: 'उत्तर प्रदेश माध्यमिक शिक्षा परिषद द्वारा हाई स्कूल के रूप में मान्यता प्राप्त, जिससे हमारा पहला कक्षा 10 का बोर्ड बैच उत्तीर्ण हुआ।'
  },
  {
    year: '2010',
    titleEn: 'Inter College Upgradation (Class 12)',
    titleHi: 'इंटर कॉलेज अपग्रेडेशन (कक्षा 12)',
    descEn: 'Upgraded to Inter College with Science (PCM/PCB) and Commerce streams, offering classes up to XII standard.',
    descHi: 'विज्ञान (पीसीएम/पीसीबी) और वाणिज्य संकायों के साथ इंटर कॉलेज में अपग्रेड किया गया, जिसमें कक्षा 12 तक की शिक्षा प्रदान की जाने लगी।'
  },
  {
    year: '2025',
    titleEn: 'Celebrating 30 Years of Excellence',
    titleHi: 'उत्कृष्टता के 30 वर्ष पूरे होने का उत्सव',
    descEn: 'Vidya Vihar celebrates three decades of nurturing young minds in Varanasi with an alumni strength exceeding 10,000+ students.',
    descHi: 'विद्या विहार ने वाराणसी में युवा दिमागों को संवारने के तीन दशक पूरे किए, जिसमें पूर्व छात्रों की संख्या 10,000+ से अधिक है।'
  }
];

export const galleryData: GalleryItem[] = [
  {
    id: 'g1',
    category: 'sports',
    titleEn: 'Annual Sports Meet - Track Events',
    titleHi: 'वार्षिक खेलकूद प्रतियोगिता - ट्रैक इवेंट्स',
    colorClass: 'bg-emerald-800 text-white',
    emoji: '🏃‍♂️🏆',
    date: 'December 2025',
    image: '/gallery_sports.png'
  },
  {
    id: 'g2',
    category: 'events',
    titleEn: 'Independence Day Cultural Program',
    titleHi: 'स्वतंत्रता दिवस सांस्कृतिक कार्यक्रम',
    colorClass: 'bg-primary text-white',
    emoji: '🇮🇳🎭',
    date: 'August 2025',
    image: '/school_campus.png'
  },
  {
    id: 'g3',
    category: 'academic',
    titleEn: 'Physics Lab - Practical Session',
    titleHi: 'भौतिक विज्ञान प्रयोगशाला - प्रयोगात्मक सत्र',
    colorClass: 'bg-emerald-900 text-white',
    emoji: '🔬⚡',
    date: 'November 2025',
    image: '/students_activities.png'
  },
  {
    id: 'g4',
    category: 'events',
    titleEn: 'Saraswati Puja Celebration & Arti',
    titleHi: 'सरस्वती पूजा समारोह एवं आरती',
    colorClass: 'bg-amber-700/80 text-white',
    emoji: '🪕🙏',
    date: 'February 2026',
    image: '/gallery_saraswati.png'
  },
  {
    id: 'g5',
    category: 'academic',
    titleEn: 'Computer Lab - Coding Workshop',
    titleHi: 'कंप्यूटर लैब - कोडिंग कार्यशाला',
    colorClass: 'bg-slate-700 text-white',
    emoji: '💻⚙️',
    date: 'October 2025',
    image: '/students_activities.png'
  },
  {
    id: 'g6',
    category: 'events',
    titleEn: 'Annual Science & Craft Exhibition',
    titleHi: 'वार्षिक विज्ञान एवं शिल्प प्रदर्शनी',
    colorClass: 'bg-primary-dark text-white',
    emoji: '🌋🎨',
    date: 'January 2026',
    image: '/gallery_science.png'
  }
];

// 1. PROGRAMS DATA
export const programsData: Program[] = [
  {
    id: 'p1',
    titleEn: 'Science Stream (PCM / PCB)',
    titleHi: 'विज्ञान वर्ग (PCM / PCB)',
    descEn: 'Comprehensive study of Physics, Chemistry, Mathematics, and Biology preparing students for engineering, medical, and scientific research pursuits.',
    descHi: 'भौतिक विज्ञान, रसायन विज्ञान, गणित और जीव विज्ञान का व्यापक अध्ययन, जो छात्रों को इंजीनियरिंग, मेडिकल और वैज्ञानिक अनुसंधान के लिए तैयार करता है।',
    emoji: '🔬',
    bgClass: 'bg-emerald-50 border-emerald-100 hover:border-emerald-300'
  },
  {
    id: 'p2',
    titleEn: 'Commerce Stream',
    titleHi: 'वाणिज्य वर्ग',
    descEn: 'Focused curriculum in Accountancy, Business Studies, Economics, and Mathematics aimed at career pathways in finance, business management, and administration.',
    descHi: 'लेखाशास्त्र, व्यावसायिक अध्ययन, अर्थशास्त्र और गणित में केंद्रित पाठ्यक्रम, जिसका उद्देश्य वित्त, व्यवसाय प्रबंधन और प्रशासन में करियर बनाना है।',
    emoji: '📈',
    bgClass: 'bg-blue-50 border-blue-100 hover:border-blue-300'
  },
  {
    id: 'p3',
    titleEn: 'Arts & Humanities Stream',
    titleHi: 'कला एवं मानविकी वर्ग',
    descEn: 'Rich academic exploration of History, Geography, Political Science, Economics, and Languages to foster critical thinking and social awareness.',
    descHi: 'इतिहास, भूगोल, राजनीति विज्ञान, अर्थशास्त्र और भाषाओं का समृद्ध शैक्षणिक अध्ययन, जो आलोचनात्मक सोच और सामाजिक जागरूकता को बढ़ावा देता है।',
    emoji: '🎨',
    bgClass: 'bg-purple-50 border-purple-100 hover:border-purple-300'
  },
  {
    id: 'p4',
    titleEn: 'Co-curricular & Vocational Program',
    titleHi: 'सह-पाठ्यचर्या एवं व्यावसायिक कार्यक्रम',
    descEn: 'Holistic growth through computing literacy, creative crafts, basic electrical/agricultural skills, and cultural arts to prepare students for real-world endeavors.',
    descHi: 'कंप्यूटिंग साक्षरता, रचनात्मक शिल्प, बुनियादी इलेक्ट्रिकल/कृषि कौशल और सांस्कृतिक कलाओं के माध्यम से सर्वांगीण विकास ताकि छात्रों को व्यावहारिक जीवन के लिए तैयार किया जा सके।',
    emoji: '🎭',
    bgClass: 'bg-amber-50 border-amber-100 hover:border-amber-300'
  }
];

// 2. ACTIVITIES DATA
export const activitiesData: Activity[] = [
  {
    id: 'a1',
    titleEn: 'Sports & Athletics',
    titleHi: 'खेल-कूद और एथलेटिक्स',
    emoji: '⚽',
    bgClass: 'bg-emerald-50 hover:bg-emerald-100/50'
  },
  {
    id: 'a2',
    titleEn: 'Cultural Activities',
    titleHi: 'सांस्कृतिक गतिविधियां',
    emoji: '🎭',
    bgClass: 'bg-amber-50 hover:bg-amber-100/50'
  },
  {
    id: 'a3',
    titleEn: 'Visual Arts & Crafts',
    titleHi: 'दृश्य कला और शिल्प',
    emoji: '🎨',
    bgClass: 'bg-blue-50 hover:bg-blue-100/50'
  },
  {
    id: 'a4',
    titleEn: 'Academic & Science Clubs',
    titleHi: 'शैक्षणिक और विज्ञान क्लब',
    emoji: '🔬',
    bgClass: 'bg-purple-50 hover:bg-purple-100/50'
  },
  {
    id: 'a5',
    titleEn: 'Community Events & NSS',
    titleHi: 'सामुदायिक कार्यक्रम एवं एनएसएस',
    emoji: '🤝',
    bgClass: 'bg-pink-50 hover:bg-pink-100/50'
  },
  {
    id: 'a6',
    titleEn: 'Special Assemblies & Festivals',
    titleHi: 'विशेष सभाएं और त्योहार',
    emoji: '🎪',
    bgClass: 'bg-orange-50 hover:bg-orange-100/50'
  }
];

// 3. TEACHERS DATA
export const teachersData: Teacher[] = [
  {
    id: 't1',
    nameEn: 'Dr. Sunita Rao',
    nameHi: 'डॉ. सुनीता राव',
    roleEn: 'Senior Lecturer, Biology',
    roleHi: 'वरिष्ठ प्रवक्ता, जीव विज्ञान',
    circleColor: 'bg-blue-100 text-blue-700',
    initials: 'SR'
  },
  {
    id: 't2',
    nameEn: 'Shri Amit Sharma',
    nameHi: 'श्री अमित शर्मा',
    roleEn: 'Lecturer, Mathematics',
    roleHi: 'प्रवक्ता, गणित',
    circleColor: 'bg-yellow-100 text-yellow-700',
    initials: 'AS'
  },
  {
    id: 't3',
    nameEn: 'Shri Rajesh Verma',
    nameHi: 'श्री राजेश वर्मा',
    roleEn: 'Senior Faculty, Hindi & Sanskrit',
    roleHi: 'वरिष्ठ संकाय, हिंदी और संस्कृत',
    circleColor: 'bg-orange-100 text-orange-700',
    initials: 'RV'
  },
  {
    id: 't4',
    nameEn: 'Smt. Pooja Patel',
    nameHi: 'श्रीमती पूजा पटेल',
    roleEn: 'Lecturer, Accountancy & Economics',
    roleHi: 'प्रवक्ता, लेखाशास्त्र और अर्थशास्त्र',
    circleColor: 'bg-purple-100 text-purple-700',
    initials: 'PP'
  },
  {
    id: 't5',
    nameEn: 'Mr. David Wilson',
    nameHi: 'श्री डेविड विल्सन',
    roleEn: 'Lecturer, English Language',
    roleHi: 'प्रवक्ता, अंग्रेजी भाषा',
    circleColor: 'bg-gray-100 text-gray-700',
    initials: 'DW'
  }
];

// 4. UPCOMING EVENTS DATA
export const upcomingEventsData: UpcomingEvent[] = [
  {
    id: 'e1',
    day: '15',
    monthEn: 'Aug',
    monthHi: 'अगस्त',
    titleEn: 'Independence Day Cultural Gala',
    titleHi: 'स्वतंत्रता दिवस सांस्कृतिक महोत्सव',
    categoryEn: 'Cultural Event',
    categoryHi: 'सांस्कृतिक कार्यक्रम',
    timeEn: '08:00 AM',
    timeHi: 'सुबह 08:00 बजे'
  },
  {
    id: 'e2',
    day: '05',
    monthEn: 'Sep',
    monthHi: 'सितंबर',
    titleEn: 'Annual Science & Model Crafts Fair',
    titleHi: 'वार्षिक विज्ञान एवं मॉडल शिल्प मेला',
    categoryEn: 'Exhibition',
    categoryHi: 'प्रदर्शनी',
    timeEn: '09:30 AM',
    timeHi: 'सुबह 09:30 बजे'
  },
  {
    id: 'e3',
    day: '14',
    monthEn: 'Nov',
    monthHi: 'नवंबर',
    titleEn: 'Annual Inter-House Athletic Meet',
    titleHi: 'वार्षिक अंतर-सदन खेलकूद प्रतियोगिता',
    categoryEn: 'Sports',
    categoryHi: 'खेल-कूद',
    timeEn: '08:30 AM',
    timeHi: 'सुबह 08:30 बजे'
  },
  {
    id: 'e4',
    day: '18',
    monthEn: 'Dec',
    monthHi: 'दिसंबर',
    titleEn: 'Winter Parent-Teacher Assembly',
    titleHi: 'शीतकालीन अभिभावक-शिक्षक सभा',
    categoryEn: 'Meeting',
    categoryHi: 'बैठक',
    timeEn: '09:00 AM',
    timeHi: 'सुबह 09:00 बजे'
  }
];
