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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const posts_service_1 = require("./posts.service");
const platform_express_1 = require("@nestjs/platform-express");
const user_entity_1 = require("../auth/user.entity");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const passport_1 = require("@nestjs/passport");
const create_post_dto_1 = require("./dto/create-post.dto");
const post_utils_1 = require("../utils/post.utils");
const multer_1 = require("multer");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const common_2 = require("@nestjs/common");
const getposts_dto_1 = require("./dto/getposts.dto");
let PostsController = class PostsController {
    constructor(postsService) {
        this.postsService = postsService;
    }
    createPost(createPostDto, photos, user) {
        return this.postsService.createPost(createPostDto, user, photos);
    }
    getAllPostTags(postId) {
        return this.postsService.getAllPostTags(postId);
    }
    deletePost(postId, reqUser) {
        return this.postsService.deletePost(postId, reqUser);
    }
    seeUploadedFiles(image, res) {
        return res.sendFile(image, { root: './files' });
    }
    getAllPosts(filterDto) {
        return this.postsService.getAllPosts(filterDto);
    }
    getAllRelevantPosts(user) {
        return this.postsService.getAllRelevantPosts(user);
    }
    getPostById(id) {
        return this.postsService.getPostById(id);
    }
    getAllUserPosts(userId) {
        return this.postsService.getAllUserPosts(userId);
    }
    likePost(postId, user) {
        return this.postsService.likePost(postId, user);
    }
    unlikePost(postId, user) {
        return this.postsService.unlikePost(postId, user);
    }
    savePost(postId, reqUser) {
        return this.postsService.savePost(postId, reqUser);
    }
    unsavePost(postId, reqUser) {
        return this.postsService.unsavePost(postId, reqUser);
    }
    getAllPostLikes(postId) {
        return this.postsService.getAllPostLikes(postId);
    }
    comment(postId, createCommentDto, user) {
        return this.postsService.comment(postId, createCommentDto, user);
    }
    deleteComment(commentId, user) {
        return this.postsService.deleteComment(commentId, user);
    }
    getAllComments(postId) {
        return this.postsService.getAllComments(postId);
    }
    getCommentById(commentId) {
        return this.postsService.getCommentById(commentId);
    }
    likeComment(commentId, reqUser) {
        return this.postsService.likeComment(commentId, reqUser);
    }
    unlikeComment(commentId, reqUser) {
        return this.postsService.unlikeComment(commentId, reqUser);
    }
    replyToComment(commentId, reqUser, createCommentDto) {
        return this.postsService.replyToComment(commentId, reqUser, createCommentDto);
    }
    getAllCommentReplies(commentId) {
        return this.postsService.getAllCommentReplies(commentId);
    }
    getReplyById(replyId) {
        return this.postsService.getReplyById(replyId);
    }
    likeReply(replyId, reqUser) {
        return this.postsService.likeReply(replyId, reqUser);
    }
    unlikeReply(replyId, reqUser) {
        return this.postsService.unlikeReply(replyId, reqUser);
    }
    deleteReply(replyId, reqUser) {
        return this.postsService.deleteReply(replyId, reqUser);
    }
};
__decorate([
    common_1.Post('/upload'),
    common_1.UseGuards(passport_1.AuthGuard()),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor('photos', 10, {
        storage: multer_1.diskStorage({
            destination: './files',
            filename: post_utils_1.customFileName,
        }),
        fileFilter: post_utils_1.imageFileFilter,
    })),
    __param(0, common_1.Body(common_2.ValidationPipe)),
    __param(1, common_1.UploadedFiles()),
    __param(2, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto, Array, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "createPost", null);
__decorate([
    common_1.Get(':postId/tags'),
    __param(0, common_1.Param('postId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getAllPostTags", null);
__decorate([
    common_1.Delete(':postId/delete'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('postId', common_1.ParseIntPipe)),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "deletePost", null);
__decorate([
    common_1.Get('image/:filename'),
    __param(0, common_1.Param('filename')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "seeUploadedFiles", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Query(common_2.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getposts_dto_1.GetPostDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getAllPosts", null);
__decorate([
    common_1.Get('/relevant'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getAllRelevantPosts", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getPostById", null);
__decorate([
    common_1.Get('user/:userId/posts'),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getAllUserPosts", null);
__decorate([
    common_1.Patch(':postId/like'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('postId', common_1.ParseIntPipe)),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "likePost", null);
__decorate([
    common_1.Patch(':postId/unlike'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('postId', common_1.ParseIntPipe)),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "unlikePost", null);
__decorate([
    common_1.Post(':postId/save'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('postId', common_1.ParseIntPipe)),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "savePost", null);
__decorate([
    common_1.Delete(':postId/unsave'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('postId', common_1.ParseIntPipe)),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "unsavePost", null);
__decorate([
    common_1.Get(':postId/likes'),
    __param(0, common_1.Param('postId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getAllPostLikes", null);
__decorate([
    common_1.Post('/:postId/comment'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('postId', common_1.ParseIntPipe)),
    __param(1, common_1.Body(common_2.ValidationPipe)),
    __param(2, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_comment_dto_1.CreateCommentDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "comment", null);
__decorate([
    common_1.Delete('comments/:commentId/delete'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('commentId', common_1.ParseIntPipe)),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "deleteComment", null);
__decorate([
    common_1.Get(':postId/comments'),
    __param(0, common_1.Param('postId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getAllComments", null);
__decorate([
    common_1.Get('comments/:commentId'),
    __param(0, common_1.Param('commentId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getCommentById", null);
__decorate([
    common_1.Post('comments/:commentId/like'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('commentId', common_1.ParseIntPipe)),
    __param(1, get_user_decorator_1.GetUser(common_2.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "likeComment", null);
__decorate([
    common_1.Post('comments/:commentId/unlike'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('commentId', common_1.ParseIntPipe)),
    __param(1, get_user_decorator_1.GetUser(common_2.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "unlikeComment", null);
__decorate([
    common_1.Post('comments/:commentId/reply'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('commentId', common_1.ParseIntPipe)),
    __param(1, get_user_decorator_1.GetUser(common_2.ValidationPipe)),
    __param(2, common_1.Body(common_2.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User,
        create_comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "replyToComment", null);
__decorate([
    common_1.Get('comments/:commentId/replies'),
    __param(0, common_1.Param('commentId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getAllCommentReplies", null);
__decorate([
    common_1.Get('comments/replies/:replyId'),
    __param(0, common_1.Param('replyId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getReplyById", null);
__decorate([
    common_1.Post('comments/replies/:replyId/like'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('replyId', common_1.ParseIntPipe)),
    __param(1, get_user_decorator_1.GetUser(common_2.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "likeReply", null);
__decorate([
    common_1.Post('comments/replies/:replyId/unlike'),
    common_1.UseGuards(passport_1.AuthGuard()),
    common_1.HttpCode(common_1.HttpStatus.OK),
    __param(0, common_1.Param('replyId', common_1.ParseIntPipe)),
    __param(1, get_user_decorator_1.GetUser(common_2.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "unlikeReply", null);
__decorate([
    common_1.Delete('comments/replies/:replyId/delete'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('replyId', common_1.ParseIntPipe)),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "deleteReply", null);
PostsController = __decorate([
    common_1.Controller('posts'),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsController);
exports.PostsController = PostsController;
//# sourceMappingURL=posts.controller.js.map