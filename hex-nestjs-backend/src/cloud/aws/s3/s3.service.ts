import { Injectable } from '@nestjs/common/decorators/core';
import * as AWS from 'aws-sdk';
import { IS3Object } from '../../../interfaces/s3-object.interface';

@Injectable()
export class AwsS3Service{

    private s3Provider: AWS.S3;
    private region: string | undefined = process.env.AWS_REGION;

    constructor() {
        const config: AWS.S3.ClientConfiguration = {
            region: process.env.AWS_REGION,
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_ACCESS_KEY,
            signatureVersion: 'v4',
        }
        this.s3Provider = new AWS.S3(config);
    }

    getS3Provider(): AWS.S3 {
        return this.s3Provider;
    }

    getRegion(): string | undefined {
        return this.region
    }

}
