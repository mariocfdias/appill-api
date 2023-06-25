import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const { authorization } = request.headers;

    const bearerToken = (authorization ?? '').split(' ')[1];

    Logger.log(authorization);
    try {
      const data = await this.authService.checkToken(bearerToken);

      const user = await this.userService.getById(data.userId);

      request.tokenPayload = data;
      request.user = user;

      return true;
    } catch (e) {
      return false;
    }
  }
}
