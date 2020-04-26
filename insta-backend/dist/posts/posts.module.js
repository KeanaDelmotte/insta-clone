"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const posts_controller_1 = require("./posts.controller");
const posts_service_1 = require("./posts.service");
const typeorm_1 = require("@nestjs/typeorm");
const posts_repository_1 = require("./posts.repository");
const passport_1 = require("@nestjs/passport");
const auth_module_1 = require("../auth/auth.module");
const platform_express_1 = require("@nestjs/platform-express");
const comment_entity_1 = require("./comment.entity");
const user_repository_1 = require("../auth/user.repository");
const reply_entity_1 = require("./reply.entity");
let PostsModule = class PostsModule {
};
PostsModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([posts_repository_1.PostsRepository, comment_entity_1.Comment, user_repository_1.UserRepository, reply_entity_1.Reply]),
            passport_1.PassportModule,
            auth_module_1.AuthModule,
            platform_express_1.MulterModule.register({ dest: './files' }),
        ],
        controllers: [posts_controller_1.PostsController],
        providers: [posts_service_1.PostsService],
    })
], PostsModule);
exports.PostsModule = PostsModule;
//# sourceMappingURL=posts.module.js.map