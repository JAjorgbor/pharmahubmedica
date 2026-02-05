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
    'updateApp',
    'updateInventory',
    'updateAdminUser',
    'updateAdminUserRole',
    'removeAdminUser',
    'adminUserInvite',
    'updateAdminSettings',
    'adminUpdateStatus',
    'getReferralPartners',
    'manageReferralPartners',
    'manageCustomers',
    'manageOrders',
    'getOrders',
  ],
  administrator: [
    'getUsers',
    'getInventory',
    'updateApp',
    'updateInventory',
    'getAdminUsers',
    'updateAdminUser',
    'updateAdminUserRole',
    'adminUserInvite',
    'updateAdminSettings',
    'adminUpdateStatus',
    'getReferralPartners',
    'manageReferralPartners',
    'manageCustomers',
    'manageOrders',
    'getOrders',
  ],
  operations: [
    'getUsers',
    'getAdminUsers',
    'updateApp',
    'getInventory',
    'updateInventory',
    'updateAdminUser',
    'updateAdminUserRole',
    'adminUserInvite',
    'updateAdminSettings',
    'adminUpdateStatus',
    'getReferralPartners',
    'manageReferralPartners',
    'manageCustomers',
    'manageOrders',
    'getOrders',
  ],
  storeManager: [
    'getUsers',
    'getAdminUsers',
    'getInventory',
    'updateInventory',
    'getReferralPartners',
    'manageOrders',
    'getOrders',
  ],
  marketingAndSales: [
    'getUsers',
    'getAdminUsers',
    'getInventory',
    'getReferralPartners',
    'updateInventory',
    'getOrders',
  ],
  accountant: [
    'getUsers',
    'getAdminUsers',
    'getReferralPartners',
    'getInventory',
    'getOrders',
  ],
  driver: ['getUsers', 'getAdminUsers', 'getInventory', 'getOrders'],
} as const

export const referralPartnerProfessions = {
  doctor: 'Dr',
  nurse: 'Nurse',
  pharmacist: 'Pharm',
  chemist: 'Chem',
  'lab technician': 'Lab Tech',
  other: '',
} as const

export type AdminUserPermissions =
  (typeof adminUserRolesPermissions)[keyof typeof adminUserRolesPermissions][number]

export const normalizedReferralPartnerProfessions = Object.keys(
  referralPartnerProfessions,
)

export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
