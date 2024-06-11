import { Entity, Column, PrimaryColumn, Unique, OneToMany } from 'typeorm';
import { Transaction } from './transaction.entity';
import { UserStatus } from '../types';

@Entity()
@Unique(['emailAddress', 'username', 'idNumber'])
export class User {
  @PrimaryColumn()
  userId: string;

  @Column({ nullable: true })
  firebaseId?: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  phone?: string;

  @Column()
  emailAddress: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  gender?: string;

  @Column({ type: 'date', nullable: true })
  birthDate?: Date;

  @Column({ length: 2 })
  countryIdentifier: string;

  @Column({ default: false })
  deleted?: boolean;

  @Column({ type: 'date', nullable: true })
  deletedAt?: Date;

  @Column()
  idNumber: string;

  @Column({ default: 'pending' })
  userStatus?: UserStatus;

  @Column({ type: 'date' })
  createdAt: Date;

  @Column({ type: 'date' })
  updatedAt: Date;

  @Column()
  lastUpdatedBy: string;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];
}
