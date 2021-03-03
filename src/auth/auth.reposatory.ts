import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthDto } from "./auth.dto";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";
@EntityRepository(User)
export class UserRepo extends Repository<User>{
  async SignUp(authdto: AuthDto): Promise<void> {
    const user = new User();
    const { username, password } = authdto;

    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    console.log(user.password);
    try {
      await this.save(user);
    } catch (error) {
      console.log(typeof (error.code));
      if (error.code === '23505') {
        throw new ConflictException("Username Already exsist")
      }
      else {
        throw new InternalServerErrorException();
      }
    }

  }
  private async hashPassword(passwod: string, salt: string) {
    return await bcrypt.hash(passwod, salt);
  }
  async ValidatePassword(authdto: AuthDto): Promise<string> {
    const { username, password } = authdto;
    const user = await this.findOne({ username });
    if (user && await user.validatPassword(password)) {
      return user.username;
    } else {
      return null;
    }
  }
}