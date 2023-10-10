// decided to try web components out to see how mature they are
// ( would do this again in normal javascript without web components for testing )

// used mozillas reference for this..
// https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements

class Quantity extends HTMLElement {
  quantity;
  inputElement;

  createElementHTML() {
    const shadow = this.attachShadow({ mode: "open" });

    const text = document.createElement("span");
    text.setAttribute("class", "text");
    text.textContent = 'Set Quantity';

    const decrementButton = document.createElement("button");
    decrementButton.textContent = "-";
    decrementButton.setAttribute("aria-label", "Increment Quantity");
    decrementButton.addEventListener("click", () => this.decrement());

    const quantityInput = document.createElement("input");
    quantityInput.value = this.quantity;
    quantityInput.setAttribute("class", "quantity-input");
    quantityInput.setAttribute("aria-label", "Set Quantity");
    quantityInput.addEventListener("input", (e) => this.changeQuantity(+e.target.value));
    this.inputElement = quantityInput;

    const incrementButton = document.createElement("button");
    incrementButton.textContent = "+";
    incrementButton.setAttribute("aria-label", "Decrement Quantity");
    incrementButton.addEventListener("click", () => this.increment());

    // Create some CSS to apply to the shadow dom
    const style = document.createElement("style");

    style.textContent = `
      .quantity-input {
        width: 65px;
      }
    `;

    // Attach the created elements to the shadow dom
    shadow.appendChild(style);
    shadow.appendChild(text);
    shadow.appendChild(decrementButton);
    shadow.appendChild(quantityInput);
    shadow.appendChild(incrementButton);
  }

  constructor() {
    super();

    this.quantity = 1;
    this.minQuantity = 0;
    this.maxQuantity = 10;
    this.inputElement = null;

    this.createElementHTML();
  }

  updateInputElement() {
    this.inputElement.value = this.quantity;
  }

  increment() {
    this.changeQuantity(this.quantity + 1);
  }

  decrement() {
    this.changeQuantity(this.quantity - 1);
  }

  changeQuantity(quant) {
    if (! +quant || +quant < this.minQuantity) {
      this.quantity = this.minQuantity;
      this.updateInputElement();
      return;
    }

    if (+quant > this.maxQuantity) {
      this.quantity = this.maxQuantity;
      this.updateInputElement();
      return;
    }

    this.quantity = quant;
    this.updateInputElement();
  }
}

module.exports = Quantity;
