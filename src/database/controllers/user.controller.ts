import { source } from '../database';
import { UserEntity } from '../models';
import { UserSchema } from '../schemas';

export class UserController {
  static async getUser(): Promise<UserSchema | null> {
    if (!source.isInitialized) await source.initialize();
    const users = await UserEntity.find({});
    const user = users?.length > 0 ? users[0] : null;
    return user;
  }

  static async createUser(payload: UserSchema) {
    if (!source.isInitialized) await source.initialize();

    console.log(payload, 'INI PAYLOAD');
    const user = new UserEntity();

    user.id = payload.id;

    for (const key of Object.keys(payload)) {
      if (key !== 'id') {
        const propertyKey = key as keyof UserLoginDetail;
        user[propertyKey] = payload[propertyKey] ?? '';
      }
    }

    await user.save();
  }

  static async updateUser(
    userId: UserSchema['id'],
    payload: Partial<Pick<UserSchema, 'email' | 'name' | 'token'>>
  ) {
    if (!source.isInitialized) await source.initialize();

    const user = await UserEntity.findOneByOrFail({ id: userId });

    user.name = payload.name ?? user.name;
    user.email = payload.email ?? user.email;
    user.token = payload.token ?? user.token;

    await user.save();
  }

  static async deleteUser() {
    if (!source.isInitialized) await source.initialize();

    await UserEntity.delete({});
  }
}
