"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("./user.repository");
const jwt_1 = require("@nestjs/jwt");
const posts_repository_1 = require("../posts/posts.repository");
let AuthService = class AuthService {
    constructor(userRepository, jwtService, postsRepository) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.postsRepository = postsRepository;
    }
    async signUp(authcredentialsDto) {
        return this.userRepository.signUp(authcredentialsDto);
    }
    async signIn(authCredentailsDto) {
        const { username } = authCredentailsDto;
        const trueUser = await this.userRepository.validateUserPassword(authCredentailsDto);
        if (!trueUser) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { username };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
    }
    async changePassword(changePasswordDto, reqUser) {
        return this.userRepository.changePassword(changePasswordDto, reqUser);
    }
    async changeUsername(changeUsernameDto, user) {
        return this.userRepository.changeUsername(changeUsernameDto, user);
    }
    async deleteUser(deleteUserDto) {
        const user = await this.userRepository.findOne({
            username: deleteUserDto.username,
        });
        const { username } = deleteUserDto;
        if (user) {
            const trueUser = await this.userRepository.validateUserPassword(deleteUserDto);
            if (trueUser) {
                await this.userRepository.delete({
                    username,
                });
            }
            else {
                throw new common_1.UnauthorizedException('Invalid credentails');
            }
        }
        else {
            throw new common_1.NotFoundException();
        }
    }
    async checkUsernameAvailable(username) {
        const usernameExists = await this.userRepository.findOne({ username });
        if (usernameExists) {
            return { available: false };
        }
        return { available: true };
    }
    async getSavedPosts(reqUser) {
        return reqUser.savedPosts;
    }
    async getUserTaggedPosts(userId) {
        const user = await this.userRepository.findOne(userId, {
            relations: ['taggedIn'],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${userId} does not exist`);
        }
        const posts = await Promise.all(user.taggedIn.map(async (post) => {
            const p = await this.postsRepository.findOne(post.id, {
                relations: ['likes', 'comments', 'photos', 'user', 'tags'],
            });
            return p;
        }));
        return posts;
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_repository_1.UserRepository)),
    __param(2, typeorm_1.InjectRepository(posts_repository_1.PostsRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        jwt_1.JwtService,
        posts_repository_1.PostsRepository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map