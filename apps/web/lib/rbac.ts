/**
 * Role-Based Access Control (RBAC)
 */

import { UserRole } from "@repo/database";

export type Permission =
  | "view_dashboard"
  | "reserve_capacity"
  | "view_bills"
  | "pay_bills"
  | "view_projects"
  | "create_projects"
  | "upload_generation"
  | "calculate_credits"
  | "manage_users"
  | "view_analytics";

const rolePermissions: Record<UserRole, Permission[]> = {
  USER: [
    "view_dashboard",
    "reserve_capacity",
    "view_bills",
    "pay_bills",
    "view_projects",
  ],
  ADMIN: [
    "view_dashboard",
    "reserve_capacity",
    "view_bills",
    "pay_bills",
    "view_projects",
    "create_projects",
    "upload_generation",
    "calculate_credits",
    "manage_users",
    "view_analytics",
  ],
  OPS: [
    "view_dashboard",
    "view_projects",
    "upload_generation",
    "calculate_credits",
    "view_analytics",
  ],
  FINANCE: [
    "view_dashboard",
    "view_bills",
    "view_analytics",
  ],
};

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: UserRole, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) || false;
}

/**
 * Require permission (throws if not authorized)
 */
export function requirePermission(role: UserRole, permission: Permission): void {
  if (!hasPermission(role, permission)) {
    throw new Error(`Permission denied: ${permission} required`);
  }
}

/**
 * Get all permissions for a role
 */
export function getRolePermissions(role: UserRole): Permission[] {
  return rolePermissions[role] || [];
}

