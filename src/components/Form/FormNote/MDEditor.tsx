import ReactMDEditor from '@uiw/react-md-editor';
import { FC, memo } from 'react';

interface Props {
  content: string;
  onChange: (value: string) => void;
}

const MDEditor: FC<Props> = ({ content = '', onChange }) => {
  console.log('render...');
  return (
    <ReactMDEditor
      tabSize={4}
      preview="edit"
      height={300}
      value={content}
      onChange={(value?: string) => onChange(value as string)}
    />
  );
};
export default memo(MDEditor);
