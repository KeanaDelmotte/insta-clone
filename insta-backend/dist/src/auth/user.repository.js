"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt = __importStar(require("bcryptjs"));
const common_1 = require("@nestjs/common");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    async signUp(authCredentialsDto) {
        const { username, password } = authCredentialsDto;
        const user = this.create({ username, salt: await bcrypt.genSalt() });
        user.password = await this.hashPassword(password, user.salt);
        try {
            await user.save();
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('Username already exists');
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to create user');
            }
        }
    }
    async validateUserPassword(authcredentialsDto) {
        const { username, password } = authcredentialsDto;
        const user = await this.findOne({ username });
        if (user && (await user.validatePassword(password))) {
            return user.username;
        }
        else {
            return null;
        }
    }
    async hashPassword(password, salt) {
        return bcrypt.hash(password, salt);
    }
    async changePassword(changePasswordDto, reqUser) {
        const { newPassword, oldPassword } = changePasswordDto;
        const user = await this.findOne(reqUser.id);
        const trueUser = await this.validateUserPassword({
            password: oldPassword,
            username: reqUser.username,
        });
        if (trueUser) {
            user.password = await this.hashPassword(newPassword, user.salt);
        }
        else {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        try {
            user.save();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Could not save user');
        }
        return {
            message: 'Succesfully changed password. You will need to sign in again with the new password',
        };
    }
    async changeUsername(changeUsernameDto, reqUser) {
        const { newUsername, password } = changeUsernameDto;
        const user = await this.findOne(reqUser.id);
        const trueUser = await this.validateUserPassword({
            password,
            username: reqUser.username,
        });
        if (!trueUser) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const usernameExists = await this.findOne({ username: newUsername });
        if (usernameExists) {
            if (usernameExists.username === reqUser.username) {
                throw new common_1.BadRequestException('You cant change your username to the same thing as your current username');
            }
        }
        if (usernameExists) {
            throw new common_1.ConflictException('Username already exists');
        }
        else {
            if (trueUser) {
                user.username = newUsername;
            }
            try {
                user.save();
            }
            catch (error) {
                throw new common_1.InternalServerErrorException('Could not change username');
            }
        }
        return {
            message: 'Succesfully changed username. You will need to sign in again with the updated username.',
        };
    }
};
UserRepository = __decorate([
    typeorm_1.EntityRepository(user_entity_1.User)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map