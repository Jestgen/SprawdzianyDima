"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ShoppingItem_1 = __importDefault(require("./ShoppingItem"));
class ShoppingList {
    constructor() {
        this.items = [];
        this.nextId = 1;
    }
    add(name, quantity) {
        const existing = this.getByName(name);
        if (existing) {
            existing.quantity += quantity;
            return existing;
        }
        const newItem = new ShoppingItem_1.default(this.nextId, name, quantity);
        this.nextId++;
        this.items.push(newItem);
        return newItem;
    }
    getByName(name) {
        const lowerName = name.trim().toLowerCase();
        return this.items.find(item => item.name.toLowerCase() === lowerName);
    }
    remove(id) {
        this.items = this.items.filter(item => item.id !== id);
    }
    getById(id) {
        return this.items.find(item => item.id === id);
    }
    toggle(id) {
        const item = this.getById(id);
        if (item) {
            item.toggle();
        }
    }
    countRemaining() {
        return this.items.filter(item => !item.isBought).length;
    }
    getFiltered(filter) {
        if (filter === "toBuy") {
            return this.items.filter(item => !item.isBought);
        }
        else if (filter === "bought") {
            return this.items.filter(item => item.isBought);
        }
        return [...this.items];
    }
    clearBought() {
        this.items = this.items.filter(item => !item.isBought);
    }
}
exports.default = ShoppingList;
