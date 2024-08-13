export interface Activity {
  name: string;
  link: string;
  timestamp: Date;
}

export interface User {
  id: string;
  username: string;
  email: string;
  activities: Activity[];
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}
