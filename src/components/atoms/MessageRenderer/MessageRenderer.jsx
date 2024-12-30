import Quill from 'quill';
import { useEffect, useRef, useState } from 'react';

export const MessageRenderer = ({ value }) => {
  console.log('Incoming Value', value);

  const rendererRef = useRef(null);
  const [isEmpty, setIsEmpty] = useState(false);

  console.log('Renderer ref', rendererRef.current);

  useEffect(() => {
    if (!rendererRef.current) return;

    console.log('value is ', rendererRef.current);

    const quil = new Quill(document.createElement('div'), {
      theme: 'snow',
    });

    //Disable editing;
    quil.disable();
    const content = JSON.parse(value);
    quil.setContents(content);
    console.log('Content', quil.root.innerHTML);

    const isContentEmpty = quil.getText().trim.length === 0;
    setIsEmpty(isContentEmpty);

    rendererRef.current.innerHTML = quil.root.innerHTML;
  }, [value]);

  if (isEmpty) return null;

  return <div ref={rendererRef} className='ql-editor ql-renderer'></div>;
};
