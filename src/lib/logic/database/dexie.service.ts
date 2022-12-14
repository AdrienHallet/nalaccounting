import Dexie from "dexie";
import { LOADING_COMPONENT } from "../loading/loading.enum";
import { setLoadingComponent } from "../loading/loading.state";
import type { ITransaction } from "../model/transaction";
import databaseLoader from "./database-retriever";
import { setTransactions } from "./transaction/operations";
import { getTransactions } from "./transaction/queries";
export class DexieService extends Dexie {
    private static instance: DexieService = this.get();
    transactions!: Dexie.Table<ITransaction, number>;

    private constructor() {
        super("budjet");

        this.version(3).stores({
            transactions: '++id, date, amount, title, categoryId',
            categories: '++id, name'
        });
    }

    public static get(): DexieService {
        if (!DexieService.instance) {
            DexieService.instance = new DexieService();
            databaseLoader().then(
                async ([blob,]) => {
                    await DexieService.instance.load(blob);
                    this.initializeStores();
                },
                (reason) => console.log(reason),
            )            
        }
        return DexieService.instance;
    }

    async load(blob: Blob): Promise<void> {
        await import("dexie-export-import");
        return super.import(blob, {
            clearTablesBeforeImport: true,
            acceptVersionDiff: true,
        })
    }

    async export(): Promise<Blob> {
        await import("dexie-export-import");
        return super.export();
    }

    static async initializeStores() {
        setTransactions(await getTransactions());
        setLoadingComponent(LOADING_COMPONENT.TRANSACTIONS, false);
    }
    
}