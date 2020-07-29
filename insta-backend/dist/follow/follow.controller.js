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
exports.FollowController = void 0;
const common_1 = require("@nestjs/common");
const follow_service_1 = require("./follow.service");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const user_entity_1 = require("../auth/user.entity");
const passport_1 = require("@nestjs/passport");
let FollowController = class FollowController {
    constructor(followService) {
        this.followService = followService;
    }
    followUser(userId, follower) {
        const followerId = follower.id;
        return this.followService.followUser(userId, followerId);
    }
    getAllFollowers(userId) {
        return this.followService.getAllFollowers(userId);
    }
    getAllFollowing(userId) {
        return this.followService.getAllFollowing(userId);
    }
    unfollowUser(userId, unfollower) {
        return this.followService.unfollowUser(userId, unfollower);
    }
};
__decorate([
    common_1.Post(':userId'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('userId')),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "followUser", null);
__decorate([
    common_1.Get(':userId/followers'),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "getAllFollowers", null);
__decorate([
    common_1.Get(':userId/following'),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "getAllFollowing", null);
__decorate([
    common_1.Patch(':userId/unfollow'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('userId')),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "unfollowUser", null);
FollowController = __decorate([
    common_1.Controller('follow'),
    common_1.UseGuards(passport_1.AuthGuard()),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [follow_service_1.FollowService])
], FollowController);
exports.FollowController = FollowController;
//# sourceMappingURL=follow.controller.js.map