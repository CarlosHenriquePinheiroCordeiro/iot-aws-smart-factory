import { IDto } from "../../../interfaces/dto.interface";

export class FileDto implements IDto {
    Name?: string;
    Key?: string;
    Bucket?: string;
    ContentType?: string;
}