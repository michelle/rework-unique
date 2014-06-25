var ignoredRegex = /"line":\d+,"column":\d+/g;

module.exports = function() {
  // Compare equality except with `position`.
  function removeDuplicates(rules) {
    var uniqueRules = {},
      length = rules.length,
      i, rule, normalized;

    for (i = 0; i < length; i += 1) {
      rule = rules[i];
      normalized = normalize(rule);

      delete uniqueRules[normalized];
      uniqueRules[normalized] = rule;
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
