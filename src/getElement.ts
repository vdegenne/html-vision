import {cquerySelectorAll} from './cqueries.js';

interface GetElementOptions {
	/**
	 * Timeout (in ms) after which the promise will reject. Use 0 for no timeout.
	 *
	 * @default 0
	 */
	timeoutMs: number;

	/**
	 * Decrease this value for better reactivity at the cost of performance, small values are not recommended.
	 *
	 * @default 500
	 */
	pollMs: number;

	/**
	 * Elements found by the selector will be tested against this filter function
	 * for more atomic selection.
	 *
	 * @default () => true
	 */
	refinedSearch: (element?: HTMLElement) => boolean;
}

/**
 * Poll for an element in the document.
 * If the element is not in the document yet, it will request the document every {pollMs} until it finds it,
 * unless {timeoutMs} is set, in which case the function will reject after this time.
 *
 * Usage:
 *
 * ```js
 * try {
 *   const element = await getElement('#important-element', 2000) // Checks every 500ms
 *   // Do something with element
 * } catch {
 *    // Error: The element couldn't be found after 2s of trying
 * }
 * ```
 *
 * @return The html element if found or reject.
 */
export async function getElement(
	selector: string,
	options?: Partial<GetElementOptions>,
) {
	const _options: GetElementOptions = {
		timeoutMs: 0,
		pollMs: 500,
		refinedSearch() {
			return true;
		},
		...options,
	};
	return new Promise<HTMLElement>((resolve, reject) => {
		const start = Date.now();
		let elapsed = 0;
		const poll = () => {
			const elements = cquerySelectorAll(selector);
			const element = elements.find(_options.refinedSearch);
			if (element) {
				return resolve(element as HTMLElement);
			}

			if (_options.timeoutMs > 0) {
				elapsed = Date.now() - start;
				if (elapsed >= _options.timeoutMs) {
					return reject(
						`The element couldn't be found after ${_options.timeoutMs}ms of trying.`,
					);
				}
			}

			setTimeout(poll, _options.pollMs);
		};
		poll();
	});
}
