import { Link } from 'react-router-dom';

const Landing = () => (
  <main className="page center-text">
    <h1>VibeMatch</h1>
    <p>Adults only (18+) dating with safety, verification, and real compatibility.</p>
    <div className="actions-row">
      <Link to="/register" className="button-link">Get Started</Link>
      <Link to="/login" className="button-link secondary">Login</Link>
    </div>
  </main>
);

export default Landing;
