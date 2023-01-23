import { SUPPLIER_PROVIDER } from "src/core/constants";
import { Supplier } from "./supplier.entity";



export const supplierProvider = [
    {
        provide: SUPPLIER_PROVIDER,
        useValue: Supplier,

    }

]