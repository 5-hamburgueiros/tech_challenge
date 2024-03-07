import { ILogin, ISignUp } from '@/domain/use-cases';

import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AutenticacaoLoginDto, AutenticacaoSignUpDto } from '../../dtos';

@ApiTags('Autenticacao')
@Controller('autenticacao')
export class AutenticacaoController {
  constructor(
    @Inject(ILogin)
    private readonly login: ILogin,
    @Inject(ISignUp)
    private readonly signup: ISignUp,
  ) {}

  @Post('/login')
  async createLogin(@Body() dto: AutenticacaoLoginDto) {
    return this.login.execute(dto);
  }

  @Post('/signup')
  async createSignup(@Body() dto: AutenticacaoSignUpDto) {
    return this.signup.execute(dto);
  }
}
