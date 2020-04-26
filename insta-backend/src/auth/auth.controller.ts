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

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
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
  delteUser(@Body(ValidationPipe) deleteUserDto: DeleteUserDto): Promise<void> {
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
}
