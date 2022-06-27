export interface ITransaction {
    id?: number;
    amount? :number;
    title? :string;

    compare(other: ITransaction): boolean;
}

export class Transaction implements ITransaction {
    id?: number;
    amount? :number;
    title? :string;

    constructor(iTransaction: ITransaction) {
        this.id = iTransaction.id;
        this.amount = iTransaction.amount;
        this.title = iTransaction.title;
    }

    public compare(other: ITransaction): boolean {
        return this.id === other.id
            && this.amount === other.amount
            && this.title === other.title;
    }
}