import { IDomain } from "../../interfaces/domain.interface";

export class File implements IDomain {
    
    constructor(
        private Name: string | undefined,
        private Key: string | undefined,
        private Bucket: string | undefined,
        private ContentType: string | undefined,
    ) {
        this.setName(Name);
        this.setKey(Key);
        this.setBucket(Bucket);
        this.setContentType(ContentType);
    }

    public getName(): string | undefined {
        return this.Name;
    }

    public getKey(): string | undefined {
        return this.Key;
    }

    public getBucket(): string | undefined {
        return this.Bucket;
    }

    public getContentType(): string | undefined {
        return this.ContentType;
    }

    public setName(Name: string | undefined): void {
        this.Name = Name;
    }

    public setKey(Key: string | undefined): void {
        this.Key = Key;
    }

    public setBucket(Bucket: string | undefined): void {
        this.Bucket = Bucket;
    }

    public setContentType(ContentType: string | undefined): void {
        this.ContentType = ContentType;
    }

    
}
  