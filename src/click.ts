import {getElement} from './getElement.js';

/**
 * @returns true if the element was found and clicked.
 */
export async function click(selector: string) {
	const element = await getElement(selector, {timeoutMs: 1000});
	if (element) {
		element.click();
		return true;
	}
	return false;
}
