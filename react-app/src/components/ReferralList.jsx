/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { fetchReferralList } from '../services/AuthService';
import Spinner from './Spinner';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function createData(
    name,
    calories,
    fat,
    carbs,
    protein,
  ) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

export default function ReferralList() {

  const [loading, setLoading] = useState(false)
  const [referralList, setReferralList] = useState([]);

  useEffect( async () => {
    const token = sessionStorage.getItem('token');
    const response = await fetchReferralList(token);
    setReferralList(response.data.referralList);
    setLoading(false);
  }, [referralList])

  if (loading) return <Spinner />;

  return (
    <div id="referralList">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Invite Status</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {referralList.map((row) => (
                <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.phone_no}</TableCell>
                    <TableCell align="right">{row.invite_accepted}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    </TableContainer>
      
    </div>
  );
}

