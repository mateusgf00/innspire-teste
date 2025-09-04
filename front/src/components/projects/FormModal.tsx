import { Project } from '../../types/project';
import { ProjectForm } from './Form';
import { X } from 'lucide-react';

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: Project;
  onSuccess?: (project: Project) => void;
}

export function ProjectFormModal({ 
  isOpen, 
  onClose, 
  project, 
  onSuccess 
}: ProjectFormModalProps) {
  if (!isOpen) return null;

  const handleSuccess = (updatedProject: Project) => {
    if (onSuccess) {
      onSuccess(updatedProject);
    }
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 bg-white rounded-full shadow-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <ProjectForm
                project={project}
                onSuccess={handleSuccess}
                onCancel={handleCancel}
                isModal={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
