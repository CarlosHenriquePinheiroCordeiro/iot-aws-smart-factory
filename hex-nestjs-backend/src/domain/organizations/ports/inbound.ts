import { Organization } from '../Organization';

export abstract class FindOrganizationsPort { 
    abstract find(): Promise<Organization[]>; 
}

export abstract class FindOrganizationByIdPort { 
    abstract findById(id: string): Promise<Organization | null>; 
}

export abstract class CreateOrganizationPort { 
    abstract create(worker: Organization): Promise<Organization>; 
}

export abstract class UpdateOrganizationPort { 
    abstract update(input: Partial<Organization> & { id: string }): Promise<Organization>; 
}

export abstract class DeleteOrganizationPort { 
    abstract delete(input: Partial<Organization> & { id: string }): Promise<any>; 
}
