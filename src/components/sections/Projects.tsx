import styled from "@emotion/styled";
import { motion } from "framer-motion";
import Project, { ProjectData } from "../cards/Project";
import { theme } from "../../styles/theme";

const ProjectsSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding: ${theme.spacing.lg} 0;

  @media (min-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xl} 0;
  }
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: clamp(2rem, 4vw, 2.5rem);
  margin-bottom: calc(${theme.spacing.xl} * 1.5);
  color: ${theme.colors.textLight};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -${theme.spacing.md};
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background-color: ${theme.colors.accent};
    border-radius: 2px;
  }

  @media (min-width: ${theme.breakpoints.md}) {
    margin-bottom: calc(${theme.spacing.xl} * 2);
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: ${theme.spacing.lg};
  width: 100%;
  margin-top: ${theme.spacing.lg};

  @media (min-width: ${theme.breakpoints.md}) {
    gap: ${theme.spacing.xl};
    margin-top: ${theme.spacing.xl};
  }

  @media (min-width: ${theme.breakpoints.md}) and (max-width: ${theme.breakpoints.lg}) {
    > *:last-child {
      grid-column: 1 / -1;
      justify-self: center;
      width: calc((100% - ${theme.spacing.xl}) / 2);
    }
  }
`;

const projects: ProjectData[] = [
  {
    id: 1,
    title: "Travel Planner",
    description: "A full-stack travel planning application with interactive maps, scheduling, and multi-currency support for organizing trip itineraries.",
    image: "/projects/travel-planner.png",
    techStack: ["TypeScript", "React", "Leaflet", "Node.js"],
    githubUrl: "https://github.com/sterance/travel-planner",
    liveUrl: "https://travel.smith-c.com/demo",
  },
  {
    id: 2,
    title: "EzQuote",
    description: "An app for building canned customer-service responses from reusable templates, available as a web app or an Electron desktop app.",
    image: "/projects/ezquote.png",
    techStack: ["TypeScript", "React", "dnd-kit", "Electron"],
    githubUrl: "https://github.com/sterance/EzQuote",
    liveUrl: "https://ezquote.smith-c.com/demo",
  },
  {
    id: 3,
    title: "lazymin",
    description: "A terminal-based incremental game built with Rust and ratatui, playable in the browser via WebAssembly or as a native desktop app.",
    image: "/projects/lazymin.png",
    techStack: ["Rust", "ratatui", "xterm.js", "WebAssembly"],
    githubUrl: "https://github.com/sterance/lazymin",
    liveUrl: "https://terminal.smith-c.com",
  },
];

const Projects = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <ProjectsSection id="projects" role="region" aria-label="Featured Projects">
      <div className="container">
        <SectionTitle initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} role="heading" aria-level={2}>
          Featured Projects
        </SectionTitle>
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <ProjectGrid role="list">
            {projects.map((project) => (
              <Project key={project.id} project={project} />
            ))}
          </ProjectGrid>
        </motion.div>
      </div>
    </ProjectsSection>
  );
};

export default Projects;
