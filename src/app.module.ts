import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { UserService } from './shared/user.service';


@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), SharedModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
