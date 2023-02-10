export interface LoginType {
  token: {
    accessToken: string
    refreshToken: string
    expiresInAccessToken: string
    expiresInRefreshToken: string
    tokenType: string
  }
}
