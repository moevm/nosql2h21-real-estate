import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { observer } from "mobx-react";
import advsStore from "stores/advs";
import { AdvTargetType, FinishingType } from "core/models";
import { PaginationFooter } from "components/moleculs";
import { LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import RequestStatus from "core/types/requestStatus";
import { useRouter } from "next/dist/client/router";
import s from "./style.module.scss";

const AdvTable = () => {
  const router = useRouter();

  useEffect(() => {
    advsStore.loadList();
  }, []);

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Box visibility={advsStore.requestStatus === RequestStatus.pending ? "visible" : "hidden"}>
          <LinearProgress />
        </Box>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Тип</TableCell>
                <TableCell align="left">Площадь</TableCell>
                <TableCell align="left">Балкон</TableCell>
                <TableCell align="left">Комнат</TableCell>
                <TableCell align="left">Год Постройки</TableCell>
                <TableCell align="left">Отделка</TableCell>
                {/* <TableCell align="left">Рейтинг</TableCell> */}
                {/* <TableCell align="left">Рейтинг хозяина</TableCell> */}
                <TableCell align="left">Адрес</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {advsStore.list.map((data) => {
                return (
                  <TableRow className={s.row} key={data._id} hover onClick={() => router.push(`/abc/${data._id}`)}>
                    <>
                      {/* <Link href={} passHref> */}
                      <TableCell align="left">{data.target === AdvTargetType.rents ? "Аренда" : "Продажа"}</TableCell>
                      <TableCell align="left">{data.house.size}</TableCell>
                      <TableCell align="left">{data.house.hasBalcony ? "Есть" : "Нет"}</TableCell>
                      <TableCell align="left">{data.house.countRoom}</TableCell>
                      <TableCell align="left">{data.house.year}</TableCell>
                      <TableCell align="left">{data.house.finishing === FinishingType.norm ? "Норм" : "Хрень"}</TableCell>
                      {/* <TableCell align="left">{data.house.rating}</TableCell> */}
                      {/* <TableCell align="left">{data.house.owner.rating}</TableCell> */}
                      <TableCell align="left">{data.house.address.value}</TableCell>
                      {/* </Link> */}
                    </>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <PaginationFooter
        total={advsStore.pagination.total}
        page={advsStore.pagination.page}
        limit={advsStore.pagination.limit}
        next={advsStore.nextPage}
        prev={advsStore.prevPage}
        setLimit={advsStore.setLimit}
      />
    </>
  );
};

export default observer(AdvTable);
