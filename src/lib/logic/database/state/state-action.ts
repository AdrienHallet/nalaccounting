export class StateAction<T> {
    constructor(
        public type: StateActionType,
        public item: T,
    ) {};
}

export enum StateActionType {
    ADD = "ADD",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
}