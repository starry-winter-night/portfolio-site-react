import React from 'react';
import Home from './home/home';
import About from './about/about';
import Skills from './skills/skills';
import Work from './work/work';
import Contact from './contact/contact';

const Sections = ({ FontAwesome }) => {
  return (
    <>
      <Home />
      <About FontAwesome={FontAwesome} />
      <Skills />
      <Work />
      <Contact FontAwesome={FontAwesome} />
    </>
  );
};

export default Sections;
