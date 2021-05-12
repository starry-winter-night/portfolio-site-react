import React from 'react';
import { useHistory } from 'react-router';

const Login = ({ firebase }) => {
  const loginHistory = useHistory();

  const onLogin = (e) => {
    const loginType = e.target.dataset.name;

    firebase
      .login(loginType)
      .then((data) => {
        // console.log(data.user.uid);
        loginHistory.push('/study');
      })
      .catch((e) => {
        e.code === 'auth/account-exists-with-different-credential' &&
          alert(
            `같은 이메일 주소가 등록되어 있습니다. 기존의 등록한 방식으로 로그인하여 주십시오. ${e.email}`
          );
      });
  };
  return (
    <section>
      <header>
        <h2>smpark.dev Login</h2>
      </header>
      <div>
        <ul>
          <li>
            <button data-name="Google" onClick={onLogin}>
              Google 로그인
            </button>
          </li>
          <li>
            <button data-name="Github" onClick={onLogin}>
              GitHub 로그인
            </button>
          </li>
          <li>
            <button data-name="Smpark" onClick={onLogin}>
              Smpark 로그인
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Login;
