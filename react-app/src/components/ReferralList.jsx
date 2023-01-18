import React, { useEffect, useState } from "react";
import { fetchReferralList } from "../services/AuthService";
import Spinner from "./Spinner";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export default function ReferralList() {
  const [loading, setLoading] = useState(false);
  const [referralList, setReferralList] = useState([]);

  const fetchAndSetReferralList = async () => {
    const token = sessionStorage.getItem("token");
    const response = await fetchReferralList(token);
    setReferralList(response.referralList);
    setLoading(false);
  };

  useEffect(() => {
    fetchAndSetReferralList();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div id="referralList">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone Number</TableCell>
              <TableCell align="right">Invite Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {referralList.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.phone_no}</TableCell>
                <TableCell align="right">{row.invite_status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
