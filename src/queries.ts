interface QueryOptions {
	/**
	 * Should go through shadow doms or not
	 *
	 * @default false
	 */
	shadows: boolean;

	/**
	 * Root element to query from
	 *
	 * @default document
	 */
	from: HTMLElement | Document;
}

/**
 * Function to recursively find all elements with shadow DOMs
 */
function getAllShadowHosts(
	from: Document | ShadowRoot = document,
	shadowHosts: HTMLElement[] = [],
): HTMLElement[] {
	for (const element of from.querySelectorAll<HTMLElement>('*')) {
		if (element.shadowRoot) {
			shadowHosts.push(element);
			getAllShadowHosts(element.shadowRoot, shadowHosts);
		}
	}

	return shadowHosts;
}

export function $$<K extends keyof HTMLElementTagNameMap>(
	selector: K,
	options?: Partial<QueryOptions>,
): HTMLElementTagNameMap[K][];
export function $$<E extends Element = HTMLElement>(
	selector: string,
	options?: Partial<QueryOptions>,
): E[];
export function $$(selector: string, options?: Partial<QueryOptions>) {
	const {shadows = false, from = document} = options ?? {};

	let results: Element[] = Array.from(from.querySelectorAll(selector));

	if (shadows) {
		const shadowHosts = getAllShadowHosts(
			'shadowRoot' in from ? from.shadowRoot : from,
		);

		for (const host of shadowHosts) {
			const shadowRoot = host.shadowRoot;
			if (shadowRoot) {
				results.push(...shadowRoot.querySelectorAll(selector));
			}
		}
	}

	return results;
}

export function $<K extends keyof HTMLElementTagNameMap>(
	selector: K,
	options?: Partial<QueryOptions>,
): HTMLElementTagNameMap[K] | null;
export function $<E extends Element = HTMLElement>(
	selector: string,
	options?: Partial<QueryOptions>,
): E | null;
export function $(
	selector: string,
	options?: Partial<QueryOptions>,
): Element | null {
	return $$(selector, options)[0] ?? null;
}
