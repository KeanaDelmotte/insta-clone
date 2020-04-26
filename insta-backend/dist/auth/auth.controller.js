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
const auth_service_1 = require("./auth.service");
const auth_credentails_dto_1 = require("./dto/auth-credentails.dto");
const change_password_dto_1 = require("./dto/change-password.dto");
const get_user_decorator_1 = require("./get-user.decorator");
const user_entity_1 = require("./user.entity");
const passport_1 = require("@nestjs/passport");
const change_username_dto_1 = require("./dto/change-username.dto");
const delete_user_dto_1 = require("./dto/delete-user.dto");
const common_2 = require("@nestjs/common");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    signUp(authCredentialsDto) {
        return this.authService.signUp(authCredentialsDto);
    }
    signIn(authCredentialsDto) {
        return this.authService.signIn(authCredentialsDto);
    }
    changePassword(changePasswordDto, reqUser) {
        return this.authService.changePassword(changePasswordDto, reqUser);
    }
    changeUsername(changeUsernameDto, user) {
        return this.authService.changeUsername(changeUsernameDto, user);
    }
    delteUser(deleteUserDto) {
        return this.authService.deleteUser(deleteUserDto);
    }
    checkUsernameAvailable(username) {
        return this.authService.checkUsernameAvailable(username);
    }
    getSavedPosts(reqUser) {
        return this.authService.getSavedPosts(reqUser);
    }
    getUserTaggedPosts(userId) {
        return this.authService.getUserTaggedPosts(userId);
    }
};
__decorate([
    common_1.Post('/signup'),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_credentails_dto_1.AuthCredentialsDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    common_1.Post('/signin'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_credentails_dto_1.AuthCredentialsDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    common_1.Patch('/update/password'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_password_dto_1.ChangePasswordDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    common_1.Patch('/update/username'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_username_dto_1.ChangeUsernameDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changeUsername", null);
__decorate([
    common_1.Delete('user/delete'),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_user_dto_1.DeleteUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "delteUser", null);
__decorate([
    common_1.Get('username-available/:username'),
    __param(0, common_2.Param('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkUsernameAvailable", null);
__decorate([
    common_1.Get('/savedposts'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getSavedPosts", null);
__decorate([
    common_1.Get(':userId/taggedposts'),
    __param(0, common_2.Param('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getUserTaggedPosts", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map