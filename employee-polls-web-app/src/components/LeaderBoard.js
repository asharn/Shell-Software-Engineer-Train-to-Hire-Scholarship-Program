import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { Avatar, Stack, Typography } from '@mui/material';
import { connect } from 'react-redux';
import { useLocation, useNavigate, useParams } from "react-router-dom";


const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#00FFCF',
    color: theme.palette.common.black,
    fontSize: 24,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const LeaderBoard = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const { leaderboardData } = props;

  const columns = [
    { id: 'users', label: 'Users', minWidth: 50, align: 'left' },
    { id: 'answered', label: 'Answered', minWidth: 20, align: 'center' },
    { id: 'created', label: 'Created', minWidth: 20, align: 'right' },
  ];

  const rows = leaderboardData;

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: '100%'}}>
    <Paper sx={{ boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: "10px", width: '50%', overflow: 'hidden', marginRight: 10,   marginLeft: 10,  marginTop: 5,}}>
      
      <TableContainer sx={{ maxHeight: 420 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <StyledTableRow hover role="checkbox" key={row.id}>
                    {columns.map((column) => {
                    if(column.id ==='users'){
                      return (
                        <StyledTableCell key={column.id} align={column.align} style={{direction: 'row', display:'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                          <Avatar variant='circular' sx={{ width: 30, height: 30 }} src={row.avatarURL}/>
                          <Typography>&nbsp;&nbsp;</Typography>
                          <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="right"
                            spacing={-1}>
                            <Typography>{ row.name }</Typography>
                            <Typography>{ row.id }</Typography>
                          </Stack>
                          
                        </StyledTableCell>
                      );
                    } else if(column.id ==='answered') {
                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          { row.answerCount }
                        </StyledTableCell>
                      );
                    } else {
                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          { row.questionCount }
                        </StyledTableCell>
                      );
                    }
                    })}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </div>
  );
}


const mapStateToProps = ({ users }) => ({
    leaderboardData: Object.values(users)
    .map(user => ({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      answerCount: Object.values(user.answers).length,
      questionCount: user.questions.length,
      total: Object.values(user.answers).length + user.questions.length
    }))
    .sort((a, b) => a.total - b.total)
    .reverse()
});

export default withRouter(connect(mapStateToProps)(LeaderBoard));
