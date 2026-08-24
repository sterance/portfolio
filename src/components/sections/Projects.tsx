import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import Project, { ProjectData } from '../cards/Project';
import { theme } from '../../styles/theme';

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
    content: '';
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
`;

const projects: ProjectData[] = [
  {
    id: 1,
    title: "Project One",
    description: "A full-stack web application with real-time features and modern UI/UX design.",
    image: "https://via.placeholder.com/400x200",
    techStack: ["React", "Node.js", "MongoDB", "Socket.IO"],
    githubUrl: "https://github.com/sterance/travel-planner",
    liveUrl: "https://travel.smith-c.com/demo",
  },
  {
    id: 2,
    title: "Project Two",
    description: "Mobile-first e-commerce platform with seamless payment integration.",
    image: "https://via.placeholder.com/400x200",
    techStack: ["Next.js", "TypeScript", "Stripe", "Tailwind"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
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
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          role="heading"
          aria-level={2}
        >
          Featured Projects
        </SectionTitle>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
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
