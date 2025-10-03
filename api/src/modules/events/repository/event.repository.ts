import { CreateEventDto, UpdateEventDto } from '../dto/event.dto';
import { Event } from '../entities/event.entity';

export default abstract class EventRepository {
  abstract create(data: CreateEventDto): Promise<Event>;
  abstract findAll(): Promise<Event[]>;
  abstract findById(id: number): Promise<Event>;
  abstract update(id: number, data: UpdateEventDto): Promise<Event>;
  abstract remove(id: number): Promise<void>;
}
