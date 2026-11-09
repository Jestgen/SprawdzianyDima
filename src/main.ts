import ShoppingList from "./ShoppingList";
import { ItemFilter } from "./ShoppingList";
import { validateItem } from "./validation";

const nameInput = document.getElementById("nameInput") as HTMLInputElement;
const quantityInput = document.getElementById("quantityInput") as HTMLInputElement;
const addButton = document.getElementById("addButton") as HTMLButtonElement;
const errorMessage = document.getElementById("errorMessage") as HTMLParagraphElement;
const filterSelect = document.getElementById("filterSelect") as HTMLSelectElement;
const counter = document.getElementById("counter") as HTMLParagraphElement;
const listContainer = document.getElementById("listContainer") as HTMLDivElement;
const clearBoughtButton = document.getElementById("clearBoughtButton") as HTMLButtonElement;

const list = new ShoppingList();

function buildList(): void {
  const filter = filterSelect.value as ItemFilter;
  const filtered = list.getFiltered(filter);

  listContainer.innerHTML = "";

  filtered.forEach(item => {
    const el = item.render();

    const toggleBtn = el.querySelector(".toggle-btn") as HTMLButtonElement;
    toggleBtn.addEventListener("click", () => {
      list.toggle(item.id);
      buildList();
    });

    const deleteBtn = el.querySelector(".delete-btn") as HTMLButtonElement;
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

  const error = validateItem(name, qtyText);
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
