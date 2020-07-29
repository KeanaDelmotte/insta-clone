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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth/auth.service");
const follow_service_1 = require("./follow/follow.service");
const posts_service_1 = require("./posts/posts.service");
let AppService = class AppService {
    constructor(authService, followService, postService) {
        this.authService = authService;
        this.followService = followService;
        this.postService = postService;
    }
    getHello() {
        return 'Hello World!';
    }
    async createNewUsers(userInfos) {
        const newCreatedUsers = await Promise.all(userInfos.map(async (user) => {
            return await this.authService.signUp(user);
        }));
        return newCreatedUsers;
    }
    async uploadUserProfilePhoto(user) {
        await this.authService.updateProfilePhoto(user, { filename: `${user.username}.jpg`, path: `/files/${user.username}.jpg` });
    }
    async followUsrs(userId, usersList) {
        const userIds = usersList.filter(u => u.id !== userId).map(u => u.id);
        const usersToFollow = [];
        console.log(`userIds: ${userIds}`);
        while (usersToFollow.length <= 4) {
            console.log(`usersToFollow: ${usersToFollow}`);
            const randomnum = userIds[Math.floor(Math.random() * userIds.length)];
            console.log(`randomnum: ${randomnum}`);
            if (usersToFollow.length >= 1) {
                if (!usersToFollow.find(id => id === randomnum)) {
                    usersToFollow.push(randomnum);
                }
            }
            else {
                usersToFollow.push(randomnum);
            }
        }
        await Promise.all(usersToFollow.map(async (user) => {
            try {
                const followResp = await this.followService.followUser(user.id, userId);
                return followResp;
            }
            catch (er) {
                console.log(user.id, userId);
            }
        }));
    }
    async createMockData() {
        const newUsers = [
            { username: 'boywholived', password: 'Harry1234', name: 'Harry Potter' },
            {
                username: 'ronweasly',
                password: 'Ron1234',
            },
            {
                username: 'hermione',
                password: 'Alohomora1234',
                name: 'Hermione Granger',
            },
            { username: 'severus', password: 'Severus1234', name: 'Severus Snape' },
            { username: 'thedumblingdoor', password: 'Dumbledoor1234' },
            { username: 'voldie', password: 'Voldemort1234', name: 'Tom Riddle' },
            { username: 'hagger', password: 'Hagrid1234', name: 'Rubeus Hagrid' },
            {
                username: 'dolores',
                password: 'dolores1234',
                name: 'Dolorus Umbridge',
            },
            { username: 'mcgonagall', password: 'minerva1234' },
        ];
        const newlyCreatedUsers = await this.createNewUsers(newUsers);
        await Promise.all(newlyCreatedUsers.map(user => {
            return this.uploadUserProfilePhoto(user);
        }));
        console.log('after userphoto');
        await Promise.all(newlyCreatedUsers.map(user => {
            console.log('in follow');
            return this.followUsrs(user.id, newlyCreatedUsers);
        }));
        console.log('after follow');
        const hermionePost = await this.postService.createPost({
            description: 'My favourite place in the world',
        }, newlyCreatedUsers.find(u => u.username === 'hermione'), [{ filename: 'Hermione-post.jpg', path: '/files/Hermione-post.jpg' }]);
        console.log('after post');
        const voldemortComment = await this.postService.comment(hermionePost.id, { contents: 'Good to know' }, newlyCreatedUsers.find(u => u.username === 'voldie'));
        console.log('after voldie reply');
        const harryReply = await this.postService.replyToComment(voldemortComment.id, newlyCreatedUsers.find(u => u.username === 'boywholived'), { contents: 'Im watching you' });
        console.log('after harry reply');
        await this.postService.likeComment(voldemortComment.id, newlyCreatedUsers.find(u => u.username === 'dolores'));
        console.log('after voldie like comment');
        await this.postService.likeReply(harryReply.id, newlyCreatedUsers.find(u => u.username === 'ronweasly'));
        console.log('after ron like reply');
        await this.postService.likePost(hermionePost.id, newlyCreatedUsers.find(u => u.username === 'mcgonagall'));
        console.log('after  like post');
    }
};
AppService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        follow_service_1.FollowService,
        posts_service_1.PostsService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map