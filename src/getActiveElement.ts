export function getDeepActiveElement(
	root: Document | ShadowRoot = document,
): Element | null {
	let active = root.activeElement as Element | null;

	while (active && (active as HTMLElement).shadowRoot) {
		const shadowActive = (active as HTMLElement).shadowRoot!
			.activeElement as Element | null;
		if (!shadowActive) break;
		active = shadowActive;
	}

	return active;
}
