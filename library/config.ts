export const theme = {
  colors: {
    primary: '#031D91',
    secondary: '#ff0000',
  },
}

export const adminUserRolesPermissions = {
  devOps: [
    'getUsers',
    'getAdminUsers',
    'getInventory',
    'updateInventory',
    'updateAdminUser',
    'updateAdminUserRole',
    'removeAdminUser',
    'adminUserInvite',
    'updateAdminSettings',
    'adminUpdateStatus',
  ],
  administrator: [
    'getUsers',
    'getInventory',
    'updateInventory',
    'getAdminUsers',
    'updateAdminUser',
    'updateAdminUserRole',
    'adminUserInvite',
    'updateAdminSettings',
    'adminUpdateStatus',
  ],
  operations: [
    'getUsers',
    'getAdminUsers',
    'getInventory',
    'updateInventory',
    'updateAdminUser',
    'updateAdminUserRole',
    'adminUserInvite',
    'updateAdminSettings',
    'adminUpdateStatus',
  ],
  storeManager: [
    'getUsers',
    'getAdminUsers',
    'getInventory',
    'updateInventory',
  ],
  marketingAndSales: [
    'getUsers',
    'getAdminUsers',
    'getInventory',
    'updateInventory',
  ],
  accountant: ['getUsers', 'getAdminUsers', 'getInventory'],
  driver: ['getUsers', 'getAdminUsers', 'getInventory'],
} as const

export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
