import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { LoginDTO, RegisterDTO } from 'src/auth/auth.dto';
import { User } from 'src/types/user';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>){}

  private sanitizeUser(user: User){
    return user.depopulate('password');
  }

  async create(userDTO: RegisterDTO){
    const {username} = userDTO;
    const user = await this.userModel.findOne({username});
    if(user){
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
    }
    const createdUser = new this.userModel(userDTO);
    await createdUser.save();

    return createdUser;
  }

  async findByLogin(userDTO: LoginDTO){
    const {username, password} = userDTO;
    const user = await this.userModel.findOne({username});
    if(!user){
      throw new HttpException('User is Invalid', HttpStatus.UNAUTHORIZED)
    }

    if(await bcrypt.compare(password, user.password)){
      return {message: "User Logged in", user};
    } else {
      throw new HttpException('User is Invalid', HttpStatus.UNAUTHORIZED)
    }
  }
}
