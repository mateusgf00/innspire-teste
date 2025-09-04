import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { useAuth } from '../../../contexts/AuthContext';
import { LoginRequest } from '../../../types/auth';

const loginSchema = z.object({
  email: z
    .string()
    .email('Email inválido')
    .min(1, 'Email é obrigatório'),
  password: z
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .min(1, 'Senha é obrigatória'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data as LoginRequest);
      
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-hero-gradient-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-hero-primary text-white text-2xl font-bold">
            H
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Bem-vindo de volta, Herói!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Entre na sua conta para gerenciar seus projetos heroicos
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                {...register('email')}
                type="email"
                label="Email"
                placeholder="seu.email@heroforce.com"
                error={errors.email?.message}
                autoComplete="email"
              />

              <Input
                {...register('password')}
                type="password"
                label="Senha"
                placeholder="Sua senha secreta"
                error={errors.password?.message}
                autoComplete="current-password"
              />

              <Button
                type="submit"
                loading={loading}
                className="w-full"
                size="lg"
              >
                Entrar na HeroForce
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Novo herói?
                  </span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <Link
                  to="/register"
                  className="font-medium text-hero-primary hover:text-blue-500 transition-colors"
                >
                  Crie sua conta heroica aqui!
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
