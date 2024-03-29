export interface ITransaction {
    id?: number;
    date: string;
    amount?: number;
    title?: string;
    categoryId?: number;

    equals(other: ITransaction): boolean;
}

export class Transaction implements ITransaction {
    id?: number;
    date: string;
    amount? :number; // CENT amount of the transaction
    title? :string;
    categoryId?: number;

    constructor(iTransaction: ITransaction) {
        this.id = iTransaction.id;
        this.date = iTransaction.date;
        this.amount = iTransaction.amount;
        this.title = iTransaction.title;
        this.categoryId = iTransaction.categoryId;
    }

    public equals(other: ITransaction): boolean {
        return this.id === other.id
            && this.date === other.date
            && this.amount === other.amount
            && this.title === other.title
            && this.categoryId === other.categoryId;
    }
}