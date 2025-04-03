import { Organization } from "../../../Organization";

export abstract class CreateUseCase {
  abstract create(organization: Organization): any;
}