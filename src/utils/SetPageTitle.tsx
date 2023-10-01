import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SetTitleProps {
  title: string;
}

const SetPageTitle: React.FC<SetTitleProps> = ({ title }) => {
  const location = useLocation();

  useEffect(() => {
    document.title = `${title} | Peak Conditions`;
  }, [title, location.pathname]);

  return null; // SetPageTitle is a utility component, it doesn't render anything
};

export default SetPageTitle;
