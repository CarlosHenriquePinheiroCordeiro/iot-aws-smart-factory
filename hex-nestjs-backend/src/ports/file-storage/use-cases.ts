import { PresignedUrl } from "../../interfaces/presigned-url.interface";

export abstract class GeneratePresignedPutUrlUseCase {
    abstract generatePresignedPutUrl(
      key: string,
      contentType: string,
      expiresIn?: number
    ): Promise<PresignedUrl>;
}

export abstract class BuildPublicUrlUseCase {
    abstract buildPublicUrl(key: string): string;
}

export abstract class DeleteObjectUseCase {
    abstract deleteObject(key: string): Promise<void>;
} 

export abstract class ObjectExistsUseCase {
    abstract objectExists?(key: string): Promise<boolean>;
}