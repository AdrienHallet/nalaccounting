export class Category {
    id?: number;
    name?: string;

    constructor(other: Category) {
        this.id = other.id;
        this.name = other.name;
    }

    public equals(other: Category): boolean {
        return this.id == other.id
            && this.name == other.name;
    }
}