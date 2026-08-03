export type VisibilityCheck =
	| 'top-visible'
	| 'center-visible'
	| 'bottom-visible'
	| 'partially-visible'
	| 'fully-visible';

export type CheckIf = (is: (visibility: VisibilityCheck) => boolean) => boolean;

export function visibilityCheck(
	el: HTMLElement,
	/**
	 * @default top is not visible
	 */
	checkIf: CheckIf = (is) => !is('top-visible'),
): boolean {
	const rect = el.getBoundingClientRect();
	const viewHeight =
		window.innerHeight || document.documentElement.clientHeight;
	const viewWidth = window.innerWidth || document.documentElement.clientWidth;

	function is(visibilityCheck: VisibilityCheck) {
		switch (visibilityCheck) {
			case 'top-visible':
				return rect.top >= 0 && rect.top <= viewHeight;

			case 'center-visible': {
				const centerY = rect.top + rect.height / 2;
				const centerX = rect.left + rect.width / 2;
				return (
					centerY >= 0 &&
					centerY <= viewHeight &&
					centerX >= 0 &&
					centerX <= viewWidth
				);
			}

			case 'bottom-visible':
				return rect.bottom >= 0 && rect.bottom <= viewHeight;

			case 'fully-visible':
				return (
					rect.top >= 0 &&
					rect.left >= 0 &&
					rect.bottom <= viewHeight &&
					rect.right <= viewWidth
				);

			case 'partially-visible':
			default:
				return (
					rect.bottom > 0 &&
					rect.right > 0 &&
					rect.top < viewHeight &&
					rect.left < viewWidth
				);
		}
	}

	return checkIf(is);
}

export function isInViewport(el: HTMLElement) {
	return visibilityCheck(el, (is) => is('partially-visible'));
}

export function isElementObstructed(el: Element | null): boolean {
	if (!el) return true;

	let current: Element | null = el;

	while (current) {
		const style = getComputedStyle(current);

		if (
			style.display === 'none' ||
			style.visibility === 'hidden' ||
			style.visibility === 'collapse' ||
			parseFloat(style.opacity) === 0
		) {
			return true;
		}

		current = current.parentElement;
	}

	const rect = el.getBoundingClientRect();

	if (rect.width === 0 || rect.height === 0) {
		return true;
	}

	const points: [number, number][] = [
		[rect.left + rect.width / 2, rect.top + rect.height / 2],
		[rect.left + 1, rect.top + 1],
		[rect.right - 1, rect.bottom - 1],
	];

	for (const [x, y] of points) {
		const elements = document.elementsFromPoint(x, y);

		const index = elements.findIndex((e) => e === el || el.contains(e));

		if (index > 0) {
			return true;
		}
	}

	return false;
}
