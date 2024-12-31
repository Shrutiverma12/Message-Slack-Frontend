import { Editor } from '@/components/atoms/Editor/Editor';
import { useAuth } from '@/hooks/context/useAuth';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';
import { useSocket } from '@/hooks/context/useSocket';

export const ChatInput = () => {
  const { socket, currentChannel } = useSocket();
  const { auth } = useAuth();
  const { currentWorkspace } = useCurrentWorkspace();

  async function handleSubmit({ body }) {
    console.log(body);
    socket?.emit(
      'NewMessage',
      {
        channelId: currentChannel,
        body,
        senderId: auth?.user?._id,
        workspaceId: currentWorkspace?._id,
      },
      (data) => {
        console.log('Message sent', data);
      }
    );
  }

  return (
    <div className='px05 w-full'>
      <Editor
        placeHolder='Type a message...'
        onSubmit={handleSubmit}
        onCancel={() => {}}
        defaultValue=''
      />
    </div>
  );
};
