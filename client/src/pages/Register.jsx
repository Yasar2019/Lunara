import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    age: 18,
    gender: '',
    isAdultConfirmed: false,
  });
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register({ ...form, age: Number(form.age) });
      navigate('/onboarding');
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <main className="page">
      <form className="card form" onSubmit={submit}>
        <h2>Create account</h2>
        {error && <p className="error">{error}</p>}
        <input placeholder="Name" required onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" type="email" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Password" type="password" required minLength={6} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <input placeholder="Age" type="number" min={18} required onChange={(e) => setForm({ ...form, age: e.target.value })} />
        <input placeholder="Gender" required onChange={(e) => setForm({ ...form, gender: e.target.value })} />
        <label>
          <input type="checkbox" onChange={(e) => setForm({ ...form, isAdultConfirmed: e.target.checked })} />
          I confirm I am 18+
        </label>
        <button type="submit">Register</button>
      </form>
    </main>
  );
};

export default Register;
