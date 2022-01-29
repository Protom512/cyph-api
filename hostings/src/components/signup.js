import { auth } from "../firebase";
const SignUp = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    // console.log(email.value);
    auth.createUserWithEmailAndPassword(email.value, password.value);
  };
  return (
    <div>
      <h1 class="font-medium text-3xl text-center py-4 text-gray-800">
        Sign in to App
      </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input name="email" type="email" placeholder="email" />
        </div>
        <div>
          <label>パスワード</label>
          <input name="password" type="password" />
        </div>
        <div>
          <button>登録</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
