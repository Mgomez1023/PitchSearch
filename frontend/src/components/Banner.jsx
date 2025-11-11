import './Banner.css';

function Banner({ logoSrc, titleText, onMenuClick }) {
  return (
    <header className="banner">
      <button className="menu-button" onClick={onMenuClick} aria-label="Menu">
        <div className="menu-bar"></div>
        <div className="menu-bar"></div>
        <div className="menu-bar"></div>
      </button>

      {logoSrc && (
        <img src={logoSrc} alt="Logo" className="banner-logo" />
      )}

      <h1 className="banner-title">{titleText}</h1>
    </header>
  );
}

export default Banner;