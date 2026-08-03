export function createHighlightedHtml(
	input: string,
	search: string | string[],
): string {
	if (!search || (Array.isArray(search) && search.length === 0)) return input;

	const esc = function (s: string): string {
		return s
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;');
	};

	const escapedInput = esc(input);

	// Normalize search to array of strings
	const keywords = Array.isArray(search)
		? search.filter(Boolean)
		: search.split(/\s+/).filter(Boolean);

	if (keywords.length === 0) return escapedInput;

	// Escape regex characters in each keyword
	const escapedKeywords = keywords.map((k) =>
		k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
	);

	// Create a regex matching any keyword
	const regex = new RegExp(`(${escapedKeywords.join('|')})`, 'gi');

	return escapedInput.replace(regex, '<span class="highlight">$1</span>');
}
