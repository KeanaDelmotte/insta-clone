import { IsString, MinLength, MaxLength } from 'class-validator';
export class ChangeUsernameDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  newUsername: string;

  password: string;
}
