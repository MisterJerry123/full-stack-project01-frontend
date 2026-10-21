export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  accessToken: string;
  tokenType: string;
}

export interface SignUpRequest{
  email:string
  password:string
  name:string
}