import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { UserModule } from './user/user.module';
// import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://janviyadav802:CRwRg2xsTLoT9OgW@cluster0.fyhalzi.mongodb.net/todo_db'),
    // ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.local.env'] }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     type: "postgres",
    //     host: configService.get("DATABASE_HOST"),
    //     port: configService.get<number>("DATABASE_PORT"),
    //     username: configService.get("DATABASE_USERNAME"),
    //     password: configService.get("DATABASE_PASSWORD"),
    //     synchronize: configService.get<boolean>("DATABASE_SYNC"),
    //     logging: configService.get<boolean>("DATABASE_LOGGING"),
    //     database: configService.get("DATABASE_NAME"),
    // })
    // }),
    AuthModule, TasksModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
