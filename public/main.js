"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ShoppingList_1 = __importDefault(require("./ShoppingList"));
const validation_1 = require("./validation");
const nameInput = document.getElementById("nameInput");
const quantityInput = document.getElementById("quantityInput");
const addButton = document.getElementById("addButton");
const errorMessage = document.getElementById("errorMessage");
const filterSelect = document.getElementById("filterSelect");
const counter = document.getElementById("counter");
const listContainer = document.getElementById("listContainer");
const clearBoughtButton = document.getElementById("clearBoughtButton");
const list = new ShoppingList_1.default();
function buildList() {
    const filter = filterSelect.value;
    const filtered = list.getFiltered(filter);
    listContainer.innerHTML = "";
    filtered.forEach(item => {
        const el = item.render();
        const toggleBtn = el.querySelector(".toggle-btn");
        toggleBtn.addEventListener("click", () => {
            list.toggle(item.id);
            buildList();
        });
        const deleteBtn = el.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => {
            list.remove(item.id);
            buildList();
        });
        listContainer.appendChild(el);
    });
    counter.textContent = "Do kupienia: " + list.countRemaining();
}
addButton.addEventListener("click", () => {
    const name = nameInput.value;
    const qtyText = quantityInput.value;
    const error = (0, validation_1.validateItem)(name, qtyText);
    if (error) {
        errorMessage.textContent = error;
        return;
    }
    errorMessage.textContent = "";
    list.add(name.trim(), Number(qtyText));
    nameInput.value = "";
    quantityInput.value = "";
    buildList();
});
filterSelect.addEventListener("change", () => {
    buildList();
});
clearBoughtButton.addEventListener("click", () => {
    list.clearBought();
    buildList();
});
buildList();
