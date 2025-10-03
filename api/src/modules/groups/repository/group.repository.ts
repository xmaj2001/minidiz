import {
  CreateGroupDto,
  UpdateGroupDto,
  //   GroupMemberDto,
} from '../dto/group.dto';
import { Group } from '../entities/group.entity';

export default abstract class GroupRepository {
  // CRUD Básico
  abstract create(data: CreateGroupDto): Promise<Group>;
  abstract findAll(): Promise<Group[]>;
  abstract findById(id: number): Promise<Group>;
  abstract update(id: number, data: UpdateGroupDto): Promise<Group>;
  abstract remove(id: number): Promise<void>;

  // Métodos de Relação M:N
  abstract addMembers(groupId: number, memberIds: number[]): Promise<Group>;
  abstract removeMembers(groupId: number, memberIds: number[]): Promise<Group>;
  abstract findMembers(groupId: number): Promise<any[]>; // Retorna a lista de membros do grupo
}
