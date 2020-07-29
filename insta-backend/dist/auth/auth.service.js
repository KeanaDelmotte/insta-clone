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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("./user.repository");
const jwt_1 = require("@nestjs/jwt");
const posts_repository_1 = require("../posts/posts.repository");
const profilePhoto_entity_1 = require("./profilePhoto.entity");
let AuthService = class AuthService {
    constructor(userRepository, jwtService, postsRepository) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.postsRepository = postsRepository;
    }
    async signUp(signUpDto, profilePhoto) {
        return this.userRepository.signUp(signUpDto, profilePhoto);
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
    async updateProfilePhoto(reqUser, photo) {
        const user = await this.userRepository.findOne(reqUser.id, {
            relations: ['profilePhoto'],
        });
        const userPhoto = new profilePhoto_entity_1.ProfilePhoto();
        userPhoto.filename = photo.filename;
        userPhoto.url = photo.path;
        await userPhoto.save();
        user.profilePhoto = userPhoto;
        await user.save();
    }
    async getAllUsers(reqUser) {
        const users = await this.userRepository.find({
            relations: ['profilePhoto', 'followers', 'following'],
        });
        return users.filter(user => user.id !== reqUser.id);
    }
    async getAllSuggestedUsers(reqUser) {
        const ReqUser = await this.userRepository.findOne(reqUser.id, {
            relations: ['following', 'followers'],
        });
        let users = await this.getAllUsers(reqUser);
        users = users.filter(u => !ReqUser.following.find(user => user.id === u.id));
        console.log(ReqUser.following);
        let suggestedUsers = [];
        if (users) {
            users.forEach(user => {
                if (user.following.find(u => u.id === reqUser.id)) {
                    suggestedUsers.push({
                        user,
                        suggestion: { priority: 1, reason: 'Follows you' },
                    });
                }
                user.following.forEach(following => {
                    if (ReqUser.following.find(user => user.id === following.id)) {
                        const UserAlreadyAdded = suggestedUsers.find(sU => sU.user.id === user.id);
                        if (UserAlreadyAdded) {
                            if (UserAlreadyAdded.suggestion.priority >= 2) {
                                suggestedUsers = suggestedUsers.filter(sU => sU.user.id === UserAlreadyAdded.user.id);
                                suggestedUsers.push({
                                    user: user,
                                    suggestion: {
                                        priority: 2,
                                        reason: `Follows ${following.username}`,
                                    },
                                });
                            }
                        }
                        else {
                            suggestedUsers.push({
                                user: user,
                                suggestion: {
                                    priority: 2,
                                    reason: `Follows ${following.username}`,
                                },
                            });
                        }
                    }
                });
                ReqUser.followers.forEach(follower => {
                    if (user.followers.find(u => u.id === follower.id)) {
                        const UserAlreadyAdded = suggestedUsers.find(sU => sU.user.id === user.id);
                        if (UserAlreadyAdded) {
                            if (UserAlreadyAdded.suggestion.priority >= 3) {
                                suggestedUsers = suggestedUsers.filter(sU => sU.user.id === UserAlreadyAdded.user.id);
                                suggestedUsers.push({
                                    user: user,
                                    suggestion: {
                                        priority: 3,
                                        reason: `Followed by ${follower.username}`,
                                    },
                                });
                            }
                        }
                        else {
                            suggestedUsers.push({
                                user: user,
                                suggestion: {
                                    priority: 3,
                                    reason: `Followed by ${follower.username}`,
                                },
                            });
                        }
                    }
                });
                const today = new Date();
                const yearJoined = user.dateJoined.getFullYear();
                const monthJoined = user.dateJoined.getMonth();
                const userAlreadyAdded = suggestedUsers.find(u => u.user.id === user.id);
                if (today.getFullYear() === yearJoined &&
                    today.getMonth() === monthJoined) {
                    if (userAlreadyAdded) {
                        if (userAlreadyAdded.suggestion.priority >= 4) {
                            suggestedUsers = suggestedUsers.filter(sU => sU.user.id === userAlreadyAdded.user.id);
                            suggestedUsers.push({
                                user: user,
                                suggestion: {
                                    priority: 4,
                                    reason: `New to Instagram`,
                                },
                            });
                        }
                    }
                    else {
                        suggestedUsers.push({
                            user: user,
                            suggestion: {
                                priority: 4,
                                reason: `New to Instagram`,
                            },
                        });
                    }
                }
            });
        }
        return suggestedUsers;
    }
    async getUserByUsername(username) {
        const user = await this.userRepository.findOne({ username }, {
            relations: [
                'followers',
                'followers.profilePhoto',
                'following',
                'posts',
                'profilePhoto',
                'notifications',
                'savedPosts',
                'taggedIn',
                'likedPosts',
                'likedComments',
            ],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with username ${username} does not exist`);
        }
        return user;
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
        const user = await this.userRepository.findOne(reqUser.id, {
            relations: [
                'savedPosts',
                'savedPosts.likes',
                'savedPosts.user',
                'savedPosts.comments',
                'savedPosts.comments.replies',
                'savedPosts.comments.replies.user',
                'savedPosts.saves',
            ],
        });
        return user.savedPosts;
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
    async getNotifications(reqUser) {
        const user = await this.userRepository.findOne(reqUser.id, {
            relations: [
                'notifications',
                'notifications.initiator',
                'notifications.post',
            ],
        });
        return user.notifications;
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