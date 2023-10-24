import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { UserServiceProvider } from './user.constant';
import { ConvertedUser } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	private logger = new Logger(UserController.name);

	constructor(@Inject(UserServiceProvider) private readonly userService: UserService) {}

	@Get()
	async getUser(): Promise<ConvertedUser> {
		return this.userService.getUsers();
	}
}
