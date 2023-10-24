import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { inspect } from 'util';
import { UserServiceAbstract } from './user.abstract';
import { ConvertedUser, Department, User, UserAPIResponse } from './user.interface';

@Injectable()
export class UserService implements UserServiceAbstract {
	private logger = new Logger(UserService.name);

	async getUsers(): Promise<ConvertedUser> {
		try {
			const { data } = await axios.get('https://dummyjson.com/users?limit=100');
			const users = (data as UserAPIResponse).users;
			const transformData = this.transformData(users);
			return { department: transformData };
		} catch (error) {
			this.logger.error('Error fetching data:', error);
			throw error;
		}
	}

	transformData(users: User[]): Record<string, Department>[] {
		const [departments, departmentAgeCounts]: [
			Record<string, Department>,
			Record<string, Record<string, number>>,
		] = users.reduce(
			(transformed, user) => {
				try {
					const [transformedData, ageCounts] = transformed;

					// initializeDepartment
					const departmentKey = user.company.department;
					if (!transformedData[departmentKey]) {
						transformedData[departmentKey] = {
							male: 0,
							female: 0,
							ageRange: '',
							ageMode: 0,
							hair: {},
							addressUser: {},
						};
					}
					if (!ageCounts[departmentKey]) ageCounts[departmentKey] = {};
					const department = transformedData[departmentKey];
					const ageCountsData = ageCounts[departmentKey];

					// updateGender
					if (user.gender === 'male') {
						department.male++;
					} else if (user.gender === 'female') {
						department.female++;
					}

					// updateHairColor
					const hairColor = user.hair.color;
					if (!department?.hair?.[hairColor]) {
						department.hair[hairColor] = 1;
					} else {
						department.hair[hairColor]++;
					}

					// updateAgeRange
					const userAge = this.calculateAge(user.birthDate);
					const currentAgeRange = department.ageRange;
					if (!currentAgeRange) {
						department.ageRange = `${userAge}-${userAge}`;
					} else {
						const [minAge, maxAge] = currentAgeRange.split('-').map(Number);
						if (userAge < minAge) {
							department.ageRange = `${userAge}-${maxAge}`;
						} else if (userAge > maxAge) {
							department.ageRange = `${minAge}-${userAge}`;
						}
					}

					// storeUserAge
					if (!ageCountsData[userAge]) {
						ageCountsData[userAge] = 1;
					} else {
						ageCountsData[userAge]++;
					}

					// updateAddressUser
					const fullName = `${user.firstName}${user.lastName}`;
					const postalCode = user.address.postalCode;
					department.addressUser[fullName] = postalCode;

					return [transformedData, ageCounts];
				} catch (error) {
					this.logger.error(inspect(error, { colors: true, compact: false }));
				}
			},
			[{}, {}],
		);
		return Object.entries(departments).map(([key, value]) => {
			return {
				[key]: { ...value, ageMode: this.calculateAgeMode(departmentAgeCounts[key]) },
			};
		});
	}

	calculateAge(birthDate: Date | string): number {
		const birthYear = new Date(birthDate).getFullYear();
		const currentYear = new Date().getFullYear();
		return currentYear - birthYear;
	}

	calculateAgeMode(ageCount: Record<string, number>): number[] {
		let maxCount = 0;
		let ageMode = [];

		for (const age in ageCount) {
			const count = ageCount[age];

			if (count > maxCount) {
				maxCount = count;
				ageMode = [parseInt(age)];
			} else if (count === maxCount) {
				ageMode.push(parseInt(age));
			}
		}

		return ageMode;
	}
}
