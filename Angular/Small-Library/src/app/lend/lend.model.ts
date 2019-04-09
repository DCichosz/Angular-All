import { User } from '../users/user.model';

export class Lend {
  constructor(public title: string, public lender: User, public date: Date) {}
}
