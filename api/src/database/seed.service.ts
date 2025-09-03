import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole, HeroCharacter } from '../users/entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createDefaultAdmin(): Promise<void> {
    try {
      const existingAdmin = await this.userRepository.findOne({
        where: { role: UserRole.ADMIN },
      });

      if (existingAdmin) {
        this.logger.log('Usuário admin já existe.');
        return;
      }

      const existingUser = await this.userRepository.findOne({
        where: { email: 'admin@heroforce.com' },
      });

      if (existingUser) {
        this.logger.log('Email admin@heroforce.com já existe.');
        return;
      }
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      const adminUser = this.userRepository.create({
        name: 'Administrador HeroForce',
        email: 'admin@heroforce.com',
        password: hashedPassword,
        role: UserRole.ADMIN,
        character: HeroCharacter.MARVEL_IRONMAN,
      });

      await this.userRepository.save(adminUser);

      this.logger.log('Usuário administrador padrão criado com sucesso!');
      this.logger.log('Email: admin@heroforce.com');
      this.logger.log('Senha: admin123');
      
    } catch (error) {
      this.logger.error('Erro ao criar usuário administrador padrão:', error.message);
    }
  }

  async seedDatabase(): Promise<void> {
    this.logger.log('Iniciando seed do banco de dados...');
    await this.createDefaultAdmin();
    this.logger.log('Seed do banco de dados concluído!');
  }
}
