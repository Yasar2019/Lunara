const blockedWords = ['abuse', 'hate', 'kill', 'violent', 'racist', 'nazi'];

const containsAbusiveContent = (text = '') => {
  return blockedWords.some((word) => {
    const expression = new RegExp(`\\b${word}\\b`, 'i');
    return expression.test(text);
  });
};

module.exports = { blockedWords, containsAbusiveContent };
