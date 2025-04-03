import { IDto } from "../../interfaces/dto.interface";

export class CreateDto implements IDto {
    name!: string;
    number: number | undefined;
    street!: string;
    city!: string;
    state!: string;
    country!: string;
    logoUrl: string | undefined;
}