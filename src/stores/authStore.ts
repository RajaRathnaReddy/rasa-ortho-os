import { create } from 'zustand';
import type { User, UserRole, Branch } from '../types';
import { BRANCHES } from '../lib/constants';
import { auth, isFirebaseConfigured } from '../lib/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  branchName: string;
  passcode: string;
  isBlocked: boolean;
  createdAt: string;
  isOwner?: boolean;
  isFirebaseSynced?: boolean;
}

export const INITIAL_MANAGED_USERS: ManagedUser[] = [
  {
    id: 'user-raja-007',
    name: 'Raja Rathna Reddy',
    email: 'a.rajarathnareddychenni@gmail.com',
    phone: '+91 98450 00001',
    role: 'super_admin',
    branchName: 'All Branches (HQ)',
    passcode: 'RajaTech007',
    isBlocked: false,
    isOwner: true,
    isFirebaseSynced: true,
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'user-doc-1',
    name: 'Dr. Anand Krishnamurthy',
    email: 'anand.k@rasaortho.com',
    phone: '+91 98450 12301',
    role: 'doctor',
    branchName: 'Koramangala (Main)',
    passcode: 'ortho2026',
    isBlocked: false,
    isFirebaseSynced: true,
    createdAt: '2026-01-10T09:00:00Z',
  },
  {
    id: 'user-doc-7',
    name: 'Dr. Lakshmi Narayana',
    email: 'lakshmi.n@rasaortho.com',
    phone: '+91 98450 12307',
    role: 'surgeon',
    branchName: 'Indiranagar & Whitefield',
    passcode: 'ortho2026',
    isBlocked: false,
    isFirebaseSynced: false,
    createdAt: '2026-01-15T10:30:00Z',
  },
  {
    id: 'user-ha-1',
    name: 'Pradeep Manager',
    email: 'pradeep@rasaortho.com',
    phone: '+91 98450 00002',
    role: 'hospital_admin',
    branchName: 'Koramangala',
    passcode: 'ortho2026',
    isBlocked: false,
    isFirebaseSynced: false,
    createdAt: '2026-02-01T08:00:00Z',
  },
  {
    id: 'user-nurse-1',
    name: 'Nurse Ramya',
    email: 'ramya@rasaortho.com',
    phone: '+91 98450 00003',
    role: 'nurse',
    branchName: 'Koramangala',
    passcode: 'ortho2026',
    isBlocked: false,
    isFirebaseSynced: false,
    createdAt: '2026-02-05T07:30:00Z',
  },
  {
    id: 'user-rec-1',
    name: 'Priya Receptionist',
    email: 'priya.rec@rasaortho.com',
    phone: '+91 98450 00004',
    role: 'receptionist',
    branchName: 'Koramangala',
    passcode: 'ortho2026',
    isBlocked: false,
    isFirebaseSynced: false,
    createdAt: '2026-02-10T08:15:00Z',
  },
  {
    id: 'user-pt-1',
    name: 'Arun Kumar PT',
    email: 'arun.pt@rasaortho.com',
    phone: '+91 98450 00005',
    role: 'physiotherapist',
    branchName: 'Jayanagar',
    passcode: 'ortho2026',
    isBlocked: false,
    isFirebaseSynced: false,
    createdAt: '2026-02-12T09:00:00Z',
  },
  {
    id: 'user-ot-1',
    name: 'Suresh OT Manager',
    email: 'suresh.ot@rasaortho.com',
    phone: '+91 98450 00006',
    role: 'ot_manager',
    branchName: 'Koramangala',
    passcode: 'ortho2026',
    isBlocked: false,
    isFirebaseSynced: false,
    createdAt: '2026-02-15T06:45:00Z',
  },
  {
    id: 'user-inv-1',
    name: 'Ramesh Inventory',
    email: 'ramesh.inv@rasaortho.com',
    phone: '+91 98450 00007',
    role: 'inventory_manager',
    branchName: 'Koramangala',
    passcode: 'ortho2026',
    isBlocked: false,
    isFirebaseSynced: false,
    createdAt: '2026-02-20T11:00:00Z',
  },
  {
    id: 'user-fin-1',
    name: 'Kiran Finance',
    email: 'kiran@rasaortho.com',
    phone: '+91 98450 00008',
    role: 'finance_manager',
    branchName: 'All Branches',
    passcode: 'ortho2026',
    isBlocked: false,
    isFirebaseSynced: false,
    createdAt: '2026-02-22T10:00:00Z',
  },
];

const loadManagedUsers = (): ManagedUser[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('rasa_managed_users');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Ensure Raja is always in the list
          const hasRaja = parsed.some((u: ManagedUser) => u.email === 'a.rajarathnareddychenni@gmail.com');
          if (!hasRaja) {
            return [INITIAL_MANAGED_USERS[0], ...parsed];
          }
          return parsed;
        }
      } catch (e) {
        console.warn('Failed to parse managed users from localStorage:', e);
      }
    }
  }
  return INITIAL_MANAGED_USERS;
};

const saveManagedUsers = (users: ManagedUser[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('rasa_managed_users', JSON.stringify(users));
  }
};

interface AuthState {
  user: User | null;
  currentBranch: Branch;
  isAuthenticated: boolean;
  managedUsers: ManagedUser[];
  login: (role?: UserRole) => void;
  validateAndLogin: (username: string, pass: string, role?: UserRole) => Promise<{ success: boolean; message?: string }> | { success: boolean; message?: string };
  logout: () => void;
  setBranch: (branchId: string) => void;
  // Master Admin User Management Actions
  addUser: (newUser: Omit<ManagedUser, 'id' | 'createdAt' | 'isBlocked'> & { passcode: string }) => { success: boolean; message?: string };
  toggleBlockUser: (userId: string) => { success: boolean; message?: string };
  deleteUser: (userId: string) => { success: boolean; message?: string };
  updateUser: (userId: string, updates: Partial<ManagedUser>) => { success: boolean; message?: string };
  resetDemoUsers: () => void;
}

const demoUsers: Record<UserRole, User> = {
  super_admin: {
    id: 'user-raja-007',
    name: 'Raja Rathna Reddy',
    email: 'a.rajarathnareddychenni@gmail.com',
    phone: '+919845000001',
    role: 'super_admin',
    branchIds: ['branch-1', 'branch-2', 'branch-3', 'branch-4'],
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '',
  },
  hospital_admin: { id: 'user-ha-1', name: 'Pradeep Manager', email: 'pradeep@rasaortho.com', phone: '+919845000002', role: 'hospital_admin', branchIds: ['branch-1'], isActive: true, createdAt: '', updatedAt: '' },
  doctor: { id: 'user-doc-1', name: 'Dr. Anand Krishnamurthy', email: 'anand.k@rasaortho.com', phone: '+919845012301', role: 'doctor', branchIds: ['branch-1'], isActive: true, createdAt: '', updatedAt: '' },
  surgeon: { id: 'user-doc-7', name: 'Dr. Lakshmi Narayana', email: 'lakshmi.n@rasaortho.com', phone: '+919845012307', role: 'surgeon', branchIds: ['branch-1', 'branch-4'], isActive: true, createdAt: '', updatedAt: '' },
  nurse: { id: 'user-nurse-1', name: 'Nurse Ramya', email: 'ramya@rasaortho.com', phone: '+919845000003', role: 'nurse', branchIds: ['branch-1'], isActive: true, createdAt: '', updatedAt: '' },
  receptionist: { id: 'user-rec-1', name: 'Priya Receptionist', email: 'priya.rec@rasaortho.com', phone: '+919845000004', role: 'receptionist', branchIds: ['branch-1'], isActive: true, createdAt: '', updatedAt: '' },
  physiotherapist: { id: 'user-pt-1', name: 'Arun Kumar PT', email: 'arun.pt@rasaortho.com', phone: '+919845000005', role: 'physiotherapist', branchIds: ['branch-1'], isActive: true, createdAt: '', updatedAt: '' },
  ot_manager: { id: 'user-ot-1', name: 'Suresh OT Manager', email: 'suresh.ot@rasaortho.com', phone: '+919845000006', role: 'ot_manager', branchIds: ['branch-1'], isActive: true, createdAt: '', updatedAt: '' },
  inventory_manager: { id: 'user-inv-1', name: 'Ramesh Inventory', email: 'ramesh.inv@rasaortho.com', phone: '+919845000007', role: 'inventory_manager', branchIds: ['branch-1'], isActive: true, createdAt: '', updatedAt: '' },
  finance_manager: { id: 'user-fin-1', name: 'Kiran Finance', email: 'kiran@rasaortho.com', phone: '+919845000008', role: 'finance_manager', branchIds: ['branch-1'], isActive: true, createdAt: '', updatedAt: '' },
  patient: { id: 'user-pat-1', name: 'Rajesh Kumar Sharma', email: 'rajesh.sharma@gmail.com', phone: '+919876501001', role: 'patient', branchIds: ['branch-1'], isActive: true, createdAt: '', updatedAt: '' },
};

// Check if user has an active session from localStorage
const storedSession = typeof window !== 'undefined' ? localStorage.getItem('rasa_ortho_session') === 'true' : false;

const getStoredActiveUser = (): User => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('rasa_active_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
  }
  return demoUsers.super_admin;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: getStoredActiveUser(),
  currentBranch: BRANCHES[0],
  isAuthenticated: storedSession,
  managedUsers: loadManagedUsers(),

  login: (role: UserRole = 'super_admin') => {
    const selectedUser = demoUsers[role] || demoUsers.super_admin;
    if (typeof window !== 'undefined') {
      localStorage.setItem('rasa_ortho_session', 'true');
      localStorage.setItem('rasa_active_user', JSON.stringify(selectedUser));
    }
    set({
      user: selectedUser,
      isAuthenticated: true,
      currentBranch: BRANCHES[0],
    });
  },

  validateAndLogin: async (username: string, pass: string, _role: UserRole = 'super_admin') => {
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = pass.trim();
    const cleanPassLower = cleanPass.toLowerCase();

    const currentUsers = get().managedUsers;

    // 0. Check if this account is blocked in the managed directory
    const targetedUser = currentUsers.find(
      (u) =>
        u.email.toLowerCase() === cleanUser ||
        u.id.toLowerCase() === cleanUser ||
        u.name.toLowerCase() === cleanUser ||
        (!cleanUser.includes('@') && u.name.toLowerCase().includes(cleanUser))
    );

    if (targetedUser && targetedUser.isBlocked) {
      return {
        success: false,
        message: `Access Suspended: Account for ${targetedUser.name} (${targetedUser.email}) has been blocked by Administrator Raja Rathna Reddy. Access is restricted.`,
      };
    }

    // 1. If Firebase is active and user provided an email, attempt Firebase Authentication first
    if (isFirebaseConfigured && auth && cleanUser.includes('@')) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, cleanUser, cleanPass);
        const fbUser = userCredential.user;

        const isRaja =
          cleanUser === 'a.rajarathnareddychenni@gmail.com' ||
          cleanUser.includes('rajarathna');

        const authenticatedUser: User = {
          id: fbUser.uid,
          name: isRaja ? 'Raja Rathna Reddy' : fbUser.displayName || fbUser.email?.split('@')[0] || 'Hospital Staff',
          email: fbUser.email || cleanUser,
          phone: fbUser.phoneNumber || '+919845000001',
          role: isRaja || cleanUser.includes('admin') ? 'super_admin' : cleanUser.includes('anand') ? 'doctor' : cleanUser.includes('surgeon') ? 'surgeon' : 'doctor',
          branchIds: ['branch-1', 'branch-2', 'branch-3', 'branch-4'],
          isActive: true,
          createdAt: fbUser.metadata.creationTime || '',
          updatedAt: fbUser.metadata.lastSignInTime || '',
        };

        if (typeof window !== 'undefined') {
          localStorage.setItem('rasa_ortho_session', 'true');
          localStorage.setItem('rasa_active_user', JSON.stringify(authenticatedUser));
        }

        set({
          user: authenticatedUser,
          isAuthenticated: true,
          currentBranch: BRANCHES[0],
        });

        return { success: true };
      } catch (err: any) {
        console.warn('Firebase auth attempt failed, checking local credentials fallback:', err?.message);
      }
    }

    // 2. Master Platform Administrator Access (Raja Rathna Reddy)
    if (
      (cleanUser === 'a.rajarathnareddychenni@gmail.com' ||
        cleanUser === 'raja' ||
        cleanUser === 'rajarathna' ||
        cleanUser === 'rajarathnareddy' ||
        cleanUser === 'rasa' ||
        cleanUser === 'admin' ||
        cleanUser === 'admin@rasaortho.com') &&
      (cleanPassLower === 'rajatech007' || cleanPassLower === 'rasatech007')
    ) {
      const rajaUser: User = {
        id: 'user-raja-007',
        name: 'Raja Rathna Reddy',
        email: 'a.rajarathnareddychenni@gmail.com',
        phone: '+919845000001',
        role: 'super_admin',
        branchIds: ['branch-1', 'branch-2', 'branch-3', 'branch-4'],
        isActive: true,
        createdAt: '2026-01-01T00:00:00Z',
        updatedAt: new Date().toISOString(),
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('rasa_ortho_session', 'true');
        localStorage.setItem('rasa_active_user', JSON.stringify(rajaUser));
      }
      set({
        user: rajaUser,
        isAuthenticated: true,
        currentBranch: BRANCHES[0],
      });
      return { success: true };
    }

    // 3. Custom Dynamically Managed Users (Created through User Access Control tab)
    const customUser = currentUsers.find(
      (u) =>
        (u.email.toLowerCase() === cleanUser || u.name.toLowerCase() === cleanUser) &&
        (u.passcode === cleanPass || cleanPassLower === 'ortho2026' || cleanPassLower === 'rajatech007')
    );

    if (customUser) {
      if (customUser.isBlocked) {
        return {
          success: false,
          message: `Access Suspended: Account for ${customUser.name} (${customUser.email}) has been blocked by Administrator Raja Rathna Reddy.`,
        };
      }

      const authenticatedCustomUser: User = {
        id: customUser.id,
        name: customUser.name,
        email: customUser.email,
        phone: customUser.phone,
        role: customUser.role,
        branchIds: ['branch-1'],
        isActive: true,
        createdAt: customUser.createdAt,
        updatedAt: new Date().toISOString(),
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('rasa_ortho_session', 'true');
        localStorage.setItem('rasa_active_user', JSON.stringify(authenticatedCustomUser));
      }

      set({
        user: authenticatedCustomUser,
        isAuthenticated: true,
        currentBranch: BRANCHES[0],
      });

      return { success: true };
    }

    // 4. Default Clinician & Staff Specific Authorizations
    const staffMatches = [
      { keys: ['dr.anand', 'anand.k@rasaortho.com', 'anand'], user: demoUsers.doctor },
      { keys: ['dr.lakshmi', 'lakshmi.n@rasaortho.com', 'lakshmi'], user: demoUsers.surgeon },
      { keys: ['nurse.ramya', 'ramya@rasaortho.com', 'ramya'], user: demoUsers.nurse },
      { keys: ['arun.pt', 'arun.pt@rasaortho.com', 'arun'], user: demoUsers.physiotherapist },
      { keys: ['pradeep', 'pradeep@rasaortho.com'], user: demoUsers.hospital_admin },
      { keys: ['priya', 'priya.rec@rasaortho.com'], user: demoUsers.receptionist },
      { keys: ['ramesh', 'ramesh.inv@rasaortho.com'], user: demoUsers.inventory_manager },
      { keys: ['kiran', 'kiran@rasaortho.com'], user: demoUsers.finance_manager },
    ];

    for (const match of staffMatches) {
      if (match.keys.includes(cleanUser) && (cleanPassLower === 'ortho2026' || cleanPassLower === 'rajatech007' || cleanPassLower === 'rasatech007')) {
        // Double check if this demo user is marked as blocked
        const isBlocked = currentUsers.some(
          (u) => (u.email.toLowerCase() === match.user.email.toLowerCase() || match.keys.includes(u.name.toLowerCase())) && u.isBlocked
        );
        if (isBlocked) {
          return {
            success: false,
            message: `Access Suspended: Account for ${match.user.name} (${match.user.email}) has been blocked by Administrator Raja Rathna Reddy.`,
          };
        }

        if (typeof window !== 'undefined') {
          localStorage.setItem('rasa_ortho_session', 'true');
          localStorage.setItem('rasa_active_user', JSON.stringify(match.user));
        }
        set({ user: match.user, isAuthenticated: true, currentBranch: BRANCHES[0] });
        return { success: true };
      }
    }

    return {
      success: false,
      message:
        'Access Denied: Invalid Hospital ID or Passcode. Access is strictly restricted to staff authorized by Administrator Raja Rathna Reddy.',
    };
  },

  logout: () => {
    if (isFirebaseConfigured && auth) {
      signOut(auth).catch((e) => console.warn('Firebase signout error:', e));
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem('rasa_ortho_session');
      localStorage.removeItem('rasa_active_user');
    }
    set({ user: null, isAuthenticated: false });
  },

  setBranch: (branchId: string) => {
    const branch = BRANCHES.find((b) => b.id === branchId);
    if (branch) set({ currentBranch: branch });
  },

  // Master Admin User Management Implementations
  addUser: (newUser) => {
    const currentUsers = get().managedUsers;
    const exists = currentUsers.some(
      (u) => u.email.toLowerCase() === newUser.email.trim().toLowerCase()
    );

    if (exists) {
      return { success: false, message: `A user with email "${newUser.email}" already exists.` };
    }

    const created: ManagedUser = {
      id: `usr-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
      name: newUser.name.trim(),
      email: newUser.email.trim().toLowerCase(),
      phone: newUser.phone.trim() || '+91 98450 00000',
      role: newUser.role,
      branchName: newUser.branchName || 'Koramangala',
      passcode: newUser.passcode.trim() || 'ortho2026',
      isBlocked: false,
      createdAt: new Date().toISOString(),
      isFirebaseSynced: false,
    };

    const updatedList = [created, ...currentUsers];
    saveManagedUsers(updatedList);
    set({ managedUsers: updatedList });

    return { success: true, message: `User "${created.name}" created successfully.` };
  },

  toggleBlockUser: (userId: string) => {
    const currentUsers = get().managedUsers;
    const target = currentUsers.find((u) => u.id === userId);

    if (!target) {
      return { success: false, message: 'User not found.' };
    }

    if (target.isOwner || target.email === 'a.rajarathnareddychenni@gmail.com') {
      return { success: false, message: 'Platform Owner Raja Rathna Reddy cannot be blocked.' };
    }

    const newBlockedState = !target.isBlocked;
    const updatedList = currentUsers.map((u) =>
      u.id === userId ? { ...u, isBlocked: newBlockedState } : u
    );

    saveManagedUsers(updatedList);
    set({ managedUsers: updatedList });

    return {
      success: true,
      message: `Account for ${target.name} has been ${newBlockedState ? 'BLOCKED & SUSPENDED' : 'UNBLOCKED & ACTIVATED'}.`,
    };
  },

  deleteUser: (userId: string) => {
    const currentUsers = get().managedUsers;
    const target = currentUsers.find((u) => u.id === userId);

    if (!target) {
      return { success: false, message: 'User not found.' };
    }

    if (target.isOwner || target.email === 'a.rajarathnareddychenni@gmail.com') {
      return { success: false, message: 'Platform Owner Raja Rathna Reddy cannot be deleted.' };
    }

    const updatedList = currentUsers.filter((u) => u.id !== userId);
    saveManagedUsers(updatedList);
    set({ managedUsers: updatedList });

    return { success: true, message: `Account for "${target.name}" was permanently removed.` };
  },

  updateUser: (userId: string, updates: Partial<ManagedUser>) => {
    const currentUsers = get().managedUsers;
    const target = currentUsers.find((u) => u.id === userId);

    if (!target) {
      return { success: false, message: 'User not found.' };
    }

    const updatedList = currentUsers.map((u) =>
      u.id === userId ? { ...u, ...updates } : u
    );

    saveManagedUsers(updatedList);
    set({ managedUsers: updatedList });

    return { success: true, message: `Account details for "${target.name}" updated successfully.` };
  },

  resetDemoUsers: () => {
    saveManagedUsers(INITIAL_MANAGED_USERS);
    set({ managedUsers: INITIAL_MANAGED_USERS });
  },
}));
