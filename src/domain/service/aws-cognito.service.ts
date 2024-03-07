import { AutenticacaoLoginDto } from '@/api/dtos/autenticacao/autenticacao-login.dto';
import { Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';

@Injectable()
export class AwsCognitoService {
  private userPool: CognitoUserPool;

  constructor() {
    this.userPool = new CognitoUserPool({
      UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
      ClientId: process.env.AWS_COGNITO_CLIENT_ID,
    });
  }

  async autenticaCliente(autenticacaoLoginDto: AutenticacaoLoginDto) {
    const { cpf } = autenticacaoLoginDto;
    const userData = {
      Username: cpf,
      Pool: this.userPool,
    };

    const authenticationDetails = new AuthenticationDetails({
      Username: cpf,
    });

    const userCognito = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      userCognito.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve({
            accessToken: result.getAccessToken().getJwtToken(),
            refreshToken: result.getRefreshToken().getToken(),
          });
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }
}
