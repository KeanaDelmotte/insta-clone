"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsRepository = void 0;
const typeorm_1 = require("typeorm");
const post_entity_1 = require("./post.entity");
const common_1 = require("@nestjs/common");
const comment_entity_1 = require("./comment.entity");
let PostsRepository = class PostsRepository extends typeorm_1.Repository {
    async getAllPosts(filterDto) {
        const { search } = filterDto;
        if (search) {
            const posts = await this.find({
                relations: [
                    'user',
                    'likes',
                    'comments',
                    'comments.replies',
                    'comments.likes',
                    'comments.replies.user',
                ],
                where: {
                    description: typeorm_1.Like(`%${search}%`),
                },
            });
            return posts;
        }
        const posts = await this.find({
            relations: [
                'user',
                'likes',
                'comments',
                'comments.replies',
                'comments.likes',
                'comments.replies.user',
            ],
        });
        return posts;
    }
    async comment(postId, createCommentDto, user) {
        const comment = new comment_entity_1.Comment();
        const post = await this.findOne(postId, {
            relations: ['comments', 'user'],
        });
        if (post) {
            comment.contents = createCommentDto.contents;
            comment.user = user;
            comment.post = post;
        }
        else {
            throw new common_1.NotFoundException('Post does not exist');
        }
        try {
            await comment.save();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Could not post comment');
        }
        return comment;
    }
};
PostsRepository = __decorate([
    typeorm_1.EntityRepository(post_entity_1.Post)
], PostsRepository);
exports.PostsRepository = PostsRepository;
//# sourceMappingURL=posts.repository.js.map