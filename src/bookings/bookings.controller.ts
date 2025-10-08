import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from '../entities/bookings.entity';

@Controller('api/bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('reserve')
  async reserve(
    @Body() createBookingDto: CreateBookingDto,
    @Request() req,
  ): Promise<{ message: string; booking: Booking }> {
    const userId = req.user.id;
    const booking = await this.bookingsService.reserve(
      createBookingDto.eventId,
      userId,
    );
    return { message: 'Booking successful', booking };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id/cancel')
  async cancelBooking(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.bookingsService.cancelBooking(id, userId);
  }
}
