import { User } from '../../../Swagger/configurations';

export class RegisterRequestDto {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public role: User.RoleEnum
  ) {}
}
