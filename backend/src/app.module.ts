import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';
import { SwimlaneModule } from './swimlane/swimlane.module';
import { CardModule } from './card/card.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board/entities/board.entity';
import { Card } from './card/entities/card.entity';
import { Swimlane } from './swimlane/entities/swimlane.entity';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth/auth.guard';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRoot(),
    UserModule,
    BoardModule,
    SwimlaneModule,
    CardModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '82.197.93.184',
      port: 3306,
      username: 'root',
      password: 'root86049796',
      database: 'kambanboard',
      autoLoadEntities:true,
      entities: [Board, Card, Swimlane, User],
      synchronize: process.env.ENV !== 'production',
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthGuard],
})
export class AppModule {}
