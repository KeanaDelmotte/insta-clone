import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentails.dto';
import * as bcrypt from 'bcryptjs';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ChangeUsernameDto } from './dto/change-username.dto';
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    // const usernameUnavailable = this.findOne({ username });

    // if (usernameUnavailable) {
    //   throw new ConflictException('Username already exists');
    // }

    const user = this.create({ username, salt: await bcrypt.genSalt() });

    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username

        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException('Failed to create user');
      }
    }
  }

  async validateUserPassword(
    authcredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { username, password } = authcredentialsDto;
    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async changePassword(changePasswordDto: ChangePasswordDto, reqUser: User) {
    const { newPassword, oldPassword } = changePasswordDto;

    const user = await this.findOne(reqUser.id);
    const trueUser = await this.validateUserPassword({
      password: oldPassword,
      username: reqUser.username,
    });

    if (trueUser) {
      user.password = await this.hashPassword(newPassword, user.salt);
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }

    try {
      user.save();
    } catch (error) {
      throw new InternalServerErrorException('Could not save user');
    }

    return {
      message:
        'Succesfully changed password. You will need to sign in again with the new password',
    };
  }

  async changeUsername(changeUsernameDto: ChangeUsernameDto, reqUser: User) {
    const { newUsername, password } = changeUsernameDto;

    const user = await this.findOne(reqUser.id);
    const trueUser = await this.validateUserPassword({
      password,
      username: reqUser.username,
    });

    if (!trueUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const usernameExists = await this.findOne({ username: newUsername });

    if (usernameExists) {
      if (usernameExists.username === reqUser.username) {
        throw new BadRequestException(
          'You cant change your username to the same thing as your current username',
        );
      }
    }
    if (usernameExists) {
      throw new ConflictException('Username already exists');
    } else {
      if (trueUser) {
        user.username = newUsername;
      }

      try {
        user.save();
      } catch (error) {
        throw new InternalServerErrorException('Could not change username');
      }
    }

    return {
      message:
        'Succesfully changed username. You will need to sign in again with the updated username.',
    };
  }
}
