export interface MustHaveFields {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export class GenericStore<T extends MustHaveFields> {
  private items = new Array<T>();

  addAllItems(allItems: T[]) {
    this.items = allItems;
  }

  getAll(): T[] {
    return this.items;
  }

  getById(id: number): T | undefined {
    return this.items.find(v => v.id === id);
  }

  addItem(t: T) {
    this.items.push(t);
  }

  updateItem(idx: number, t: T) {
    let index = this.items.findIndex(v => v.id === idx);
    this.items[index] = t;
  }

  removeItem(id: number) {
    this.items.splice(id, 1);
  }
}
