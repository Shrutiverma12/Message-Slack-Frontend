import { Editor } from '@/components/atoms/Editor/Editor';

export const ChatInput = () => {
  async function handleSubmit({ body }) {
    console.log(body);
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
