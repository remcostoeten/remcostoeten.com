import React, { useEffect } from 'react';
import { gsap } from 'gsap';

const PageTransitionLoader = () => {
  useEffect(() => {
    const loader = document.querySelector('.page-transition-loader');

    const tl = gsap.timeline({ repeat: -1 });

    tl.to(loader, { opacity: 1, duration: 0 })
      .to(loader, { opacity: 0, duration: 0.5 })
      .to(loader, { display: 'none', duration: 0 });
  }, []);

  return <div className="page-transition-loader">Loading...</div>;
};

export default PageTransitionLoader;
