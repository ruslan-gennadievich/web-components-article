const template = document.createElement("template");
template.innerHTML = /* html */ `
  <style>
    @import "/components/my-button/my-button.css";
  </style>
  <button>
    <slot></slot>
    <slot name="icon"></slot>
  </button>
`;

customElements.define(
  "my-button",
  class extends HTMLElement {
    static get observedAttributes() {
      return ["variant"];
    }

    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }
);
