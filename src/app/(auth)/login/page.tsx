import { handleGithubLogin } from "@/lib/action";

const LoginPage: React.FC = async () => {
  return (
    <div>
      <form action={handleGithubLogin}>
        <button>Login with GUTHUB</button>
      </form>
    </div>
  );
};

export default LoginPage;
