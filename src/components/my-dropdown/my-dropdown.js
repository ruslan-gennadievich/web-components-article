const template = document.createElement("template");
template.innerHTML = /* html */ `
  <style>
    @import "/components/my-dropdown/my-dropdown.css";
  </style>
  <my-button variant="secondary"></my-button>
  <div part="options">
    <slot></slot>
  </div>
`;

customElements.define(
  "my-dropdown",
  class extends HTMLElement {
    static get observedAttributes() {
      return ["placeholder", "open"];
    }

    get placeholder() {
      return this.getAttribute("placeholder") || "";
    }

    get open() {
      return this.hasAttribute("open") && this.getAttribute("open") !== "false";
    }

    set open(value) {
      value === true
        ? this.setAttribute("open", "")
        : this.removeAttribute("open");
    }

    constructor() {
      super();
      this.toggle = this.toggle.bind(this);
      this.optionClickHandler = this.optionClickHandler.bind(this);
      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.host.setAttribute("exportparts", "options");
      shadowRoot.appendChild(template.content.cloneNode(true));
    }

    attributeChangedCallback() {
      this.render();
    }

    connectedCallback() {
      this.shadowRoot
        .querySelector("my-button")
        .addEventListener("click", this.toggle);
      this.addEventListener("myDropdownOptionClick", this.optionClickHandler);
    }

    optionClickHandler(event) {
      event.stopImmediatePropagation();
      this.selection = event.detail.label;
      this.open = false;
      this.dispatchEvent(
        new CustomEvent("myDropdownChange", {
          detail: event.detail.value,
        })
      );
      this.render();
    }

    toggle() {
      this.open = !this.open;
      this.render();
    }

    render() {
      this.shadowRoot.querySelector("my-button").innerHTML = /* html */ `
        ${this.selection || this.placeholder}
        <span slot="icon">${this.open ? "▲" : "▼"}</span>
      `;
    }
  }
);
