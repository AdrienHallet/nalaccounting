import type { Transaction } from "$lib/logic/model/transaction";
import { DatabaseService } from "../database.service";
import { DatabaseFacade } from "./database.facade";
import { StateAction, StateActionType } from "./state-action";

const poll = async (pollingState: PollingState) => {
    const transactions = await (await DatabaseFacade.get()).transactions();
    while (transactions.actionQueue.length > 0) {
        pollingState.setProcessing(true);
        const shift = transactions.actionQueue.shift();
        if (shift) {
            processTransaction(shift);
        }
    } 
    pollingState.setProcessing(false);   
}

let poller: NodeJS.Timer;
let databaseFacade: DatabaseFacade;
let databaseService: DatabaseService;

export const startPolling = (pollingState: PollingState) => {
    DatabaseFacade.get().then(async facade => {
        databaseFacade = facade;
        databaseService = await DatabaseService.get();
        poller = setInterval(poll, 200, pollingState);
        pollingState.setPolling(true);
    });
}

export const stopPolling = () => {
    clearInterval(poller);
}

export interface PollingState {
    setPolling: (isPolling: boolean) => void,
    setProcessing: (isProcessing: boolean) => void,
}

const processTransaction = (toProcess: StateAction<Transaction>) => {
    switch (toProcess.type) {
        case StateActionType.ADD:
        case StateActionType.UPDATE:
            databaseService.addOrUpdate(toProcess.item);
            break;
        case StateActionType.DELETE:
            databaseService.delete(toProcess.item);
            break;
        default:
            throw new Error("Unhandled type StateAction for Transaction: " + toProcess.type);
    }
}