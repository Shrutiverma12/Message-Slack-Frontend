import { uploadImageUrl } from '@/apis/s3';
import { Editor } from '@/components/atoms/Editor/Editor';
import { useAuth } from '@/hooks/context/useAuth';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';
import { useSocket } from '@/hooks/context/useSocket';

export const ChatInput = () => {
  const { socket, currentChannel } = useSocket();
  const { auth } = useAuth();
  const { currentWorkspace } = useCurrentWorkspace();
  //const queryClient = useQueryClient();

  async function handleSubmit({ body, image }) {
    let fileUrl = null;
    if (image) {
      // const preSignedUrl = await queryClient.fetchQuery({
      //   queryKey: ['getPresignedUrl'],
      //   queryFn: () => getPresignedUrl({ token: auth.token }),
      // });

      //console.log(preSignedUrl);
      const responseCloudinary = await uploadImageUrl({
        // url: preSignedUrl,
        file: image,
      });
      fileUrl = responseCloudinary;
      console.log('File upload', responseCloudinary);
      //fileUrl = preSignedUrl;
      //https://res.cloudinary.com/dpwwyvfvf/image/upload/s--4-abbUeu--/1736323992960?_a=BAMCkGWM0
    }
    socket?.emit(
      'NewMessage',
      {
        channelId: currentChannel,
        body,
        image: fileUrl,
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
