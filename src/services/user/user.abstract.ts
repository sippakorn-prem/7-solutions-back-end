import { ConvertedUser, Department, User } from './user.interface';

export abstract class UserServiceAbstract {
	abstract getUsers(): Promise<ConvertedUser>;
	abstract transformData(users: User[]): Record<string, Department>[];
	abstract calculateAge(birthDate: Date | string): number;
	abstract calculateAgeMode(ageCount: Record<string, number>): number[];
}
