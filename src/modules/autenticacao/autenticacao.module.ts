import { AutenticacaoController } from '@/api/controllers/autenticacao/autenticacao.controller';
import { JwtGuard } from '@/api/middlewares/auth-guard.strategy';
import { JwtStrategy } from '@/api/middlewares/jwt.strategy';
import { LoginUseCase } from '@/application/use-cases/autenticacao/login.use-case';
import { SignUpUseCase } from '@/application/use-cases/autenticacao/sign-up.use-case';
import { AwsCognitoService } from '@/domain/service/aws-cognito.service';
import { ILogin, ISignUp } from '@/domain/use-cases';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), HttpModule],
  controllers: [AutenticacaoController],
  providers: [
    {
      provide: ILogin,
      useClass: LoginUseCase,
    },
    {
      provide: ISignUp,
      useClass: SignUpUseCase,
    },
    AwsCognitoService,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtGuard },
  ],
})
export class AutenticacaoModule {}
