import { UserRepository } from '../auth/user.repository';
import { User } from '../auth/user.entity';
import { NotificationsService } from '../notifications/notifications.service';
export declare class FollowService {
    private userRepository;
    private notificationService;
    constructor(userRepository: UserRepository, notificationService: NotificationsService);
    followUser(userId: number, followerId: number): Promise<User[]>;
    unfollowUser(userId: number, unfollower: User): Promise<User[]>;
    getAllFollowers(userId: number): Promise<User[]>;
    getAllFollowing(userId: number): Promise<User[]>;
}
