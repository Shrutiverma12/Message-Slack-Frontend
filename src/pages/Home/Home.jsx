import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserButton } from '@/components/atoms/UserButton/UserButton';
import { useFetchWorkspace } from '@/hooks/apis/workspaces/useFetchWorkspace';
import { useCreateWorkspaceModal } from '@/hooks/context/useCreateWorkspaceModal';

export const Home = () => {
  const navigate = useNavigate();

  const { setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();

  const { isFetching, workspaces } = useFetchWorkspace();

  useEffect(() => {
    if (isFetching) return;

    console.log('Workspaces downloaded is', workspaces);

    if (workspaces.length === 0 || !workspaces) {
      console.log('No workspace found create one');
      setOpenCreateWorkspaceModal(true);
    } else {
      navigate(`/workspaces/${workspaces[0]._id}`);
    }
  }, [isFetching, workspaces, navigate, setOpenCreateWorkspaceModal]);

  return (
    <>
      <h1>Home</h1>
      <UserButton />
    </>
  );
};
