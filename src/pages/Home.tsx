import '../components/Nav.css';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Hobbies from '../components/Hobbies';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';

function Home() {
  useReveal();
  const { hash } = useLocation();

  // Router navigation (e.g. back from a case study) doesn't scroll to the hash on its own.
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);

  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Hobbies />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;
