import { IMapper } from '../../interfaces/mapper.interface';
import { Organization } from '../../organizations/Organization';
import { OrganizationEntity } from '../entities/organization.entity';

export class OrganizationMapper implements IMapper {
  toDomain(eOrganization: OrganizationEntity): Organization {
    return new Organization(
      eOrganization.id,
      eOrganization.name,
      eOrganization.number,
      eOrganization.street,
      eOrganization.city,
      eOrganization.state,
      eOrganization.country,
      eOrganization.logoUrl
    );
  }

  toEntity(organization: Organization): OrganizationEntity {
    const eOrganization = new OrganizationEntity();
    eOrganization.id = organization.getId();
    eOrganization.name = organization.getId();
    eOrganization.number = organization.getNumber();
    eOrganization.street = organization.getStreet();
    eOrganization.city = organization.getCity();
    eOrganization.state = organization.getState();
    eOrganization.country = organization.getCountry();
    eOrganization.logoUrl = organization.getLogoUrl();
    return eOrganization;
  }
}
