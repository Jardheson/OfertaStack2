function toText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function toStringList(value, limit = 6) {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item) => typeof item === 'string')
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, limit);
}

function normalizeSearchResult(parsed, query, rawOutput = '') {
  return {
    corrected: toText(parsed.corrected) || query,
    category: toText(parsed.category) || 'Outros',
    description: toText(parsed.description),
    summary: toText(parsed.summary) || String(rawOutput).slice(0, 300),
    suggestedCategories: toStringList(parsed.suggestedCategories, 3),
    improvedText: toText(parsed.improvedText),
    related: toStringList(parsed.related, 4)
  };
}

function parseAiResponse(output, query) {
  if (typeof output !== 'string') {
    return normalizeSearchResult(output || {}, query, '');
  }

  const firstBrace = output.indexOf('{');
  const jsonStr = firstBrace >= 0 ? output.slice(firstBrace) : output;

  try {
    const parsed = JSON.parse(jsonStr);
    return normalizeSearchResult(parsed, query, output);
  } catch (error) {
    return normalizeSearchResult({}, query, output);
  }
}

module.exports = { parseAiResponse, normalizeSearchResult };