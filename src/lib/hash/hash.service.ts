import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  private readonly SALT_ROUNDS = 10; // Constante configurable

  async hashPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      throw new Error('Error hashing password: ' + error.message);
    }
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      return bcrypt.compare(password, hashedPassword); // Sin await innecesario
    } catch (error) {
      throw new Error('Error comparing passwords: ' + error.message);
    }
  }
}
