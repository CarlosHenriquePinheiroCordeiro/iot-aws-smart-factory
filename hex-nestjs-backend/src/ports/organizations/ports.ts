import { DeleteDto } from "../../domain/organizations/dto/delete.dto";
import { UpdateDto } from "../../domain/organizations/dto/update.dto";
import { Organization } from "../../domain/organizations/Organization";

export abstract class CreatePort {
    abstract create(organization: Organization): any;
}

export abstract class DeletePort {
    abstract delete(deleteDto: DeleteDto): any;
}
export abstract class FindPort {
    abstract find(): any;
}

export abstract class FindByIdPort {
    abstract findById(): any;
}

export abstract class UpdatePort {
    abstract update(updateDto: UpdateDto): any;
}