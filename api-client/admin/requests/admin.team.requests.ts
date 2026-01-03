import axiosInstance from '@/api-client/admin/request-adapter'

export const acceptInvite = (token: string, data: any) =>
  axiosInstance.post(`admin/team/accept-invite/${token}`, data)

export const inviteTeamMember = (data: any) =>
  axiosInstance.post(`admin/team/invite-member`, data)

export const getTeamMembers = () => axiosInstance.get(`admin/team`)

export const resendTeamMemberInvite = (id: string) =>
  axiosInstance.post(`admin/team/resend-invite/${id}`)

export const updateTeamMember = (id: string, data: any) =>
  axiosInstance.patch(`admin/team/${id}`, data)

export const removeTeamMember = (id: string) =>
  axiosInstance.delete(`admin/team/${id}`)
