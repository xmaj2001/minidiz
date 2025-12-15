import { MemberCreateDto, MemberUpdateDto } from '../dto/memer.dto';
import { MemberEntity } from '../entities/member.entity';

export default abstract class MemberRespository {
  abstract create(data: MemberCreateDto): Promise<MemberEntity>;

  abstract findAll(): Promise<any[]>;

  abstract findById(id: string): Promise<MemberEntity | null>;

  abstract findByEmail(email: string): Promise<MemberEntity | null>;

  abstract findByPhone(phone: string): Promise<MemberEntity | null>;

  abstract update(id: string, data: MemberUpdateDto): Promise<MemberEntity>;

  abstract delete(id: string): Promise<boolean>;
}
