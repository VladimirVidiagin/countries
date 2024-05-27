import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="header">
      <Link to="/">
        <h1 className="header__title">Countries</h1>
      </Link>
      <nav className="header__nav" aria-label="Main navigation">
        <ul className="header__list nav-list">
          <li className="nav-list__item">
            <Link to="/favorites" className="nav-list__link">
              <span className="nav-list__text">Favorites</span>
            </Link>
          </li>
          <li className="nav-list__item">
            <Link to="/history" className="nav-list__link">
              <span className="nav-list__text">View history</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
