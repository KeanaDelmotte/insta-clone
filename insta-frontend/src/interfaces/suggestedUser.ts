import { User } from './user';
export interface SuggestedUserInterface {
  user: User;
  suggestion: {
    priority: number;
    reason: string;
  };
}
