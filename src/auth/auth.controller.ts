import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SellerGuard } from 'src/guards/seller.guard';
import { Payload } from 'src/types/payload';
import { User } from 'src/utilities/user.decorator';
import { UserService } from '../shared/user.service';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
//@UseFilters(new HttpExceptionFilter())
export class AuthController {
  constructor(private userService: UserService, private authService: AuthService){}

  @Get()
  //@UseFilters(new HttpExceptionFilter())
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async findAll(@User() user: any){
    return await this.userService.findAll();
  }

  /*   @Get()
    //EXCEPTION FILTERS
    //@UseFilters(new HttpExceptionFilter())
    @UseGuards(AuthGuard('jwt'))
    tempAuth(){
      return {auth: 'works'}
    } */

    @Post('login')
    //EXCEPTION FILTERS
    //@UseFilters(new HttpExceptionFilter())
    async login (@Body() userDTO: LoginDTO){
      const user = await this.userService.findByLogin(userDTO)

      const payload: Payload = {
        username: user.user.username,
        seller: user.user.seller,
      }

      const token = await this.authService.signPayload(payload);

      return {user, token}
    }

    @Post('register')
    //EXCEPTION FILTERS
    //@UseFilters(new HttpExceptionFilter())
    async register(@Body() userDTO: RegisterDTO) {
      const user = await this.userService.create(userDTO)

      const payload: Payload = {
        username: user.username,
        seller: user.seller,
      }

      const token = await this.authService.signPayload(payload)

      return {user, token}
    }
}
