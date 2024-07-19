import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import TasksTable from 'src/components/TasksTable';
import { PermissionMiddleware } from 'src/middlewares/PermissionMiddleware';
import { Task } from 'src/models/Tasks';
import { useRequests } from 'src/utils/requests';

const Tasks = () => {
  const [requestLoading, setRequestLoading] = useState(true);
  const [taskData, setTaskData] = useState<Task[]>([]);

  const { getTasks } = useRequests();

  const handleGetTasks = async () => {
    const response = await getTasks();

    if (!response.detail) {
      setTaskData(response.data.tasks);
      setRequestLoading(false);
    }
  };

  useEffect(() => {
    handleGetTasks();
  }, []);

  return (
    <PermissionMiddleware codeName="view_task">
      <Helmet>
        <title>Tarefas</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Tarefas"
          subHeading="Consulte as tarefas dos funcionários e execute ações em cada uma delas."
        />
      </PageTitleWrapper>

      <Container
        maxWidth="xl"
        sx={{ marginX: requestLoading ? '-10%' : 0, transition: 'all .5s' }}
      >
        <TasksTable tasksList={taskData} refreshList={handleGetTasks} />
      </Container>
    </PermissionMiddleware>
  );
};

export default Tasks;
