import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,

    @InjectRepository(PostsRepository)
    private postsRepository: PostsRepository,
  ) {}

  async signUp(authcredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authcredentialsDto);
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
    return reqUser.savedPosts;
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
}
