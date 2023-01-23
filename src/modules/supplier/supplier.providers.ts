import { SUPPLIER_REPOSITORY } from '../../core/constants';
import { Supplier } from './supplier.entity';

export const supplierProvider = [
  {
    provide: SUPPLIER_REPOSITORY,
    useValue: Supplier,
  },
];
