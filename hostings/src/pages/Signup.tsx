import { useState } from 'react';

import auth from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const eventTarget = event.target as HTMLFormElement;
    const email = eventTarget.elements.namedItem('email') as HTMLInputElement;
    const password = eventTarget.elements.namedItem(
      'password'
    ) as HTMLInputElement;
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email.value, password.value);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  return (
    <div>
      <h1>ユーザ登録</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={(event) => handleChangeEmail(event)}
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            name="password"
            type="password"
            placeholder="password"
            onChange={(event) => handleChangePassword(event)}
          />
        </div>
        <div>
          <button>登録</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
