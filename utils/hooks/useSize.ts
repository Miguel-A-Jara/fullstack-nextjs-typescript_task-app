import { useEffect, useState } from 'react';
import useResizeObserver       from '@react-hook/resize-observer';

const useSize = (target: React.RefObject<HTMLElement>) => {
  
  const [size, setSize] = useState<DOMRectReadOnly>();

  useEffect(() => {
    setSize(target.current?.getBoundingClientRect());
  }, [target]);

  useResizeObserver(target, (entry) => setSize(entry.contentRect))
  
  return size;
}

export default useSize;