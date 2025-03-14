export interface User {
  id: string;
  userName: string;
  password?: string;
  fullName: string;
  roleName: string;
  permissions?: string[] | undefined;
  isSuperUser?: boolean;
}

export interface Role {
  id: string;
  roleName: string;
  permissions: string[];
}
