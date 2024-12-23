import apiClient from './apiClient';

const userService = {

  async getPaginatedUsers(pageNumber: number = 1, pageSize: number = 10, searchTerm: string = '') {
    try {
      const response = await apiClient.get('/User/GetPaginatedUsers', {
        params: {
          pageNumber,
          pageSize,
          searchTerm,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  async GetAllRoles() {
    const response = await apiClient.get('/User/GetAllRoles', {
    });
    return response.data;
  },

  async GetAllPermissionLookups() {
    const response = await apiClient.get('/User/GetAllPermissionLookups', {
    });
    return response.data;
  },

  async GetAllPermissionByRoleId(roleId: number) {
    const response = await apiClient.get(`/User/GetPermissionsByRoleId/${roleId}`, {
    });
    return response.data;
  },

  async AddPermission(permissionsData: any) {
    const response = await apiClient.post(`/User/AddPermissions/`, permissionsData, {
    });
    return response.data;
  },

  async GetUserById(userId: number) {
    const response = await apiClient.post(`/User/GetUserById/${userId}`, {
    });
    return response.data;
  },

  async AddUser(UserData: any) {
    const response = await apiClient.post(`/User/CreateUser/`, UserData, {
    });
    return response.data;
  },

  async UpdateUser(UserData: any) {
    const response = await apiClient.post(`/User/UpdateUser/`, UserData, {
    });
    return response.data;
  },

  async checkUserAD(username: any) {
    const response = await apiClient.post(`/User/CheckAdUsername/${username}`, {
    });
    return response.data;
  },
  


};

export default userService;
