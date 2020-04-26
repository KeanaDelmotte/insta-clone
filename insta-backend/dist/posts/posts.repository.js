"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const post_entity_1 = require("./post.entity");
const common_1 = require("@nestjs/common");
const comment_entity_1 = require("./comment.entity");
let PostsRepository = class PostsRepository extends typeorm_1.Repository {
    async getAllPosts(filterDto) {
        const { search } = filterDto;
        const query = this.createQueryBuilder('post');
        if (search) {
            query.andWhere('(post.description LIKE :search)', {
                search: `%${search}%`,
            });
        }
        try {
            const posts = await query.getMany();
            return posts;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async comment(postId, createCommentDto, user) {
        const comment = new comment_entity_1.Comment();
        const post = await this.findOne(postId, { relations: ['comments'] });
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