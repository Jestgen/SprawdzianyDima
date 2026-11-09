"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ShoppingItem {
    constructor(id, name, quantity, isBought = false) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.isBought = isBought;
    }
    toggle() {
        this.isBought = !this.isBought;
    }
    render() {
        const div = document.createElement("div");
        div.classList.add("item");
        div.setAttribute("data-id", String(this.id));
        if (this.isBought) {
            div.classList.add("bought");
        }
        const nameSpan = document.createElement("span");
        nameSpan.classList.add("item-name");
        nameSpan.textContent = this.name;
        const qtySpan = document.createElement("span");
        qtySpan.classList.add("item-quantity");
        qtySpan.textContent = String(this.quantity);
        const toggleBtn = document.createElement("button");
        toggleBtn.classList.add("toggle-btn");
        toggleBtn.textContent = this.isBought ? "Cofnij" : "Kupione";
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "Usuń";
        div.appendChild(nameSpan);
        div.appendChild(qtySpan);
        div.appendChild(toggleBtn);
        div.appendChild(deleteBtn);
        return div;
    }
}
exports.default = ShoppingItem;
