import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UserService } from "src/shared/user.service";



@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private userService: UserService){}

  async use(req: Request, _res: Response, next: NextFunction){
    console.log('Middleware Logger')
    this.userService.middlewareFunction()
    Object.assign(req.body, {Middleware: 'add Info'})
    console.log(req.body)

    const user = await this.userService.findByPayload({username: req.body.username})
    console.log(user)
    next()
  }
}