import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { currencyFormat } from '../utils/currencyFormat';
import { Typography } from '@mui/material';
import { randomIntFromInterval } from '../utils/randomNumber';

export default function TrancTable({ title }) {
  const {
    getTransactionsState: { data: transList },
  } = useSelector((state) => state.transaction);
  return transList?.length !== 0 && transList ? (
    <div>
      <Typography variant="h6" sx={{ mb: 2, textAlign: 'left', fontWeight: '600' }}>
        {title}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Дата</TableCell>
              <TableCell align="center">ID аккаунта</TableCell>
              <TableCell align="center">Ник аккаунта</TableCell>
              <TableCell align="center">Сумма</TableCell>
              <TableCell align="center">Номер транзакции</TableCell>
              <TableCell align="center">Игровая валюта</TableCell>
              <TableCell align="center">Сервер</TableCell>
              <TableCell align="center">Игра</TableCell>
              <TableCell align="center">Статус</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transList?.map((row) => (
              <TableRow key={row?.nickname} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '& td': { whiteSpace: 'nowrap' } }}>
                <TableCell align="left">{moment(row?.date).format('DD.MM.YYYY HH:mm')}</TableCell>
                <TableCell align="center">{row?.nickid}</TableCell>
                <TableCell align="center">{row?.nickname}</TableCell>
                <TableCell align="center">{currencyFormat(row?.price)}</TableCell>
                <TableCell align="center">{`${row?.number}${row?.typeGameId == 2 ? randomIntFromInterval(1000, 9999) : ''}`}</TableCell>
                <TableCell align="center">{row?.packageName}</TableCell>

                <TableCell align="center">{row?.serverid === 2001 ? 'Asia' : row?.serverid === 2011 ? 'NA and EU' : row?.serverid == 1 ? 'America' : row?.serverid == 2 ? 'Europe' : row?.serverid == 3 ? 'Asia' : row?.serverid == 4 ? 'TW, HK, MO' : ''}</TableCell>
                <TableCell align="center">{row?.typeGame?.name}</TableCell>
                <TableCell align="center">{row?.status === 'processing' ? 'Выполняется' : row?.status === 'completed' ? 'Выполнен' : 'refunded'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  ) : (
    <div className="" style={{ width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'center', fontSize: '24px', fontWeight: '600', opacity: '0.4', marginTop: '64px' }}>
      Покупок нет
    </div>
  );
}
