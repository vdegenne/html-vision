import type {CSSResult} from 'lit';

export class SS {
	#ss = new CSSStyleSheet();
	#active = false;

	constructor(
		protected documentOrCustomElement: Document | ShadowRoot,
		protected styles: string | CSSResult,
	) {
		this.on();
		this.apply();
	}

	on() {
		this.#ss.replaceSync(
			typeof this.styles === 'string' ? this.styles : this.styles.cssText,
		);

		this.#active = true;
	}

	off() {
		this.#ss.replaceSync('');
		this.#active = false;
	}

	toggle() {
		this.#active ? this.off() : this.on();
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
