import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cities_details')
export class CitiesDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city_id: number;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'jsonb' })
  details: JSON;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
