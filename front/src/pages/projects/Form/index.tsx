import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../../../components/layout/Layout';
import { ProjectForm } from '../../../components/projects/Form';
import { Project } from '../../../types/project';

export function FormPage() {
  const navigate = useNavigate();
  const project: Project | undefined = undefined;

  const handleSuccess = (updatedProject: Project) => {
    navigate('/dashboard');
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <Layout>
      <ProjectForm
        project={project}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
        isModal={false}
      />
    </Layout>
  );
}
