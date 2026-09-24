import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, UserPlus, Search, ShieldAlert, Lock,
  Unlock, Trash2, Edit3, Eye, EyeOff, Building2,
  CheckCircle2, RefreshCw, KeyRound, Crown, AlertTriangle, X
} from 'lucide-react';
import { useAuthStore, type ManagedUser } from '../../stores/authStore';
import type { UserRole } from '../../types';
import { BRANCHES } from '../../lib/constants';
import { cn } from '../../lib/cn';

const roleBadgeStyles: Record<UserRole, { label: string; bg: string; text: string; border: string }> = {
  super_admin: { label: 'Super Admin', bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  hospital_admin: { label: 'Hospital Admin', bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200' },
  doctor: { label: 'Doctor OPD', bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
  surgeon: { label: 'Surgeon OT', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  nurse: { label: 'Staff Nurse', bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' },
  receptionist: { label: 'Receptionist', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  physiotherapist: { label: 'Physiotherapy', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  ot_manager: { label: 'OT Lead', bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  inventory_manager: { label: 'Inventory', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  finance_manager: { label: 'Finance Head', bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
  patient: { label: 'Patient Portal', bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' },
};

export function UserManagementPage() {
  const {
    managedUsers,
    addUser,
    toggleBlockUser,
    deleteUser,
    updateUser,
    resetDemoUsers,
    user: currentLoggedInUser,
  } = useAuthStore();

  // Strictly protected for Raja Rathna Reddy only
  const isOnlyRaja =
    currentLoggedInUser?.email?.toLowerCase() === 'a.rajarathnareddychenni@gmail.com' ||
    currentLoggedInUser?.id === 'user-raja-007' ||
    currentLoggedInUser?.name?.toLowerCase().trim() === 'raja rathna reddy';

  if (!isOnlyRaja) {
    return <Navigate to="/dashboard" replace />;
  }

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'blocked'>('all');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<ManagedUser | null>(null);
  const [userToDelete, setUserToDelete] = useState<ManagedUser | null>(null);
  const [revealedPasswords, setRevealedPasswords] = useState<Record<string, boolean>>({});

  // Toast notification
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Add User Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'doctor' as UserRole,
    branchName: 'Koramangala',
    passcode: 'RasaTech007',
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      showToast('Name and email are required.', 'error');
      return;
    }

    const result = addUser({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '+91 98450 00000',
      role: formData.role,
      branchName: formData.branchName,
      passcode: formData.passcode || 'RasaTech007',
    });

    if (result.success) {
      showToast(result.message || 'User created successfully!');
      setIsAddModalOpen(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'doctor',
        branchName: 'Koramangala',
        passcode: 'RasaTech007',
      });
    } else {
      showToast(result.message || 'Failed to create user.', 'error');
    }
  };

  const handleToggleBlock = (user: ManagedUser) => {
    if (user.isOwner || user.email === 'a.rajarathnareddychenni@gmail.com') {
      showToast('Master Platform Owner Raja Rathna Reddy cannot be blocked.', 'error');
      return;
    }

    const result = toggleBlockUser(user.id);
    if (result.success) {
      showToast(result.message || 'Status updated');
    } else {
      showToast(result.message || 'Action failed', 'error');
    }
  };

  const handleDeleteConfirm = () => {
    if (!userToDelete) return;
    const result = deleteUser(userToDelete.id);
    if (result.success) {
      showToast(result.message || 'User deleted successfully');
      setUserToDelete(null);
    } else {
      showToast(result.message || 'Failed to delete user', 'error');
    }
  };

  const handleUpdateSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    const result = updateUser(editingUser.id, editingUser);
    if (result.success) {
      showToast(result.message || 'User updated successfully');
      setEditingUser(null);
    } else {
      showToast(result.message || 'Failed to update user', 'error');
    }
  };

  const togglePasswordVisibility = (id: string) => {
    setRevealedPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Metrics
  const totalUsers = managedUsers.length;
  const activeCount = managedUsers.filter((u) => !u.isBlocked).length;
  const blockedCount = managedUsers.filter((u) => u.isBlocked).length;

  // Filtered Users
  const filteredUsers = managedUsers.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.branchName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === 'all' || u.role === roleFilter;

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && !u.isBlocked) ||
      (statusFilter === 'blocked' && u.isBlocked);

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="page-container space-y-6">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={cn(
              'fixed top-20 right-6 z-50 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs font-semibold text-white backdrop-blur-md',
              toast.type === 'error' ? 'bg-rose-600' : 'bg-emerald-600'
            )}
          >
            {toast.type === 'error' ? (
              <AlertTriangle className="w-4 h-4 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            )}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/60 p-6 sm:p-8 text-white relative overflow-hidden shadow-xl"
      >
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -mb-16 w-48 h-48 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 shadow-2xs">
                <Crown className="w-3 h-3 text-amber-400" />
                Exclusive Platform Owner Portal
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Access Controller
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <span>User Access & Security Management</span>
              <ShieldCheck className="w-7 h-7 text-indigo-400 shrink-0" />
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Authorized only for <strong className="text-white">Raja Rathna Reddy</strong>. Provision new clinical or administrative staff credentials, block or suspend user accounts in real time, or manage role permissions across all RASA hospital branches.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button
              onClick={() => {
                if (window.confirm('Reset all demo staff accounts back to defaults?')) {
                  resetDemoUsers();
                  showToast('Demo user base reset to factory defaults.');
                }
              }}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-xs"
              title="Reset Demo Users to Default"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create New User</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-surface-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500">Total Registered Users</p>
            <p className="text-2xl font-black text-gray-900 mt-1">{totalUsers}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Across 4 hospital locations</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <KeyRound className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-surface-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500">Active Working Accounts</p>
            <p className="text-2xl font-black text-emerald-600 mt-1">{activeCount}</p>
            <p className="text-[11px] text-emerald-600/80 mt-0.5">Permitted to access OS</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-surface-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500">Blocked / Suspended Accounts</p>
            <p className="text-2xl font-black text-rose-600 mt-1">{blockedCount}</p>
            <p className="text-[11px] text-rose-600/80 mt-0.5">Logins strictly denied</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-surface-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500">Master Platform Owner</p>
            <p className="text-sm font-black text-indigo-950 mt-1 truncate">Raja Rathna Reddy</p>
            <p className="text-[11px] text-indigo-600 font-semibold mt-0.5">Super Admin • Protected</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Crown className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="p-4 rounded-2xl bg-white border border-surface-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by staff name, email, role, or branch..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-surface-200 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {/* Status Tabs */}
          <div className="flex items-center p-1 bg-surface-100 rounded-xl text-xs font-medium text-gray-600 shrink-0">
            <button
              onClick={() => setStatusFilter('all')}
              className={cn(
                'px-3 py-1 rounded-lg transition-all cursor-pointer',
                statusFilter === 'all' ? 'bg-white text-gray-900 font-bold shadow-2xs' : 'hover:text-gray-900'
              )}
            >
              All ({totalUsers})
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={cn(
                'px-3 py-1 rounded-lg transition-all cursor-pointer',
                statusFilter === 'active' ? 'bg-white text-emerald-700 font-bold shadow-2xs' : 'hover:text-gray-900'
              )}
            >
              Active ({activeCount})
            </button>
            <button
              onClick={() => setStatusFilter('blocked')}
              className={cn(
                'px-3 py-1 rounded-lg transition-all cursor-pointer',
                statusFilter === 'blocked' ? 'bg-white text-rose-700 font-bold shadow-2xs' : 'hover:text-gray-900'
              )}
            >
              Blocked ({blockedCount})
            </button>
          </div>

          {/* Role Dropdown */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="py-1.5 px-3 rounded-xl border border-surface-200 text-xs font-medium bg-white focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="all">All Roles</option>
            <option value="super_admin">Super Admin</option>
            <option value="doctor">Doctor OPD</option>
            <option value="surgeon">Surgeon OT</option>
            <option value="nurse">Nurse</option>
            <option value="receptionist">Receptionist</option>
            <option value="physiotherapist">Physiotherapist</option>
            <option value="ot_manager">OT Manager</option>
            <option value="inventory_manager">Inventory Manager</option>
            <option value="finance_manager">Finance Manager</option>
            <option value="hospital_admin">Hospital Admin</option>
          </select>
        </div>
      </div>

      {/* User Directory Table */}
      <div className="bg-white rounded-2xl border border-surface-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-50 border-b border-surface-200 text-gray-500 uppercase tracking-wider font-semibold text-[10px]">
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-4">Role & Specialization</th>
                <th className="py-3 px-4">Hospital Branch</th>
                <th className="py-3 px-4">Passcode / Credentials</th>
                <th className="py-3 px-4">Account Status</th>
                <th className="py-3 px-4 text-right">Owner Control Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    <ShieldAlert className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p className="font-semibold text-gray-700">No users match your filter criteria.</p>
                    <p className="text-[11px] text-gray-400 mt-1">Try adjusting your search terms or filters.</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const roleStyle = roleBadgeStyles[user.role] || roleBadgeStyles.doctor;
                  const isRaja = user.isOwner || user.email === 'a.rajarathnareddychenni@gmail.com';
                  const isPasswordVisible = revealedPasswords[user.id];
                  const isCurrentUser = currentLoggedInUser?.email === user.email;

                  return (
                    <tr
                      key={user.id}
                      className={cn(
                        'hover:bg-surface-50/70 transition-colors',
                        user.isBlocked && 'bg-rose-50/30'
                      )}
                    >
                      {/* Staff Member */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              'w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs',
                              isRaja
                                ? 'bg-gradient-to-br from-amber-400 to-indigo-600 text-white'
                                : 'bg-surface-100 text-gray-700 border border-surface-200'
                            )}
                          >
                            {user.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-bold text-gray-900 truncate">{user.name}</span>
                              {isRaja && (
                                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-md bg-amber-100 text-amber-800 text-[9.5px] font-black border border-amber-300 shadow-2xs">
                                  <Crown className="w-2.5 h-2.5 text-amber-600" />
                                  PLATFORM OWNER
                                </span>
                              )}
                              {isCurrentUser && (
                                <span className="px-1.5 py-0.2 rounded-md bg-indigo-50 text-indigo-700 text-[9.5px] font-bold border border-indigo-200">
                                  You
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-gray-400 font-mono truncate">{user.email}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="inline-flex items-center gap-1 font-mono text-[10px] px-1.5 py-0.5 rounded bg-surface-100 text-slate-700 border border-surface-200" title="User Login ID">
                                <span className="text-gray-400 font-sans font-semibold">User ID:</span>
                                <strong className="text-indigo-600">{user.id}</strong>
                              </span>
                              <span className="text-[10px] text-gray-400">{user.phone}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="py-3.5 px-4">
                        <span
                          className={cn(
                            'inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border shadow-2xs',
                            roleStyle.bg,
                            roleStyle.text,
                            roleStyle.border
                          )}
                        >
                          {roleStyle.label}
                        </span>
                      </td>

                      {/* Branch */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Building2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span className="font-medium text-[11px]">{user.branchName}</span>
                        </div>
                      </td>

                      {/* Passcode */}
                      <td className="py-3.5 px-4">
                        <div className="inline-flex items-center gap-2 bg-surface-50 border border-surface-200 px-2 py-1 rounded-lg">
                          <span className="font-mono text-[11px] text-gray-800 tracking-wider">
                            {isPasswordVisible ? user.passcode : '••••••••'}
                          </span>
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility(user.id)}
                            className="text-gray-400 hover:text-gray-600 transition-colors p-0.5"
                            title={isPasswordVisible ? 'Hide passcode' : 'Show passcode'}
                          >
                            {isPasswordVisible ? (
                              <EyeOff className="w-3.5 h-3.5" />
                            ) : (
                              <Eye className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>

                      {/* Account Status */}
                      <td className="py-3.5 px-4">
                        {user.isBlocked ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                            <Lock className="w-3 h-3 text-rose-600" />
                            BLOCKED / SUSPENDED
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            ACTIVE
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Block / Unblock Toggle */}
                          {isRaja ? (
                            <span className="text-[10px] text-gray-400 italic px-2">Protected</span>
                          ) : (
                            <button
                              onClick={() => handleToggleBlock(user)}
                              className={cn(
                                'px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs',
                                user.isBlocked
                                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                  : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                              )}
                              title={user.isBlocked ? 'Restore user access' : 'Immediately suspend user login access'}
                            >
                              {user.isBlocked ? (
                                <>
                                  <Unlock className="w-3 h-3" />
                                  <span>Unblock</span>
                                </>
                              ) : (
                                <>
                                  <Lock className="w-3 h-3" />
                                  <span>Block User</span>
                                </>
                              )}
                            </button>
                          )}

                          {/* Edit User */}
                          <button
                            onClick={() => setEditingUser(user)}
                            className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                            title="Edit user details"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete User */}
                          {!isRaja && (
                            <button
                              onClick={() => setUserToDelete(user)}
                              className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Permanently delete user"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ═══ CREATE USER MODAL ═══ */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl bg-white border border-surface-200 shadow-2xl p-6 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-surface-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900">Create Staff Credentials</h2>
                    <p className="text-[11px] text-gray-500">Add an authorized staff member to RASA ORTHO OS</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-surface-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-1">
                    Full Name & Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Rajesh Verma / Nurse Ananya"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-surface-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="user@rasaortho.com"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-surface-200 focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98450 12345"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-surface-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-1">
                      Role / Department *
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-surface-200 focus:outline-none focus:border-indigo-500 bg-white"
                    >
                      <option value="doctor">Doctor (OPD & Consultation)</option>
                      <option value="surgeon">Surgeon (OT & Spine / Joints)</option>
                      <option value="nurse">Nurse (Inpatient Ward)</option>
                      <option value="receptionist">Receptionist (Front Desk)</option>
                      <option value="physiotherapist">Physiotherapist (Rehab)</option>
                      <option value="ot_manager">OT Manager (Theatre Operations)</option>
                      <option value="inventory_manager">Inventory & Implant Head</option>
                      <option value="finance_manager">Finance & Billing Head</option>
                      <option value="hospital_admin">Hospital Administrator</option>
                      <option value="super_admin">Super Administrator</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-1">
                      Hospital Branch *
                    </label>
                    <select
                      value={formData.branchName}
                      onChange={(e) => setFormData({ ...formData, branchName: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-surface-200 focus:outline-none focus:border-indigo-500 bg-white"
                    >
                      {BRANCHES.map((b) => (
                        <option key={b.id} value={b.name}>
                          {b.name} ({b.city})
                        </option>
                      ))}
                      <option value="All Branches (HQ)">All Branches (HQ)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-1">
                    Initial Security Passcode *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.passcode}
                    onChange={(e) => setFormData({ ...formData, passcode: e.target.value })}
                    placeholder="RasaTech007"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-surface-200 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">
                    Initial default password is <strong>RasaTech007</strong> for all newly provisioned accounts.
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-surface-100">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-surface-100 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
                  >
                    Create User & Activate Access
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ═══ EDIT USER MODAL ═══ */}
      <AnimatePresence>
        {editingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl bg-white border border-surface-200 shadow-2xl p-6 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-surface-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Edit3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900">Edit User Profile</h2>
                    <p className="text-[11px] text-gray-500">Updating credentials for {editingUser.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => setEditingUser(null)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-surface-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateSave} className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-surface-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={editingUser.email}
                      disabled={editingUser.isOwner}
                      onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-surface-200 focus:outline-none focus:border-indigo-500 font-mono disabled:bg-surface-100"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={editingUser.phone}
                      onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-surface-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-1">
                      Role
                    </label>
                    <select
                      value={editingUser.role}
                      disabled={editingUser.isOwner}
                      onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as UserRole })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-surface-200 focus:outline-none focus:border-indigo-500 bg-white disabled:bg-surface-100"
                    >
                      <option value="doctor">Doctor (OPD & Consultation)</option>
                      <option value="surgeon">Surgeon (OT & Spine / Joints)</option>
                      <option value="nurse">Nurse (Inpatient Ward)</option>
                      <option value="receptionist">Receptionist (Front Desk)</option>
                      <option value="physiotherapist">Physiotherapist (Rehab)</option>
                      <option value="ot_manager">OT Manager (Theatre Operations)</option>
                      <option value="inventory_manager">Inventory & Implant Head</option>
                      <option value="finance_manager">Finance & Billing Head</option>
                      <option value="hospital_admin">Hospital Administrator</option>
                      <option value="super_admin">Super Administrator</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-1">
                      Branch
                    </label>
                    <select
                      value={editingUser.branchName}
                      onChange={(e) => setEditingUser({ ...editingUser, branchName: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-surface-200 focus:outline-none focus:border-indigo-500 bg-white"
                    >
                      {BRANCHES.map((b) => (
                        <option key={b.id} value={b.name}>
                          {b.name} ({b.city})
                        </option>
                      ))}
                      <option value="All Branches (HQ)">All Branches (HQ)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-1">
                    Security Passcode
                  </label>
                  <input
                    type="text"
                    required
                    value={editingUser.passcode}
                    onChange={(e) => setEditingUser({ ...editingUser, passcode: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-surface-200 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-surface-100">
                  <button
                    type="button"
                    onClick={() => setEditingUser(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-surface-100 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ═══ DELETE CONFIRMATION MODAL ═══ */}
      <AnimatePresence>
        {userToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl bg-white border border-surface-200 shadow-2xl p-6 space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>

              <div className="text-center space-y-1">
                <h3 className="text-base font-bold text-gray-900">Delete User Account?</h3>
                <p className="text-xs text-gray-500">
                  Are you sure you want to permanently delete credentials for{' '}
                  <strong className="text-gray-900">{userToDelete.name}</strong> ({userToDelete.email})? This action cannot be undone.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setUserToDelete(null)}
                  className="px-4 py-2.5 rounded-xl border border-surface-200 text-xs font-semibold text-gray-600 hover:bg-surface-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/20 transition-all cursor-pointer"
                >
                  Yes, Permanently Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
