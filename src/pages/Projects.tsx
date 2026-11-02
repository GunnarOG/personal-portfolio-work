import ProjectCard from "../components/ProjectCard";

const projects = [
  {
    id: "portfolio",
    title: "My Portfolio",
    description: "My personal website built using React and Typescript.",
  },
];

function Projects() {
  return (
    <main className="portfolio">
      <h1>Projects</h1>

      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          title={project.title}
          description={project.description}
        />
      ))}
    </main>
  );
}

export default Projects;
