import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useAddChannelToWorkspace } from '@/hooks/apis/workspaces/useAddChannelToWorkspace';
import { useCreateChannelModal } from '@/hooks/context/useCreateChannelModal';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';
import { useToast } from '@/hooks/use-toast';

export const CreateChannelModel = () => {
  const { openCreateChannelModal, setOpenCreateChannelModal } =
    useCreateChannelModal();

  const queryClient = useQueryClient();

  const { toast } = useToast();

  const { currentWorkspace } = useCurrentWorkspace();

  const { addChannelToWorkspaceMutation } = useAddChannelToWorkspace();

  const [channelName, setChannelName] = useState('');

  function handleClose() {
    setOpenCreateChannelModal(false);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    await addChannelToWorkspaceMutation({
      workspaceId: currentWorkspace?._id,
      channelName: channelName,
    });

    toast({
      type: 'success',
      title: 'Channel created successfully',
    });

    queryClient.invalidateQueries(
      `fetchWorkspaceById-${currentWorkspace?._id}`
    );
    setOpenCreateChannelModal(false);
  }

  return (
    <Dialog open={openCreateChannelModal} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a channel</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFormSubmit}>
          <Input
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            minLength={3}
            placeholder='Channel name e.g. team-announcements'
            required
          />
          <div className='flex justify-end mt-4'>
            <Button>Create Channel</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
