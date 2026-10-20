import { IsNotEmpty, IsString } from 'class-validator';

export class GetRandomPhotoDto {
  @IsString()
  @IsNotEmpty()
  destination: string;
}
