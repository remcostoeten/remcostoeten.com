import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home = () => {
  useEffect(() => {
    const loader = document.querySelector('.loader');
    const cover = document.querySelector('.cover');
    const coverHeading = document.querySelector('.cover-heading');
    const imsrk2 = document.querySelector('.imsrk2');

    gsap.to(loader, { opacity: 0, duration: 1, delay: 2.5 });
    gsap.to([cover, coverHeading, imsrk2], { opacity: 1, duration: 1, delay: 3 });
  }, []);

  return (
    <div>
      <Head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.3.0/gsap.min.js"></script>
      </Head>
      <div className={`loader ${styles.loader}`}></div>
      <div className={`cover-5 ${styles.cover5}`}>
        <header>
          <img className={styles.logo} src="https://i.imgur.com/ZFnSyPe.png" alt="" />

          <ul className={styles.items}>
            <li className={styles.item}>
              Actor
            </li>
            <li className={styles.item}>
              Producer
            </li>
            <li className={styles.item}>
              Contact
            </li>
          </ul>
        </header>

        <div className={styles.container}>
          <div className={styles.left}>
            <img className={styles.headerImg} src="https://i.imgur.com/9huul5F.png" alt="" />
          </div>

          <div className={styles.right}>
            <h1 className={styles.heading}>
              <span>The King </span><br />
              KHAN
            </h1>
            <p className={styles.subHeading}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
              unde dicta, repellendus consequuntur, at.
            </p>

            <a className={styles.button} href="#">Learn More</a>
          </div>
        </div>
      </div>
      <div className={`cover-4 ${styles.cover4}`}></div>
      <div className={`cover-3 ${styles.cover3}`}></div>
      <div className={`cover-2 ${styles.cover2}`}></div>
      <div className={`cover ${styles.cover}`}>
        <div className={`cover-heading ${styles.coverHeading}`}>
          <h1 className={`imsrk ${styles.imsrk}`}>imsrk</h1>
          <span className={`dot ${styles.dot}`}>.</span>
        </div>
      </div>

      <div className={`imsrk2 ${styles.imsrk2}`}>Shahrukh Khan</div>
    </div>
  );
};

export default Home;
