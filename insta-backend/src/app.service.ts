import { Injectable } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { User } from './auth/user.entity';
import { SignUpDto } from './auth/dto/signUpDto.dto';
import { FollowService } from './follow/follow.service';
import { PostsService } from './posts/posts.service';

@Injectable()
export class AppService {
  constructor(
    private authService: AuthService,
    private followService: FollowService,
    private postService: PostsService,
  ) { }
  getHello(): string {
    return 'Hello World!';
  }
  async createNewUsers(userInfos: SignUpDto[]) {
    const newCreatedUsers: User[] = await Promise.all(
      userInfos.map(async user => {
        return await this.authService.signUp(user);
      }),
    );
    return newCreatedUsers;
  }

  async uploadUserProfilePhoto(user: User) {
    await this.authService.updateProfilePhoto(
      user,
      //@ts-ignore
      { filename: `${user.username}.jpg`, path: `/files/${user.username}.jpg` },
    );
  }
  async followUsrs(userId: number, usersList: User[]) {
    const userIds = usersList.filter(u => u.id !== userId).map(u => u.id); // creates a list of userIds that are not the followeruser's id

    const usersToFollow = [];
    while (usersToFollow.length <= 4) {

      const randomnum = userIds[Math.floor(Math.random() * userIds.length)];

      if (usersToFollow.length >= 1) {
        if (!usersToFollow.find(id => id === randomnum)) {
          usersToFollow.push(randomnum);
        }
      } else {
        usersToFollow.push(randomnum);
      }
    }

    await Promise.all(
      usersToFollow.map(async user => {
        try {
          const followResp = await this.followService.followUser(
            user.id,
            userId,
          );
          return followResp;
        } catch (er) {
        }
      }),
    );
  }

  async createMockData() {
    const newUsers: SignUpDto[] = [
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

    await Promise.all(
      newlyCreatedUsers.map(user => {
        //upload users profilephotos
        return this.uploadUserProfilePhoto(user);
      }),
    );

    await Promise.all(
      newlyCreatedUsers.map(user => {
        //have each use follow 4 other random users
        return this.followUsrs(user.id, newlyCreatedUsers);
      }),
    );

    const hermionePost = await this.postService.createPost(
      {
        description: 'My favourite place in the world',
      },
      newlyCreatedUsers.find(u => u.username === 'hermione'),
      //@ts-ignore
      [{ filename: 'Hermione-post.jpg', path: '/files/Hermione-post.jpg' }],
    );
    const voldemortComment = await this.postService.comment(
      hermionePost.id,
      { contents: 'Good to know' },
      newlyCreatedUsers.find(u => u.username === 'voldie'),
    );
    const harryReply = await this.postService.replyToComment(
      voldemortComment.id,
      newlyCreatedUsers.find(u => u.username === 'boywholived'),
      { contents: 'Im watching you' },
    );

    await this.postService.likeComment(
      voldemortComment.id,
      newlyCreatedUsers.find(u => u.username === 'dolores'),
    );

    await this.postService.likeReply(
      harryReply.id,
      newlyCreatedUsers.find(u => u.username === 'ronweasly'),
    );

    await this.postService.likePost(
      hermionePost.id,
      newlyCreatedUsers.find(u => u.username === 'mcgonagall'),
    );
  }
}
