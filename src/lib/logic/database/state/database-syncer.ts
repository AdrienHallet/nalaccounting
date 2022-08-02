import databaseExporter from "../database-exporter";
import { TransactionFacade } from "../facade/transaction.facade";

let previousChange: Date | null;
const poll = async (pollingState: PollingState) => {
    const transactionFacade = await TransactionFacade.get();
    if (previousChange != transactionFacade.getLastChange()) {
        previousChange = transactionFacade.getLastChange();
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
    await databaseExporter(); 
    pollingState.setProcessing(false);
    pollingState.setFresh(true);
    clearInterval(exportTimeout);
}

let poller: NodeJS.Timer;

export const startPolling = (pollingState: PollingState) => {
    poller = setInterval(poll, 200, pollingState);
    pollingState.setPolling(true);
}

export const stopPolling = () => {
    clearInterval(poller);
}

export interface PollingState {
    setPolling: (isPolling: boolean) => void,
    setFresh: (isFresh: boolean) => void,
    setProcessing: (isProcessing: boolean) => void,
}