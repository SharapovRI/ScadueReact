import './ChildsInfoTable.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import getUnitCollection from '../../../../api/api_requests/getUnitCollection'
import { useFetching } from "../../../../hooks/useFetching";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const ChildsInfoTable = ({ data }) => {
    const [rows, setRows] = useState([]);

    const [fetchingFunction, isLoading, error] =
        useFetching(async () => {
            const rowses = [];
            if (data?.length > 1) {
                const payload = [];
                data.map((item) => {
                    const qwe = {
                        adminLevel: item.adminLevel,
                        unitName: item.name,
                    }
                    payload.push(qwe);
                });
                const ssss = await getUnitCollection(payload);
                ssss.map((item, index) => {
                    console.log(item);
                    item.unitName = data[index].name;
                    item.population = data[index].population > 0 ? data[index].population : 'No info';
                    const entertainmentInfo = item?.buildings?.find(proper => proper.class === "Entertainment")?.count ?? 0;
                    const сommercialInfo = item?.buildings?.find(proper => proper.class === "Commercial")?.count ?? 0;
                    const educationtInfo = item?.buildings?.find(proper => proper.class === "Education")?.count ?? 0;
                    rowses.push({
                        name: item.unitName,
                        population: item.population,
                        entertainment: entertainmentInfo,
                        commercial: сommercialInfo,
                        education: educationtInfo,
                    })
                });
            }
            setRows(rowses);
        }
        );

    useEffect(() => {
        fetchingFunction();
    }, [data]);

    return (
        <>
                <Table sx={{ minWidth: 600, overflowX: "hidden" }} size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Unit</TableCell>
                            <TableCell align="right">Population</TableCell>
                            <TableCell align="right">Entertainment&nbsp;</TableCell>
                            <TableCell align="right">Commercial&nbsp;</TableCell>
                            <TableCell align="right">Education&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    {error && console.log(error)}
                    {isLoading
                        ?
                        (
                            <div className='cit_circular_progress'>
                                <Box sx={{ display: 'flex' }}>
                                    <CircularProgress />
                                </Box>
                            </div>
                        )
                        :
                        (
                            <TableBody>
                                {!error && rows.map((row) => (
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
                        )}
                </Table>
        </>
    )
}

export default ChildsInfoTable;