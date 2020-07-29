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
        while (usersToFollow.length <= 4) {
            const randomnum = userIds[Math.floor(Math.random() * userIds.length)];
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
            }
        }));
    }
    async createMockData() {
        const newUsers = [
            { username: 'carleyfoodnetwork', password: 'Carley1234', name: 'Carley Cresswell' },
            {
                username: 'laila',
                password: 'Laila1234',
            },
            {
                username: 'pcgames12',
                password: 'David1234',
                name: 'David Snow',
            },
            { username: 'memes', password: 'Memes1234', },
            { username: 'adorablecats', password: 'Adorablecats1234' },
            { username: 'yogamaser', password: 'Yogamaster1234', name: 'Clyde Ortiz' },
            {
                username: 'adventuremethis', password: 'Adventuremethis', name: 'Freja Luna'
            },
            {
                username: 'artlife',
                password: 'Artlife1234',
                name: 'Deacon Pennington',
            },
            { username: 'richkidrich', password: 'Richkidrich1234', name: "Richard  Peters" },
        ];
        const newlyCreatedUsers = await this.createNewUsers(newUsers);
        await Promise.all(newlyCreatedUsers.map(user => {
            return this.uploadUserProfilePhoto(user);
        }));
        await Promise.all(newlyCreatedUsers.map(user => {
            return this.followUsrs(user.id, newlyCreatedUsers);
        }));
        const hermionePost = await this.postService.createPost({
            description: 'My favourite place in the world',
        }, newlyCreatedUsers.find(u => u.username === 'hermione'), [{ filename: 'Hermione-post.jpg', path: '/files/Hermione-post.jpg' }]);
        const voldemortComment = await this.postService.comment(hermionePost.id, { contents: 'Good to know' }, newlyCreatedUsers.find(u => u.username === 'voldie'));
        const harryReply = await this.postService.replyToComment(voldemortComment.id, newlyCreatedUsers.find(u => u.username === 'boywholived'), { contents: 'Im watching you' });
        await this.postService.likeComment(voldemortComment.id, newlyCreatedUsers.find(u => u.username === 'dolores'));
        await this.postService.likeReply(harryReply.id, newlyCreatedUsers.find(u => u.username === 'ronweasly'));
        await this.postService.likePost(hermionePost.id, newlyCreatedUsers.find(u => u.username === 'mcgonagall'));
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