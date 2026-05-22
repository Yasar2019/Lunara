import { useEffect, useState } from 'react';
import api from '../services/api';

const EditProfile = () => {
  const [form, setForm] = useState({ bio: '', location: '', interests: '', vibeTags: '' });

  useEffect(() => {
    api.get('/users/me').then(({ data }) => {
      const user = data.user;
      setForm({
        bio: user.bio || '',
        location: user.location || '',
        interests: (user.interests || []).join(', '),
        vibeTags: (user.vibeTags || []).join(', '),
      });
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.put('/users/me', {
      bio: form.bio,
      location: form.location,
      interests: form.interests.split(',').map((i) => i.trim()).filter(Boolean),
      vibeTags: form.vibeTags.split(',').map((v) => v.trim()).filter(Boolean),
    });
    alert('Profile updated');
  };

  return (
    <main className="page">
      <form className="card form" onSubmit={submit}>
        <h2>Edit profile</h2>
        <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
        <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
        <input value={form.interests} onChange={(e) => setForm({ ...form, interests: e.target.value })} />
        <input value={form.vibeTags} onChange={(e) => setForm({ ...form, vibeTags: e.target.value })} />
        <button type="submit">Save</button>
      </form>
    </main>
  );
};

export default EditProfile;
