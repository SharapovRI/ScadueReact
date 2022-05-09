import './ChildsInfoTable.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';

const ChildsInfoTable = ({data}) => {
    const [rows, setRows] = useState([]);

    

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Unit</TableCell>
                            <TableCell align="right">Population</TableCell>
                            <TableCell align="right">Entertainment&nbsp;</TableCell>
                            <TableCell align="right">Commercial&nbsp;</TableCell>
                            <TableCell align="right">Education&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.population}</TableCell>
                                <TableCell align="right">{row.entertainment}</TableCell>
                                <TableCell align="right">{row.commercial}</TableCell>
                                <TableCell align="right">{row.education}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default ChildsInfoTable;