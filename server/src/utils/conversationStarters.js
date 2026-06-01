const buildConversationStarters = (userA, userB) => {
  const starters = [];

  const sharedInterests = (userA.interests || []).filter((interest) =>
    (userB.interests || []).map((i) => i.toLowerCase()).includes(String(interest).toLowerCase())
  );

  if (sharedInterests[0]) {
    starters.push(
      `You both like ${sharedInterests[0]}. Ask them: What's your favorite ${sharedInterests[0]} memory?`
    );
  }

  const sharedVibe = (userA.vibeTags || []).find((tag) =>
    (userB.vibeTags || []).map((v) => v.toLowerCase()).includes(String(tag).toLowerCase())
  );

  if (sharedVibe) {
    starters.push(`You both picked "${sharedVibe}". Ask: What does that look like for you right now?`);
  }

  const prompt = (userB.prompts || []).find((p) => p?.question && p?.answer);
  if (prompt) {
    starters.push(`They answered "${prompt.question}" with "${prompt.answer}". Ask a follow-up!`);
  }

  if (!starters.length) {
    starters.push('Try asking: What kind of weekend vibe makes you happiest?');
  }

  return starters.slice(0, 3);
};

module.exports = { buildConversationStarters };
