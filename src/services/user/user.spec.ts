import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { User } from './user.interface';
import { UserService } from './user.service';

jest.mock('axios');

const mockUsersApiResponse = {
	data: {
		users: [
			{
				id: 1,
				firstName: 'John',
				lastName: 'Doe',
				gender: 'male',
				birthDate: '1990-01-15',
				company: { department: 'HR' },
				hair: { color: 'Black' },
				address: { postalCode: '12345' },
			},
			{
				id: 2,
				firstName: 'Alice',
				lastName: 'Smith',
				gender: 'female',
				birthDate: '1985-05-20',
				company: { department: 'IT' },
				hair: { color: 'Blond' },
				address: { postalCode: '67890' },
			},
		],
	},
};
const mockTransformedData = [
	{
		HR: {
			male: 1,
			female: 0,
			ageRange: '33-33',
			ageMode: [33],
			hair: { Black: 1 },
			addressUser: { JohnDoe: '12345' },
		},
	},
	{
		IT: {
			male: 0,
			female: 1,
			ageRange: '38-38',
			ageMode: [38],
			hair: { Blond: 1 },
			addressUser: { AliceSmith: '67890' },
		},
	},
];

describe('UserService', () => {
	let userService: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserService],
		}).compile();

		userService = module.get<UserService>(UserService);
	});

	it('should be defined', () => {
		expect(userService).toBeDefined();
	});

	it('should calculate the age correctly for a given birth date', () => {
		const birthDate = '1990-01-15';
		const age = userService.calculateAge(birthDate);
		expect(age).toBe(33);
	});

	it('should return the age(s) with the highest count', () => {
		const ageCount1 = { '23': 1, '33': 2 };
		const ageCount2 = { '18': 2, '23': 2 };
		const ageCount3 = { '20': 3, '23': 2, '18': 1 };
		const ageCount4 = { '23': 1, '33': 1, '45': 1, '48': 1 };

		const ageMode1 = userService.calculateAgeMode(ageCount1);
		const ageMode2 = userService.calculateAgeMode(ageCount2);
		const ageMode3 = userService.calculateAgeMode(ageCount3);
		const ageMode4 = userService.calculateAgeMode(ageCount4);

		expect(ageMode1).toEqual([33]);
		expect(ageMode2).toEqual([18, 23]);
		expect(ageMode3).toEqual([20]);
		expect(ageMode4).toEqual([23, 33, 45, 48]);
	});

	it('should transform user data correctly', () => {
		const transformedData = userService.transformData(
			mockUsersApiResponse.data.users as User[],
		);
		expect(transformedData).toEqual(mockTransformedData);
	});

	it('should fetch and transform data from an API', async () => {
		(axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(
			mockUsersApiResponse,
		);
		const result = await userService.getUsers();
		expect(result).toEqual({ department: mockTransformedData });
	});

	afterEach(() => {
		jest.clearAllMocks();
	});
});
