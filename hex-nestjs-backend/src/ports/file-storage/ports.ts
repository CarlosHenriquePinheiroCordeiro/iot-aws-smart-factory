import { PresignedUrl } from "../../interfaces/presigned-url.interface";

export abstract class GeneratePresignedPutUrlPort {
    abstract generatePresignedPutUrl(
        Bucket: string,
        Key: string,
        ContentType: string,
        expiresIn?: number
    ): Promise<PresignedUrl>;
}

export abstract class GetPublicUrlPort {
    abstract getPublicUrlPort(Bucket: string, Key: string): string;
}

export abstract class DeleteObjectPort {
    abstract deleteObject(Bucket: string, Key: string): Promise<void>;
} 

export abstract class ObjectExistsPort {
    abstract objectExists?(Bucket: string, Key: string): Promise<boolean>;
}