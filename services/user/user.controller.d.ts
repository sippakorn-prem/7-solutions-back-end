import { ConvertedUser } from './user.interface';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    private logger;
    constructor(userService: UserService);
    getUser(): Promise<ConvertedUser>;
}
