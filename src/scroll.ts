import {CheckIf, visibilityCheck} from './visibility.js';

export interface ScrollStrategy {
	/**
	 * The visibility check to use to determine
	 * whether or not the scroll should be issued.
	 *
	 * @default when top is not visible
	 */
	if: CheckIf;
	/**
	 * @default 'smooth'
	 */
	behavior: ScrollBehavior;
	/**
	 * @default undefined
	 */
	block: ScrollLogicalPosition | undefined;
	/**
	 * @default undefined
	 */
	inline: ScrollLogicalPosition | undefined;

	/**
	 * @default 10px
	 */
	yOffsetPx: number;
}
export const scrollStrategyDefaults: ScrollStrategy = {
	if: (is) => !is('top-visible'),
	behavior: 'smooth',
	block: undefined,
	inline: undefined,
	yOffsetPx: 0,
};

export function scrollIntoView(
	el: HTMLElement,
	options?: Partial<ScrollStrategy>,
): void {
	const _options = {
		...scrollStrategyDefaults,
		...options,
	};
	const {if: _if, behavior, block, inline, yOffsetPx} = _options;

	if (!visibilityCheck(el, _if)) {
		return;
	}

	if (!yOffsetPx) {
		el.scrollIntoView({
			behavior,
			block,
			inline,
		});
		return;
	}

	const rect = el.getBoundingClientRect();

	let top: number;

	switch (block) {
		case 'center':
			top =
				window.scrollY + rect.top - window.innerHeight / 2 + rect.height / 2;
			break;

		case 'end':
			top = window.scrollY + rect.bottom - window.innerHeight;
			break;

		case 'nearest':
			// Simple approximation.
			if (rect.top < 0) {
				top = window.scrollY + rect.top;
			} else {
				top = window.scrollY + rect.bottom - window.innerHeight;
			}
			break;

		case 'start':
		default:
			top = window.scrollY + rect.top;
			break;
	}

	window.scrollTo({
		top: top - yOffsetPx,
		behavior,
	});
}
