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
 * @param selector CSS selector used to query the document
 * @param timeoutMs Timeout (in ms) after which the promise will reject. Use 0 for no timeout (default)
 * @param pollMs Decrease this value for better reactivity at the cost of performance, small values are not recommended (default: 500)
 *
 * @return The html element if found or reject.
 */
export async function getElement(
	selector: string,
	timeoutMs = 0,
	pollMs = 500,
) {
	return new Promise<HTMLElement>((resolve, reject) => {
		const start = Date.now();
		let elapsed = 0;
		const poll = () => {
			const element = document.querySelector(selector);
			if (element) {
				return resolve(element as HTMLElement);
			}

			if (timeoutMs > 0) {
				elapsed = Date.now() - start;
				if (elapsed >= timeoutMs) {
					return reject(
						`The element couldn't be found after ${timeoutMs}ms of trying.`,
					);
				}
			}

			setTimeout(poll, pollMs);
		};
		poll();
	});
}
