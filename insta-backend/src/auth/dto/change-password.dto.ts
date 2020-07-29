import { IsString, MinLength, MaxLength, Matches } from 'class-validator';
export class ChangePasswordDto {
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'password too weak. must include at least one capital letter, one lower case letter and one special charachter or number',
  })
  newPassword: string;

  oldPassword: string;
}
