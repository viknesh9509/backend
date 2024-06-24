import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationDto } from './dto/authentication.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}



  async create(createUserDto: CreateUserDto) {

    // IF EMAIL ALREADY EXISTS
    const userExists = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (userExists) {
      return {message: 'User already exists'};
    }


    const user =  new User();
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.fullName = createUserDto.fullName;
    user.score = createUserDto.score;
    user.profilePicture = createUserDto.profilePicture;
    user.bio = createUserDto.bio;
    user.createdAt = new Date();
    user.updatedAt = new Date();
    await this.userRepository.save(user);
    return user;
    
  }
  async login(authDto: AuthenticationDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: authDto.email,
        password: authDto.password,
      },
    });
    if (!user) {
      return {message: 'Username or password is incorrect'};
    }
    const payload = {username: user.email, sub: user.id};
    return {
      accessToken: this.jwtService.sign(payload, {expiresIn: '7d'}),
      refreshToken: this.jwtService.sign(payload, {expiresIn: '14d'}),
      user: user,

    };
  }


  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      return {message: 'User not found'};
    }

    user.email = updateUserDto.email;
    user.password = updateUserDto.password;
    user.fullName = updateUserDto.fullName;
    user.score = updateUserDto.score;
    user.profilePicture = updateUserDto.profilePicture;
    user.bio = updateUserDto.bio;
    user.updatedAt = new Date();
    await this.userRepository.save(user);
    return user;
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      return {message: 'User not found'};
    }
    await this.userRepository.delete(user);
    return {message: 'User deleted'};
  }
}
