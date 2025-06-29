// src/App.jsx
import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
function App() {
  return (
    <div className="bg-slate-900 min-h-screen text-white">
      <Navbar />
       <main >
        <Hero />
        <About />
        <Projects />
        <Contact />
        
       
      </main>
      <Footer />
      
    </div>
  )
}

export default App