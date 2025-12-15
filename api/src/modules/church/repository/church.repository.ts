import { ChurchCreateDto, ChurchUpdateDto } from '../dto/church.dto';
import { ChurchEntity } from '../entities/church.entity';

abstract class ChurchRepository {
  abstract create(data: ChurchCreateDto): Promise<ChurchEntity>;
  abstract findById(id: string): Promise<ChurchEntity | null>;
  abstract findAll(): Promise<ChurchEntity[]>;
  abstract update(id: string, data: ChurchUpdateDto): Promise<ChurchEntity>;
  abstract delete(id: string): Promise<void>;
}

export { ChurchRepository };
