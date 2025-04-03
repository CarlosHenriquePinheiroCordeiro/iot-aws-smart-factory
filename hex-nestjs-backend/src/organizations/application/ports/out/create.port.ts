import { Organization } from '../../../Organization';

export abstract class CreatePort {
  abstract create(organization: Organization): any;
}