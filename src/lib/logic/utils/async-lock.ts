/* eslint-disable @typescript-eslint/no-empty-function */
export class AsyncLock {
    constructor(
        public disable = () => {},
        public promise = Promise.resolve(),
    ) {}

    enable() {
        this.promise = new Promise(resolve => this.disable = resolve)
    }
}