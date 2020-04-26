import { FollowService } from './follow.service';
import { User } from '../auth/user.entity';
export declare class FollowController {
    private followService;
    constructor(followService: FollowService);
    followUser(userId: number, follower: User): Promise<User[]>;
    getAllFollowers(userId: number): Promise<User[]>;
    getAllFollowing(userId: number): Promise<User[]>;
    unfollowUser(userId: number, unfollower: User): Promise<User[]>;
}
