type Project = {
  title: string;
  description: string;
  tech: string[];
  role: string;
  link?: string;
};

export const projects: Project[] = [
  {
    title: "MedTrack – Healthcare CRM & Delivery System",
    description:
      "A full-stack platform integrating CRM, pharmacy management, and logistics for hospitals and patients with real-time delivery and payment flow.",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js"],
    role: "Full-Stack Developer",
    link: "#",
  },
  {
    title: "OCR Document Search System",
    description:
      "A document management system that performs OCR on PDF and image files, stores extracted metadata in MongoDB, and indexes full text content in Apache Solr. The platform enables fast full-text search and directly displays the exact document (PDF or image) where the searched content exists.",
    tech: ["MongoDB", "Express.js", "EJS", "Node.js", "Apache Solr"],
    role: "Full-Stack Developer",
    link: "#",
  },
  {
    title: "CRM System",
    description:
      "Enterprise-grade CRM handling frontend/backend workflows, real-time updates, and multi-role interactions.",
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
    role: "Full-Stack Developer",
    link: "#",
  },
  {
    title: "Password Manager",
    description:
      "A full-stack task manager app with CRUD operations using MERN.",
    tech: ["MongoDB", "Next.js", "Tailwind CSS"],
    role: "Full-Stack Developer",
    link: "https://github.com/solankimanish005",
  },
  {
    title: "TextUtils-React",
    description: "A text utility app built using React.",
    tech: ["HTML", "React.js", "Bootstrap"],
    role: "Frontend Developer",
    link: "https://github.com/solankimanish005/TextUtils-React",
  },
  {
    title: "NewsMonkey-React",
    description: "A React app that fetches categorized news from NewsAPI.",
    tech: ["HTML", "React.js", "Bootstrap"],
    role: "Frontend Developer",
    link: "https://github.com/solankimanish005/NewsMonkey-React",
  },
  {
    title: "Netflix-Clone",
    description: "Netflix UI clone using HTML & CSS.",
    tech: ["HTML, CSS"],
    role: "Frontend Developer",
    link: "https://github.com/solankimanish005/Netflix-Clone",
  },
  {
    title: "TodoList-React-App",
    description: "A simple todo list app.",
    tech: ["HTML", "Tailwind CSS", "React.js"],
    role: "Frontend Developer",
    link: "https://github.com/solankimanish005/TodoList-React-App",
  },
  {
    title: "Rock-Paper-Scissor",
    description: "Classic Rock Paper Scissors game.",
    tech: ["HTML", "CSS", "JavaScript"],
    role: "Frontend Developer",
    link: "https://github.com/solankimanish005/Rock-Paper-Scissor-Game",
  },
  {
    title: "URL Shortener",
    description: "URL shortener built using Next.js.",
    tech: ["Express.js", "Node.js", "EJS"],
    role: "Backend Developer",
    link: "https://github.com/SolankiManish005/Short-URL",
  },
  {
    title: "LinkTree Clone",
    description: "Responsive LinkTree clone.",
    tech: ["Next.js", "Tailwind CSS"],
    role: "Full-Stack Developer",
    link: "https://github.com/SolankiManish005/Link-Tree-Next.JS",
  },
];
