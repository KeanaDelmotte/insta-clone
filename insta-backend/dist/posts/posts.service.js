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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const posts_repository_1 = require("./posts.repository");
const photo_entity_1 = require("./photo.entity");
const post_entity_1 = require("./post.entity");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("./comment.entity");
const user_repository_1 = require("../auth/user.repository");
const reply_entity_1 = require("./reply.entity");
const common_2 = require("@nestjs/common");
const notifications_service_1 = require("../notifications/notifications.service");
const notification_entity_1 = require("../notifications/notification.entity");
let PostsService = class PostsService {
    constructor(postsRepository, commentRepository, replyRepository, userRepository, notificationService) {
        this.postsRepository = postsRepository;
        this.commentRepository = commentRepository;
        this.replyRepository = replyRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }
    async createPost(createPostDto, user, photos) {
        const reqUser = await this.userRepository.findOne(user.id);
        const { description, tags } = createPostDto;
        const tagged = tags ? JSON.parse(tags) : [];
        if (photos.length < 1 || !description) {
            throw new common_2.BadRequestException('You need to select a photo and include a description to upload');
        }
        const taggedUsers = await Promise.all(tagged.map(async (tag) => {
            const user = await this.userRepository.findOne({ username: tag });
            if (user === undefined) {
                throw new common_1.ForbiddenException(`User with username ${tag} does not exist`);
            }
            return user;
        }));
        if (taggedUsers.find(tag => tag.id === user.id)) {
            throw new common_1.ForbiddenException('You cant tag yourself');
        }
        const post = new post_entity_1.Post();
        post.tags = [...taggedUsers];
        post.description = description;
        post.user = user;
        reqUser.taggedIn = [...reqUser.taggedIn, post];
        const newPhotos = photos.map(photo => {
            const newPhoto = new photo_entity_1.Photo();
            newPhoto.filename = photo.filename;
            newPhoto.url = photo.path;
            newPhoto.post = post;
            return newPhoto;
        });
        post.photos = newPhotos;
        try {
            await post.save();
            await user.save();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Unable to create post');
        }
        try {
            await Promise.all(newPhotos.map(photo => photo.save()));
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('could not save photos');
        }
        if (tagged.length >= 1) {
            await Promise.all(taggedUsers.map(u => {
                this.notificationService.createNotification(user, u, notification_entity_1.NotificationType.TAGGED, post);
            }));
        }
        return post;
    }
    async getAllPostTags(postId) {
        const post = await this.postsRepository.findOne(postId, {
            relations: ['tags'],
        });
        if (!post) {
            throw new common_1.NotFoundException(`Post with id ${postId} does not exist`);
        }
        return post.tags.map(tag => ({ username: tag.username, id: tag.id }));
    }
    async deletePost(postId, reqUser) {
        const post = await this.getPostById(postId);
        if (!post) {
            throw new common_1.NotFoundException(`Post with id ${postId} does not exist`);
        }
        const user = await this.userRepository.findOne(reqUser.id, {
            relations: ['posts'],
        });
        if (post.user.id !== user.id) {
            throw new common_2.UnauthorizedException('You can only delete your own posts');
        }
        await post.remove();
    }
    async getAllPosts(filterDto) {
        return this.postsRepository.getAllPosts(filterDto);
    }
    async getAllRelevantPosts(user) {
        const posts = await this.postsRepository.find({
            relations: [
                'user',
                'user.followers',
                'user.profilePhoto',
                'likes',
                'comments',
                'comments.user',
                'comments.user.profilePhoto',
                'comments.replies',
                'comments.replies.user',
            ],
        });
        const relevantPosts = [];
        posts.forEach(post => {
            if (post.user.followers.find(u => u.id === user.id)) {
                relevantPosts.push(post);
            }
            else if (post.likes.length > 100) {
                relevantPosts.push(post);
            }
            else if (post.user.followers.length > 100) {
                relevantPosts.push(post);
            }
        });
        return relevantPosts;
    }
    async getAllUserPosts(userId) {
        const user = await this.userRepository.findOne(userId, {
            relations: [
                'posts',
                'posts.comments',
                'posts.likes',
                'posts.comments.replies',
                'posts.comments.replies.user',
                'posts.user',
            ],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${userId} does not exist`);
        }
        return user.posts;
    }
    async getPostById(id, relations = [
        'comments',
        'comments.likes',
        'likes',
        'photos',
        'user',
        'saves',
        'tags',
        'user.posts',
    ]) {
        const post = await this.postsRepository.findOne(id, {
            relations: relations,
        });
        if (!post) {
            throw new common_1.NotFoundException(`Post with id ${id} does not exist`);
        }
        return post;
    }
    async likePost(postId, user) {
        const post = await this.getPostById(postId, ['likes', 'user']);
        const userLikedpost = post.likes.find(u => u.id === user.id);
        if (!userLikedpost) {
            post.likes = [...post.likes, user];
        }
        else {
            throw new common_1.ForbiddenException("You can't like a post more than once");
        }
        try {
            await post.save();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Could not like post');
        }
        await this.notificationService.createNotification(user, post.user, notification_entity_1.NotificationType.LIKED_POST, post);
        return post;
    }
    async unlikePost(postId, user) {
        const post = await this.getPostById(postId, ['likes']);
        post.likes = post.likes.filter(like => like.id !== user.id);
        try {
            await post.save();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('could not unlike post');
        }
    }
    async getAllPostLikes(postId) {
        const post = await this.getPostById(postId, ['likes']);
        if (!post) {
            throw new common_1.NotFoundException(`Post with id ${postId} does not exist`);
        }
        return post.likes;
    }
    async savePost(postId, reqUser) {
        const post = await this.getPostById(postId);
        const user = await this.userRepository.findOne(reqUser.id, {
            relations: ['savedPosts'],
        });
        const postSaved = user.savedPosts.find(p => p.id === post.id);
        if (postSaved) {
            throw new common_1.ForbiddenException("You've already saved this post");
        }
        user.savedPosts = [...user.savedPosts, post];
        post.saves = [...post.saves, user];
        try {
            await post.save();
            await user.save();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Could not save post');
        }
        return user.savedPosts;
    }
    async unsavePost(postId, reqUser) {
        const post = await this.postsRepository.findOne(postId);
        if (!post) {
            throw new common_1.NotFoundException(`Post with id ${postId} does not exist`);
        }
        const user = await this.userRepository.findOne(reqUser.id, {
            relations: ['savedPosts'],
        });
        if (!user.savedPosts.find(p => p.id === post.id)) {
            throw new common_1.ForbiddenException(`You dont have any posts with id ${postId} saved`);
        }
        user.savedPosts = user.savedPosts.filter(p => p.id !== post.id);
        try {
            await user.save();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Could not remove post from saved posts');
        }
    }
    async comment(postId, createCommentDto, user) {
        const reqUser = await this.userRepository.findOne(user.id, {
            relations: ['profilePhoto'],
        });
        const comment = await this.postsRepository.comment(postId, createCommentDto, reqUser);
        console.log(`notification thing`, comment.post.user);
        await this.notificationService.createNotification(user, comment.post.user, notification_entity_1.NotificationType.COMMENTED, comment.post, comment.contents);
        return comment;
    }
    async deleteComment(commentId, user) {
        const removingcomment = await this.commentRepository.findOne(commentId, {
            relations: ['user', 'post', 'replies'],
        });
        const commentCreator = removingcomment.user;
        if (user.id !== commentCreator.id) {
            throw new common_1.ForbiddenException(`You cant delete someone else's comment`);
        }
        await removingcomment.remove();
    }
    async getAllComments(postId) {
        const post = await this.getPostById(postId, [
            'comments',
            'comments.replies',
        ]);
        return post.comments;
    }
    async getCommentById(commentId) {
        const comment = await this.commentRepository.findOne(commentId, {
            relations: [
                'replies',
                'likes',
                'user',
                'user.profilePhoto',
                'replies.user',
            ],
        });
        if (!comment) {
            throw new common_1.NotFoundException(`Comment with id ${commentId} does not exist`);
        }
        return comment;
    }
    async likeComment(commentId, reqUser) {
        const user = await this.userRepository.findOne(reqUser.id, {
            relations: ['likedComments'],
        });
        const comment = await this.commentRepository.findOne(commentId, {
            relations: ['likes', 'post', 'post.user'],
        });
        if (!comment) {
            throw new common_1.NotFoundException(`Comment with id ${commentId} does not exist`);
        }
        const userLikedComment = comment.likes.find(u => u.id === reqUser.id);
        if (!userLikedComment) {
            user.likedComments = [...user.likedComments, comment];
            try {
                await user.save();
            }
            catch (error) {
                throw new common_1.InternalServerErrorException('Could not save likes');
            }
            comment.likes = [...comment.likes, user];
        }
        else {
            throw new common_1.ForbiddenException("You can't like a comment more than once");
        }
        try {
            await comment.save();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Could not save like');
        }
        this.notificationService.createNotification(reqUser, comment.user, notification_entity_1.NotificationType.LIKED_COMMENT, comment.post);
        return comment.likes;
    }
    async unlikeComment(commentId, reqUser) {
        const user = await this.userRepository.findOne(reqUser.id, {
            relations: ['likedComments'],
        });
        const comment = await this.commentRepository.findOne(commentId, {
            relations: ['likes'],
        });
        if (!comment) {
            throw new common_1.NotFoundException(`Comment with id ${commentId} does not exist`);
        }
        user.likedComments = user.likedComments.filter(likedcomment => likedcomment.id !== comment.id);
        try {
            await user.save();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Could not save likes');
        }
        comment.likes = comment.likes.filter(commentlike => commentlike.id !== user.id);
        try {
            await comment.save();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Could not save like');
        }
        return comment.likes;
    }
    async replyToComment(commentId, reqUser, createCommentDto) {
        const { contents } = createCommentDto;
        const comment = await this.commentRepository.findOne(commentId, {
            relations: ['replies', 'post', 'post.user'],
        });
        if (!comment) {
            throw new common_1.NotFoundException(`Comment with id ${commentId} does not exist`);
        }
        const user = await this.userRepository.findOne(reqUser.id, {
            relations: ['replies'],
        });
        const reply = new reply_entity_1.Reply();
        reply.user = user;
        reply.contents = contents;
        reply.inReplyTo = comment;
        comment.replies = [...comment.replies, reply];
        user.replies = [...user.replies, reply];
        try {
            await reply.save();
            await comment.save();
            await user.save();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Could not reply to comment');
        }
        this.notificationService.createNotification(reqUser, reply.inReplyTo.user, notification_entity_1.NotificationType.REPLIED_TO_COMMENT, comment.post, reply.contents);
        return reply;
    }
    async getAllCommentReplies(commentId) {
        const comment = await this.getCommentById(commentId);
        if (!comment) {
            throw new common_1.NotFoundException(`Comment with id ${commentId} does not exist`);
        }
        return comment.replies;
    }
    async getReplyById(replyId) {
        const reply = await this.replyRepository.findOne(replyId, { relations: ['likes', 'user',] });
        return reply;
    }
    async deleteReply(replyId, reqUser) {
        const reply = await this.replyRepository.findOne(replyId, {
            relations: ['user'],
        });
        if (!reply) {
            throw new common_1.NotFoundException(`Reply with id ${replyId} does not exist`);
        }
        if (reply.user.id !== reqUser.id) {
            throw new common_2.UnauthorizedException(`You can only delete your own replies`);
        }
        await reply.remove();
    }
    async likeReply(replyId, reqUser) {
        const reply = await this.replyRepository.findOne(replyId, {
            relations: ['likes', 'inReplyTo'],
        });
        if (!reply) {
            throw new common_1.NotFoundException('The reply you are trying to like does not exist');
        }
        const user = await this.userRepository.findOne(reqUser.id, {
            relations: ['likedReplies'],
        });
        const userLikedReply = reply.likes.find(u => u.id === user.id);
        if (!userLikedReply) {
            reply.likes = [...reply.likes, user];
            user.likedReplies = [...user.likedReplies, reply];
        }
        else {
            throw new common_1.ForbiddenException("You can't like a reply more than once");
        }
        try {
            await user.save();
            await reply.save();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Could not like reply');
        }
        this.notificationService.createNotification(reqUser, reply.user, notification_entity_1.NotificationType.LIKED_REPLY, reply.inReplyTo.post, reply.contents);
        return reply.likes;
    }
    async unlikeReply(replyId, reqUser) {
        const reply = await this.replyRepository.findOne(replyId, {
            relations: ['likes'],
        });
        if (!reply.likes.find(user => user.id === reqUser.id)) {
            throw new common_2.BadRequestException(`You havent liked any replys with the id ${replyId}`);
        }
        if (!reply) {
            throw new common_1.NotFoundException('The reply you are trying to unlike does not exist');
        }
        reply.likes = reply.likes.filter(like => like.id !== reqUser.id);
        try {
            await reply.save();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Unable to unlike reply');
        }
    }
};
PostsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(posts_repository_1.PostsRepository)),
    __param(1, typeorm_1.InjectRepository(comment_entity_1.Comment)),
    __param(2, typeorm_1.InjectRepository(reply_entity_1.Reply)),
    __param(3, typeorm_1.InjectRepository(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [posts_repository_1.PostsRepository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        user_repository_1.UserRepository,
        notifications_service_1.NotificationsService])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map