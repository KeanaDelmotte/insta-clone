import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentails.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ChangeUsernameDto } from './dto/change-username.dto';
import { PhotoResponseDto } from '../posts/dto/photo-response.dto';
import { SignUpDto } from './dto/signUpDto.dto';
export declare class UserRepository extends Repository<User> {
    signUp(signUpDto: SignUpDto, profilePhoto?: PhotoResponseDto): Promise<User>;
    validateUserPassword(authcredentialsDto: AuthCredentialsDto): Promise<string>;
    private hashPassword;
    changePassword(changePasswordDto: ChangePasswordDto, reqUser: User): Promise<{
        message: string;
    }>;
    changeUsername(changeUsernameDto: ChangeUsernameDto, reqUser: User): Promise<{
        message: string;
    }>;
}
