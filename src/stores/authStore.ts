import { create } from 'zustand';
import type { User, UserRole, Branch } from '../types';
import { BRANCHES } from '../lib/constants';
import { auth, isFirebaseConfigured } from '../lib/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

interface AuthState {
  user: User | null;
  currentBranch: Branch;
  isAuthenticated: boolean;
  login: (role?: UserRole) => void;
  validateAndLogin: (username: string, pass: string, role?: UserRole) => Promise<{ success: boolean; message?: string }> | { success: boolean; message?: string };
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
  validateAndLogin: async (username: string, pass: string, role: UserRole = 'super_admin') => {
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = pass.trim();

    // 1. If Firebase is active and user provided an email, attempt Firebase Authentication first
    if (isFirebaseConfigured && auth && cleanUser.includes('@')) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, cleanUser, cleanPass);
        const fbUser = userCredential.user;

        const authenticatedUser: User = {
          id: fbUser.uid,
          name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Hospital Staff',
          email: fbUser.email || cleanUser,
          phone: fbUser.phoneNumber || '+919845000000',
          role: cleanUser.includes('admin') ? 'super_admin' : cleanUser.includes('anand') ? 'doctor' : cleanUser.includes('surgeon') ? 'surgeon' : 'doctor',
          branchIds: ['branch-1'],
          isActive: true,
          createdAt: fbUser.metadata.creationTime || '',
          updatedAt: fbUser.metadata.lastSignInTime || '',
        };

        if (typeof window !== 'undefined') {
          localStorage.setItem('rasa_ortho_session', 'true');
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

    // Master Administrator Access (Raja Rathna Reddy)
    if (
      (cleanUser === 'rasa' ||
        cleanUser === 'raja' ||
        cleanUser === 'rajarathnareddy' ||
        cleanUser === 'admin' ||
        cleanUser === 'admin@rasaortho.com') &&
      cleanPass === 'rasatech007'
    ) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('rasa_ortho_session', 'true');
      }
      set({
        user: demoUsers.super_admin,
        isAuthenticated: true,
        currentBranch: BRANCHES[0],
      });
      return { success: true };
    }

    // Clinician & Staff Specific Authorizations
    if (
      (cleanUser === 'dr.anand' || cleanUser === 'anand.k@rasaortho.com' || cleanUser === 'anand') &&
      (cleanPass === 'ortho2026' || cleanPass === 'rasatech007')
    ) {
      if (typeof window !== 'undefined') localStorage.setItem('rasa_ortho_session', 'true');
      set({ user: demoUsers.doctor, isAuthenticated: true, currentBranch: BRANCHES[0] });
      return { success: true };
    }

    if (
      (cleanUser === 'dr.lakshmi' || cleanUser === 'lakshmi.n@rasaortho.com' || cleanUser === 'lakshmi') &&
      (cleanPass === 'ortho2026' || cleanPass === 'rasatech007')
    ) {
      if (typeof window !== 'undefined') localStorage.setItem('rasa_ortho_session', 'true');
      set({ user: demoUsers.surgeon, isAuthenticated: true, currentBranch: BRANCHES[0] });
      return { success: true };
    }

    if (
      (cleanUser === 'nurse.ramya' || cleanUser === 'ramya@rasaortho.com' || cleanUser === 'ramya') &&
      (cleanPass === 'ortho2026' || cleanPass === 'rasatech007')
    ) {
      if (typeof window !== 'undefined') localStorage.setItem('rasa_ortho_session', 'true');
      set({ user: demoUsers.nurse, isAuthenticated: true, currentBranch: BRANCHES[0] });
      return { success: true };
    }

    if (
      (cleanUser === 'arun.pt' || cleanUser === 'arun.pt@rasaortho.com' || cleanUser === 'arun') &&
      (cleanPass === 'ortho2026' || cleanPass === 'rasatech007')
    ) {
      if (typeof window !== 'undefined') localStorage.setItem('rasa_ortho_session', 'true');
      set({ user: demoUsers.physiotherapist, isAuthenticated: true, currentBranch: BRANCHES[0] });
      return { success: true };
    }

    if (
      (cleanUser === 'pradeep' || cleanUser === 'pradeep@rasaortho.com') &&
      (cleanPass === 'ortho2026' || cleanPass === 'rasatech007')
    ) {
      if (typeof window !== 'undefined') localStorage.setItem('rasa_ortho_session', 'true');
      set({ user: demoUsers.hospital_admin, isAuthenticated: true, currentBranch: BRANCHES[0] });
      return { success: true };
    }

    if (
      (cleanUser === 'priya' || cleanUser === 'priya.rec@rasaortho.com') &&
      (cleanPass === 'ortho2026' || cleanPass === 'rasatech007')
    ) {
      if (typeof window !== 'undefined') localStorage.setItem('rasa_ortho_session', 'true');
      set({ user: demoUsers.receptionist, isAuthenticated: true, currentBranch: BRANCHES[0] });
      return { success: true };
    }

    if (
      (cleanUser === 'ramesh' || cleanUser === 'ramesh.inv@rasaortho.com') &&
      (cleanPass === 'ortho2026' || cleanPass === 'rasatech007')
    ) {
      if (typeof window !== 'undefined') localStorage.setItem('rasa_ortho_session', 'true');
      set({ user: demoUsers.inventory_manager, isAuthenticated: true, currentBranch: BRANCHES[0] });
      return { success: true };
    }

    if (
      (cleanUser === 'kiran' || cleanUser === 'kiran@rasaortho.com') &&
      (cleanPass === 'ortho2026' || cleanPass === 'rasatech007')
    ) {
      if (typeof window !== 'undefined') localStorage.setItem('rasa_ortho_session', 'true');
      set({ user: demoUsers.finance_manager, isAuthenticated: true, currentBranch: BRANCHES[0] });
      return { success: true };
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
    }
    set({ user: null, isAuthenticated: false });
  },
  setBranch: (branchId: string) => {
    const branch = BRANCHES.find(b => b.id === branchId);
    if (branch) set({ currentBranch: branch });
  },
}));
