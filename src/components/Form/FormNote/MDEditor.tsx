import ReactMDEditor from '@uiw/react-md-editor';
import { FC, memo, useEffect } from 'react';
import MDEditorLite from 'react-markdown-editor-lite';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const MDEditor: FC<Props> = ({ value = '', onChange }) => {
  useEffect(() => {
    const textAreaElem = document.querySelector('textarea');
    if (textAreaElem) {
      textAreaElem.setAttribute('spellcheck', 'false');
    }
  }, []);

  return (
    <MDEditorLite
      style={{ height: '400px' }}
      value={value}
      theme="dark"
      config={{ spellCheck: false }}
      renderHTML={(text) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(<ReactMDEditor.Markdown className="md-editor-preview" source={text} />);
          }, 100);
        })
      }
      onChange={({ text, html }) => onChange(text)}
    />
  );
};
export default memo(MDEditor);
