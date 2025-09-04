import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import { getCharacterInfo } from '../../utils/characters';
import { UserRole } from '../../types/auth';
import { LogOut, Menu, X, User, Settings } from 'lucide-react';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const characterInfo = getCharacterInfo(user?.character);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-hero-primary text-white rounded-lg flex items-center justify-center font-bold">
                H
              </div>
              <span className="text-xl font-bold text-gray-900">HeroForce</span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-hero-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/projects"
              className="text-gray-700 hover:text-hero-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Projetos
            </Link>
            {user?.role === UserRole.ADMIN && (
              <Link
                to="/admin"
                className="text-gray-700 hover:text-hero-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Administração
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3">
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-sm rounded-full p-2 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    {characterInfo && (
                      <span className="text-lg">{characterInfo.icon}</span>
                    )}
                    <div className="text-left">
                      <div className="font-medium text-gray-900">{user?.name}</div>
                      <div className="text-xs text-gray-500">
                        {user?.role === UserRole.ADMIN ? 'Administrador' : 'Herói'}
                      </div>
                    </div>
                  </div>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Perfil
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Configurações
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-hero-primary block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/projects"
                className="text-gray-700 hover:text-hero-primary block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Projetos
              </Link>
              {user?.role === UserRole.ADMIN && (
                <Link
                  to="/admin"
                  className="text-gray-700 hover:text-hero-primary block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Administração
                </Link>
              )}
              
              <hr className="my-2" />
              
              <div className="px-3 py-2">
                <div className="flex items-center space-x-2 mb-2">
                  {characterInfo && (
                    <span className="text-lg">{characterInfo.icon}</span>
                  )}
                  <div>
                    <div className="font-medium text-gray-900">{user?.name}</div>
                    <div className="text-sm text-gray-500">
                      {user?.role === UserRole.ADMIN ? 'Administrador' : 'Herói'}
                    </div>
                  </div>
                </div>
              </div>
              
              <Link
                to="/profile"
                className="text-gray-700 hover:text-hero-primary block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Perfil
              </Link>
              <Link
                to="/settings"
                className="text-gray-700 hover:text-hero-primary block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Configurações
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-hero-primary block w-full text-left px-3 py-2 rounded-md text-base font-medium"
              >
                Sair
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
