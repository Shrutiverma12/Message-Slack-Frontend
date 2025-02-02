import {
  AlertTriangleIcon,
  HashIcon,
  Loader,
  MessageSquareTextIcon,
  SendHorizonalIcon,
} from 'lucide-react';
import { useParams } from 'react-router-dom';

import { SideBarItem } from '@/components/atoms/SideBarItem/SideBarItem';
import { UserItem } from '@/components/atoms/UserItem/Useritem';
import { WorkspacePanelHeader } from '@/components/molecules/Workspace/WorkspacePanelHeader';
import { WorkspacePanelSection } from '@/components/molecules/Workspace/WorkspacePanelSection';
import { useGetWorkspaceById } from '@/hooks/apis/workspaces/useGetWorkspaceById';
import { useCreateChannelModal } from '@/hooks/context/useCreateChannelModal';

export const WorkspacePanel = () => {
  const { workspaceId } = useParams();

  const { workspace, isFetching, isSuccess } = useGetWorkspaceById(workspaceId);

  const { setOpenCreateChannelModal } = useCreateChannelModal();

  if (isFetching) {
    return (
      <div className='flex flex-col gap-y-2 items-center justify-center text-white'>
        <Loader className='animate-spin size-6 text-white' />
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <div className='flex flex-col gap-y-2 items-center justify-center text-white'>
        <AlertTriangleIcon className=' size-6 text-white' />
        Something went wrong
      </div>
    );
  }

  return (
    <div className='flex flex-col h-full bg-slack-medium'>
      <WorkspacePanelHeader workspace={workspace} />
      <div className='flex flex-col px-2 mt-3'>
        <SideBarItem
          label='Threads'
          icon={MessageSquareTextIcon}
          id='Threads'
          variant='active'
        />
        <SideBarItem
          label='Drafts & Sends'
          icon={SendHorizonalIcon}
          id='drafts'
          variant='default'
        />
      </div>
      <WorkspacePanelSection
        label={'Channels'}
        onIconClick={() => {
          setOpenCreateChannelModal(true);
        }}
      >
        {workspace?.channels?.map((channel) => {
          return (
            <SideBarItem
              key={channel._id}
              icon={HashIcon}
              label={channel.name}
              id={channel._id}
            />
          );
        })}
      </WorkspacePanelSection>
      <WorkspacePanelSection label='Direct messages' onIconClick={() => {}}>
        {workspace?.members?.map((member) => {
          return (
            <UserItem
              key={member.memberId._id}
              label={member.memberId.username}
              id={member.memberId._id}
              image={member.memberId.avatar}
            />
          );
        })}
      </WorkspacePanelSection>
    </div>
  );
};
