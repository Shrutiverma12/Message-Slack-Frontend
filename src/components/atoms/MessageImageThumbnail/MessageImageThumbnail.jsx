import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export const MessageImageThumbnail = ({ url }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className='relative overflow-hidden cursor-zoom-in border rounded-md max-w-[300px] max-h-[400px]'>
          <img src={url} className='rounded-md object-cover size-full' />
        </div>
      </DialogTrigger>
      <DialogContent className='max-w-[850px] border-none bg-transparent p-0 shadow-none'>
        <img src={url} className='rounded-md object-cover size-full' />
      </DialogContent>
    </Dialog>
  );
};
