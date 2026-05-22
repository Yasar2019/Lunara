import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link className="logo" to="/">VibeMatch</Link>
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/discovery">Discover</Link>
            <Link to="/matches">Matches</Link>
            <Link to="/profile/edit">Profile</Link>
            <Link to="/safety">Safety</Link>
            <button type="button" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
