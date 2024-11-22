import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const defaultPermissions = [
  { id: '1', name: 'read', description: 'Can read data' },
  { id: '2', name: 'write', description: 'Can create and edit data' },
  { id: '3', name: 'delete', description: 'Can delete data' },
  { id: '4', name: 'manage_users', description: 'Can manage users' },
  { id: '5', name: 'manage_roles', description: 'Can manage roles' },
];

export const useStore = create(
  persist(
    (set) => ({
      users: [],
      roles: [],
      permissions: defaultPermissions,
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      updateUser: (id, updatedUser) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id ? { ...user, ...updatedUser } : user
          ),
        })),
      deleteUser: (id) =>
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
        })),
      addRole: (role) => set((state) => ({ roles: [...state.roles, role] })),
      updateRole: (id, updatedRole) =>
        set((state) => ({
          roles: state.roles.map((role) =>
            role.id === id ? { ...role, ...updatedRole } : role
          ),
        })),
      deleteRole: (id) =>
        set((state) => ({
          roles: state.roles.filter((role) => role.id !== id),
        })),
    }),
    {
      name: 'rbac-storage',
    }
  )
);