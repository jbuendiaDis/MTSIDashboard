export enum Roles {
    ADMIN = 'admin',
  }
  
  export interface FormValues {
    email: string;
    password: string;
  }
  
  export interface AuthContextType {
    user?: {
      name: string;
      rol: Roles;
    };
    login: (values: FormValues) => Promise<boolean>;
    logout: () => void;
  }
  