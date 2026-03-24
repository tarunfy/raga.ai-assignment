import { redirect } from "next/navigation";

const SignUpPage = () => {
  redirect("/auth?tab=sign-up");
};

export default SignUpPage;
