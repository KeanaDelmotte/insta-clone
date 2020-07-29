"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const passport_1 = require("@nestjs/passport");
const auth_module_1 = require("../auth/auth.module");
const follow_controller_1 = require("./follow.controller");
const follow_service_1 = require("./follow.service");
const user_repository_1 = require("../auth/user.repository");
const notifications_module_1 = require("../notifications/notifications.module");
let FollowModule = class FollowModule {
};
FollowModule = __decorate([
    common_1.Module({
        imports: [
            user_repository_1.UserRepository,
            passport_1.PassportModule,
            auth_module_1.AuthModule,
            typeorm_1.TypeOrmModule.forFeature([user_repository_1.UserRepository]),
            notifications_module_1.NotificationsModule,
        ],
        controllers: [follow_controller_1.FollowController],
        providers: [follow_service_1.FollowService],
        exports: [follow_service_1.FollowService],
    })
], FollowModule);
exports.FollowModule = FollowModule;
//# sourceMappingURL=follow.module.js.map