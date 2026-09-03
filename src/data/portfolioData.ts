export interface Project {
  id: string;
  rank: string;
  suit: '♠' | '♥' | '♦' | '♣';
  title: string;
  subtitle: string;
  period: string;
  techStack: string[];
  description: string;
  highlights: string[];
  colorTheme: 'ruby' | 'royal' | 'emerald' | 'gold' | 'amethyst';
}

export interface Skill {
  name: string;
  category: 'Backend' | 'Frontend' | 'Database' | 'Framework';
  rank: string;
  suit: '♠' | '♥' | '♦' | '♣';
  iconName: string;
  accentColor: string;
  proficiencyLevel: string;
  description: string;
}

export interface ExperienceItem {
  id: string;
  rank: string;
  suit: '♠' | '♥' | '♦' | '♣';
  role: string;
  company: string;
  period: string;
  type: string;
  description: string;
  keyContributions: string[];
  technologies: string[];
}

export interface EducationItem {
  rank: string;
  suit: '♠' | '♥' | '♦' | '♣';
  degree: string;
  institution: string;
  period: string;
  field: string;
  cgpa: string;
  highlights: string[];
}

export interface Certification {
  id: string;
  rank: string;
  suit: '♠' | '♥' | '♦' | '♣';
  name: string;
  issuer: string;
  accent: string;
  description: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    name: 'SANTHOSH BALAJI G',
    role: 'MCA Graduate • Software Developer',
    subtitles: ['Python Developer', 'Java Developer', 'Full Stack Enthusiast'],
    email: 'santhoshbalajigm07@gmail.com',
    phone: '9791871968',
    location: 'Trichy, Tamil Nadu - 620011',
    bio: 'Motivated MCA student with strong programming skills and a passion for software development. Skilled in Java, Python, SQL, and modern web technologies. Quick learner and dedicated team player eager to build robust real-world digital solutions.',
    objective: 'To apply technical proficiency in Python, Java, and Full-Stack Engineering to solve complex computational challenges, build scalable software, and craft memorable digital experiences.',
    signature: 'Santhosh Balaji',
    languages: ['Tamil', 'English'],
    softSkills: ['Fast Learner', 'Active Listening', 'Teamwork', 'Time Management', 'Effective Communication'],
  },

  skills: [
    { name: 'Python', category: 'Backend', rank: 'A', suit: '♠', iconName: 'Code', accentColor: '#38bdf8', proficiencyLevel: 'Core Programming', description: 'Clean architecture, Flask web services, AI/Data logic & automation.' },
    { name: 'Java', category: 'Backend', rank: 'K', suit: '♣', iconName: 'Coffee', accentColor: '#f97316', proficiencyLevel: 'Core Programming', description: 'OOP concepts, robust backend logic & system engineering.' },
    { name: 'SQL', category: 'Database', rank: 'Q', suit: '♦', iconName: 'Database', accentColor: '#eab308', proficiencyLevel: 'Database Systems', description: 'Relational data modeling, indexing, queries & optimization.' },
    { name: 'Spring Boot', category: 'Framework', rank: 'J', suit: '♥', iconName: 'Layers', accentColor: '#22c55e', proficiencyLevel: 'Enterprise Backend', description: 'REST APIs, MVC architecture, dependency injection & microservices.' },
    { name: 'Flask', category: 'Framework', rank: '10', suit: '♠', iconName: 'Server', accentColor: '#a855f7', proficiencyLevel: 'Lightweight Backend', description: 'Fast routing, secure authentication pipelines & API endpoints.' },
    { name: 'MySQL', category: 'Database', rank: '9', suit: '♦', iconName: 'HardDrive', accentColor: '#06b6d4', proficiencyLevel: 'Relational DB', description: 'Schema normalization, transactions, and secure storage.' },
    { name: 'JavaScript', category: 'Frontend', rank: '8', suit: '♣', iconName: 'Cpu', accentColor: '#facc15', proficiencyLevel: 'Client Logic', description: 'Dynamic DOM manipulation, async operations & interactive web apps.' },
    { name: 'HTML5', category: 'Frontend', rank: '7', suit: '♥', iconName: 'FileCode', accentColor: '#ef4444', proficiencyLevel: 'Structure', description: 'Semantic, accessible, and structured modern web layouts.' },
    { name: 'CSS3', category: 'Frontend', rank: '6', suit: '♠', iconName: 'Palette', accentColor: '#3b82f6', proficiencyLevel: 'Styling', description: 'Modern styling, responsive layouts, 3D perspective & animations.' },
  ] as Skill[],

  projects: [
    {
      id: 'proj-1',
      rank: 'A',
      suit: '♠',
      title: 'Secure File Sharing Platform',
      subtitle: 'Facial Recognition & OTP Authentication',
      period: 'Jan 2026 - Mar 2026',
      techStack: ['Python', 'Flask', 'MySQL', 'Facial Recognition', 'OTP Auth'],
      description: 'Developed a high-security file sharing ecosystem leveraging multi-factor biometrics and cryptography for confidential document transfer and cloud persistence.',
      highlights: [
        'Integrated facial recognition biometrics with OTP verification for zero-trust user authentication.',
        'Engineered encrypted file upload and download pipelines ensuring end-to-end data privacy.',
        'Implemented email-based cryptographic key distribution and secure cloud-backed storage in MySQL.',
      ],
      colorTheme: 'ruby',
    },
    {
      id: 'proj-2',
      rank: 'K',
      suit: '♣',
      title: 'Precision Fishing System',
      subtitle: 'IoT-Powered Autonomous Marine Solution',
      period: 'Dec 2023 - Apr 2024',
      techStack: ['IoT', 'Python', 'Sensors', 'Real-Time Monitoring', 'Embedded Algorithms'],
      description: 'Engineered an IoT-powered autonomous marine detection vessel with telemetry tracking to optimize fish detection and promote sustainable marine practices.',
      highlights: [
        'Built real-time telemetry and monitoring interface with remote navigation controls.',
        'Applied algorithmic fish detection metrics to optimize catch efficiency.',
        'Designed eco-friendly telemetry protocols promoting sustainable maritime exploration.',
      ],
      colorTheme: 'emerald',
    },
    {
      id: 'proj-3',
      rank: 'J',
      suit: '♦',
      title: 'Full Stack Web Applications',
      subtitle: 'Responsive Multi-Page & Backend Integration',
      period: 'May 2025 - Jun 2025',
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'Java Spring Boot', 'MySQL'],
      description: 'Engineered multi-page interactive web applications with local storage synchronization and integrated backend database persistence using Java Spring Boot.',
      highlights: [
        'Developed fluid responsive UI with client-side state caching via LocalStorage.',
        'Created performant RESTful API integrations connected with Java Spring Boot & MySQL.',
        'Implemented modular component structure ensuring rapid render cycles and clean MVC separation.',
      ],
      colorTheme: 'royal',
    },
  ] as Project[],

  experience: [
    {
      id: 'exp-1',
      rank: 'J',
      suit: '♥',
      role: 'Full Stack Developer Intern',
      company: 'Extazee Software Solutions',
      period: 'May 2025 - Jun 2025',
      type: 'Internship & Project Engineering',
      description: 'Worked on building responsive multi-page web applications and integrating frontend interfaces with scalable Java Spring Boot backend services and MySQL databases.',
      keyContributions: [
        'Developed responsive multi-page client architectures using modern HTML5, CSS3, and JavaScript.',
        'Implemented client-side data persistence with browser storage for low-latency user sessions.',
        'Gained in-depth hands-on experience in connecting frontend views to Spring Boot REST endpoints.',
        'Engineered optimized MySQL schemas and query transactions for backend stability.',
      ],
      technologies: ['Java', 'Spring Boot', 'MySQL', 'JavaScript', 'HTML5', 'CSS3'],
    }
  ] as ExperienceItem[],

  education: [
    {
      rank: '10',
      suit: '♠',
      degree: 'Master of Computer Applications (MCA)',
      institution: 'Bishop Heber College, Trichy',
      period: '2024 - 2026',
      field: 'Computer Applications and Software Development',
      cgpa: '7.99',
      highlights: [
        'Advanced Software Engineering & Enterprise Architecture',
        'Object-Oriented Programming, Database Management & Cloud Paradigms',
        'Active participant in technical symposiums and coding cohorts',
      ]
    },
    {
      rank: '9',
      suit: '♠',
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'Bishop Heber College, Trichy',
      period: '2021 - 2024',
      field: 'Specialization in Computer Applications',
      cgpa: '7.00',
      highlights: [
        'Foundations in Data Structures, Algorithms & C/C++/Java',
        'Web Technology Design & Relational Database Design',
        'Graduated with distinction and solid practical grounding',
      ]
    }
  ] as EducationItem[],

  certifications: [
    {
      id: 'cert-1',
      rank: 'A',
      suit: '♦',
      name: 'Basics of Python',
      issuer: 'Infosys Springboard',
      accent: '#eab308',
      description: 'Comprehensive certification covering Python core fundamentals, data types, control flow, functions, and standard libraries.'
    },
    {
      id: 'cert-2',
      rank: 'K',
      suit: '♠',
      name: 'Python Programming',
      issuer: 'Systech Technologies',
      accent: '#38bdf8',
      description: 'In-depth practical training covering Object-Oriented Python, backend scripting, file handling, and database integration.'
    },
    {
      id: 'cert-3',
      rank: 'Q',
      suit: '♥',
      name: 'Artificial Intelligence Fundamentals',
      issuer: 'IBM SkillsBuild',
      accent: '#ec4899',
      description: 'Foundational certification validating knowledge in Machine Learning concepts, Neural Networks, Natural Language Processing, and AI ethics.'
    }
  ] as Certification[],

  hobbies: [
    { rank: 'K', suit: '♠', name: 'Cricket', icon: 'Trophy', color: 'from-blue-600 to-indigo-900', note: 'Strategic game sense, teamwork & quick reflexes on the field.' },
    { rank: 'Q', suit: '♥', name: 'Volleyball', icon: 'Flame', color: 'from-rose-600 to-red-900', note: 'Agile communication, explosive pace & collective team harmony.' },
    { rank: 'J', suit: '♦', name: 'Badminton', icon: 'Zap', color: 'from-amber-600 to-yellow-900', note: 'Precision strokes, rapid footwork & split-second decisions.' },
  ],

  references: [
    {
      name: 'Dr. R. Thamaraiselvi, M.Sc., M.Phil., Ph.D., SET.NET',
      title: 'Director - MCA, PG Department of Computer Applications',
      institution: 'Bishop Heber College, Tiruchirappalli',
      phone: '94860 90372',
      email: 'thams.ca@bhc.edu.in'
    },
    {
      name: 'Dr. Anita Priya Raja',
      title: 'Training & Placement Officer',
      institution: 'Bishop Heber College, Tiruchirappalli',
      phone: '97860 88211',
      email: 'herberplacemerit@bhc.edu.in'
    }
  ]
};
