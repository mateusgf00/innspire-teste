import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Project, HERO_FORCE_VALUES } from '../../types/project';
import { formatDate, formatProjectStatus, getStatusColor, truncateText } from '../../utils/format';
import { getCharacterInfo } from '../../utils/characters';
import { Calendar, User, Edit } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types/auth';

interface ProjectCardProps {
  project: Project;
  onEdit?: (project: Project) => void;
  showActions?: boolean;
}

export function ProjectCard({ project, onEdit, showActions = true }: ProjectCardProps) {
  const { user } = useAuth();
  const characterInfo = getCharacterInfo(project.responsible.character);
  
  
  const performanceAnalysis = (() => {
    let goalsAchieved = 0;
    let totalGoals = 0;
    let totalProgress = 0;
    let totalGoalValue = 0;

    HERO_FORCE_VALUES.forEach(value => {
      const goal = project[value.key];
      const progress = project[value.progressKey];
      
      if (goal > 0) {
        totalGoals++;
        totalGoalValue += goal;
        totalProgress += progress;
        if (progress >= goal) {
          goalsAchieved++;
        }
      }
    });

    const overallPercentage = totalGoalValue > 0 ? Math.round((totalProgress / totalGoalValue) * 100) : 0;
    
    return {
      goalsAchieved,
      totalGoals,
      overallPercentage,
      status: overallPercentage >= 100 ? 'achieved' : 
              overallPercentage >= 80 ? 'near' :
              overallPercentage >= 50 ? 'progress' : 'behind'
    };
  })();

  const getPerformanceText = () => {
    return performanceAnalysis.overallPercentage >= 100 ? 'Metas atingidas' : 'Em andamento';
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
            {project.name}
          </CardTitle>
          <span className={cn('px-2 py-1 text-xs font-medium rounded-full', getStatusColor(project.status))}>
            {formatProjectStatus(project.status)}
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-4">
        <p className="text-gray-600 text-sm line-clamp-2">
          {truncateText(project.description, 120)}
        </p>

        <div className="flex items-center space-x-2">
          <User className="h-4 w-4 text-gray-400" />
          <div className="flex items-center space-x-1">
            {characterInfo && (
              <span className="text-sm">{characterInfo.icon}</span>
            )}
            <span className="text-sm text-gray-700">{project.responsible.name}</span>
          </div>
        </div>

        {(project.startDate || project.endDate) && (
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {project.startDate && formatDate(project.startDate)} 
              {project.startDate && project.endDate && ' - '}
              {project.endDate && formatDate(project.endDate)}
            </span>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Progresso</span>
            <span className="text-xs text-gray-500">
              {performanceAnalysis.goalsAchieved}/{performanceAnalysis.totalGoals} metas
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{getPerformanceText()}</span>
            <span className="text-sm font-semibold text-gray-900">
              {performanceAnalysis.overallPercentage}%
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill bg-gray-400"
              style={{ width: `${performanceAnalysis.overallPercentage}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {HERO_FORCE_VALUES.slice(0, 6).map((value) => {
            const goal = project[value.key];
            const progress = project[value.progressKey];
            const percentage = goal > 0 ? Math.round((progress / goal) * 100) : 0;
            const isGoalMet = progress >= goal && goal > 0;
            
            return (
              <div key={value.key} className="text-center">
                <div className="text-center mb-1">
                  <span className="text-xs text-gray-500">{value.name}</span>
                </div>
                <div className="h-1 bg-gray-200 rounded-full">
                  <div 
                    className="h-1 rounded-full bg-gray-400"
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
                <div className="text-xs font-medium text-gray-700 mt-1">
                  {progress}/{goal} {isGoalMet ? '✓' : ''}
                </div>
              </div>
            );
          })}
        </div>
        {showActions && (user?.role === UserRole.ADMIN || user?.id === project.responsibleId) && onEdit && (
          <div className="flex pt-2">
            <Button
              onClick={() => onEdit(project)}
              variant="secondary"
              size="sm"
              className="w-full"
            >
              <Edit className="h-4 w-4 mr-2" />
              Atualizar Progresso
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
