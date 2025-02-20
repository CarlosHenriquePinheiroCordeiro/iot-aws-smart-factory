import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IEntity } from '../../interfaces/entity.interface';

@Entity({ name: 'users' })
export class OrganizationEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({nullable: false})
  name!: string;

  @Column({nullable: true})
  number: number | undefined;

  @Column({nullable: false})
  street!: string;

  @Column({nullable: false})
  city!: string;

  @Column({nullable: false})
  state!: string;

  @Column({nullable: false})
  country!: string;

  @Column({nullable: true})
  logoUrl!: string | undefined;
}
