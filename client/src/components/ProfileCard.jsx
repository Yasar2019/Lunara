const ProfileCard = ({ profile, compatibility, starters }) => {
  if (!profile) {
    return <div className="card">No more profiles for now. Come back soon.</div>;
  }

  return (
    <div className="card profile-card">
      <img src={profile.photos?.[0]} alt={profile.name} className="profile-photo" />
      <h2>
        {profile.name}, {profile.age} {profile.verified && <span className="badge">Verified</span>}
      </h2>
      <p>{profile.bio}</p>
      <p className="subtle">{profile.location}</p>
      <p><strong>Interests:</strong> {profile.interests?.join(', ') || 'N/A'}</p>
      <p><strong>Vibes:</strong> {profile.vibeTags?.join(', ') || 'N/A'}</p>
      <p className="compatibility">You two are {compatibility}% compatible.</p>
      <div>
        <strong>Conversation starters:</strong>
        <ul>
          {(starters || []).map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileCard;
