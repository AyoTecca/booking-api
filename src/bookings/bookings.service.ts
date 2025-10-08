import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Booking } from '../entities/bookings.entity';
import { Event } from '../entities/events.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingsRepository: Repository<Booking>,

    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,

    private readonly dataSource: DataSource,
  ) {}

  async reserve(eventId: string, userId: string): Promise<Booking> {
    return await this.dataSource.transaction(async (manager) => {
      const eventRepo = manager.getRepository(Event);
      const bookingRepo = manager.getRepository(Booking);

      const event = await eventRepo.findOne({ where: { id: eventId } });
      if (!event) throw new NotFoundException('Event not found');

      const activeCount = await bookingRepo.count({
        where: { event: { id: eventId }, isCanceled: false },
      });

      if (activeCount >= event.totalSeats) {
        throw new BadRequestException('No available seats');
      }

      const existing = await bookingRepo.findOne({
        where: { event: { id: eventId }, userId, isCanceled: false },
      });
      if (existing) {
        throw new BadRequestException(
          'You already have a booking for this event',
        );
      }

      const booking = bookingRepo.create({ event, userId });
      return bookingRepo.save(booking);
    });
  }

  async cancelBooking(id: string, userId: string): Promise<void> {
    const booking = await this.bookingsRepository.findOne({ where: { id } });
    if (!booking) throw new NotFoundException('Booking not found');

    if (booking.userId !== userId) {
      throw new ForbiddenException('You can only cancel your own bookings');
    }

    if (booking.isCanceled)
      throw new BadRequestException('Booking is already canceled');

    booking.isCanceled = true;
    await this.bookingsRepository.save(booking);
  }
}
