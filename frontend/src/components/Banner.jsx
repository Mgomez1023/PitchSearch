import './Banner.css';
import { GiHamburgerMenu } from "react-icons/gi";


function Banner({ logoSrc, titleText, onMenuClick }) {
  return (
    <header className="banner">
      <button className="menu-button" onClick={onMenuClick} aria-label="Menu">
        <GiHamburgerMenu size={30} color="#ffcc00" />
      </button>

      {logoSrc && (
        <img src={logoSrc} alt="Logo" className="banner-logo" />
      )}

      <h1 className="banner-title">{titleText}</h1>

      <p className="random-text">*Randomized Data</p>

    </header>
  );
}

export default Banner;