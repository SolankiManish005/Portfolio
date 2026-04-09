import { experience } from "@/data/experience";
import { faqs } from "@/data/faq";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";

export function getPortfolioContext() {
  const topProjects = projects.slice(0, 5).map((project) => {
    const tech = project.tech.join(", ");
    return `- ${project.title}: ${project.description} Tech: ${tech}. Role: ${project.role}.`;
  });

  const skills = skillGroups.map((group) => {
    const names = group.skills.map((skill) => skill.name).join(", ");
    return `- ${group.title}: ${names}`;
  });

  const jobs = experience.map(
    (item) =>
      `- ${item.title} at ${item.company} (${item.duration}): ${item.description}`,
  );

  const faqList = faqs.map((item) => `- Q: ${item.question} A: ${item.answer}`);

  return [
    "Portfolio owner: Manish Solanki.",
    "Role: MERN Stack Developer / Full-Stack Developer.",
    "Location: Gujarat, India.",
    "Contact email: solankimanish0045@gmail.com.",
    "Use the following portfolio facts when answering questions:",
    "Projects:",
    ...topProjects,
    "Skills:",
    ...skills,
    "Experience:",
    ...jobs,
    "FAQ:",
    ...faqList,
  ].join("\n");
}
