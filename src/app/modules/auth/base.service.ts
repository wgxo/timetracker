export interface AuthBaseService {

  checkAuthenticated(): Promise<boolean>;

  login(username: string, password: string): Promise<void>;

  logout(redirect: string): Promise<void>;
}
