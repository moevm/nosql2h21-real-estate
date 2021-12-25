/* eslint-disable prettier/prettier */
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, TextField, Typography } from "@mui/material";
import { AdvTargetType, FinishingType, HouseType } from "core/models";
import { observer } from "mobx-react";
import React, { useState } from "react";
import advsStore from "stores/advs";
import chartsStore from "stores/charts";

type Props = {
  flag?: "fullloading" | "charts" | null;
};

const AdvFilters: React.FC<Props> = (props) => {
  const { flag } = props;
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <div>
      <Accordion expanded={expanded} onChange={() => setExpanded((v) => !v)}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography>Фильтрация</Typography>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (flag === "fullloading") advsStore.loadAll();
                  if (flag === "charts") chartsStore.loadAll();
                  else advsStore.loadList();
                }}
              >
                Применить
              </Button>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <TextField
                fullWidth
                value={advsStore.filters.title || ""}
                label="Название"
                onChange={(e): void => {
                  advsStore.filters.title = e.target.value;
                }}
                variant="outlined"
              />
            </Grid>
            <Grid container item spacing={1} xs={12}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  value={advsStore.filters.price?.min || ""}
                  label="Цена min"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e): void => {
                    advsStore.filters.price.min = +e.target.value;
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  value={advsStore.filters.price?.max || ""}
                  label="Цена max"
                  type="number"
                  InputProps={{ inputProps: { min: advsStore.filters.price?.min || 0 } }}
                  onChange={(e): void => {
                    advsStore.filters.price.max = +e.target.value;
                  }}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                id="outlined-select-currency-native"
                select
                label="Тип "
                value={
                  (advsStore.filters.target === AdvTargetType.sell && "sell") ||
                  (advsStore.filters.target === AdvTargetType.rents && "rents") ||
                  ""
                }
                onChange={(e): void => {
                  advsStore.filters.target =
                    e.target.value === "sell"
                      ? AdvTargetType.sell
                      : (e.target.value === "rents" && AdvTargetType.rents) || undefined;
                }}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="sell">Продажа</option>
                <option value="rents">Аренда</option>
                <option value="" />
              </TextField>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                id="outlined-select-currency-native"
                select
                label="Тип объекта"
                value={
                  (advsStore.filters.houseType === HouseType.house && "house") ||
                  (advsStore.filters.houseType === HouseType.flat && "flat") ||
                  (advsStore.filters.houseType === HouseType.apartment && "apartment") ||
                  ""
                }
                onChange={(e): void => {
                  advsStore.filters.houseType =
                    e.target.value === "house"
                      ? HouseType.house
                      : (e.target.value === "flat" && HouseType.flat) ||
                      (e.target.value === "apartment" && HouseType.apartment) ||
                      undefined;
                }}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="house">Дом</option>
                <option value="flat">Комната</option>
                <option value="apartment">Апартаменты</option>
                <option value="" />
              </TextField>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                id="outlined-select-currency-native"
                select
                label="Отделка"
                value={
                  (advsStore.filters.finishing === FinishingType.norm && "norm") ||
                  (advsStore.filters.finishing === FinishingType.nenorm && "nenorm") ||
                  ""
                }
                onChange={(e): void => {
                  advsStore.filters.finishing =
                    e.target.value === "norm"
                      ? FinishingType.norm
                      : (e.target.value === "nenorm" && FinishingType.nenorm) || undefined;
                }}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="norm">Норм ремонт</option>
                <option value="nenorm">Хрень ремонт</option>
                <option value="" />
              </TextField>
            </Grid>
            <Grid container item spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  value={advsStore.filters.countRoom?.min || ""}
                  label="Комнат min"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e): void => {
                    advsStore.filters.countRoom.min = +e.target.value;
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  value={advsStore.filters.countRoom?.max || ""}
                  label="Комнат max"
                  type="number"
                  InputProps={{ inputProps: { min: advsStore.filters.countRoom?.min || 0 } }}
                  onChange={(e): void => {
                    advsStore.filters.countRoom.max = +e.target.value;
                  }}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container item spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  value={advsStore.filters.rating?.min || ""}
                  label="Рейтинг min"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e): void => {
                    advsStore.filters.rating.min = +e.target.value;
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  value={advsStore.filters.rating?.max || ""}
                  label="Рейтинг max"
                  type="number"
                  InputProps={{ inputProps: { min: advsStore.filters.rating?.min || 0 } }}
                  onChange={(e): void => {
                    advsStore.filters.rating.max = +e.target.value;
                  }}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container item spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  value={advsStore.filters.ownerRating?.min || ""}
                  label="Рейтинг Хозяина min"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e): void => {
                    advsStore.filters.ownerRating.min = +e.target.value;
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  value={advsStore.filters.ownerRating?.max || ""}
                  label="Рейтинг Хозяина max"
                  type="number"
                  InputProps={{ inputProps: { min: advsStore.filters.ownerRating?.min || 0 } }}
                  onChange={(e): void => {
                    advsStore.filters.ownerRating.max = +e.target.value;
                  }}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                id="outlined-select-currency-native"
                select
                label="Балкон"
                value={
                  (advsStore.filters.hasBalcony === true && "yes") ||
                  (advsStore.filters.hasBalcony === false && "no") ||
                  "pohui"
                }
                onChange={(e): void => {
                  advsStore.filters.hasBalcony =
                    e.target.value === "no" ? false : (e.target.value === "yes" && true) || undefined;
                }}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="yes">Имеется</option>
                <option value="no">Отсутсвует</option>
                <option value="pohui" />
              </TextField>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                value={advsStore.filters.description || ""}
                label="Описанию"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                onChange={(e): void => {
                  advsStore.filters.description = e.target.value;
                }}
                variant="outlined"
                multiline
                helperText="Описание дома, который ищите"
              />
            </Grid>
            <Button
              variant="outlined"
              fullWidth
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                advsStore.clearFilters();
              }}
            >
              Очистить
            </Button>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default observer(AdvFilters);
