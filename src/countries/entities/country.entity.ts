import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  iso_code: string;

  @Column()
  currency_iso: string;

  @Column()
  abbreviation: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}
