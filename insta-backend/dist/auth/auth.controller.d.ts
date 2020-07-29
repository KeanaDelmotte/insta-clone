import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentails.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { User } from './user.entity';
import { ChangeUsernameDto } from './dto/change-username.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { PhotoResponseDto } from '../posts/dto/photo-response.dto';
import { SignUpDto } from './dto/signUpDto.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(signUpDto: SignUpDto, profilePhoto?: PhotoResponseDto): Promise<User>;
    updateProfilePhoto(reqUser: User, photo: PhotoResponseDto): Promise<void>;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
    getUserByUsername(username: string): Promise<User>;
    changePassword(changePasswordDto: ChangePasswordDto, reqUser: User): Promise<object>;
    changeUsername(changeUsernameDto: ChangeUsernameDto, user: User): Promise<object>;
    deleteUser(deleteUserDto: DeleteUserDto): Promise<void>;
    checkUsernameAvailable(username: string): Promise<Record<string, any>>;
    getSavedPosts(reqUser: User): Promise<import("../posts/post.entity").Post[]>;
    getUserTaggedPosts(userId: number): Promise<import("../posts/post.entity").Post[]>;
    getAllUsers(reqUser: User): Promise<User[]>;
    getAllSuggestedUsers(reqUser: User): Promise<import("../posts/dto/suggestedUser.dto").SuggestedUserDto[]>;
    getNotifications(reqUser: User): Promise<import("../notifications/notification.entity").Notification[]>;
}
