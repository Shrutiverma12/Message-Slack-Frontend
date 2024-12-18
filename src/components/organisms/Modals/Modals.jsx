import { CreateChannelModel } from '@/components/molecules/CreateChannelModal/CreateChannel';
import { CreateWorkspaceModal } from '@/components/molecules/CreateWorkspaceModal/CreateWorkspaceModal';
import { WorkspacePreferencesModal } from '@/components/molecules/Workspace/WorkspacePreferencesModal';

export const Modals = () => {
  return (
    <>
      <CreateWorkspaceModal />
      <WorkspacePreferencesModal />
      <CreateChannelModel />
    </>
  );
};
