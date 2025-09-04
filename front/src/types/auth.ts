export enum UserRole {
  HERO = 'hero',
  ADMIN = 'admin',
}

export enum HeroCharacter {
  MARVEL_SPIDERMAN = 'marvel_spiderman',
  MARVEL_IRONMAN = 'marvel_ironman',
  MARVEL_CAPTAIN_AMERICA = 'marvel_captain_america',
  MARVEL_THOR = 'marvel_thor',
  MARVEL_HULK = 'marvel_hulk',
  MARVEL_BLACK_WIDOW = 'marvel_black_widow',
  DC_BATMAN = 'dc_batman',
  DC_SUPERMAN = 'dc_superman',
  DC_WONDER_WOMAN = 'dc_wonder_woman',
  DC_FLASH = 'dc_flash',
  DC_GREEN_LANTERN = 'dc_green_lantern',
  DC_AQUAMAN = 'dc_aquaman',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  character?: HeroCharacter;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  character?: HeroCharacter;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}
