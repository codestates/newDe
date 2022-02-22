import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { User } from "../../entities/user";

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const UserData = [
      {
        nickName: 'pinguman',
        email:'test1@test.com',
        password:'1234'
      },
    ];
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(UserData)
      .execute();
  }
}