import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Onboarding = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    bio: '',
    location: '',
    interestedIn: 'everyone',
    relationshipGoal: 'Serious relationship',
    interests: 'travel, coffee',
    vibeTags: 'Deep conversations, Coffee dates',
    prompts: [{ question: 'My ideal date', answer: '' }],
  });

  const submit = async (e) => {
    e.preventDefault();
    await api.put('/users/me', {
      ...form,
      interests: form.interests.split(',').map((i) => i.trim()).filter(Boolean),
      vibeTags: form.vibeTags.split(',').map((v) => v.trim()).filter(Boolean),
      photos: ['https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500'],
    });
    navigate('/discovery');
  };

  return (
    <main className="page">
      <form className="card form" onSubmit={submit}>
        <h2>Build your profile</h2>
        <textarea placeholder="Bio" required onChange={(e) => setForm({ ...form, bio: e.target.value })} />
        <input placeholder="Location" required onChange={(e) => setForm({ ...form, location: e.target.value })} />
        <input placeholder="Interested in" value={form.interestedIn} onChange={(e) => setForm({ ...form, interestedIn: e.target.value })} />
        <input placeholder="Relationship goal" value={form.relationshipGoal} onChange={(e) => setForm({ ...form, relationshipGoal: e.target.value })} />
        <input placeholder="Interests (comma separated)" value={form.interests} onChange={(e) => setForm({ ...form, interests: e.target.value })} />
        <input placeholder="Vibe tags (comma separated)" value={form.vibeTags} onChange={(e) => setForm({ ...form, vibeTags: e.target.value })} />
        <input placeholder="Prompt answer" value={form.prompts[0].answer} onChange={(e) => setForm({ ...form, prompts: [{ ...form.prompts[0], answer: e.target.value }] })} />
        <button type="submit">Save profile</button>
      </form>
    </main>
  );
};

export default Onboarding;
