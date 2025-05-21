import { City } from 'src/cities/entities/city.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('leads')
export class Lead {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @Column()
  city_id: number;

  @Column({ nullable: true })
  event_type_id: number;

  @Column({ nullable: true })
  event_date: Date;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'pickup_city_id' })
  pickup_city: City;

  @Column()
  pickup_city_id: number;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'drop_city_id' })
  drop_city: City;

  @Column()
  drop_city_id: number;

  @Column({ nullable: true })
  pickup_date_time: Date;

  @Column({ nullable: true })
  duration_hours: number;

  @Column({ nullable: true })
  trolley_type: string;

  @Column({ nullable: true })
  return_trip: boolean;

  @Column({ nullable: true })
  passenger_count: number;

  @Column({ nullable: true })
  special_requirements: string;

  @Column({ nullable: true })
  trolley_amount: number;

  @Column({ default: () => 'gen_random_uuid()' })
  uuid: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
