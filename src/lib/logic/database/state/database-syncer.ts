import databaseExporter from "../database-exporter";
import { TransactionFacade } from "../facade/transaction.facade";

// todo: instead of local poll, listen to changes in states

let previousChange: Date | null;
let fresh = true;
const poll = async (pollingState: PollingState) => {
    console.log("polling")
    const transactionFacade = await TransactionFacade.get();
    if (previousChange != transactionFacade.getLastChange()) {
        previousChange = transactionFacade.getLastChange();
        fresh = false;
        pollingState.setFresh(fresh);
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
    await databaseExporter(); 
    pollingState.setProcessing(false);
    fresh = true;
    pollingState.setFresh(fresh);
    clearInterval(exportTimeout);
}

let poller: NodeJS.Timer;

export const startPolling = (pollingState: PollingState) => {
    poller = setInterval(poll, 200, pollingState);
    pollingState.setPolling(true);
    if(!fresh) {
        resetTimeout(pollingState);
    }
}

export const stopPolling = (pollingState: PollingState) => {
    clearInterval(exportTimeout);
    clearInterval(poller);
    pollingState.setPolling(false);
}

export interface PollingState {
    setPolling: (isPolling: boolean) => void,
    setFresh: (isFresh: boolean) => void,
    setProcessing: (isProcessing: boolean) => void,
}