import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Advertisement, AdvTargetType, FinishingType } from "core/models";

type Props = {
  data: Advertisement;
};

const SpecificationsTable: React.FC<Props> = (props) => {
  const { data } = props;
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="left">Тип</TableCell>
            <TableCell align="left">{data.target === AdvTargetType.rents ? "Аренда" : "Продажа"}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="left">Площадь</TableCell>
            <TableCell align="left">{data.house.size}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="left">Балкон</TableCell>
            <TableCell align="left">{data.house.hasBalcony ? "Есть" : "Нет"}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="left">Комнат</TableCell>
            <TableCell align="left">{data.house.countRoom}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="left">Год Постройки</TableCell>
            <TableCell align="left">{data.house.year}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="left">Отделка</TableCell>
            <TableCell align="left">{data.house.finishing === FinishingType.norm ? "Норм" : "Хрень"}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="left">Рейтинг</TableCell>
            <TableCell align="left">{data.house.rating}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="left">Рейтинг хозяина</TableCell>
            <TableCell align="left">{data.house.owner.rating}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }} />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SpecificationsTable;
