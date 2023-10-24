import { Module } from '@nestjs/common';
import { UserServiceProvider } from './user.constant';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	providers: [{ provide: UserServiceProvider, useClass: UserService }],
	exports: [UserServiceProvider],
	controllers: [UserController],
})
export class UserModule {}
