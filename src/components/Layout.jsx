import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Shield, Users, UserCog } from 'lucide-react';
import clsx from 'clsx';

const navigation = [
  { name: 'Users', href: '/', icon: Users },
  { name: 'Roles', href: '/roles', icon: UserCog },
  { name: 'Permissions', href: '/permissions', icon: Shield },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <Shield className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  RBAC Dashboard
                </span>
              </div>
              <div className="ml-6 flex space-x-8">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={clsx(
                        'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium',
                        location.pathname === item.href
                          ? 'border-indigo-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      )}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-10">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}