import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  Project, 
  CreateProjectRequest, 
  UpdateProjectRequest, 
  ProjectStatus,
  HERO_FORCE_VALUES 
} from '../../types/project';
import { User, UserRole } from '../../types/auth';
import { useAuth } from '../../contexts/AuthContext';
import { usersService } from '../../services/users';
import { projectsService } from '../../services/projects';
import toast from 'react-hot-toast';
import { 
  FileText, 
  Save, 
  X,
  Shield,
  Zap,
  Target,
  Star,
  Eye,
  Rocket,
  BarChart3
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface ProjectFormProps {
  project?: Project;
  onSuccess?: (project: Project) => void;
  onCancel?: () => void;
  isModal?: boolean;
}

interface ProjectFormData {
  name: string;
  description: string;
  status: ProjectStatus;
  responsibleId: string;
  startDate?: string;
  endDate?: string;
  agilityGoal: number;
  enchantmentGoal: number;
  efficiencyGoal: number;
  excellenceGoal: number;
  transparencyGoal: number;
  ambitionGoal: number;
  agilityProgress: number;
  enchantmentProgress: number;
  efficiencyProgress: number;
  excellenceProgress: number;
  transparencyProgress: number;
  ambitionProgress: number;
}

const getValueIcon = (key: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    agilityGoal: <Zap className="h-4 w-4" />,
    enchantmentGoal: <Star className="h-4 w-4" />,
    efficiencyGoal: <Target className="h-4 w-4" />,
    excellenceGoal: <Shield className="h-4 w-4" />,
    transparencyGoal: <Eye className="h-4 w-4" />,
    ambitionGoal: <Rocket className="h-4 w-4" />,
  };
  return iconMap[key] || <Target className="h-4 w-4" />;
};

export function ProjectForm({ project, onSuccess, onCancel, isModal = false }: ProjectFormProps) {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
    reset
  } = useForm<ProjectFormData>({
    mode: 'onChange',
    defaultValues: {
      name: project?.name || '',
      description: project?.description || '',
      status: project?.status || ProjectStatus.PENDING,
      responsibleId: project?.responsibleId || '',
      startDate: project?.startDate ? project.startDate.split('T')[0] : '',
      endDate: project?.endDate ? project.endDate.split('T')[0] : '',
      agilityGoal: project?.agilityGoal || 50,
      enchantmentGoal: project?.enchantmentGoal || 50,
      efficiencyGoal: project?.efficiencyGoal || 50,
      excellenceGoal: project?.excellenceGoal || 50,
      transparencyGoal: project?.transparencyGoal || 50,
      ambitionGoal: project?.ambitionGoal || 50,
      agilityProgress: project?.agilityProgress || 0,
      enchantmentProgress: project?.enchantmentProgress || 0,
      efficiencyProgress: project?.efficiencyProgress || 0,
      excellenceProgress: project?.excellenceProgress || 0,
      transparencyProgress: project?.transparencyProgress || 0,
      ambitionProgress: project?.ambitionProgress || 0,
    }
  });

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await usersService.getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        toast.error('Erro ao carregar lista de usuários');
      } finally {
        setLoadingUsers(false);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    reset({
      name: project?.name || '',
      description: project?.description || '',
      status: project?.status || ProjectStatus.PENDING,
      responsibleId: project?.responsibleId || '',
      startDate: project?.startDate ? project.startDate.split('T')[0] : '',
      endDate: project?.endDate ? project.endDate.split('T')[0] : '',
      agilityGoal: project?.agilityGoal || 50,
      enchantmentGoal: project?.enchantmentGoal || 50,
      efficiencyGoal: project?.efficiencyGoal || 50,
      excellenceGoal: project?.excellenceGoal || 50,
      transparencyGoal: project?.transparencyGoal || 50,
      ambitionGoal: project?.ambitionGoal || 50,
      agilityProgress: project?.agilityProgress || 0,
      enchantmentProgress: project?.enchantmentProgress || 0,
      efficiencyProgress: project?.efficiencyProgress || 0,
      excellenceProgress: project?.excellenceProgress || 0,
      transparencyProgress: project?.transparencyProgress || 0,
      ambitionProgress: project?.ambitionProgress || 0,
    });
  }, [project, reset]);

  if (user?.role !== UserRole.ADMIN) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="text-center py-8">
          <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Acesso Restrito
          </h3>
          <p className="text-gray-600">
            Apenas administradores podem criar ou editar projetos.
          </p>
        </CardContent>
      </Card>
    );
  }

  const onSubmit = async (data: ProjectFormData) => {
    try {
      setLoading(true);

      const projectData: CreateProjectRequest | UpdateProjectRequest = {
        ...data,
        startDate: data.startDate || undefined,
        endDate: data.endDate || undefined,
      };

      let result: Project;
      
      if (project) {
        result = await projectsService.updateProject(project.id, projectData);
        toast.success('Projeto atualizado com sucesso! 🚀');
      } else {
        result = await projectsService.createProject(projectData as CreateProjectRequest);
        toast.success('Projeto criado com sucesso! 🎉');
      }

      if (onSuccess) {
        onSuccess(result);
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 
        `Erro ao ${project ? 'atualizar' : 'criar'} projeto`;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      reset();
    }
  };

  const watchedValues = watch();

  const formContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Informações Básicas
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome do Projeto *
          </label>
          <input
            {...register('name', { 
              required: 'Nome é obrigatório',
              minLength: { value: 3, message: 'Nome deve ter pelo menos 3 caracteres' }
            })}
            className={cn(
              'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
              errors.name ? 'border-red-500' : 'border-gray-300'
            )}
            placeholder="Ex: Operação Salvamento da Cidade"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrição *
          </label>
          <textarea
            {...register('description', { 
              required: 'Descrição é obrigatória',
              minLength: { value: 10, message: 'Descrição deve ter pelo menos 10 caracteres' }
            })}
            rows={3}
            className={cn(
              'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
              errors.description ? 'border-red-500' : 'border-gray-300'
            )}
            placeholder="Descreva os objetivos e detalhes do projeto..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              {...register('status')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={ProjectStatus.PENDING}>Pendente</option>
              <option value={ProjectStatus.IN_PROGRESS}>Em Progresso</option>
              <option value={ProjectStatus.COMPLETED}>Concluído</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Responsável *
            </label>
            {loadingUsers ? (
              <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                Carregando usuários...
              </div>
            ) : (
              <select
                {...register('responsibleId', { required: 'Responsável é obrigatório' })}
                className={cn(
                  'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
                  errors.responsibleId ? 'border-red-500' : 'border-gray-300'
                )}
              >
                <option value="">Selecione um responsável</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.role === UserRole.ADMIN ? 'Admin' : 'Herói'})
                  </option>
                ))}
              </select>
            )}
            {errors.responsibleId && (
              <p className="text-red-500 text-sm mt-1">{errors.responsibleId.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data de Início
            </label>
            <input
              {...register('startDate')}
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data de Fim
            </label>
            <input
              {...register('endDate')}
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Metas dos Valores da HeroForce
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {HERO_FORCE_VALUES.map((value) => (
            <div key={value.key} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  {getValueIcon(value.key)}
                  <span className="ml-2">{value.name}</span>
                </label>
                <span className="text-sm font-semibold text-gray-900">
                  {watchedValues[value.key]}%
                </span>
              </div>
              
              <Controller
                name={value.key}
                control={control}
                rules={{ min: 0, max: 100 }}
                render={({ field }) => (
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${field.value}%, #E5E7EB ${field.value}%, #E5E7EB 100%)`
                      }}
                    />
                    <p className="text-xs text-gray-500">{value.description}</p>
                  </div>
                )}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Progresso Atual dos Valores
          </h3>
          <span className="text-sm text-gray-500">
            Atualize o progresso real de cada valor
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {HERO_FORCE_VALUES.map((value) => {
            const goalValue = watchedValues[value.key];
            const progressValue = watchedValues[value.progressKey];
            const percentage = goalValue > 0 ? Math.round((progressValue / goalValue) * 100) : 0;
            const isGoalMet = progressValue >= goalValue;
            
            return (
              <div key={value.progressKey} className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    {getValueIcon(value.key)}
                    <span className="ml-2">{value.name}</span>
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-gray-900">
                      {progressValue}/{goalValue}
                    </span>
                    {isGoalMet && goalValue > 0 && (
                      <span className="text-gray-600 text-sm">✓</span>
                    )}
                  </div>
                </div>
                
                <Controller
                  name={value.progressKey}
                  control={control}
                  rules={{ min: 0, max: 100 }}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        style={{
                          background: `linear-gradient(to right, #9CA3AF 0%, #9CA3AF ${field.value}%, #E5E7EB ${field.value}%, #E5E7EB 100%)`
                        }}
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Progresso: {field.value}%</span>
                        <span className="font-medium text-gray-600">
                          {percentage}% da meta {isGoalMet ? '✓' : ''}
                        </span>
                      </div>
                    </div>
                  )}
                />
              </div>
            );
          })}
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-sm text-gray-600 mb-2">Progresso Geral</div>
          {(() => {
            const totalGoals = HERO_FORCE_VALUES.reduce((sum, value) => sum + watchedValues[value.key], 0);
            const totalProgress = HERO_FORCE_VALUES.reduce((sum, value) => sum + watchedValues[value.progressKey], 0);
            const overallPercentage = totalGoals > 0 ? Math.round((totalProgress / totalGoals) * 100) : 0;
            
            return (
              <div className="flex items-center space-x-3">
                <span className="font-medium">{overallPercentage}%</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gray-400 h-2 rounded-full"
                    style={{ width: `${overallPercentage}%` }}
                  />
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      <div className="flex space-x-3 pt-4">
        <Button
          type="submit"
          disabled={!isValid || loading}
          className="flex-1"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {project ? 'Atualizando...' : 'Criando...'}
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              {project ? 'Atualizar Projeto' : 'Criar Projeto'}
            </>
          )}
        </Button>
        
        <Button
          type="button"
          variant="secondary"
          onClick={handleCancel}
          disabled={loading}
        >
          <X className="h-4 w-4 mr-2" />
          Cancelar
        </Button>
      </div>
    </form>
  );

  if (isModal) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              {project ? (
                <>
                  <FileText className="h-6 w-6 mr-2" />
                  Editar Projeto
                </>
              ) : (
                <>
                  <FileText className="h-6 w-6 mr-2" />
                  Criar Novo Projeto
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {formContent}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            {project ? (
              <>
                <FileText className="h-6 w-6 mr-2" />
                Editar Projeto: {project.name}
              </>
            ) : (
              <>
                <FileText className="h-6 w-6 mr-2" />
                Criar Novo Projeto
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {formContent}
        </CardContent>
      </Card>
    </div>
  );
}
