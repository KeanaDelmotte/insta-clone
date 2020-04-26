import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentails.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { User } from './user.entity';
import { ChangeUsernameDto } from './dto/change-username.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
    changePassword(changePasswordDto: ChangePasswordDto, reqUser: User): Promise<object>;
    changeUsername(changeUsernameDto: ChangeUsernameDto, user: User): Promise<object>;
    delteUser(deleteUserDto: DeleteUserDto): Promise<void>;
    checkUsernameAvailable(username: string): Promise<Record<string, any>>;
    getSavedPosts(reqUser: User): Promise<import("../posts/post.entity").Post[]>;
    getUserTaggedPosts(userId: number): Promise<import("../posts/post.entity").Post[]>;
}
