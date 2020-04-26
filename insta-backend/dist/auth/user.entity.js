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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bcrypt = __importStar(require("bcryptjs"));
const post_entity_1 = require("../posts/post.entity");
const comment_entity_1 = require("../posts/comment.entity");
const class_transformer_1 = require("class-transformer");
const reply_entity_1 = require("../posts/reply.entity");
let User = User_1 = class User extends typeorm_1.BaseEntity {
    async validatePassword(password) {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    class_transformer_1.Exclude(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    class_transformer_1.Exclude(),
    __metadata("design:type", String)
], User.prototype, "salt", void 0);
__decorate([
    typeorm_1.OneToMany(type => post_entity_1.Post, post => post.user, { eager: true }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
__decorate([
    typeorm_1.ManyToMany(type => post_entity_1.Post, post => post.likes),
    __metadata("design:type", Array)
], User.prototype, "likedPosts", void 0);
__decorate([
    typeorm_1.OneToMany(type => comment_entity_1.Comment, comment => comment.user),
    __metadata("design:type", Array)
], User.prototype, "comments", void 0);
__decorate([
    typeorm_1.ManyToMany(type => comment_entity_1.Comment, comment => comment.likes),
    typeorm_1.JoinTable(),
    class_transformer_1.Transform((comments) => {
        const transformedComments = comments.map(comment => ({
            id: comment.id,
            contents: comment.contents,
        }));
        return transformedComments;
    }),
    __metadata("design:type", Array)
], User.prototype, "likedComments", void 0);
__decorate([
    typeorm_1.ManyToMany(type => User_1, user => user.following),
    class_transformer_1.Transform((followers) => {
        const transformedFollowers = followers.map(follower => ({
            id: follower.id,
            username: follower.username,
        }));
        return transformedFollowers;
    }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], User.prototype, "followers", void 0);
__decorate([
    typeorm_1.JoinTable(),
    typeorm_1.ManyToMany(type => User_1, user => user.followers),
    class_transformer_1.Transform((followings) => {
        const transformedFollowings = followings.map(following => ({
            id: following.id,
            username: following.username,
        }));
        return transformedFollowings;
    }),
    __metadata("design:type", Array)
], User.prototype, "following", void 0);
__decorate([
    typeorm_1.OneToMany(type => reply_entity_1.Reply, reply => reply.user),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], User.prototype, "replies", void 0);
__decorate([
    typeorm_1.ManyToMany(type => reply_entity_1.Reply, reply => reply.likes),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], User.prototype, "likedReplies", void 0);
__decorate([
    typeorm_1.ManyToMany(type => post_entity_1.Post, post => post.saves),
    class_transformer_1.Exclude(),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], User.prototype, "savedPosts", void 0);
__decorate([
    typeorm_1.ManyToMany(type => post_entity_1.Post, post => post.tags, { eager: true }),
    __metadata("design:type", Array)
], User.prototype, "taggedIn", void 0);
User = User_1 = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(['username'])
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map