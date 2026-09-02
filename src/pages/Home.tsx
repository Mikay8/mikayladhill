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
import { useReveal } from '../hooks/useReveal';

function Home() {
  useReveal();

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
