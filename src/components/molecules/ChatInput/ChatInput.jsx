import { Editor } from '@/components/atoms/Editor/Editor';

export const ChatInput = () => {
  return (
    <div className='px05 w-full'>
      <Editor
        placeHolder='Type a message...'
        onSubmit={() => {}}
        onCancel={() => {}}
        defaultValue=''
      />
    </div>
  );
};
