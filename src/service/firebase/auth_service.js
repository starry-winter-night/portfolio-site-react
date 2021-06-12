import { firebaseAuth, githubProvider, googleProvider } from './firebase';

class AuthService {
  login(providerName) {
    const authProvider = this.getProvider(providerName);

    return firebaseAuth.signInWithPopup(authProvider);
  }

  logout() {
    firebaseAuth.signOut();
  }

  loginUserCheck(onUserCheck) {
    return firebaseAuth.onAuthStateChanged((user) => {
      onUserCheck(user);
    });
  }

  customLogin(token, cb) {
    firebaseAuth
      .signInWithCustomToken(token)
      .then((userCredential) => {
        const user = userCredential.user;

        cb(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        throw new Error(`${errorCode}: ${errorMessage}`);
      });
  }

  getProvider(providerName) {
    switch (providerName) {
      case 'Google':
        return googleProvider;
      case 'Github':
        return githubProvider;
      default:
        throw new Error(`not supported provider: ${providerName}`);
    }
  }
}

export default AuthService;
