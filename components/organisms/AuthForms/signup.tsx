import * as React from "react";
import Link from "next/link";
import { Avatar, TextField, Grid, Box, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { SignUpRequestData } from "core/types/api";
import authFormStore from "stores/authForm";
import RequestStatus from "core/types/requestStatus";

const SignUpForm: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: SignUpRequestData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    console.log(`data`, data);
    authFormStore.signUp(data);
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
        Sign up
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField autoComplete="fname" name="firstName" required fullWidth id="firstName" label="First Name" autoFocus />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="lname" />
          </Grid>
          <Grid item xs={12}>
            <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" type="email" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
            />
          </Grid>
        </Grid>
        <LoadingButton
          type="submit"
          loading={authFormStore.requestStatus === RequestStatus.pending}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </LoadingButton>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/auth/signin" passHref>
              {/* <Typography variant="body2">
                </Typography> */}
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignUpForm;
