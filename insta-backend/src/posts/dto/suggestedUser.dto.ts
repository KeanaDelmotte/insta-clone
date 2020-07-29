import { User } from '../../auth/user.entity';
export class SuggestedUserDto {
  user: User;
  suggestion: {
    priority: number;
    reason: string;
  };
}
