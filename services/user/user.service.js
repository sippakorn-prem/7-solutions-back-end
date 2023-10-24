"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const util_1 = require("util");
let UserService = UserService_1 = class UserService {
    constructor() {
        this.logger = new common_1.Logger(UserService_1.name);
    }
    async getUsers() {
        try {
            const { data } = await axios_1.default.get('https://dummyjson.com/users?limit=100');
            const users = data.users;
            const transformData = this.transformData(users);
            return { department: transformData };
        }
        catch (error) {
            this.logger.error('Error fetching data:', error);
            throw error;
        }
    }
    transformData(users) {
        const [departments, departmentAgeCounts] = users.reduce((transformed, user) => {
            try {
                const [transformedData, ageCounts] = transformed;
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
                if (!ageCounts[departmentKey])
                    ageCounts[departmentKey] = {};
                const department = transformedData[departmentKey];
                const ageCountsData = ageCounts[departmentKey];
                if (user.gender === 'male') {
                    department.male++;
                }
                else if (user.gender === 'female') {
                    department.female++;
                }
                const hairColor = user.hair.color;
                if (!department?.hair?.[hairColor]) {
                    department.hair[hairColor] = 1;
                }
                else {
                    department.hair[hairColor]++;
                }
                const userAge = this.calculateAge(user.birthDate);
                const currentAgeRange = department.ageRange;
                if (!currentAgeRange) {
                    department.ageRange = `${userAge}-${userAge}`;
                }
                else {
                    const [minAge, maxAge] = currentAgeRange.split('-').map(Number);
                    if (userAge < minAge) {
                        department.ageRange = `${userAge}-${maxAge}`;
                    }
                    else if (userAge > maxAge) {
                        department.ageRange = `${minAge}-${userAge}`;
                    }
                }
                if (!ageCountsData[userAge]) {
                    ageCountsData[userAge] = 1;
                }
                else {
                    ageCountsData[userAge]++;
                }
                const fullName = `${user.firstName}${user.lastName}`;
                const postalCode = user.address.postalCode;
                department.addressUser[fullName] = postalCode;
                return [transformedData, ageCounts];
            }
            catch (error) {
                this.logger.error((0, util_1.inspect)(error, { colors: true, compact: false }));
            }
        }, [{}, {}]);
        return Object.entries(departments).map(([key, value]) => {
            return {
                [key]: { ...value, ageMode: this.calculateAgeMode(departmentAgeCounts[key]) },
            };
        });
    }
    calculateAge(birthDate) {
        const birthYear = new Date(birthDate).getFullYear();
        const currentYear = new Date().getFullYear();
        return currentYear - birthYear;
    }
    calculateAgeMode(ageCount) {
        let maxCount = 0;
        let ageMode = [];
        for (const age in ageCount) {
            const count = ageCount[age];
            if (count > maxCount) {
                maxCount = count;
                ageMode = [parseInt(age)];
            }
            else if (count === maxCount) {
                ageMode.push(parseInt(age));
            }
        }
        return ageMode;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=user.service.js.map