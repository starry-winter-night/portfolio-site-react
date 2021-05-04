import React, { memo } from 'react';
import Home from './home/home';
import About from './about/about';
import Skills from './skills/skills';
import Work from './work/work';
import Contact from './contact/contact';

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
