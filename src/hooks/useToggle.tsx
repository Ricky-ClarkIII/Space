import { useState } from 'react';

export const useToggle = (initialValue: boolean): [boolean, (val?: boolean) => void] => {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = (val?: boolean) => {
    if (val) {
      setValue(val);
    } else {
      setValue(prevValue => !prevValue);
    }
  };

  return [value, toggle];
};