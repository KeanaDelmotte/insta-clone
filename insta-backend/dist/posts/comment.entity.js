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
exports.Comment = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../auth/user.entity");
const post_entity_1 = require("./post.entity");
const class_transformer_1 = require("class-transformer");
const reply_entity_1 = require("./reply.entity");
let Comment = class Comment extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Comment.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Comment.prototype, "contents", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.comments, { eager: true }),
    class_transformer_1.Transform((user) => {
        return {
            id: user.id,
            username: user.username,
            profilePhoto: user.profilePhoto,
        };
    }),
    __metadata("design:type", user_entity_1.User)
], Comment.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToMany(type => user_entity_1.User, user => user.likedComments, { eager: true }),
    class_transformer_1.Transform((users) => {
        const transformedUsers = users.map(user => ({
            id: user.id,
            username: user.username,
            profilePhoto: user.profilePhoto,
        }));
        return transformedUsers;
    }),
    __metadata("design:type", Array)
], Comment.prototype, "likes", void 0);
__decorate([
    typeorm_1.ManyToOne(type => post_entity_1.Post, post => post.comments, {
        eager: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", post_entity_1.Post)
], Comment.prototype, "post", void 0);
__decorate([
    typeorm_1.OneToMany(type => reply_entity_1.Reply, reply => reply.inReplyTo),
    class_transformer_1.Transform((replies) => {
        const transformedReplies = replies.map(reply => ({
            id: reply.id,
            user: reply.user,
            contents: reply.contents,
        }));
        return transformedReplies;
    }),
    __metadata("design:type", Array)
], Comment.prototype, "replies", void 0);
Comment = __decorate([
    typeorm_1.Entity()
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=comment.entity.js.map