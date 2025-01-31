export function smoothScrollTo(
	element: HTMLElement,
	duration: number = 500,
): void {
	if (!element) return;

	const startPosition = window.scrollY;
	const targetPosition = element.getBoundingClientRect().top + window.scrollY;
	const startTime = performance.now();

	function scrollStep(timestamp: number) {
		const elapsedTime = timestamp - startTime;
		const progress = Math.min(elapsedTime / duration, 1);
		const ease =
			progress < 0.5
				? 2 * progress * progress
				: 1 - Math.pow(-2 * progress + 2, 2) / 2;

		window.scrollTo(0, startPosition + (targetPosition - startPosition) * ease);

		if (elapsedTime < duration) {
			requestAnimationFrame(scrollStep);
		}
	}

	requestAnimationFrame(scrollStep);
}
