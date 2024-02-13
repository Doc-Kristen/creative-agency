import { handleGithubLogin, login } from "@/lib/action";

const LoginPage: React.FC = async () => {
  return (
    <div>
      <form action={handleGithubLogin}>
        <button>Login with GUTHUB</button>
      </form>
      <form action={login}>
        <input type="email" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <button>Login with password</button>
      </form>
    </div>
  );
};

export default LoginPage;
