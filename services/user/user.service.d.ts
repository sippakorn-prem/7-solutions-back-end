import { UserServiceAbstract } from './user.abstract';
import { ConvertedUser, Department, User } from './user.interface';
export declare class UserService implements UserServiceAbstract {
    private logger;
    getUsers(): Promise<ConvertedUser>;
    transformData(users: User[]): Record<string, Department>[];
    calculateAge(birthDate: Date | string): number;
    calculateAgeMode(ageCount: Record<string, number>): number[];
}
