/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGithub,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaBootstrap,
  FaPhp,
} from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import { CgClose } from 'react-icons/cg';
import { SiTailwindcss, SiMysql } from 'react-icons/si';


import chiyaghar from '../assets/projects/chiyaghar.png';
import trekking from '../assets/projects/trekking.png';
import driving from '../assets/projects/travel.png';
import carrental from '../assets/projects/carrental.png';

const iconMap = {
  HTML: <FaHtml5 className="text-orange-500" />,
  CSS: <FaCss3Alt className="text-blue-500" />,
  JavaScript: <FaJsSquare className="text-yellow-400" />,
  React: <FaReact className="text-cyan-400" />,
  'Tailwind CSS': <SiTailwindcss className="text-sky-400" />,
  Bootstrap: <FaBootstrap className="text-purple-600" />,
  PHP: <FaPhp className="text-indigo-400" />,
  MySQL: <SiMysql className="text-blue-300" />,
  'Git & GitHub': <FaGithub className="text-slate-300" />,
};

const levelColor = {
  Beginner: 'text-green-400',
  Intermediate: 'text-yellow-400',
  Pro: 'text-red-400',
};

const skills = {
  frontend: [
    { name: 'HTML', level: 'Intermediate' },
    { name: 'CSS', level: 'Intermediate' },
    { name: 'JavaScript', level: 'Intermediate' },
    { name: 'React', level: 'Intermediate' },
    { name: 'Tailwind CSS', level: 'Intermediate' },
    { name: 'Bootstrap', level: 'Beginner' },
  ],
  backend: [
    { name: 'PHP', level: 'Intermediate' },
    { name: 'MySQL', level: 'Intermediate' },
    { name: 'Git & GitHub', level: 'Intermediate' },
  ],
};


const projects = [
  {
    id: 1,
    title: 'Chiya Ghar',
    description: 'A visually appealing and fully responsive landing page for a local Nepali tea café. Built using HTML, Tailwind CSS, and vanilla JavaScript to create an interactive and clean user experience.',
    image: chiyaghar,
    tags: ['HTML', 'Tailwind CSS', 'JavaScript'],
    liveUrl: 'https://bespoke-twilight-0dc185.netlify.app/',
    githubUrl: 'https://github.com/sabin-khatri/ChiyaAdda',
  },
  {
    id: 2,
    title: 'Trekking Website',
    description: 'A promotional tourism website designed to showcase trekking in Nepal. Developed with a mobile-first approach using HTML and Tailwind CSS, and enhanced with JavaScript for engaging user interactions.',
    image: trekking,
    tags: ['HTML', 'Tailwind CSS', 'JavaScript'],
    liveUrl: 'https://bespoke-elf-bfee40.netlify.app/',
    githubUrl: 'https://github.com/sabin-khatri/Trekking-Web',
  },
  {
    id: 3,
    title: 'Travel Web App',
    description: 'A dynamic single-page application (SPA) for a travel agency, built with React. It features a component-based architecture and a modern, responsive interface styled with Tailwind CSS for a seamless user experience.',
    image: driving,
    tags: ['React', 'Tailwind CSS', 'JavaScript'],
    liveUrl: 'https://travel-web-zeta-livid.vercel.app/',
    githubUrl: 'https://github.com/sabin-khatri/Travel-web',
  },
  {
    id: 4,
    title: 'Car Rental System',
    description: 'A feature-rich car rental application built with React. It includes a dynamic search and filtering system, an intuitive booking interface, and a clean UI, demonstrating efficient state management.',
    image: carrental,
    tags: ['React', 'Tailwind CSS', 'JavaScript'],
    liveUrl: 'https://gadi-rental.netlify.app/',
    githubUrl: 'https://github.com/sabin-khatri/Car-Rental',
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const skillContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const getIcon = (name) => iconMap[name] || <FaGithub className="text-gray-400" />;

const LevelBadge = ({ level }) => (
  <span className={`text-xs font-bold ${levelColor[level]}`}>{level}</span>
);

const SkillBadge = ({ name, level }) => (
  <motion.div
    className="flex items-center gap-3 bg-slate-800 px-5 py-3 rounded-lg shadow-md"
    variants={itemVariants}
    whileHover={{ scale: 1.1, y: -5, backgroundColor: '#334155' }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <span className="text-2xl">{getIcon(name)}</span>
    <span className="text-md font-medium text-slate-200 flex items-center gap-2">
      {name} <LevelBadge level={level} />
    </span>
  </motion.div>
);

const ImageModal = ({ src, onClose }) => (
  <motion.div
    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.button
      onClick={onClose}
      className="absolute top-4 right-4 text-white/70 hover:text-white transition z-50"
      whileHover={{ scale: 1.2, rotate: 90 }}
    >
      <CgClose size={32} />
    </motion.button>
    <motion.img
      src={src}
      alt="Project screenshot"
      className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      onClick={(e) => e.stopPropagation()}
    />
  </motion.div>
);

const ProjectCard = ({ project, index, onImageClick }) => {
  const isEven = index % 2 === 0;
  const textOrderClass = isEven ? 'lg:order-1' : 'lg:order-2';
  const imageOrderClass = isEven ? 'lg:order-2' : 'lg:order-1';

  return (
    <motion.article className="group grid grid-cols-1 lg:grid-cols-2 gap-8 items-center" variants={itemVariants}>
      <div className={`p-1 lg:p-4 flex flex-col h-full ${textOrderClass}`}>
        <p className="text-sm font-medium text-cyan-400 mb-2">Featured Project</p>
        <h3 className="text-2xl lg:text-3xl font-bold text-slate-100 mb-4">{project.title}</h3>
        <div className="bg-slate-800/70 p-6 rounded-lg shadow-inner mb-6 flex-grow">
          <p className="text-slate-300 font-light leading-relaxed">{project.description}</p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6">
          {project.tags.map(tag => (
            <span key={tag} className="flex items-center gap-2 text-slate-400 text-sm font-mono">
              {getIcon(tag)} {tag}
            </span>
          ))}
        </div>
        <footer className="flex items-center gap-4 mt-auto">
          <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-cyan-400 transition-colors">
            <FaGithub size={26} />
          </motion.a>
          {project.liveUrl && (
            <motion.a whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }} href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-cyan-400 text-slate-900 rounded-full shadow-lg hover:bg-cyan-300 transition-colors" >
              <FiExternalLink /> Live Demo
            </motion.a>
          )}
        </footer>
      </div>
      <motion.div className={`relative rounded-xl overflow-hidden shadow-2xl cursor-pointer ${imageOrderClass}`} onClick={() => onImageClick(project.image)} whileHover={{ scale: 1.03 }}>
        <img src={project.image} alt={`${project.title} Screenshot`} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.span initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-white text-lg font-semibold border-2 border-white px-4 py-2 rounded-md">
            View Image
          </motion.span>
        </div>
      </motion.div>
    </motion.article>
  );
}

const ProjectsAndSkills = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewBackend, setViewBackend] = useState(false);

  return (
    <>
      <motion.section id="projects" className="bg-slate-900 py-20 lg:py-28 text-white" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-8">
          <motion.header className="text-center mb-16 lg:mb-20" variants={itemVariants}>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-100">Things I've Built</h2>
            <p className="mt-4 text-lg text-slate-400">A selection of my recent work.</p>
          </motion.header>
          <div className="space-y-24 lg:space-y-28">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} onImageClick={setSelectedImage} />
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section id="skills" className="bg-slate-800/50 py-20 lg:py-28 text-white" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <motion.h2 className="text-4xl lg:text-5xl font-bold mb-12 text-slate-100" variants={itemVariants}>My Tech Stack</motion.h2>
          
          <div className="mb-12 flex justify-center gap-4">
            <button
              onClick={() => setViewBackend(false)}
              className={`px-6 py-2.5 font-semibold rounded-md transition-all duration-300 ${!viewBackend ? 'bg-cyan-400 text-slate-900 shadow-lg' : 'bg-slate-700 text-slate-300 hover:bg-slate-600 cursor-pointer'}`}
            >
              Frontend
            </button>
            <button
              onClick={() => setViewBackend(true)}
              className={`px-6 py-2.5 font-semibold rounded-md transition-all duration-300 ${viewBackend ? 'bg-cyan-400 text-slate-900 shadow-lg' : 'bg-slate-700 text-slate-300 hover:bg-slate-600 cursor-pointer'}`}
            >
              Backend
            </button>
          </div>

          <div className="flex justify-center min-h-[160px] items-start">
            <AnimatePresence mode="wait">
              {!viewBackend && (
                <motion.div
                  key="frontend"
                  className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl mx-auto"
                  variants={skillContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {skills.frontend.map(skill => (
                    <SkillBadge key={skill.name} name={skill.name} level={skill.level} />
                  ))}
                </motion.div>
              )}
              
              {viewBackend && (
                <motion.div
                  key="backend"
                  className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl mx-auto"
                  variants={skillContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {skills.backend.map(skill => (
                    <SkillBadge key={skill.name} name={skill.name} level={skill.level} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      <AnimatePresence>
        {selectedImage && <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />}
      </AnimatePresence>
    </>
  );
};

export default ProjectsAndSkills;