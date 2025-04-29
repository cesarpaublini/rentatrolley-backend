import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('city_event_types')
export class CityEventType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city_id: number;

  @Column()
  event_type_id: number;
}