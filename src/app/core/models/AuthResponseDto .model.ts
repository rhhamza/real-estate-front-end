export class AuthResponseDto {
    accessToken: string;
    tokenType: string;
  
    constructor(accessToken: string) {
      this.accessToken = accessToken;
      this.tokenType = 'Bearer';
    }
  }
  