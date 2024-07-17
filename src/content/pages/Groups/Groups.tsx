import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import GroupsTable from 'src/components/GroupsTable';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { PermissionMiddleware } from 'src/middlewares/PermissionMiddleware';
import { GroupDetail } from 'src/models/Group';
import { useRequests } from 'src/utils/requests';

const Groups = () => {
  const [requestLoading, setRequestLoading] = useState(true);
  const [groupsData, setGroupsData] = useState<GroupDetail[]>([]);

  const { getGroups } = useRequests();

  const handleGetGroups = async () => {
    const response = await getGroups();

    setGroupsData(response.data.groups);
    setRequestLoading(false);
  };

  useEffect(() => {
    handleGetGroups();
  }, []);

  return (
    <PermissionMiddleware codeName="view_group">
      <>
        <Helmet>Cargos</Helmet>

        <PageTitleWrapper>
          <PageTitle
            heading="Cargos"
            subHeading="Consulte os cargos da empresa e execute ações"
          />
        </PageTitleWrapper>
      </>

      <Container
        maxWidth="xl"
        sx={{ marginX: requestLoading ? '-10%' : 0, transition: 'all .5s' }}
      >
        <GroupsTable refreshList={handleGetGroups} groupsLists={groupsData} />
      </Container>
    </PermissionMiddleware>
  );
};

export default Groups;
