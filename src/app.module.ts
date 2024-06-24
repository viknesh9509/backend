import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/shared/database.module';


@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({isGlobal: true}),
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
