import { AuthService } from './auth/auth.service';
import { User } from './auth/user.entity';
import { SignUpDto } from './auth/dto/signUpDto.dto';
import { FollowService } from './follow/follow.service';
import { PostsService } from './posts/posts.service';
export declare class AppService {
    private authService;
    private followService;
    private postService;
    constructor(authService: AuthService, followService: FollowService, postService: PostsService);
    getHello(): string;
    createNewUsers(userInfos: SignUpDto[]): Promise<User[]>;
    uploadUserProfilePhoto(user: User): Promise<void>;
    followUsrs(userId: number, usersList: User[]): Promise<void>;
    createMockData(): Promise<void>;
}
