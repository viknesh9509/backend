import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail, MinLength, Matches, IsOptional, IsNumber } from "class-validator";

export class CreateUserDto {


  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
  
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, { message: 'Password too weak' })
  @ApiProperty()
  password: string;


  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  fullName: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  profilePicture?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  score: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  bio?: string;

  @IsNotEmpty()
  createdAt?: Date;

  @IsNotEmpty()
  updatedAt?: Date;
}
