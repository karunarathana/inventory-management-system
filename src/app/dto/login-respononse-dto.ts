export interface LoginResponse{
    message: string;
    newAccessToken: string;
    newRefreshToken: string;
    username: string;
}