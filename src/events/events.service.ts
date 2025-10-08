import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../entities/events.entity';
import { Booking } from '../entities/bookings.entity';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,

    @InjectRepository(Booking)
    private readonly bookingsRepository: Repository<Booking>,
  ) {}

  async createEvent(dto: CreateEventDto): Promise<Event> {
    const event = this.eventsRepository.create(dto);
    return this.eventsRepository.save(event);
  }

  async getAllEvents(): Promise<Event[]> {
    return this.eventsRepository.find({ relations: ['bookings'] });
  }

  async getEventById(id: string): Promise<Event> {
    const event = await this.eventsRepository.findOne({
      where: { id },
      relations: ['bookings'],
    });
    if (!event) throw new NotFoundException(`Event with id ${id} not found`);
    return event;
  }

  async getAvailability(eventId: string) {
    const event = await this.eventsRepository.findOne({
      where: { id: eventId },
    });
    if (!event) throw new NotFoundException('Event not found');

    const bookedCount = await this.bookingsRepository.count({
      where: { event: { id: eventId }, isCanceled: false },
    });

    return {
      totalSeats: event.totalSeats,
      booked: bookedCount,
      available: event.totalSeats - bookedCount,
    };
  }

  async updateEvent(
    id: string,
    updateDto: Partial<CreateEventDto>,
  ): Promise<Event> {
    const event = await this.eventsRepository.findOne({ where: { id } });
    if (!event) throw new NotFoundException(`Event with id ${id} not found`);

    Object.assign(event, updateDto);
    return this.eventsRepository.save(event);
  }

  async deleteEvent(eventId: string) {
    const event = await this.eventsRepository.findOne({
      where: { id: eventId },
    });
    if (!event)
      throw new NotFoundException(`Event with id ${eventId} not found`);

    await this.eventsRepository.softRemove(event); 
    return { message: 'Event deleted (soft)' };
  }
}
