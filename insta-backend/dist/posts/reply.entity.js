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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const comment_entity_1 = require("./comment.entity");
const user_entity_1 = require("../auth/user.entity");
const class_transformer_1 = require("class-transformer");
let Reply = class Reply extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Reply.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Reply.prototype, "contents", void 0);
__decorate([
    typeorm_1.ManyToOne(type => comment_entity_1.Comment, comment => comment.replies, { onDelete: 'CASCADE' }),
    typeorm_1.JoinTable(),
    class_transformer_1.Transform((comment) => ({
        id: comment.id,
        contents: comment.contents,
    })),
    __metadata("design:type", comment_entity_1.Comment)
], Reply.prototype, "inReplyTo", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.replies),
    class_transformer_1.Transform((user) => ({
        id: user.id,
        username: user.username,
        profilePhoto: user.profilePhoto,
    })),
    __metadata("design:type", user_entity_1.User)
], Reply.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToMany(type => user_entity_1.User, user => user.likedReplies, { onDelete: 'CASCADE' }),
    class_transformer_1.Transform((user) => ({
        id: user.id,
        username: user.username,
    })),
    __metadata("design:type", Array)
], Reply.prototype, "likes", void 0);
Reply = __decorate([
    typeorm_1.Entity()
], Reply);
exports.Reply = Reply;
//# sourceMappingURL=reply.entity.js.map