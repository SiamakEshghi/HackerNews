import { useState, useEffect } from 'react';

const useScroll = () => {
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  const handleScroll = () => {
    const scrollTop =
      document.documentElement?.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement?.scrollHeight || document.body.scrollHeight;

    if (window.innerHeight + scrollTop + 100 >= scrollHeight) {
      return setIsScrolledToBottom(true);
    }

    return setIsScrolledToBottom(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isScrolledToBottom;
};

export default useScroll;
