import { Injectable } from '@nestjs/common/decorators/core';
import * as AWS from 'aws-sdk';
import { createHmac } from 'crypto';

@Injectable()
export class AwsCognitoService {
  private cognitoServiceProvider: AWS.CognitoIdentityServiceProvider;

  constructor() {
    this.cognitoServiceProvider = new AWS.CognitoIdentityServiceProvider({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    });
  }

  getCognito() {
    return this.cognitoServiceProvider;
  }

  getSecretHash(username: string) {
    const message = username + process.env.AWS_COGNITO_CLIENT_ID;
    const hmac = createHmac('sha256', process.env.AWS_COGNITO_CLIENT_SECRET!);
    hmac.update(message);
    return hmac.digest('base64');
  }
}
