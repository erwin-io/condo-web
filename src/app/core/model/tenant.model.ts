import { Gender } from "./gender.model";
import { Room } from "./room.model";
import { User } from "./user.model";

export class Tenant {
  tenantId: string;
  firstName: string;
  middleName?: any;
  lastName: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  address: string;
  birthDate: string;
  age: string;
  gender: Gender;
  user: User;
  room: Room;
}
