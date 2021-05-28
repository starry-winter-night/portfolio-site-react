import React, { memo } from 'react';
import Home from '../sections/home/home';
import About from '../sections/about/about';
import Skills from '../sections/skills/skills';
import Work from '../sections/work/work';
import Contact from '../sections/contact/contact';

const Sections = memo(() => {
  return (
    <>
      <Home />
      <About />
      <Skills />
      <Work />
      <Contact />
    </>
  );
});

export default Sections;
