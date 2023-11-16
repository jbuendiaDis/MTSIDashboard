import React from 'react';
import SvgColor from './SvgColor';

interface IconProps {
  name: string;
}

const Icon: React.FC<IconProps> = ({ name }) => (
  <SvgColor
    src={`../../../public/assets/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const MemoizedIcon = React.memo(Icon);

export default MemoizedIcon;
