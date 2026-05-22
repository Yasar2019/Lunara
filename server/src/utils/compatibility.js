const normalizeSet = (arr = []) => new Set(arr.map((v) => String(v).toLowerCase().trim()).filter(Boolean));

const keywordSet = (prompts = []) =>
  new Set(
    prompts
      .flatMap((p) => `${p?.question || ''} ${p?.answer || ''}`.toLowerCase().split(/\W+/))
      .filter((k) => k && k.length > 3)
  );

const overlapScore = (setA, setB, maxScore) => {
  if (!setA.size || !setB.size) return 0;
  let shared = 0;
  setA.forEach((item) => {
    if (setB.has(item)) shared += 1;
  });
  return Math.min(maxScore, (shared / Math.max(setA.size, setB.size)) * maxScore);
};

const calculateCompatibility = (userA, userB) => {
  const interestScore = overlapScore(normalizeSet(userA.interests), normalizeSet(userB.interests), 30);
  const goalScore = userA.relationshipGoal && userA.relationshipGoal === userB.relationshipGoal ? 20 : 0;
  const vibeScore = overlapScore(normalizeSet(userA.vibeTags), normalizeSet(userB.vibeTags), 25);

  const ageDiff = Math.abs((userA.age || 18) - (userB.age || 18));
  const ageScore = Math.max(0, 15 - ageDiff);

  const promptScore = overlapScore(keywordSet(userA.prompts), keywordSet(userB.prompts), 10);

  const total = Math.round(Math.min(100, interestScore + goalScore + vibeScore + ageScore + promptScore));
  return total;
};

module.exports = { calculateCompatibility };
