import 'quill/dist/quill.snow.css';

import { ImageIcon } from 'lucide-react';
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
  const [text, setText] = useState('');
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);

  const containerRef = useRef();
  const submitRef = useRef();
  const disabledRef = useRef();
  const placeHolderRef = useRef();
  const quillRef = useRef();
  const defaultValueRef = useRef();

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
              onClick={() => {}}
            >
              <ImageIcon className='size-4 ' />
            </Button>
          </Hint>
          <Hint label='Send Message'>
            <Button
              size='sm'
              className='ml-auto bg-[#007a6a] hover:bg-[#007a6a]/80 text-white'
              onClick={() => {
                const messageContent = JSON.stringify(
                  quillRef.current?.getContents()
                );
                onSubmit({ body: messageContent });
                quillRef.current?.setText('');
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
