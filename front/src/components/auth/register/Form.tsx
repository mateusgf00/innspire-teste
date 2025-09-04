import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { useAuth } from '../../../contexts/AuthContext';
import { RegisterRequest, HeroCharacter } from '../../../types/auth';
import { CHARACTER_INFO, getCharactersByUniverse } from '../../../utils/characters';
import { cn } from '../../../utils/cn';

const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .min(1, 'Nome é obrigatório'),
  email: z
    .string()
    .email('Email inválido')
    .min(1, 'Email é obrigatório'),
  password: z
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .min(1, 'Senha é obrigatória'),
  character: z.nativeEnum(HeroCharacter).optional(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const { register: registerUser, loading } = useAuth();
  const navigate = useNavigate();
  const [selectedCharacter, setSelectedCharacter] = useState<HeroCharacter | undefined>();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser({
        ...data,
        character: selectedCharacter,
      } as RegisterRequest);
      navigate('/dashboard', { replace: true });
    } catch (error) {
    }
  };

  const handleCharacterSelect = (character: HeroCharacter) => {
    setSelectedCharacter(character);
    setValue('character', character);
  };

  const marvelCharacters = getCharactersByUniverse('Marvel');
  const dcCharacters = getCharactersByUniverse('DC');

  return (
    <div className="min-h-screen flex items-center justify-center bg-hero-gradient-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-hero-primary text-white text-2xl font-bold">
            H
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Junte-se à HeroForce!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Crie sua conta e comece sua jornada heroica
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registro de Herói</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  {...register('name')}
                  type="text"
                  label="Nome Completo"
                  placeholder="Peter Parker"
                  error={errors.name?.message}
                  autoComplete="name"
                />

                <Input
                  {...register('email')}
                  type="email"
                  label="Email"
                  placeholder="peter.parker@heroforce.com"
                  error={errors.email?.message}
                  autoComplete="email"
                />
              </div>

              <Input
                {...register('password')}
                type="password"
                label="Senha"
                placeholder="Sua senha secreta"
                error={errors.password?.message}
                autoComplete="new-password"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Escolha seu Personagem Heroico (Opcional)
                </label>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Marvel</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {marvelCharacters.map(({ character, info }) => (
                      <div
                        key={character}
                        onClick={() => handleCharacterSelect(character)}
                        className={cn(
                          'character-card p-3 border-2 border-gray-200 rounded-lg text-center',
                          selectedCharacter === character && 'character-card selected'
                        )}
                      >
                        <div className="text-2xl mb-1">{info.icon}</div>
                        <div className="text-xs font-medium text-gray-700">
                          {info.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-2">DC</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {dcCharacters.map(({ character, info }) => (
                      <div
                        key={character}
                        onClick={() => handleCharacterSelect(character)}
                        className={cn(
                          'character-card p-3 border-2 border-gray-200 rounded-lg text-center',
                          selectedCharacter === character && 'character-card selected'
                        )}
                      >
                        <div className="text-2xl mb-1">{info.icon}</div>
                        <div className="text-xs font-medium text-gray-700">
                          {info.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedCharacter && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">
                        {CHARACTER_INFO[selectedCharacter].icon}
                      </span>
                      <div>
                        <div className="font-medium text-blue-900">
                          {CHARACTER_INFO[selectedCharacter].name}
                        </div>
                        <div className="text-sm text-blue-700">
                          {CHARACTER_INFO[selectedCharacter].description}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                loading={loading}
                className="w-full"
                size="lg"
              >
                Criar Conta Heroica
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Já é um herói?
                  </span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <Link
                  to="/login"
                  className="font-medium text-hero-primary hover:text-blue-500 transition-colors"
                >
                  Faça login aqui! 🚀
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
