import { DeleteDto } from "../../domain/organizations/dto/delete.dto";
import { UpdateDto } from "../../domain/organizations/dto/update.dto";
import { Organization } from "../../domain/organizations/Organization";


export abstract class CreateUseCase {
    abstract create(organization: Organization): any;
}

export abstract class DeleteUseCase {
    abstract delete(deleteDto: DeleteDto): any;
}

export abstract class FindUseCase {
    abstract find(): any;
}

export abstract class FindByIdUseCase {
    abstract findById(): any;
}

export abstract class UpdateUseCase {
    abstract update(updateDto: UpdateDto): any;
}