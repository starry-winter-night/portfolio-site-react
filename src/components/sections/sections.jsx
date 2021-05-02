import React, { memo } from 'react';
import Home from './home/home';
import About from './about/about';
import Skills from './skills/skills';
import Work from './work/work';
import Contact from './contact/contact';

const Sections = memo(({ sectionRef, FontAwesome }) => {
  return (
    <>
      <Home sectionRef={sectionRef} />
      <About sectionRef={sectionRef} FontAwesome={FontAwesome} />
      <Skills sectionRef={sectionRef} />
      <Work sectionRef={sectionRef} />
      <Contact sectionRef={sectionRef} FontAwesome={FontAwesome} />
    </>
  );
});

export default Sections;
