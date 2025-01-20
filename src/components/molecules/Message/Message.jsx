import { MessageImageThumbnail } from '@/components/atoms/MessageImageThumbnail/MessageImageThumbnail';
import { MessageRenderer } from '@/components/atoms/MessageRenderer/MessageRenderer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const Message = ({
  authorImage,
  authorName,
  createdAt,
  body,
  image,
}) => {
  return (
    <div className='flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60 group relative'>
      <div className='flex items-center gap-2'>
        <button>
          <Avatar>
            <AvatarImage src={authorImage} className='rounded-md' />
            <AvatarFallback className='rounded-md bg-sky-500 text-white text-sm'>
              {authorName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </button>

        <div className='flex flex-col w-full overflow-hidden'>
          <div className='text-xs '>
            <button className='font-bold text-primary hover:underline'>
              {authorName}
            </button>
            <span>&nbsp;&nbsp;</span>
            <button className='text-xs text-muted-foreground hover:underline'>
              {createdAt || 'Just Now'}
            </button>
          </div>
          <MessageRenderer value={body} />
          {/* Any Image if there is any */}
          {image && <MessageImageThumbnail url={image} />}
        </div>
      </div>
    </div>
  );
};