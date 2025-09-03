import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Project } from '../../projects/entities/project.entity';

export enum UserRole {
  HERO = 'hero',
  ADMIN = 'admin',
}

export enum HeroCharacter {
  MARVEL_SPIDERMAN = 'marvel_spiderman',
  MARVEL_IRONMAN = 'marvel_ironman',
  MARVEL_CAPTAIN_AMERICA = 'marvel_captain_america',
  MARVEL_THOR = 'marvel_thor',
  MARVEL_HULK = 'marvel_hulk',
  MARVEL_BLACK_WIDOW = 'marvel_black_widow',
  DC_BATMAN = 'dc_batman',
  DC_SUPERMAN = 'dc_superman',
  DC_WONDER_WOMAN = 'dc_wonder_woman',
  DC_FLASH = 'dc_flash',
  DC_GREEN_LANTERN = 'dc_green_lantern',
  DC_AQUAMAN = 'dc_aquaman',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true, length: 150 })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.HERO,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: HeroCharacter,
    nullable: true,
  })
  character: HeroCharacter;

  @OneToMany(() => Project, (project) => project.responsible)
  projects: Project[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
