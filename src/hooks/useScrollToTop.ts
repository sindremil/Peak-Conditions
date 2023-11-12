import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function useScrollToTop() {
  const { param } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [param]);
}

export default useScrollToTop;
