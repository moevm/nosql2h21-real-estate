import { Avatar, Box, Card, Grid, Typography } from "@mui/material";
import { Reply } from "core/models";
import React from "react";

type Props = {
  data: Reply;
};

const ReplieCard: React.FC<Props> = (props) => {
  const { data } = props;
  return (
    <Box component={Card} p={1}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <Avatar sx={{ bgcolor: data.owner.avatar }}>
            {data.owner.firstName?.[0]} {data.owner.lastName?.[0]}
          </Avatar>
          {/* <Avatar alt={`${data.owner.firstName} ${data.owner.lastName}`} src="" /> */}
        </Grid>
        <Grid item>
          <Typography>
            {data.owner.firstName} {data.owner.lastName}
          </Typography>
          <Typography variant="subtitle2">{data.text}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReplieCard;
