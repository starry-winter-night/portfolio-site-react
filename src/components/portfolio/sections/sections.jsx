import React, { memo } from 'react';
import Home from '../sections/home/home';
import About from '../sections/about/about';
import Skills from '../sections/skills/skills';
import Work from '../sections/work/work';
import Contact from '../sections/contact/contact';

const Sections = memo(({ sectionRefs, FontAwesome }) => {
  return (
    <>
      <Home sectionRefs={sectionRefs} />
      <About sectionRefs={sectionRefs} FontAwesome={FontAwesome} />
      <Skills sectionRefs={sectionRefs} />
      <Work sectionRefs={sectionRefs} />
      <Contact sectionRefs={sectionRefs} FontAwesome={FontAwesome} />
    </>
  );
});

export default Sections;
