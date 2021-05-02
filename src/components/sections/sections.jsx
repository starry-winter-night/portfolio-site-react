import React from 'react';
import Home from './home/home';
import About from './about/about';
import Skills from './skills/skills';
import Work from './work/work';
import Contact from './contact/contact';

const Sections = ({ menuRef, FontAwesome }) => {
  
  return (
    <>
      <Home menuRef={menuRef} />
      <About menuRef={menuRef} FontAwesome={FontAwesome} />
      <Skills menuRef={menuRef} />
      <Work menuRef={menuRef} />
      <Contact menuRef={menuRef} FontAwesome={FontAwesome} />
    </>
  );
};

export default Sections;
