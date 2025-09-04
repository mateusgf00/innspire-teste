import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Project, HERO_FORCE_VALUES } from '../../types/project';
import { formatDate, formatProjectStatus, getStatusColor, truncateText } from '../../utils/format';
import { getCharacterInfo } from '../../utils/characters';
import { Calendar, User, BarChart3, Edit } from 'lucide-react';
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
  const completionPercentage = Math.round(
    HERO_FORCE_VALUES.reduce((sum, value) => {
      const goal = project[value.key];
      const progress = project[value.progressKey];
      const individualCompletion = goal > 0 ? (progress / goal) * 100 : 0;
      console.log({
        individualCompletion,
        goal,
        progress,
        sum: sum + Math.min(individualCompletion, 100)
      })
      return sum + Math.min(individualCompletion, 100);
    }, 0) / HERO_FORCE_VALUES.length
  );

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
            <div className="flex items-center space-x-1">
              <BarChart3 className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Progresso Geral</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">
              {completionPercentage}%
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className={cn(
                'progress-fill',
                completionPercentage >= 80 ? 'bg-green-500' :
                completionPercentage >= 60 ? 'bg-blue-500' :
                completionPercentage >= 40 ? 'bg-yellow-500' : 'bg-gray-400'
              )}
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {HERO_FORCE_VALUES.slice(0, 6).map((value) => {
            const goal = project[value.key];
            const progress = project[value.progressKey];
            const percentage = goal > 0 ? Math.round((progress / goal) * 100) : 0;
            
            return (
              <div key={value.key} className="text-center">
                <div className="text-xs text-gray-500 mb-1">{value.name}</div>
                <div className="h-1 bg-gray-200 rounded-full">
                  <div 
                    className={cn('h-1 rounded-full', `${value.color}-bg`)}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="text-xs font-medium text-gray-700 mt-1">
                  {percentage}%
                </div>
              </div>
            );
          })}
        </div>
        {showActions && (
          <div className="flex space-x-2 pt-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex-1"
              onClick={() => onEdit && onEdit(project)}
            >
              Ver Detalhes
            </Button>
            {(user?.role === UserRole.ADMIN || user?.id === project.responsibleId) && onEdit && (
              <Button
                onClick={() => onEdit(project)}
                variant="secondary"
                size="sm"
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
