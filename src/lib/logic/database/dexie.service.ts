import Dexie from "dexie";
import type { ITransaction } from "../model/transaction";

export class DexieService extends Dexie {
    private static instance: DexieService;
    transactions!: Dexie.Table<ITransaction, number>;

    private constructor() {
        super("budjet");
        console.log("INSTANCE");

        this.version(1).stores({
            transactions: '++id, amount, title',
        });
    }

    public static get(): DexieService {
        if (!DexieService.instance) {
            DexieService.instance = new DexieService();
        }
        return DexieService.instance;
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