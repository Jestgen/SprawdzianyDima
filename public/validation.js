"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateItem = validateItem;
function validateItem(name, quantityText) {
    const trimmedName = name.trim();
    if (trimmedName.length < 2 || trimmedName.length > 30) {
        return "Nazwa musi mieć od 2 do 30 znaków.";
    }
    const qty = Number(quantityText);
    if (isNaN(qty) || !Number.isInteger(qty) || qty < 1 || qty > 99) {
        return "Ilość musi być liczbą całkowitą od 1 do 99.";
    }
    return null;
}
