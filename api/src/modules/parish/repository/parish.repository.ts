import { ParishCreateDto, ParishUpdateDto } from '../dto/parish.dto';
import { ParishEntity } from '../entities/parish.entity';

abstract class ParishRepository {
  abstract create(data: ParishCreateDto): Promise<ParishEntity>;
  abstract findById(id: string): Promise<ParishEntity | null>;
  abstract findAll(): Promise<ParishEntity[]>;
  abstract update(id: string, data: ParishUpdateDto): Promise<ParishEntity>;
  abstract delete(id: string): Promise<void>;
}

export default ParishRepository;
