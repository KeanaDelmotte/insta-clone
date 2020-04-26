import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetPostDto {
  @IsNotEmpty()
  @IsOptional()
  search: string;
}
