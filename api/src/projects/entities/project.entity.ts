import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum ProjectStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  name: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.PENDING,
  })
  status: ProjectStatus;

  @Column({ type: 'int', default: 0, comment: 'Meta de Agilidade (0-100%)' })
  agilityGoal: number;

  @Column({ type: 'int', default: 0, comment: 'Meta de Encantamento (0-100%)' })
  enchantmentGoal: number;

  @Column({ type: 'int', default: 0, comment: 'Meta de Eficiência (0-100%)' })
  efficiencyGoal: number;

  @Column({ type: 'int', default: 0, comment: 'Meta de Excelência (0-100%)' })
  excellenceGoal: number;

  @Column({ type: 'int', default: 0, comment: 'Meta de Transparência (0-100%)' })
  transparencyGoal: number;

  @Column({ type: 'int', default: 0, comment: 'Meta de Ambição (0-100%)' })
  ambitionGoal: number;

  @Column({ type: 'int', default: 0, comment: 'Progresso de Agilidade (0-100%)' })
  agilityProgress: number;

  @Column({ type: 'int', default: 0, comment: 'Progresso de Encantamento (0-100%)' })
  enchantmentProgress: number;

  @Column({ type: 'int', default: 0, comment: 'Progresso de Eficiência (0-100%)' })
  efficiencyProgress: number;

  @Column({ type: 'int', default: 0, comment: 'Progresso de Excelência (0-100%)' })
  excellenceProgress: number;

  @Column({ type: 'int', default: 0, comment: 'Progresso de Transparência (0-100%)' })
  transparencyProgress: number;

  @Column({ type: 'int', default: 0, comment: 'Progresso de Ambição (0-100%)' })
  ambitionProgress: number;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @ManyToOne(() => User, (user) => user.projects)
  @JoinColumn({ name: 'responsibleId' })
  responsible: User;

  @Column({ name: 'responsibleId' })
  responsibleId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  get completionPercentage(): number {
    const totalGoals = this.agilityGoal + this.enchantmentGoal + this.efficiencyGoal + 
                      this.excellenceGoal + this.transparencyGoal + this.ambitionGoal;
    
    if (totalGoals === 0) return 0;

    const totalProgress = this.agilityProgress + this.enchantmentProgress + this.efficiencyProgress +
                         this.excellenceProgress + this.transparencyProgress + this.ambitionProgress;

    return Math.round((totalProgress / totalGoals) * 100);
  }
}
