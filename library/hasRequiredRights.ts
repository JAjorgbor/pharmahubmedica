import { AdminUserPermissions, adminUserRolesPermissions } from './config'

export default function hasRequiredRights(
  userRole: string,
  requiredRights: AdminUserPermissions[],
) {
  const userRights =
    adminUserRolesPermissions[
      userRole as keyof typeof adminUserRolesPermissions
    ]
  const hasRequiredRights = requiredRights.every((requiredRight) =>
    userRights.includes(requiredRight as never),
  )
  return hasRequiredRights
}
