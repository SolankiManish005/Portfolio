type Skill = {
  name: string;
  icon: string;
  href: string;
};

type SkillGroup = {
  title: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Core Stack",
    skills: [
      {
        name: "JavaScript",
        icon: "/javascript.svg",
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      {
        name: "TypeScript",
        icon: "/typescript.svg",
        href: "https://www.typescriptlang.org/",
      },
      { name: "React", icon: "/react.svg", href: "https://react.dev/" },
      { name: "Next.js", icon: "/nextjs1.svg", href: "https://nextjs.org/" },
      {
        name: "Express.js",
        icon: "/expressjs.svg",
        href: "https://expressjs.com/",
      },
      { name: "Node.js", icon: "/nodejs.svg", href: "https://nodejs.org/en" },
      { name: "GraphQL", icon: "/graphql.svg", href: "https://graphql.org/" },
      {
        name: "MongoDB",
        icon: "/mongodb.svg",
        href: "https://www.mongodb.com/",
      },
      {
        name: "PostgreSQL",
        icon: "/postgresql.svg",
        href: "https://www.postgresql.org/",
      },
      {
        name: "MySQL",
        icon: "/mysql.svg",
        href: "https://www.mysql.com/",
      },
    ],
  },
  {
    title: "Frontend Frameworks & UI Libraries",
    skills: [
      {
        name: "Tailwind CSS",
        icon: "/tailwindcss.svg",
        href: "https://tailwindcss.com/",
      },
      {
        name: "Shadcn UI Kit",
        icon: "/shadcn.png",
        href: "https://ui.shadcn.com/",
      },
    ],
  },
  {
    title: "Backend & DevOps",
    skills: [
      { name: "Linux", icon: "/linux.svg", href: "https://www.linux.org/" },
      { name: "Docker", icon: "/docker.svg", href: "https://www.docker.com/" },
      {
        name: "Mongoose",
        icon: "/mongoose.svg",
        href: "https://mongoosejs.com/",
      },
      { name: "Git", icon: "/git.svg", href: "https://git-scm.com/" },
      { name: "Vercel", icon: "/favicon.ico", href: "https://vercel.com/" },
    ],
  },
];
