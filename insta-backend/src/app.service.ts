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
  ) {}
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
    console.log(`userIds: ${userIds}`);
    while (usersToFollow.length <= 4) {
      console.log(`usersToFollow: ${usersToFollow}`);

      const randomnum = userIds[Math.floor(Math.random() * userIds.length)];
      console.log(`randomnum: ${randomnum}`);

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
          console.log(user.id, userId);
        }
      }),
    );
  }

  async createMockData() {
    const newUsers: SignUpDto[] = [
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

    await Promise.all(
      newlyCreatedUsers.map(user => {
        //upload users profilephotos
        return this.uploadUserProfilePhoto(user);
      }),
    );
    console.log('after userphoto');

    await Promise.all(
      newlyCreatedUsers.map(user => {
        console.log('in follow');
        //have each use follow 4 other random users
        return this.followUsrs(user.id, newlyCreatedUsers);
      }),
    );
    console.log('after follow');

    const hermionePost = await this.postService.createPost(
      {
        description: 'My favourite place in the world',
      },
      newlyCreatedUsers.find(u => u.username === 'hermione'),
      //@ts-ignore
      [{ filename: 'Hermione-post.jpg', path: '/files/Hermione-post.jpg' }],
    );
    console.log('after post');
    const voldemortComment = await this.postService.comment(
      hermionePost.id,
      { contents: 'Good to know' },
      newlyCreatedUsers.find(u => u.username === 'voldie'),
    );
    console.log('after voldie reply');
    const harryReply = await this.postService.replyToComment(
      voldemortComment.id,
      newlyCreatedUsers.find(u => u.username === 'boywholived'),
      { contents: 'Im watching you' },
    );
    console.log('after harry reply');

    await this.postService.likeComment(
      voldemortComment.id,
      newlyCreatedUsers.find(u => u.username === 'dolores'),
    );

    console.log('after voldie like comment');
    await this.postService.likeReply(
      harryReply.id,
      newlyCreatedUsers.find(u => u.username === 'ronweasly'),
    );
    console.log('after ron like reply');

    await this.postService.likePost(
      hermionePost.id,
      newlyCreatedUsers.find(u => u.username === 'mcgonagall'),
    );
    console.log('after  like post');
  }
}
