import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentails.dto';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from './dto/change-password.dto';
import { User } from './user.entity';
import { ChangeUsernameDto } from './dto/change-username.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { PostsRepository } from '../posts/posts.repository';
import { PhotoResponseDto } from '../posts/dto/photo-response.dto';
import { SuggestedUserDto } from '../posts/dto/suggestedUser.dto';
import { SignUpDto } from './dto/signUpDto.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    private postsRepository;
    constructor(userRepository: UserRepository, jwtService: JwtService, postsRepository: PostsRepository);
    signUp(signUpDto: SignUpDto, profilePhoto?: PhotoResponseDto): Promise<User>;
    signIn(authCredentailsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
    updateProfilePhoto(reqUser: User, photo: PhotoResponseDto): Promise<void>;
    getAllUsers(reqUser: User): Promise<User[]>;
    getAllSuggestedUsers(reqUser: User): Promise<SuggestedUserDto[]>;
    getUserByUsername(username: string): Promise<User>;
    changePassword(changePasswordDto: ChangePasswordDto, reqUser: User): Promise<object>;
    changeUsername(changeUsernameDto: ChangeUsernameDto, user: User): Promise<object>;
    deleteUser(deleteUserDto: DeleteUserDto): Promise<void>;
    checkUsernameAvailable(username: string): Promise<Record<string, any>>;
    getSavedPosts(reqUser: User): Promise<import("../posts/post.entity").Post[]>;
    getUserTaggedPosts(userId: number): Promise<import("../posts/post.entity").Post[]>;
    getNotifications(reqUser: User): Promise<import("../notifications/notification.entity").Notification[]>;
}
