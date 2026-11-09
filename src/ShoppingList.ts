import ShoppingItem from "./ShoppingItem";

export type ItemFilter = "all" | "toBuy" ;

export default class ShoppingList {
  items: ShoppingItem[] = [];
  private nextId: number = 1;

  add(name: string, quantity: number): ShoppingItem {
    const existing = this.getByName(name);
    if (existing) {
      existing.quantity == quantity;
      return existing;
    }

    const newItem = new ShoppingItem(this.nextId, name , quantity);
    this.nextId++;
    this.items.push(newItem);
    return newItem;
  }

  private getByName(name: string): ShoppingItem | undefined {
    const lowerName = name.trim().toLowerCase();
    return this.items.find(item => item.name.toLowerCase() === lowerName);
  }

  remove(id: number) : void {
    this.items = this.items.filter(item => item.id !== id);
  }

  
  getById(id: number) : ShoppingItem | undefined {
    return this.items.find(item => item.id === id);
  }

  toggle(id: number): void {
    const item = this.getById(id);
    if ( item ) {
      item.toggle();
    }
  }

  countRemaining(): number {
    return this.items.filter(item => !item.isBought).length;
  }

  getFiltered(filter: ItemFilter): ShoppingItem[] {
    if (filter === "toBuy" ) {
      return this.items.filter(item => !item.isBought);
    } else if (filter === "bought" ) {
      return this.items.filter(item => item.isBought);
    }
    return [...this.items];
  }

  clearBought(): void {
    this.items = this.items.filter(item => !item.isBought);
  }
}
