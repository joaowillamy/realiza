import * as bcrypt from 'bcrypt';
import { BaseEntity, Entity, Unique } from 'typeorm';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  id: string;

  email: string;

  name: string;

  role: string;

  status: boolean;

  password: string;

  salt: string;

  confirmationToken: string;

  recoverToken: string;

  createdAt: Date;

  updatedAt: Date;

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
