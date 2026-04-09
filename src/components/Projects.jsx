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

const projects = [
  {
    id: 1,
    title: 'Chiya Ghar',
    description: 'A visually appealing and fully responsive landing page for a local Nepali tea café. Built with HTML, Tailwind CSS, and vanilla JavaScript.',
    image: chiyaghar,
    tags: ['HTML', 'Tailwind CSS', 'JavaScript'],
    liveUrl: 'https://bespoke-twilight-0dc185.netlify.app/',
    githubUrl: 'https://github.com/sabin-khatri/ChiyaAdda',
  },
  {
    id: 2,
    title: 'Trekking Website',
    description: 'A promotional tourism website showcasing trekking adventures in Nepal. Designed with mobile-first approach using Tailwind CSS and JavaScript.',
    image: trekking,
    tags: ['HTML', 'Tailwind CSS', 'JavaScript'],
    liveUrl: 'https://sabintrek.netlify.app/',
    githubUrl: 'https://github.com/sabin-khatri/Trekking-Web',
  },
  {
    id: 3,
    title: 'Travel Web App',
    description: 'A dynamic single-page travel agency application built with React and Tailwind CSS, featuring smooth animations and responsive design.',
    image: driving,
    tags: ['React', 'Tailwind CSS', 'JavaScript'],
    liveUrl: 'https://travel-web-zeta-livid.vercel.app/',
    githubUrl: 'https://github.com/sabin-khatri/Travel-web',
  },
  {
    id: 4,
    title: 'Car Rental System',
    description: 'A feature-rich car rental platform with search, filtering, and booking functionality. Built using React with clean state management.',
    image: carrental,
    tags: ['React', 'Tailwind CSS', 'JavaScript'],
    liveUrl: 'https://gadi-rental.netlify.app/',
    githubUrl: 'https://github.com/sabin-khatri/Car-Rental',
  },
];

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

const ProjectsAndSkills = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('frontend'); // 'frontend' or 'backend'

  const getIcon = (name) => iconMap[name] || null;

  return (
    <>
      {/* ====================== PROJECTS SECTION ====================== */}
      <section id="projects" className="relative bg-slate-950 py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Things I've Built
            </h2>
            <p className="mt-4 text-slate-400 text-lg">Selected projects that showcase my skills and passion</p>
          </div>

          <div className="space-y-24 lg:space-y-32">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
              >
                {/* Text Content */}
                <div className={index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}>
                  <div className="mb-6">
                    <span className="text-cyan-400 text-sm font-mono tracking-widest">PROJECT {String(index + 1).padStart(2, '0')}</span>
                    <h3 className="text-3xl lg:text-4xl font-bold text-white mt-2">{project.title}</h3>
                  </div>

                  <div className="bg-slate-900/70 border border-slate-700/50 p-7 rounded-2xl mb-8">
                    <p className="text-slate-300 leading-relaxed">{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.tags.map((tag) => (
                      <div key={tag} className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full text-sm">
                        {getIcon(tag)}
                        <span className="text-slate-300">{tag}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-5">
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-3xl text-slate-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaGithub />
                    </motion.a>

                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-7 py-3 bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-950 font-semibold rounded-2xl hover:brightness-110 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiExternalLink className="text-lg" />
                        Live Demo
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Project Image */}
                <motion.div
                  className={index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  onClick={() => setSelectedImage(project.image)}
                >
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700/50 cursor-pointer group">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-auto object-cover aspect-video transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white border border-white/70 px-6 py-2.5 rounded-full text-sm font-medium backdrop-blur-sm">
                        Click to enlarge
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== SKILLS SECTION ====================== */}
      <section id="skills" className="bg-slate-900 py-20 lg:py-28 border-t border-slate-800">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              My Tech Stack
            </h2>
          </div>

          {/* Tab Buttons */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-slate-800 rounded-2xl p-1">
              <button
                onClick={() => setActiveTab('frontend')}
                className={`px-8 py-3 font-semibold rounded-xl transition-all duration-300 ${
                  activeTab === 'frontend'
                    ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-950 shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Frontend
              </button>
              <button
                onClick={() => setActiveTab('backend')}
                className={`px-8 py-3 font-semibold rounded-xl transition-all duration-300 ${
                  activeTab === 'backend'
                    ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-950 shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Backend
              </button>
            </div>
          </div>

          {/* Skills Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto"
            >
              {skills[activeTab].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-slate-800/80 border border-slate-700 hover:border-cyan-400/30 p-6 rounded-2xl flex items-center gap-5 group"
                  whileHover={{ y: -6 }}
                >
                  <div className="text-4xl transition-transform group-hover:scale-110">
                    {getIcon(skill.name)}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-lg text-white">{skill.name}</div>
                    <div className="text-sm text-cyan-400 font-mono tracking-wider">{skill.level}</div>
                    
                    <div className="mt-3 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{
                          width: skill.level === 'Beginner' ? '45%' : skill.level === 'Intermediate' ? '75%' : '95%'
                        }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ====================== IMAGE MODAL ====================== */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white z-10"
              whileHover={{ scale: 1.2, rotate: 90 }}
            >
              <CgClose size={36} />
            </motion.button>

            <motion.img
              src={selectedImage}
              alt="Project screenshot"
              className="max-w-full max-h-[92vh] rounded-2xl shadow-2xl"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectsAndSkills;