import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';
import { AdminPermissions } from '../types';

@Entity()
@Unique(['emailAddress', 'idNumber'])
export class Admin {
  @PrimaryColumn()
  adminId: string;

  @Column({ nullable: true })
  firebaseId: string;

  @Column()
  emailAddress: string;

  @Column({ type: 'json' })
  permissions: AdminPermissions;

  @Column()
  fullName: string;

  @Column({ type: 'date' })
  createdAt: Date;

  @Column()
  createdBy: string;

  @Column({ type: 'date' })
  updatedAt: Date;

  @Column()
  idNumber: string;

  @Column()
  address: string;

  @Column({ type: 'date' })
  birthDate: Date;

  @Column()
  phone: string;
}
