import { UserRepository } from '../auth/user.repository';
import { User } from '../auth/user.entity';
export declare class FollowService {
    private userRepository;
    constructor(userRepository: UserRepository);
    followUser(userId: number, followerId: number): Promise<User[]>;
    unfollowUser(userId: number, unfollower: User): Promise<User[]>;
    getAllFollowers(userId: number): Promise<User[]>;
    getAllFollowing(userId: number): Promise<User[]>;
}
