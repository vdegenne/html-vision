/**
 * Scroll an element if it's not into view yet.
 */
export function scrollIfNeeded(element: HTMLElement) {
	const rect = element.getBoundingClientRect();
	const isInView =
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <=
			(window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth);

	if (!isInView) {
		element.scrollIntoView({
			behavior: 'smooth',
			inline: 'center',
			block: 'center',
		});
	}
}
