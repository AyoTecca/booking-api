import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Event } from './events.entity';
import { User } from './users.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Event, (event) => event.bookings, { eager: false })
  @Exclude({ toPlainOnly: true })
  event: Event;

  @ManyToOne(() => User, (user) => user.bookings, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  isCanceled: boolean;
}
