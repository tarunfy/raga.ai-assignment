import { redirect } from "next/navigation";

const LoginPage = () => {
  redirect("/auth?tab=sign-in");
};

export default LoginPage;
