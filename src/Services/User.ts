import { Repository, getRepository } from 'typeorm';

import User from '../Entities/User';

import { PaginationVariables } from '../Types/User';
import IUserService from '../Types/UserService';

export default class UserService implements IUserService {
  userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  public createUser(email: string, username: string, password: string) {
    const user = this.userRepository.create({ email, username, password });
    return this.userRepository.save(user);
  }

  public findManyUsers(
    order: PaginationVariables['order'],
    start: PaginationVariables['start'],
    limit: PaginationVariables['limit'],
  ) {
    return this.userRepository.find({ order: { createdAt: order }, take: limit, skip: start });
  }

  public findOneUser(id: string) {
    return this.userRepository.findOneOrFail(id);
  }

  public async updateUser(id: string, email: string, username: string, password: string) {
    const user = await this.userRepository.findOneOrFail(id);

    return this.userRepository.save({ ...user, email, username, password });
  }

  public deleteUser(id: string) {
    return this.userRepository.softDelete(id);
  }
}