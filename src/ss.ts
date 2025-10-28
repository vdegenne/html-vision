export class SS {
	#ss = new CSSStyleSheet();

	constructor(
		protected documentOrCustomElement: Document | ShadowRoot,
		protected styles: string,
	) {
		this.on();
		this.apply();
	}

	on() {
		this.#ss.replaceSync(this.styles);
	}

	off() {
		this.#ss.replaceSync('');
	}

	apply() {
		this.remove();
		this.documentOrCustomElement.adoptedStyleSheets.push(this.#ss);
	}

	remove() {
		this.documentOrCustomElement.adoptedStyleSheets.splice(
			this.documentOrCustomElement.adoptedStyleSheets.indexOf(this.#ss) >>> 0,
			1,
		);
	}
}
