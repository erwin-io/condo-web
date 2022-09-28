import { Tenant } from "./tenant.model";


  export class Room {
      roomId: string;
      name: string;
      monthlyRate: number;
      tenants: Tenant[];
  }
