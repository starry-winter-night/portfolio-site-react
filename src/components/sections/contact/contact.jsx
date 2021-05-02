import React from 'react';
import Info from './info';
import styles from './contact.module.css';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const contact = ({ menuRef, FontAwesome }) => {
  const infos = [
    {
      id: 1,
      title: 'E-mail Adress',
      icon: <FontAwesome icon={faAt} />,
      url: 'mailto:smpark7723@gmail.com',
      content: 'smpark7723@gmail.com',
    },
    {
      id: 2,
      title: 'GitHub Link',
      icon: <FontAwesome icon={faGithub} />,
      url: 'https://github.com/starry-winter-night',
      content: 'github.com/starry-winter-night',
    },
  ];

  return (
    <section id="contact" className={`${styles.contact} section`} ref={menuRef}>
      <div className={styles.title}>
        <h1>Contact</h1>
      </div>
      <h2>E-mail & Chatting</h2>
      <p className={styles.guide}>
        하단의 <span>아이콘</span>을 클릭하시면 각각 저의 이메일과 깃허브로
        연결됩니다.
        <br />
        오른쪽 하단의 <span>말풍선</span>을 클릭하시면 제가 만든 실시간 채팅
        라이브러리를 통해 저와 채팅 하실 수 있습니다. <br />
        감사합니다. :D
      </p>
      <div className={styles.container}>
        {infos.map((item) => (
          <Info key={item.id} info={item} />
        ))}
      </div>
      <p className={styles.rights}>
        2021 software engineer smpark - All rights reserved
      </p>
    </section>
  );
};

export default contact;
