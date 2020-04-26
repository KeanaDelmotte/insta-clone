import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentails.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ChangeUsernameDto } from './dto/change-username.dto';
export declare class UserRepository extends Repository<User> {
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    validateUserPassword(authcredentialsDto: AuthCredentialsDto): Promise<string>;
    private hashPassword;
    changePassword(changePasswordDto: ChangePasswordDto, reqUser: User): Promise<{
        message: string;
    }>;
    changeUsername(changeUsernameDto: ChangeUsernameDto, reqUser: User): Promise<{
        message: string;
    }>;
}
