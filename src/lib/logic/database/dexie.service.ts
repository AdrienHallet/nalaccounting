import Dexie from "dexie";
import type { ITransaction } from "../model/transaction";
import databaseLoader from "./database-retriever";

export class DexieService extends Dexie {
    private static instance: DexieService;
    transactions!: Dexie.Table<ITransaction, number>;

    private constructor() {
        super("budjet");
        console.log("INSTANCE");

        this.version(2).stores({
            transactions: '++id, date, amount, title',
        });
    }

    public static async get(): Promise<DexieService> {
        if (!DexieService.instance) {
            console.log("Creating DB service");
            DexieService.instance = new DexieService();
            const [blob, _] = await databaseLoader();
            await DexieService.instance.load(blob);
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