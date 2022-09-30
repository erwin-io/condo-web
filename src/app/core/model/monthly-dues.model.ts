import { Tenant } from './tenant.model';

export class MonthlyDues {
  monthlyDueId: string;
  dueDate: string;
  generatedDate: string;
  dueAmount: number;
  amountPaid: number;
  isPaid: boolean;
  markAsRead: boolean;
  tenant: Tenant;
}
