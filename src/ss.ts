import type {CSSResult} from 'lit';

export class SS {
	#ss = new CSSStyleSheet();
	#active = false;

	constructor(
		protected styles: string | CSSResult,
		protected documentOrCustomElement: Document | ShadowRoot = document,
	) {
		this.on();
		this.adopt();
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

	adopt() {
		this.detach();

		this.documentOrCustomElement.adoptedStyleSheets.push(this.#ss);
	}

	detach() {
		this.documentOrCustomElement.adoptedStyleSheets.splice(
			this.documentOrCustomElement.adoptedStyleSheets.indexOf(this.#ss) >>> 0,
			1,
		);
	}
}
