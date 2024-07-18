import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import {
  Card,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material';
import { useNavigate } from 'react-router';
import { GroupDetail } from 'src/models/Group';
import { useAuth } from 'src/utils/auth';
import { useRequests } from 'src/utils/requests';

type Props = {
  groupsLists: GroupDetail[];
  refreshList: () => void;
};

const GroupsTable = ({ groupsLists, refreshList }: Props) => {
  const { handlePermissionExists } = useAuth();
  const { deleteGroup } = useRequests();

  const theme = useTheme();
  const navigate = useNavigate();

  const handleEditGroup = (id: number) => {
    navigate(`/groups/edit/${id}`);
  };

  const handleDeleteGroup = async (id: number) => {
    await deleteGroup(id);
    refreshList();
  };

  return (
    <Container maxWidth="lg">
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>name</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {groupsLists.map((group) => (
                <TableRow hover key={group.id}>
                  <TableCell>
                    <Typography fontWeight="bold" gutterBottom>
                      #{group.id}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography fontWeight="bold" gutterBottom>
                      {group.name}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    {handlePermissionExists('change_group') && (
                      <Tooltip title="Editar cargo" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.primary.lighter
                            },
                            color: theme.palette.primary.main
                          }}
                          color="inherit"
                          size="small"
                        >
                          <EditTwoToneIcon
                            onClick={() => handleEditGroup(group.id)}
                          />
                        </IconButton>
                      </Tooltip>
                    )}

                    {handlePermissionExists('delete_group') && (
                      <Tooltip title="Excluir cargo" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.primary.lighter
                            },
                            color: theme.palette.error.main
                          }}
                          color="inherit"
                          size="small"
                        >
                          <DeleteTwoToneIcon
                            onClick={() => handleDeleteGroup(group.id)}
                          />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
};

export default GroupsTable;
