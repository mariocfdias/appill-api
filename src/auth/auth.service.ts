import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createToken(user: User) {
    const token = this.jwtService.sign(
      {
        userId: user.id,
        name: user.name,
        email: user.email,
      },
      {
        expiresIn: '1d',
        subject: user.id,
        issuer: 'login',
        audience: 'user',
      },
    );

    delete user.password;
    return {
      token,
      user,
    };
  }

  async checkToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        audience: 'user',
        issuer: 'login',
      });
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (e) {
      return false;
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email ou senha invalido');
    }

    return await this.createToken(user);
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.userService.create(data);

    return await this.createToken(user);
  }

  async me(token: string) {
    return false;
  }
}
