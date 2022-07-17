export class HttpError extends Error {

    public status: number;
    
    constructor(response: Response) {
        super(response.statusText)
        if (response.ok) {
            throw new Error("Don't initialize http errors from successful calls");
        }
        this.status = response.status;
    }
}