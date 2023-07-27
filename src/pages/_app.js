import React, { useEffect, useState, useRef, Suspense } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Header from '@/components/Header';
import Blog from '@/components/Blog';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import About from '@/components/About';
import Message from '@/components/Message';
import Footer from '@/components/Footer';
import { FaArrowAltCircleUp } from "react-icons/fa";

const AnimatedAaron = React.lazy(() => import('@/helpers/AnimatedAaron'))

export default function App() {
  const { theme } = useTheme();
  const [viewPort, setViewPort] = useState(null);
  const [scrolledText, setScrolledText] = useState()
  const [statusText, setStatusText] = useState(false)
  const [isWalking, setIsWalking] = useState(false);

  const refs = {
    homeRef: useRef(null),
    skillsRef: useRef(null),
    projectsRef: useRef(null),
    contactRef: useRef(null),
    aboutRef: useRef(null)
  };
  const scrollTimerRef = useRef(null);

  useEffect(() => {
    refs[viewPort]?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [viewPort, refs]);

  const handleScroll = () => {
    setIsWalking(true);
    setViewPort(null);

    clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => {
      setIsWalking(false);
      const scrolledElement = Object.entries(refs).find(([key, ref]) => {
        const rect = ref.current.getBoundingClientRect();
        return rect.top >= 0 && rect.bottom <= window.innerHeight;
      });
      if (scrolledElement) {
        setViewPort(scrolledElement[0]);
      }
    }, 200);
  };

  useEffect(() => {
    if (statusText) {
      const timeout = setTimeout(() => {
        setStatusText(false);
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [statusText]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`${theme} max-w-screen-xl relative flex flex-col justify-content-center mx-auto`}>
        <div className='fixed bg-slate-500 z-20 text-white rounded-full bottom-10 right-10' onClick={() => scrollToTop()}>
          <FaArrowAltCircleUp size={24} />
        </div>
        <Header setViewPort={setViewPort} />
        <Suspense fallback={<div>Loading...</div>}>
          <AnimatedAaron statusText={statusText} scrolledText={scrolledText} isWalking={isWalking} handleScroll={handleScroll} />
          <Blog ref={refs.homeRef} setViewPort={setViewPort} title="Blog" />
          <Message setScrolledText={setScrolledText} />
          <Skills ref={refs.skillsRef} title="Skills" />
          <Projects ref={refs.projectsRef} title="Projects" />
          <Contact setStatusText={setStatusText} ref={refs.contactRef} title="Contact" />
          <About ref={refs.aboutRef} title="About" />
          <Footer setViewPort={setViewPort} />
        </Suspense>
      </div>
    </>
  );
}
