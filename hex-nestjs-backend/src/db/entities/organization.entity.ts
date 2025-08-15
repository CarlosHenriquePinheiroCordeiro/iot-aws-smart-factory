import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'organizations' })
export class OrganizationEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', nullable: false })
  name!: string;

  @Column({ type: 'int', nullable: true })
  number: number | undefined;

  @Column({ type: 'varchar', nullable: false })
  street!: string;

  @Column({ type: 'varchar', nullable: false })
  city!: string;

  @Column({ type: 'varchar', nullable: false })
  state!: string;

  @Column({ type: 'varchar', nullable: false })
  country!: string;

  @Column({ type: 'varchar', nullable: true })
  logoUrl!: string | undefined;
}
