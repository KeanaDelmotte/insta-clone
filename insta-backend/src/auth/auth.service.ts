import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentails.dto';
import { JwtPayload } from './jwtpayload.interface';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from './dto/change-password.dto';
import { User } from './user.entity';
import { ChangeUsernameDto } from './dto/change-username.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import * as request from 'supertest';
import { PostsRepository } from '../posts/posts.repository';
import { ProfilePhoto } from './profilePhoto.entity';
import { PhotoResponseDto } from '../posts/dto/photo-response.dto';
import { ChangeProfilePhotoDto } from './dto/changephoto.dto';
import { SuggestedUserDto } from '../posts/dto/suggestedUser.dto';
import { fips } from 'crypto';
import { Reply } from '../posts/reply.entity';
import { SignUpDto } from './dto/signUpDto.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,

    @InjectRepository(PostsRepository)
    private postsRepository: PostsRepository,
  ) {}

  async signUp(
    signUpDto: SignUpDto,
    profilePhoto?: PhotoResponseDto,
  ): Promise<User> {
    return this.userRepository.signUp(signUpDto, profilePhoto);
  }

  async signIn(
    authCredentailsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username } = authCredentailsDto;
    const trueUser = await this.userRepository.validateUserPassword(
      authCredentailsDto,
    );

    if (!trueUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }

  async updateProfilePhoto(reqUser: User, photo: PhotoResponseDto) {
    const user = await this.userRepository.findOne(reqUser.id, {
      relations: ['profilePhoto'],
    });

    // if (user.profilePhoto) {
    //   try {
    //     await user.profilePhoto.remove();
    //     await user.save();
    //   } catch (error) {
    //     console.log(error);
    //     throw new InternalServerErrorException(
    //       'Could not update profile photo',
    //     );
    //   }
    // }

    const userPhoto = new ProfilePhoto();

    userPhoto.filename = photo.filename;

    userPhoto.url = photo.path;

    await userPhoto.save();

    user.profilePhoto = userPhoto;

    await user.save();
  }

  async getAllUsers(reqUser: User) {
    const users = await this.userRepository.find({
      relations: ['profilePhoto', 'followers', 'following'],
    });
    return users.filter(user => user.id !== reqUser.id);
  }
  async getAllSuggestedUsers(reqUser: User) {
    const ReqUser = await this.userRepository.findOne(reqUser.id, {
      relations: ['following', 'followers'],
    });
    let users = await this.getAllUsers(reqUser);
    //remove everyone user is already following
    users = users.filter(
      u => !ReqUser.following.find(user => user.id === u.id),
    );
    console.log(ReqUser.following);
    let suggestedUsers: SuggestedUserDto[] = [];

    // make reason for suggestion priority and string and only show highest priorty
    if (users) {
      //Loop through users that that follow you and add them to suggestedUsers
      users.forEach(user => {
        // Loop through users
        if (user.following.find(u => u.id === reqUser.id)) {
          // Add users that follow you to suggetedUsers
          suggestedUsers.push({
            user,
            suggestion: { priority: 1, reason: 'Follows you' },
          });
        }
        //Add users that follow someone the reqUser is following
        user.following.forEach(following => {
          // loop through all the users thw user is following
          if (ReqUser.following.find(user => user.id === following.id)) {
            // check if the user the user is following is also followed by the requser
            // console.log(following);
            const UserAlreadyAdded = suggestedUsers.find(
              sU => sU.user.id === user.id,
            ); //check if the user i am trying to add has already been added to the array
            if (UserAlreadyAdded) {
              //CCheck if the user thats been added's priority is more important than the user i am trying to add
              if (UserAlreadyAdded.suggestion.priority >= 2) {
                suggestedUsers = suggestedUsers.filter(
                  sU => sU.user.id === UserAlreadyAdded.user.id,
                ); //Remove the less important duplicate user
                suggestedUsers.push({
                  user: user,
                  suggestion: {
                    priority: 2,
                    reason: `Follows ${following.username}`,
                  },
                });
              }
            } else {
              suggestedUsers.push({
                user: user,
                suggestion: {
                  priority: 2,
                  reason: `Follows ${following.username}`,
                },
              });
            }
          }
          //loop through users the users are following
        });

        //Add users that are followed by someone the reqUser follows
        ReqUser.followers.forEach(follower => {
          //loop through all the users the reqUser followes
          if (user.followers.find(u => u.id === follower.id)) {
            //if the user that follows the user is also followed by the reqUser

            const UserAlreadyAdded = suggestedUsers.find(
              sU => sU.user.id === user.id,
            ); //check if the user i am trying to add has already been added to the array
            if (UserAlreadyAdded) {
              //CCheck if the user thats been added's priority is more important than the user i am trying to add
              if (UserAlreadyAdded.suggestion.priority >= 3) {
                suggestedUsers = suggestedUsers.filter(
                  sU => sU.user.id === UserAlreadyAdded.user.id,
                ); //Remove the less important duplicate user
                suggestedUsers.push({
                  user: user,
                  suggestion: {
                    priority: 3,
                    reason: `Followed by ${follower.username}`,
                  },
                });
              }
            } else {
              suggestedUsers.push({
                user: user,
                suggestion: {
                  priority: 3,
                  reason: `Followed by ${follower.username}`,
                },
              });
            }
          }
        });

        const today = new Date();
        const yearJoined = user.dateJoined.getFullYear();
        const monthJoined = user.dateJoined.getMonth();
        const userAlreadyAdded = suggestedUsers.find(
          u => u.user.id === user.id,
        );
        if (
          //if user new to instagram and joined less tahn a month ago
          today.getFullYear() === yearJoined &&
          today.getMonth() === monthJoined
        ) {
          if (userAlreadyAdded) {
            if (userAlreadyAdded.suggestion.priority >= 4) {
              suggestedUsers = suggestedUsers.filter(
                sU => sU.user.id === userAlreadyAdded.user.id,
              ); //Remove the less important duplicate user
              suggestedUsers.push({
                user: user,
                suggestion: {
                  priority: 4,
                  reason: `New to Instagram`,
                },
              });
            }
          } else {
            suggestedUsers.push({
              user: user,
              suggestion: {
                priority: 4,
                reason: `New to Instagram`,
              },
            });
          }
        }
      });
    }
    return suggestedUsers;
  }

  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOne(
      { username },
      {
        relations: [
          'followers',
          'followers.profilePhoto',
          'following',
          'posts',
          'profilePhoto',
          'notifications',
          'savedPosts',
          'taggedIn',
          'likedPosts',
          'likedComments',
          // 'post.likes',
        ],
      },
    );
    if (!user) {
      throw new NotFoundException(
        `User with username ${username} does not exist`,
      );
    }

    return user;
  }

  async changePassword(
    changePasswordDto: ChangePasswordDto,

    reqUser: User,
  ): Promise<object> {
    return this.userRepository.changePassword(changePasswordDto, reqUser);
  }

  async changeUsername(
    changeUsernameDto: ChangeUsernameDto,
    user: User,
  ): Promise<object> {
    return this.userRepository.changeUsername(changeUsernameDto, user);
  }

  async deleteUser(deleteUserDto: DeleteUserDto): Promise<void> {
    const user = await this.userRepository.findOne({
      username: deleteUserDto.username,
    });

    const { username } = deleteUserDto;

    if (user) {
      const trueUser = await this.userRepository.validateUserPassword(
        deleteUserDto,
      );
      if (trueUser) {
        await this.userRepository.delete({
          username,
        });
      } else {
        throw new UnauthorizedException('Invalid credentails');
      }
    } else {
      throw new NotFoundException();
    }
  }

  async checkUsernameAvailable(username: string): Promise<Record<string, any>> {
    const usernameExists = await this.userRepository.findOne({ username });

    if (usernameExists) {
      return { available: false };
    }

    return { available: true };
  }

  async getSavedPosts(reqUser: User) {
    const user = await this.userRepository.findOne(reqUser.id, {
      relations: [
        'savedPosts',
        'savedPosts.likes',
        'savedPosts.user',
        'savedPosts.comments',
        'savedPosts.comments.replies',
        'savedPosts.comments.replies.user',
        'savedPosts.saves',
      ],
    });
    return user.savedPosts;
  }

  async getUserTaggedPosts(userId: number) {
    const user = await this.userRepository.findOne(userId, {
      relations: ['taggedIn'],
    });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} does not exist`);
    }
    const posts = await Promise.all(
      user.taggedIn.map(async post => {
        const p = await this.postsRepository.findOne(post.id, {
          relations: ['likes', 'comments', 'photos', 'user', 'tags'],
        });
        return p;
      }),
    );

    return posts;
  }

  async getNotifications(reqUser: User) {
    const user = await this.userRepository.findOne(reqUser.id, {
      relations: [
        'notifications',
        'notifications.initiator',
        'notifications.post',
      ],
    });
    return user.notifications;
  }
}
