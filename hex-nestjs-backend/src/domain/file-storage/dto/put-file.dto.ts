import { IDto } from "../../../interfaces/dto.interface";

export class PutFileDto implements IDto {
    Name!: string;
    Bucket!: string;
    ContentType!: string;
}