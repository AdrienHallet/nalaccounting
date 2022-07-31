import type { Transaction } from "$lib/logic/model/transaction";
import databaseExporter from "../database-exporter";
import { DatabaseService } from "../database.service";
import { DatabaseFacade } from "./database.facade";
import { StateAction, StateActionType } from "./state-action";

let previousLength = 0;
const poll = async (pollingState: PollingState) => {
    const transactions = await (await DatabaseFacade.get()).transactions();
    if (transactions.actionQueue.length > 0 && transactions.actionQueue.length != previousLength) {
        previousLength = transactions.actionQueue.length;
        pollingState.setFresh(false);
        resetTimeout(pollingState);
    }
    pollingState.setProcessing(false);   
}

let exportTimeout: NodeJS.Timer;
const resetTimeout = (pollingState: PollingState) => {
    if (exportTimeout) {
        clearInterval(exportTimeout);
    }
    exportTimeout = setInterval(exportDatabase, 10000, pollingState);
}

const exportDatabase = async (pollingState: PollingState) => {
    pollingState.setProcessing(true);
    processEvents();
    await databaseExporter(); 
    pollingState.setProcessing(false);
    pollingState.setFresh(true);
    clearInterval(exportTimeout);
}

const processEvents = async () => {
    const transactions = await (await DatabaseFacade.get()).transactions();
    while (transactions.actionQueue.length > 0) {
        const shift = transactions.actionQueue.shift();
        if (shift) {
            processTransaction(shift);
        }
    } 
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
    setFresh: (isFresh: boolean) => void,
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