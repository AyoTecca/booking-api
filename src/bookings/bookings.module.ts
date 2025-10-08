import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from '../entities/bookings.entity';
import { Event } from '../entities/events.entity';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking, Event]), 
  ],
  providers: [BookingsService],
  controllers: [BookingsController],
})
export class BookingsModule {}
