import { useState } from "react";
import styles from "./testResponsive.module.scss";

const TestResponsive = () => {
  const [isActive, setIsActive] = useState(true);

  const handleClick = () => {
    setIsActive(false);
  };
  if (isActive) {
    return (
      <div className={styles.res}>
        Test__Responsive
        <span onClick={handleClick}>X</span>
      </div>
    );
  }
  return null;
};

export default TestResponsive;
