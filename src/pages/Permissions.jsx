import React, { useState } from 'react';
import { useStore } from '../store';
import SearchInput from '../components/SearchInput';

export default function Permissions() {
  const { permissions } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPermissions = permissions.filter(
    (permission) =>
      permission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Permissions</h1>
          <p className="mt-2 text-sm text-gray-700">
            View all available permissions in the system
          </p>
        </div>
      </div>

      <div className="mt-8 mb-4">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search permissions by name or description..."
        />
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                    Permission
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPermissions.map((permission) => (
                  <tr key={permission.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                      {permission.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {permission.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}