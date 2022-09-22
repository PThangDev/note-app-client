import { FC } from 'react';

interface Props {
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
}

const PinIcon: FC<Props> = ({ className, width = 24, height = 24, onClick }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      onClick={onClick}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        fill="currentColor"
        d="M17 4v7l2 3v2h-6v5l-1 1-1-1v-5H5v-2l2-3V4c0-1.1.9-2 2-2h6c1.11 0 2 .89 2 2zM9 4v7.75L7.5 14h9L15 11.75V4H9z"
      />
    </svg>
  );
};
export default PinIcon;
