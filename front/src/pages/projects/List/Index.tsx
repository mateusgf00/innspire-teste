import React, { useEffect, useState, useCallback } from 'react';
import { Layout } from '../../../components/layout/Layout';
import { ProjectCard } from '../../../components/projects/Card';
import { ProjectFilters } from '../../../components/projects/Filters';
import { ProjectFormModal } from '../../../components/projects/FormModal';
import { Button } from '../../../components/ui/Button';
import { useAuth } from '../../../contexts/AuthContext';
import { projectsService } from '../../../services/projects';
import { usersService } from '../../../services/users';
import { Project, ProjectFilters as IProjectFilters } from '../../../types/project';
import { User, UserRole } from '../../../types/auth';
import { 
  Plus,
  Target,
  AlertCircle,
  BarChart3
} from 'lucide-react';
import toast from 'react-hot-toast';

export function ProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState<IProjectFilters>({});
  const [loading, setLoading] = useState(true);
  const [filtersLoading, setFiltersLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [projectsData, usersData] = await Promise.all([
        projectsService.getProjects(),
        usersService.getUsers(),
      ]);
      
      setProjects(projectsData);
      setUsers(usersData);
    } catch (error) {
      toast.error('Erro ao carregar projetos');
    } finally {
      setLoading(false);
    }
  };

  const loadProjects = useCallback(async () => {
    try {
      setFiltersLoading(true);
      const projectsData = await projectsService.getProjects(
        filters.status,
        filters.responsibleId
      );

      let filteredProjects = projectsData;
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredProjects = projectsData.filter(project =>
          project.name.toLowerCase().includes(searchTerm) ||
          project.description.toLowerCase().includes(searchTerm) ||
          project.responsible.name.toLowerCase().includes(searchTerm)
        );
      }
      
      setProjects(filteredProjects);
    } catch (error) {
      toast.error('Erro ao carregar projetos');
    } finally {
      setFiltersLoading(false);
    }
  }, [filters.status, filters.responsibleId, filters.search]);

  const handleProjectEdit = (project: Project) => {
    setSelectedProject(project);
    setShowEditModal(true);
  };

  const handleProjectSuccess = (updatedProject: Project) => {
    loadInitialData();
    loadProjects();
    toast.success('Dados atualizados com sucesso!');
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hero-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Target className="h-8 w-8 mr-3 text-hero-primary" />
              Projetos
            </h1>
            <p className="mt-2 text-gray-600">
              {user?.role === UserRole.ADMIN 
                ? 'Gerencie todos os projetos heroicos da HeroForce' 
                : 'Visualize e acompanhe os projetos heroicos'
              }
            </p>
          </div>
          {user?.role === UserRole.ADMIN && (
            <Button 
              className="mt-4 sm:mt-0"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Projeto
            </Button>
          )}
        </div>

        <ProjectFilters
          filters={filters}
          onFiltersChange={setFilters}
          users={users}
          loading={filtersLoading}
        />

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <BarChart3 className="h-6 w-6 mr-2" />
              Todos os Projetos
              {projects.length > 0 && (
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({projects.length} {projects.length === 1 ? 'projeto' : 'projetos'})
                </span>
              )}
            </h2>
          </div>

          {filtersLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hero-primary"></div>
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onEdit={handleProjectEdit}
                  showActions={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum projeto encontrado
              </h3>
              <p className="text-gray-500 mb-6">
                {Object.keys(filters).some(key => filters[key as keyof IProjectFilters])
                  ? 'Tente ajustar os filtros para encontrar projetos.'
                  : user?.role === UserRole.ADMIN
                    ? 'Comece criando seu primeiro projeto heroico!'
                    : 'Aguarde a criação de projetos pelos administradores.'
                }
              </p>
              {user?.role === UserRole.ADMIN && (
                <Button onClick={() => setShowCreateModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Primeiro Projeto
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      <ProjectFormModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleProjectSuccess}
      />

      <ProjectFormModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedProject(undefined);
        }}
        project={selectedProject}
        onSuccess={handleProjectSuccess}
      />
    </Layout>
  );
}
