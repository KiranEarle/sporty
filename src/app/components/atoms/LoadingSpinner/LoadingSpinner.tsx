/* eslint-disable @next/next/no-img-element */
import style from "./loading-spinner.module.css";

const LoadingSpinner = () => {
  return (
    <img src="/loading.svg" className={style.Loading_spinner} alt="spinner" />
  );
};

export default LoadingSpinner;
