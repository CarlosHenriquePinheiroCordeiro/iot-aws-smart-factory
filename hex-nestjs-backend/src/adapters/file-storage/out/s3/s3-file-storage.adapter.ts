import { Injectable } from '@nestjs/common';
import { PresignedUrl } from '../../../../interfaces/presigned-url.interface';
import { GetPublicUrlPort, DeleteObjectPort, GeneratePresignedPutUrlPort, ObjectExistsPort } from '../../../../ports/file-storage/ports';
import { AwsS3Service } from '../../../../cloud/aws/s3/s3.service';

@Injectable()
export class S3FileStorageAdapter implements GeneratePresignedPutUrlPort, GetPublicUrlPort, DeleteObjectPort, ObjectExistsPort {

    private defaultExpiry: number = 300;

    constructor(private readonly s3Service: AwsS3Service) {}

    async generatePresignedPutUrl(
        Bucket: string,
        Key: string,
        ContentType: string,
        expiresIn?: number
    ): Promise<PresignedUrl> {
        const Expires = expiresIn ?? this.defaultExpiry;

        const Url = this.s3Service.getS3Provider().getSignedUrl('putObject', {
            Bucket,
            Key,
            Expires,
            ContentType,
        });

        return { Url, Key, Expires };
    }

    getPublicUrlPort(Bucket: string, Key: string): string {
        return `https://${Bucket}.s3.${this.s3Service.getRegion()}.amazonaws.com/${Key}`;
    }

    async deleteObject(Bucket: string, Key: string): Promise<void> {
        await this.s3Service.getS3Provider()
            .deleteObject({ Bucket, Key })
            .promise();
    }

    async objectExists(Bucket: string, Key: string): Promise<boolean> {
        try {
            await this.s3Service.getS3Provider()
                .headObject({ Bucket, Key })
                .promise();
            return true;
        } catch (err: any) {
            if (err?.code === 'NotFound' || err?.statusCode === 404) return false;
            if (err?.code === 'Forbidden' || err?.statusCode === 403) return false;
            throw err;
        }
    }

    generatePresignedGetUrl(Bucket: string, Key: string, expiresIn?: number): string {
        const Expires = expiresIn ?? this.defaultExpiry;
            return this.s3Service.getS3Provider().getSignedUrl('getObject', {
                Bucket,
                Key,
                Expires,
        });
    }
}
