import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useStore } from '../store';
import Button from '../components/Button';
import Modal from '../components/Modal';
import SearchInput from '../components/SearchInput';
import toast from 'react-hot-toast';

export default function Roles() {
  const { roles, permissions, addRole, updateRole, deleteRole } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: [],
  });

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const role = {
      id: editingRole || crypto.randomUUID(),
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (editingRole) {
      updateRole(editingRole, role);
      toast.success('Role updated successfully');
    } else {
      addRole(role);
      toast.success('Role created successfully');
    }

    setIsModalOpen(false);
    setEditingRole(null);
    setFormData({
      name: '',
      description: '',
      permissions: [],
    });
  };

  const handleEdit = (role) => {
    setEditingRole(role.id);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: role.permissions,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this role?')) {
      deleteRole(id);
      toast.success('Role deleted successfully');
    }
  };

  const handlePermissionToggle = (permissionId) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((id) => id !== permissionId)
        : [...prev.permissions, permissionId],
    }));
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Roles</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage roles and their permissions
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Add Role
          </Button>
        </div>
      </div>

      <div className="mt-8 mb-4">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search roles by name or description..."
        />
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                    Role
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Description
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Permissions
                  </th>
                  <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRoles.map((role) => (
                  <tr key={role.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                      {role.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {role.description}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      <div className="flex flex-wrap gap-2">
                        {role.permissions.map((permId) => (
                          <span
                            key={permId}
                            className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                          >
                            {
                              permissions.find((p) => p.id === permId)
                                ?.name
                            }
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="mr-2"
                        onClick={() => handleEdit(role)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(role.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingRole(null);
          setFormData({
            name: '',
            description: '',
            permissions: [],
          });
        }}
        title={editingRole ? 'Edit Role' : 'Add Role'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Permissions
            </label>
            <div className="mt-2 space-y-2">
              {permissions.map((permission) => (
                <div key={permission.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`permission-${permission.id}`}
                    checked={formData.permissions.includes(permission.id)}
                    onChange={() => handlePermissionToggle(permission.id)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={`permission-${permission.id}`}
                    className="ml-2 block text-sm text-gray-900"
                  >
                    {permission.name}
                    <span className="text-gray-500 text-xs ml-1">
                      ({permission.description})
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <Button type="submit">
              {editingRole ? 'Update Role' : 'Add Role'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsModalOpen(false);
                setEditingRole(null);
                setFormData({
                  name: '',
                  description: '',
                  permissions: [],
                });
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}