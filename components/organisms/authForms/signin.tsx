import * as React from "react";
import Link from "next/link";
import { Avatar, TextField, FormControlLabel, Checkbox, Grid, Box, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { SignInResquestData } from "core/types/api";
import authFormStore from "stores/authForm";
import { LoadingButton } from "@mui/lab";
import RequestStatus from "core/types/requestStatus";

const SignInForm: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: SignInResquestData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    authFormStore.signIn(data);
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
        <LoadingButton
          type="submit"
          loading={authFormStore.requestStatus === RequestStatus.pending}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </LoadingButton>
        <Grid container>
          <Grid item xs />
          <Grid item>
            <Link href="/auth/signup" passHref>
              {/* <Typography variant="body2">
                </Typography> */}
              Don`t have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignInForm;
