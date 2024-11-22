import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import { useStore } from '../store';
import Button from '../components/Button';
import Modal from '../components/Modal';
import SearchInput from '../components/SearchInput';
import toast from 'react-hot-toast';

export default function Users() {
  const { users, roles, addUser, updateUser, deleteUser } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roleId: '',
    status: 'active',
  });

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      roles.find((role) => role.id === user.roleId)?.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      id: editingUser || crypto.randomUUID(),
      ...formData,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        formData.name
      )}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (editingUser) {
      updateUser(editingUser, user);
      toast.success('User updated successfully');
    } else {
      addUser(user);
      toast.success('User created successfully');
    }

    setIsModalOpen(false);
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      roleId: '',
      status: 'active',
    });
  };

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      status: user.status,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      deleteUser(id);
      toast.success('User deleted successfully');
    }
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage user accounts and their roles
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Add User
          </Button>
        </div>
      </div>

      <div className="mt-8 mb-4">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search users by name, email, or role..."
        />
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                    User
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Role
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={user.avatar}
                          alt=""
                        />
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {roles.find((role) => role.id === user.roleId)?.name ||
                        'No Role'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span
                        className={clsx(
                          'inline-flex rounded-full px-2 text-xs font-semibold leading-5',
                          {
                            'bg-green-100 text-green-800':
                              user.status === 'active',
                            'bg-red-100 text-red-800': user.status === 'inactive',
                          }
                        )}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="mr-2"
                        onClick={() => handleEdit(user)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(user.id)}
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
          setEditingUser(null);
          setFormData({
            name: '',
            email: '',
            roleId: '',
            status: 'active',
          });
        }}
        title={editingUser ? 'Edit User' : 'Add User'}
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
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.roleId}
              onChange={(e) =>
                setFormData({ ...formData, roleId: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            >
              <option value="">Select a role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value,
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <Button type="submit">
              {editingUser ? 'Update User' : 'Add User'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsModalOpen(false);
                setEditingUser(null);
                setFormData({
                  name: '',
                  email: '',
                  roleId: '',
                  status: 'active',
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