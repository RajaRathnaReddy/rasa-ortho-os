import { create } from 'zustand';
import type { User, UserRole, Branch } from '../types';
import { BRANCHES } from '../lib/constants';

interface AuthState {
  user: User | null;
  currentBranch: Branch;
  isAuthenticated: boolean;
  login: (role?: UserRole) => void;
  validateAndLogin: (username: string, pass: string, role?: UserRole) => { success: boolean; message?: string };
  logout: () => void;
  setBranch: (branchId: string) => void;
}

const demoUsers: Record<UserRole, User> = {
  super_admin: { id: 'user-sa-1', name: 'Rasa Administrator', email: 'admin@rasaortho.com', phone: '+919845000001', role: 'super_admin', branchIds: ['branch-1', 'branch-2', 'branch-3', 'branch-4'], isActive: true, createdAt: '', updatedAt: '' },
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

export const useAuthStore = create<AuthState>((set) => ({
  user: demoUsers.super_admin,
  currentBranch: BRANCHES[0],
  isAuthenticated: storedSession,
  login: (role: UserRole = 'super_admin') => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('rasa_ortho_session', 'true');
    }
    set({
      user: demoUsers[role] || demoUsers.super_admin,
      isAuthenticated: true,
      currentBranch: BRANCHES[0],
    });
  },
  validateAndLogin: (username: string, pass: string, role: UserRole = 'super_admin') => {
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = pass.trim();

    // Authorized usernames: 'rasa', 'admin', 'raja', 'dr.anand', 'doctor', 'surgeon', or any staff ID
    const validUsers = ['rasa', 'admin', 'raja', 'rajarathna', 'dr.anand', 'doctor', 'surgeon', 'nurse', 'admin@rasaortho.com'];
    
    // Master hospital passcodes issued by Raja Rathna Reddy
    const validPasscodes = ['rasatech007', 'RasaTech007', 'rasa@2026', 'ortho2026'];

    if ((validUsers.includes(cleanUser) || cleanUser.length >= 3) && validPasscodes.includes(cleanPass)) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('rasa_ortho_session', 'true');
      }
      set({
        user: demoUsers[role] || demoUsers.super_admin,
        isAuthenticated: true,
        currentBranch: BRANCHES[0],
      });
      return { success: true };
    }

    return {
      success: false,
      message: 'Access Denied: Invalid Hospital Security Passcode. Only personnel with an authorized passcode issued by Raja Rathna Reddy can log in.',
    };
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('rasa_ortho_session');
    }
    set({ user: null, isAuthenticated: false });
  },
  setBranch: (branchId: string) => {
    const branch = BRANCHES.find(b => b.id === branchId);
    if (branch) set({ currentBranch: branch });
  },
}));
