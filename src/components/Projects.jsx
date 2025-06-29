/* eslint-disable no-unused-vars */
// src/components/ProjectsAndSkills.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGithub,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaBootstrap,
  FaPhp
} from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import { CgClose } from 'react-icons/cg';
import { SiTailwindcss, SiMysql } from 'react-icons/si';

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

const projects = [
  {
    id: 1,
    title: 'Chiya Ghar',
    description:
      'A modern and responsive website for a local Nepali tea café. Features a menu, gallery, online order page, and contact form. Built with a focus on a smooth user experience.',
    image: '/src/assets/projects/chiyaghar.png',
    tags: ['HTML', 'Tailwind CSS', 'JavaScript'],
    liveUrl: 'https://sabin-khatri.github.io/ChiyaAdda/',
    githubUrl: 'https://github.com/sabin-khatri/ChiyaAdda'
  },
  {
    id: 2,
    title: 'Trekking Website',
    description:
      'A tourism website promoting trekking in Nepal. Includes itinerary pages, image gallery, inquiry form, and destination highlights. Fully responsive and optimized for user engagement.',
    image: '/src/assets/projects/trekking.png',
    tags: ['HTML', 'Tailwind CSS', 'JavaScript'],
    liveUrl: 'https://sabin-khatri.github.io/HTML_Course/projects/trekking-web/',
    githubUrl: 'https://github.com/sabin-khatri/HTML_Course/tree/main/projects/trekking-web'
  },
  {
    id: 3,
    title: 'Driving App',
    description:
      'A frontend concept for a driving school app featuring course listings, instructor profiles, and student progress tracking. Built with React and Tailwind CSS for a clean, modular UI.',
    image: '/src/assets/projects/driving.png',
    tags: ['React', 'Tailwind CSS', 'JavaScript'],
    liveUrl: 'https://driving-app.pages.dev/',
    githubUrl: 'https://github.com/sabin-khatri/React-Projects-Beginner/tree/main/driving-app'
  },
  {
    id: 4,
    title: 'Car Rental System',
    description:
      'A dynamic web interface for renting cars online. Users can search cars, apply filters, view details, and make bookings. Clean and interactive UI built with React and Tailwind CSS.',
    image: '/src/assets/projects/carrental.png',
    tags: ['React', 'Tailwind CSS', 'JavaScript'],
    liveUrl: 'https://react-car-rental-sabin.netlify.app/',
    githubUrl: 'https://github.com/sabin-khatri/React-Projects-Beginner/tree/main/car-rental'
  }
];

const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Bootstrap', 'PHP', 'MySQL', 'Git & GitHub'];

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

const ProjectCard = ({ project, index, onImageClick }) => (
  <motion.article className="group grid grid-cols-1 lg:grid-cols-2 gap-8 items-center" variants={itemVariants}>
    <div className={`p-1 lg:p-4 flex flex-col h-full ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
      <p className="text-sm font-medium text-cyan-400 mb-2">Featured Project</p>
      <h3 className="text-2xl lg:text-3xl font-bold text-slate-100 mb-4">{project.title}</h3>
      <div className="bg-slate-800/70 p-6 rounded-lg shadow-inner shadow-black/20 mb-6 flex-grow">
        <p className="text-slate-300 font-light leading-relaxed">{project.description}</p>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6">
        {project.tags.map(tag => (
          <span key={tag} className="flex items-center gap-2 text-slate-400 text-sm font-mono">
            {React.cloneElement(iconMap[tag], { className: `${iconMap[tag].props.className} w-4 h-4` })}
            {tag}
          </span>
        ))}
      </div>
      <footer className="flex items-center gap-4 mt-auto">
        <motion.a whileHover={{ scale: 1.1, color: '#22d3ee' }} whileTap={{ scale: 0.9 }} href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} GitHub`} className="text-slate-300">
          <FaGithub size={26} />
        </motion.a>
        {project.liveUrl && (
          <motion.a whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }} href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} Live Link`} className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-cyan-400 text-slate-900 rounded-full shadow-lg shadow-cyan-500/10 hover:bg-cyan-300 transition-colors duration-300">
            <FiExternalLink />Live Demo
          </motion.a>
        )}
      </footer>
    </div>
    <motion.div className={`relative rounded-xl overflow-hidden shadow-2xl shadow-black/30 cursor-pointer ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`} onClick={() => onImageClick(project.image)} whileHover={{ scale: 1.03, zIndex: 10 }} transition={{ duration: 0.3 }}>
      <img src={project.image} alt={`${project.title} Screenshot`} className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <motion.span initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-white text-lg font-semibold border-2 border-white px-4 py-2 rounded-md">
          View Image
        </motion.span>
      </div>
    </motion.div>
  </motion.article>
);

const SkillBadge = ({ name }) => (
  <motion.div className="flex items-center gap-3 bg-slate-800 px-5 py-3 rounded-lg shadow-md" variants={itemVariants} whileHover={{ scale: 1.1, y: -5, backgroundColor: '#334155' }} transition={{ type: 'spring', stiffness: 300 }}>
    <span className="text-2xl">{iconMap[name]}</span>
    <span className="text-md font-medium text-slate-200">{name}</span>
  </motion.div>
);

const ImageModal = ({ src, onClose }) => (
  <motion.div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
    <motion.button onClick={onClose} aria-label="Close image view" className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-50" whileHover={{ scale: 1.2, rotate: 90 }}>
      <CgClose size={32} />
    </motion.button>
    <motion.img src={src} alt="Project screenshot" className="max-w-[90vw] max-h-[90vh] w-auto h-auto rounded-lg shadow-2xl" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 25 }} onClick={(e) => e.stopPropagation()} />
  </motion.div>
);

const ProjectsAndSkills = () => {
  const [selectedImage, setSelectedImage] = useState(null);

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
          <motion.h2 className="text-4xl lg:text-5xl font-bold mb-16 text-slate-100" variants={itemVariants}>My Tech Stack</motion.h2>
          <motion.div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl mx-auto" variants={sectionVariants}>
            {skills.map(skill => (
              <SkillBadge key={skill} name={skill} />
            ))}
          </motion.div>
        </div>
      </motion.section>

      <AnimatePresence>
        {selectedImage && <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />}
      </AnimatePresence>
    </>
  );
};

export default ProjectsAndSkills;
