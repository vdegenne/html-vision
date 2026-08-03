type TabOptions = {
	stepCount?: number;
	context?: HTMLElement | Document;
};

function getFocusableElements(context: HTMLElement | Document): HTMLElement[] {
	const selector = [
		'a[href]',
		'button:not([disabled])',
		'input:not([disabled])',
		'select:not([disabled])',
		'textarea:not([disabled])',
		'iframe',
		'object',
		'embed',
		'[contenteditable="true"]',
		'[tabindex]:not([tabindex="-1"])',
	].join(',');

	return Array.from(context.querySelectorAll<HTMLElement>(selector)).filter(
		function (element) {
			const style = window.getComputedStyle(element);

			return (
				style.visibility !== 'hidden' &&
				style.display !== 'none' &&
				!element.hasAttribute('inert')
			);
		},
	);
}

export function tabNext(options: TabOptions = {}): void {
	const {stepCount = 1, context = document} = options;

	const focusableElements = getFocusableElements(context);

	if (focusableElements.length === 0) {
		return;
	}

	const current = document.activeElement as HTMLElement | null;
	let index = focusableElements.indexOf(current);

	if (index === -1) {
		index = -1;
	}

	const nextIndex = (index + stepCount) % focusableElements.length;

	focusableElements[nextIndex].focus({preventScroll: false});
}

export function tabPrevious(options: TabOptions = {}): void {
	const {stepCount = 1, context = document} = options;

	const focusableElements = getFocusableElements(context);

	if (focusableElements.length === 0) {
		return;
	}

	const current = document.activeElement as HTMLElement | null;
	let index = focusableElements.indexOf(current);

	if (index === -1) {
		index = 0;
	}

	const previousIndex =
		(index -
			(stepCount % focusableElements.length) +
			focusableElements.length) %
		focusableElements.length;

	focusableElements[previousIndex].focus({preventScroll: false});
}
