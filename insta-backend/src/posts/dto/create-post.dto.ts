import { IsNotEmpty, MinLength, IsOptional, IsArray } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  description: string;

  tags?: string | undefined;
}
