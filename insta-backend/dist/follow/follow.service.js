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
exports.FollowService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("../auth/user.repository");
const notifications_service_1 = require("../notifications/notifications.service");
const notification_entity_1 = require("../notifications/notification.entity");
let FollowService = class FollowService {
    constructor(userRepository, notificationService) {
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }
    async followUser(userId, followerId) {
        const user = await this.userRepository.findOne(userId, {
            relations: ['followers'],
        });
        if (!user) {
            throw new common_1.NotFoundException("The user you're trying to follow does not exist");
        }
        const followerUser = await this.userRepository.findOne(followerId, {
            relations: ['following'],
        });
        if (user.id === followerUser.id) {
            throw new common_1.ForbiddenException('You cant follow yourself');
        }
        if (followerUser.following.find(u => u.id === user.id)) {
            throw new common_1.BadRequestException("You're already following this user.");
        }
        const userFollowing = user.followers.find(user => user.id === followerId);
        if (!userFollowing) {
            user.followers = [...user.followers, followerUser];
            try {
                await user.save();
            }
            catch (error) {
                throw new common_1.InternalServerErrorException('Could not save user');
            }
            followerUser.following = [...followerUser.following, user];
            try {
                await followerUser.save();
            }
            catch (error) {
                throw new common_1.InternalServerErrorException('Could not save follower');
            }
        }
        this.notificationService.createNotification(followerUser, user, notification_entity_1.NotificationType.FOLLOWED);
        return followerUser.following;
    }
    async unfollowUser(userId, unfollower) {
        const user = await this.userRepository.findOne(userId, {
            relations: ['followers'],
        });
        user.followers = user.followers.filter(user => user.id !== unfollower.id);
        try {
            await user.save();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Could not unfollow user');
        }
        return user.followers;
    }
    async getAllFollowers(userId) {
        const user = await this.userRepository.findOne(userId, {
            relations: ['followers'],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${userId} does not exist`);
        }
        return user.followers;
    }
    async getAllFollowing(userId) {
        const user = await this.userRepository.findOne(userId, {
            relations: ['following'],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${userId} does not exist`);
        }
        return user.following;
    }
};
FollowService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        notifications_service_1.NotificationsService])
], FollowService);
exports.FollowService = FollowService;
//# sourceMappingURL=follow.service.js.map