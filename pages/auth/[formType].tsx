import { NextPage } from "next";
import { Container } from "@mui/material";
import { SignInForm, SignUpForm } from "components/organisms";
import { useRouter } from "next/dist/client/router";

type QueryParams = {
  formType: "signin" | "signup";
};

const AuthPage: NextPage = () => {
  const router = useRouter();
  const { formType } = router.query as QueryParams;

  return (
    <Container component="main" maxWidth="xs">
      {formType === "signin" ? <SignInForm /> : <SignUpForm />}
    </Container>
  );
};

export default AuthPage;
