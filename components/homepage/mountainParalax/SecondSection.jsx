/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import styles from "./Hero.module.css";

const SecondSection = forwardRef((props, ref) => {
  return (
    <section
      ref={ref}
      className={`${styles.secondSection} ${props.bgColor} pt-16 pb-16 h-full`}
    >
      <h2>Dit is een</h2>
    </section>
  );
});

export default SecondSection;
