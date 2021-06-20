import axios from 'axios';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthService {
  constructor() {
    this.smp_oauth = axios.create({
      baseURL: 'https://smp-oauth.link/oauth/',
    });
    this.smp_resource = axios.create({
      baseURL: 'https://smp-resource.link/auth/',
    });
  }
  async login() {
    const client_id = process.env.REACT_APP_CLIENT_ID;
    const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
    const randomStarg = Math.random().toString();
    const oauthURL = 'https://smp-oauth.link/oauth/';
    localStorage.setItem('state', randomStarg);

    const state = await bcrypt.hash(randomStarg, 10);
    const uri = `${oauthURL}/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}`;

    window.open(uri, 'oauthServer', 'width=520,height=680');
  }

  async token(code, state) {
    const prevState = localStorage.getItem('state');
    const valid = await bcrypt.compare(prevState, state);

    if (!valid) throw new Error(`인증과정 중 외부 간섭의 위험이 있습니다.`);

    const data = {
      code,
      clientSecret: process.env.REACT_APP_SECRET_KEY,
      redirect_uri: process.env.REACT_APP_REDIRECT_URI,
      client_id: process.env.REACT_APP_CLIENT_ID,
      grant_type: 'code',
    };

    try {
      const oauthRes = await this.smp_oauth.post('token', data);
      const token = oauthRes.data.access_token;
      this.smp_resource.defaults.headers.common = {
        Authorization: `bearer ${token.accessToken}`,
      };

      const resourceRes = await this.smp_resource.get('scope');

      const userData = resourceRes.data.userData;

      const loginToken = jwt.sign(
        {
          iss: process.env.REACT_APP_FIREBASE_JWT_ACOUNT_EMAIL,
          sub: process.env.REACT_APP_FIREBASE_JWT_ACOUNT_EMAIL,
          aud: 'https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit',
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          uid: userData.username,
        },
        process.env.REACT_APP_FIREBASE_JWT_SECRET_KEY,
        { algorithm: 'RS256' }
      );

      userData.token = loginToken;

      return userData;
    } catch (error) {
      return error?.response?.data;
    }
  }
}

export default AuthService;
