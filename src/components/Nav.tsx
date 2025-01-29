import { NavLink } from 'react-router-dom';
import './Nav.css'; // Ensure CSS file is imported

const Nav = () => (
  <nav className="nav">
    <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
      Search Candidates
    </NavLink>
    <NavLink to="/SavedCandidates" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
      Saved Candidates
    </NavLink>
  </nav>
);

export default Nav;
