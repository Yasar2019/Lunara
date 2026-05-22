const blockedWords = ['abuse', 'hate', 'kill', 'violent', 'racist', 'nazi'];

const containsAbusiveContent = (text = '') => {
  const normalized = text.toLowerCase();
  return blockedWords.some((word) => normalized.includes(word));
};

module.exports = { blockedWords, containsAbusiveContent };
