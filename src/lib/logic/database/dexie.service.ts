import Dexie from "dexie";
import type { ITransaction } from "../model/transaction";

export class DexieService extends Dexie {
    transactions!: Dexie.Table<ITransaction, number>;

    constructor() {
        super("budjet");
        console.log("INSTANCE");

        this.version(1).stores({
            transactions: '++id, amount, title',
        });
    }

    async load(blob: Blob): Promise<void> {
        await import("dexie-export-import");
        console.log('loading');
        return super.import(blob, {
            overwriteValues: true,
            acceptVersionDiff: true,
        })
    }

    async export(): Promise<Blob> {
        await import("dexie-export-import");
        console.log('exporting');
        return super.export();
    }
    
}