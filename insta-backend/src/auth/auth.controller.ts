import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Patch,
  UseGuards,
  Delete,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  UploadedFile,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentails.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ChangeUsernameDto } from './dto/change-username.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { Param } from '@nestjs/common';
import { timingSafeEqual } from 'crypto';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { customFileName, imageFileFilter } from '../utils/post.utils';
import { PhotoResponseDto } from '../posts/dto/photo-response.dto';
import { ChangeProfilePhotoDto } from './dto/changephoto.dto';
import { ProfilePhoto } from './profilePhoto.entity';
import { SignUpDto } from './dto/signUpDto.dto';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @UseInterceptors(
    FileInterceptor('profilePhoto', {
      storage: diskStorage({
        destination: './files',
        filename: customFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  signUp(
    @Body(ValidationPipe) signUpDto: SignUpDto,
    @UploadedFile() profilePhoto?: PhotoResponseDto,
  ): Promise<User> {
    return this.authService.signUp(signUpDto, profilePhoto);
  }

  @Patch('/update/profilephoto')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './files',
        filename: customFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @UseGuards(AuthGuard())
  updateProfilePhoto(
    @GetUser() reqUser: User,
    @UploadedFile() photo: PhotoResponseDto,
  ) {
    return this.authService.updateProfilePhoto(reqUser, photo);
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Get('user/:username')
  getUserByUsername(@Param('username') username: string) {
    return this.authService.getUserByUsername(username);
  }

  @Patch('/update/password')
  @UseGuards(AuthGuard())
  changePassword(
    @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
    @GetUser() reqUser: User,
  ): Promise<object> {
    return this.authService.changePassword(changePasswordDto, reqUser);
  }

  @Patch('/update/username')
  @UseGuards(AuthGuard())
  changeUsername(
    @Body(ValidationPipe) changeUsernameDto: ChangeUsernameDto,
    @GetUser() user: User,
  ): Promise<object> {
    return this.authService.changeUsername(changeUsernameDto, user);
  }

  @Delete('user/delete')
  deleteUser(
    @Body(ValidationPipe) deleteUserDto: DeleteUserDto,
  ): Promise<void> {
    return this.authService.deleteUser(deleteUserDto);
  }

  @Get('username-available/:username')
  checkUsernameAvailable(
    @Param('username') username: string,
  ): Promise<Record<string, any>> {
    return this.authService.checkUsernameAvailable(username);
  }

  @Get('/savedposts')
  @UseGuards(AuthGuard())
  getSavedPosts(@GetUser() reqUser: User) {
    return this.authService.getSavedPosts(reqUser);
  }

  @Get(':userId/taggedposts')
  getUserTaggedPosts(@Param('userId', ParseIntPipe) userId: number) {
    return this.authService.getUserTaggedPosts(userId);
  }

  @Get('/users')
  @UseGuards(AuthGuard())
  getAllUsers(@GetUser() reqUser: User) {
    return this.authService.getAllUsers(reqUser);
  }
  @Get('/users/suggested')
  @UseGuards(AuthGuard())
  getAllSuggestedUsers(@GetUser() reqUser: User) {
    return this.authService.getAllSuggestedUsers(reqUser);
  }

  @Get('/notifications')
  @UseGuards(AuthGuard())
  getNotifications(@GetUser() reqUser: User) {
    return this.authService.getNotifications(reqUser);
  }
}
