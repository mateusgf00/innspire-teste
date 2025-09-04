import { ProjectStatus, ProjectFilters as IProjectFilters } from '../../types/project';
import { User } from '../../types/auth';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Search, Filter, X } from 'lucide-react';

interface ProjectFiltersProps {
  filters: IProjectFilters;
  onFiltersChange: (filters: IProjectFilters) => void;
  users: User[];
  loading?: boolean;
}

export function ProjectFilters({ 
  filters, 
  onFiltersChange, 
  users, 
  loading = false 
}: ProjectFiltersProps) {
  const statusOptions = [
    { value: '', label: 'Todos os Status' },
    { value: ProjectStatus.PENDING, label: 'Pendente' },
    { value: ProjectStatus.IN_PROGRESS, label: 'Em Andamento' },
    { value: ProjectStatus.COMPLETED, label: 'Concluído' },
  ];

  const responsibleOptions = [
    { value: '', label: 'Todos os Heróis' },
    ...users.map(user => ({ value: user.id, label: user.name }))
  ];

  const handleFilterChange = (key: keyof IProjectFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = filters.status || filters.responsibleId || filters.search;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <h3 className="font-medium text-gray-900">Filtros</h3>
        </div>
        {hasActiveFilters && (
          <Button
            onClick={clearFilters}
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4 mr-1" />
            Limpar
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar projetos..."
            value={filters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="pl-10"
          />
        </div>

        <div>
          <select
            value={filters.status || ''}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="input-field"
            disabled={loading}
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={filters.responsibleId || ''}
            onChange={(e) => handleFilterChange('responsibleId', e.target.value)}
            className="input-field"
            disabled={loading}
          >
            {responsibleOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200">
          <span className="text-sm text-gray-500">Filtros ativos:</span>
          {filters.search && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Busca: "{filters.search}"
            </span>
          )}
          {filters.status && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Status: {statusOptions.find(s => s.value === filters.status)?.label}
            </span>
          )}
          {filters.responsibleId && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              Herói: {responsibleOptions.find(r => r.value === filters.responsibleId)?.label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
