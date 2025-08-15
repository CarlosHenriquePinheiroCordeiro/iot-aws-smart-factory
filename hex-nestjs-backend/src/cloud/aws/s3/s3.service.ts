import { Injectable } from '@nestjs/common/decorators/core';
import * as AWS from 'aws-sdk';
import { IS3Object } from '../../../interfaces/s3-object.interface';

@Injectable()
export class AwsS3Service{

    private s3Provider: AWS.S3;

    constructor() {
        this.s3Provider = new AWS.S3({
            region: process.env.AWS_REGION,
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_ACCESS_KEY,
        });
    }

    async upload({ Bucket, Key, Body }: IS3Object): Promise<AWS.S3.ManagedUpload.SendData> {
        const response = await this.s3Provider.upload({
            Bucket,
            Key,
            Body
        }).promise() as AWS.S3.ManagedUpload.SendData
        return response;
    }

    async get({ Bucket, Key }: IS3Object): Promise<any> {
        const response = await this.s3Provider.getObject({
            Bucket,
            Key
        }).promise()
        return response;
    }

}
