import React from "react";
import { ArrowBackIosNewRounded, ArrowForwardIosRounded } from "@mui/icons-material";
import { Grid, IconButton, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import s from "./style.module.scss";

const SIZES = [4, 6, 8, 10];
type Props = {
  total: number;
  page: number;
  limit: number;
  next: () => void;
  prev: () => void;
  setLimit: (num: number) => void;
  sizes?: number[];
};

const PaginationFooter: React.FC<Props> = (props) => {
  const { total, page, limit, next, prev, sizes, setLimit } = props;
  const maxPage = Math.floor(total / limit + (total % limit ? 1 : 0));

  const handleSetLimit = (event: SelectChangeEvent<number>): void => setLimit(event.target.value as number);

  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        <IconButton aria-label="prev" disabled={page <= 0} onClick={prev}>
          <ArrowBackIosNewRounded />
        </IconButton>
        {`${page + 1} / ${maxPage}`}
        <IconButton aria-label="next" disabled={page >= maxPage} onClick={next}>
          <ArrowForwardIosRounded />
        </IconButton>
      </Grid>
      <Grid item>
        Show
        <Select className={s.limitSelector} variant="standard" value={limit} onChange={handleSetLimit}>
          {sizes?.map((e) => (
            <MenuItem key={e} value={e}>
              {e}
            </MenuItem>
          ))}
        </Select>
        elements
      </Grid>
    </Grid>
  );
};
PaginationFooter.defaultProps = {
  sizes: SIZES,
};
export default PaginationFooter;
