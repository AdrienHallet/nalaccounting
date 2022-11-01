export interface ITransaction {
    id?: number;
    date: string;
    amount? :number;
    title? :string;

    compare(other: ITransaction): boolean;
}

export class Transaction implements ITransaction {
    id?: number;
    date: string;
    amount? :number;
    title? :string;

    constructor(iTransaction: ITransaction) {
        this.id = iTransaction.id;
        this.date = iTransaction.date;
        this.amount = iTransaction.amount;
        this.title = iTransaction.title;
    }

    public compare(other: ITransaction): boolean {
        return this.id === other.id
            && this.date === other.date
            && this.amount === other.amount
            && this.title === other.title;
    }
}