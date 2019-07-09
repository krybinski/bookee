import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'nestjs_db',
      password: '123123',
      database: 'nestjs_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ConfigModule,
    AuthModule,
    UsersModule
  ],
  controllers: [
    AppController,
    UsersController
  ],
  providers: [
    AppService,
    UsersService,
    ConfigService
  ],
})
export class AppModule {}
