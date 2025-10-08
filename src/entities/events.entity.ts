import { Entity, PrimaryGeneratedColumn, Column, OneToMany, DeleteDateColumn } from 'typeorm';
import { Booking } from '../entities/bookings.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  totalSeats: number;

  @OneToMany(() => Booking, (booking) => booking.event, { eager: false })
  bookings: Booking[];

  @DeleteDateColumn()
  deletedAt?: Date; 
}
