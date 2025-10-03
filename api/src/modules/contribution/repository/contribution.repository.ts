import {
  CreateContributionDto,
  UpdateContributionDto,
} from '../dto/contribution.dto';
import { Contribution } from '../entities/contribution.entity';

export default abstract class ContributionRepository {
  abstract create(data: CreateContributionDto): Promise<Contribution>;
  abstract findAll(): Promise<Contribution[]>;
  abstract findById(id: number): Promise<Contribution>;
  abstract update(
    id: number,
    data: UpdateContributionDto,
  ): Promise<Contribution>;
  abstract remove(id: number): Promise<void>;
}
