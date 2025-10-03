import { CreateMemberDto, UpdateMemberDto } from '../dto/member.dto';
import { Member } from '../entities/member.entity';

export default abstract class MemberRepository {
  abstract create(data: CreateMemberDto): Promise<Member>;
  abstract findAll(): Promise<Member[]>;
  abstract findById(id: number): Promise<Member>;
  abstract findByEmail(email: string): Promise<Member | null>;
  abstract update(id: number, data: UpdateMemberDto): Promise<Member>;
  abstract remove(id: number): Promise<void>;
}
