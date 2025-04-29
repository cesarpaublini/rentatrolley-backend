import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column()
  event_type_id: number;

  @Column()
  event_date: Date;

  @Column()
  pickup_city_id: number;

  @Column()
  drop_city_id: number;

  @Column()
  pickup_date_time: Date;

  @Column()
  duration_hours: number;

  @Column()
  trolley_type: string;

  @Column()
  return_trip: boolean;

  @Column()
  passenger_count: number;

  @Column()
  special_requirements: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  deleted_at: Date;
}