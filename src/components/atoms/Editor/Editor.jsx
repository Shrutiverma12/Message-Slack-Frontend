import 'quill/dist/quill.snow.css';

import { ImageIcon, XIcon } from 'lucide-react';
import Quill from 'quill';
import { useEffect, useRef, useState } from 'react';
import { MdSend } from 'react-icons/md';
import { PiTextAa } from 'react-icons/pi';

import { Button } from '@/components/ui/button';

import { Hint } from '../Hint/Hint';

export const Editor = ({
  // variant = 'create',
  onSubmit,
  // onCancel,
  // placeHolder,
  // disabled,
  // defaultValue,
}) => {
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);

  const [image, setImage] = useState(null);

  const containerRef = useRef();
  const placeHolderRef = useRef();
  const quillRef = useRef();
  const defaultValueRef = useRef();
  const imageInputRef = useRef(null);

  function toggleToolbar() {
    setIsToolbarVisible(!isToolbarVisible);
    const toolbar = containerRef.current.querySelector('.ql-toolbar');
    if (toolbar) {
      toolbar.classList.toggle('hidden');
    }
  }

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const editorContainer = container.appendChild(
      container.ownerDocument.createElement('div')
    );

    const options = {
      theme: 'snow',
      placeHolder: placeHolderRef.current,
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['link', 'image'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['clean'],
        ],
        keyboard: {
          binding: {
            enter: {
              key: 'Enter',
              handler: () => {
                return;
              },
            },
            shift_enter: {
              key: 'Enter',
              shiftKey: true,
              handler: () => {
                quill.insertText(quill.getSelection()?.index || 0, '\n');
              },
            },
          },
        },
      },
    };

    const quill = new Quill(editorContainer, options);

    quillRef.current = quill;
    quillRef.current.focus();

    quill.setContents(defaultValueRef.current);
  }, []);

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col border border-slate-300 rounded-md overflow-hidden focus-within:shadow-sm focus-within:border-slate-400 bg-white '>
        <div ref={containerRef} />
        {image && (
          <div className='p-2'>
            <div className='relative size-[60px] flex items-center justify-center group/image'>
              <button
                className=' group-hover/image:file rounded-full bg-black/70 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-[5] border-2 border-white items-center justify-center'
                onClick={() => {
                  setImage(null);
                  imageInputRef.current.value = '';
                }}
              >
                <XIcon className='size-4' />
              </button>
              <img
                src={URL.createObjectURL(image)}
                className='rounded-xl overflow-hidden border object-cover '
              />
            </div>
          </div>
        )}
        <div className='flex px-2 pb-2 z-[5] '>
          <Hint
            label={!isToolbarVisible ? 'Show text' : 'Hide toolbar'}
            side='bottom'
            align='center'
          >
            <Button
              size='sm'
              variant='ghost'
              disabled={false}
              onClick={toggleToolbar}
            >
              <PiTextAa className='size-4' />
            </Button>
          </Hint>

          <Hint label='image'>
            <Button
              size='sm'
              variant='ghost'
              disabled={false}
              onClick={() => {
                imageInputRef.current.click();
              }}
            >
              <ImageIcon className='size-4 ' />
            </Button>
          </Hint>

          <input
            type='file'
            className='hidden'
            ref={imageInputRef}
            onChange={(e) => setImage(e.target.files[0])}
          />

          <Hint label='Send Message'>
            <Button
              size='sm'
              className='ml-auto bg-[#007a6a] hover:bg-[#007a6a]/80 text-white'
              onClick={() => {
                const messageContent = JSON.stringify(
                  quillRef.current?.getContents()
                );
                onSubmit({ body: messageContent, image });
                quillRef.current?.setText('');
                setImage(null);
                imageInputRef.current.value = '';
              }}
              disabled={false}
            >
              <MdSend />
            </Button>
          </Hint>
        </div>
      </div>
      <p className='p-2 text-[10px] text-muted-foreground flex justify-end'>
        <strong>Shift+Enter</strong>&nbsp; to add a new line
      </p>
    </div>
  );
};
