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

export default function PaymentTable({ title }) {
  const {
    getPaymentsState: { data: transList },
  } = useSelector((state) => state.payment);
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
              <TableCell align="center">Номер платежа</TableCell>
              <TableCell align="center">Сумма</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transList?.map((row) => (
              <TableRow key={row?.nickname} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '& td': { whiteSpace: 'nowrap' } }}>
                <TableCell align="center">{moment(row?.date).format('DD.MM.YYYY HH:mm')}</TableCell>
                <TableCell align="center">{row?.number}</TableCell>
                <TableCell align="center" sx={{ fontWeight: '600', color: 'success.light' }}>
                  {currencyFormat(row?.price)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  ) : (
    <div className="" style={{ width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'center', fontSize: '24px', fontWeight: '600', opacity: '0.4', marginTop: '64px' }}>
      Пополнений нет
    </div>
  );
}
