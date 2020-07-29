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
exports.Post = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../auth/user.entity");
const photo_entity_1 = require("./photo.entity");
const class_transformer_1 = require("class-transformer");
const comment_entity_1 = require("./comment.entity");
const class_validator_1 = require("class-validator");
const notification_entity_1 = require("../notifications/notification.entity");
let Post = class Post extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Post.prototype, "timeCreated", void 0);
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Post.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Post.prototype, "description", void 0);
__decorate([
    typeorm_1.OneToMany(type => photo_entity_1.Photo, photo => photo.post, {
        eager: true,
    }),
    __metadata("design:type", Array)
], Post.prototype, "photos", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.posts),
    class_transformer_1.Transform((user) => {
        return {
            id: user.id,
            username: user.username,
            profilePhoto: user.profilePhoto,
        };
    }),
    __metadata("design:type", user_entity_1.User)
], Post.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToMany(type => user_entity_1.User, user => user.likedPosts),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Post.prototype, "likes", void 0);
__decorate([
    typeorm_1.OneToMany(type => comment_entity_1.Comment, comment => comment.post),
    __metadata("design:type", Array)
], Post.prototype, "comments", void 0);
__decorate([
    typeorm_1.ManyToMany(type => user_entity_1.User, user => user.savedPosts),
    class_transformer_1.Exclude(),
    __metadata("design:type", Array)
], Post.prototype, "saves", void 0);
__decorate([
    typeorm_1.ManyToMany(type => user_entity_1.User, user => user.taggedIn, { nullable: true }),
    typeorm_1.JoinTable(),
    class_transformer_1.Transform((tags) => {
        const transformedTags = tags.map(tag => ({
            username: tag.username,
            id: tag.id,
        }));
        return transformedTags;
    }),
    __metadata("design:type", Array)
], Post.prototype, "tags", void 0);
__decorate([
    typeorm_1.OneToMany(type => notification_entity_1.Notification, notification => notification.post),
    __metadata("design:type", Array)
], Post.prototype, "notifications", void 0);
Post = __decorate([
    typeorm_1.Entity()
], Post);
exports.Post = Post;
//# sourceMappingURL=post.entity.js.map