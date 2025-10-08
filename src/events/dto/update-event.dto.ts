import { IsInt, IsOptional, IsString, Min, IsNotEmpty } from 'class-validator';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Event name cannot be empty' })
  name?: string;

  @IsOptional()
  @IsInt({ message: 'Total seats must be an integer' })
  @Min(1, { message: 'Total seats must be at least 1' })
  totalSeats?: number;
}