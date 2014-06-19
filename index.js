var ignoredRegex = /"line":\d+,"column":\d+/g;

module.exports = function() {
  // Compare equality except with `position`.
  function removeDuplicates(rules) {
    var uniqueRules = {},
      length = rules.length,
      i, rule;

    for (i = 0; i < length; i += 1) {
      rule = rules[i];
      uniqueRules[normalize(rule)] = rule;
    }

    var normalizedRules = Object.keys(uniqueRules),
      result = [];
    length = normalizedRules.length;
    for (i = 0; i < length; i += 1) {
      result.push(uniqueRules[normalizedRules[i]]);
    }

    return result;
  }

  function normalize(rule) {
    var rule =  JSON.stringify(rule).replace(ignoredRegex, '');
    return rule;
  }

  return function(style) {
    style.rules = removeDuplicates(style.rules);
  };
};
