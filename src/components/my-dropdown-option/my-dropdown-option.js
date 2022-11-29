const template = document.createElement("template");
template.innerHTML = /* html */ `
  <style>
    @import "/components/my-dropdown-option/my-dropdown-option.css";
  </style>
  <div part="container">
    <slot></slot>
    <slot name="content"></slot>
  </div>
`;

customElements.define(
  "my-dropdown-option",
  class extends HTMLElement {
    static get observedAttributes() {
      return ["value"];
    }

    get value() {
      return this.getAttribute("value");
    }

    get label() {
      const slot = this.shadowRoot.querySelectorAll("slot")[0];
      return slot.assignedNodes().at(0).textContent;
    }

    constructor() {
      super();
      this.clickHandler = this.clickHandler.bind(this);
      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.host.setAttribute("exportparts", "container");
      shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
      this.addEventListener("click", this.clickHandler);
    }

    clickHandler() {
      this.dispatchEvent(
        new CustomEvent("myDropdownOptionClick", {
          detail: {
            label: this.label,
            value: this.value,
          },
          bubbles: true,
          cancelable: true,
          composed: true,
        })
      );
    }
  }
);
