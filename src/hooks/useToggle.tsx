import { useState } from 'react';

export const useToggle = (initialValue: boolean): [boolean, (val?: boolean) => void] => {
  const [value, setValue] = useState<boolean>(initialValue);

  function toggle(value?: boolean): void {
    setValue(currentValue =>
      typeof value === "boolean" ? value : !currentValue
    );
  }

  return [value, toggle];
};