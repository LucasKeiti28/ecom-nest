import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './auth/logger.middleware';
import { user } from './auth/user.middleware';
import { SharedModule } from './shared/shared.module';


@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), SharedModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(LoggerMiddleware, user)
    .exclude({path: 'auth', method: RequestMethod.GET})
    .forRoutes('auth')
  }
}
