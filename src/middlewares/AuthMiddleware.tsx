import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from 'src/utils/auth';

type Props = {
  children: ReactNode;
};

export const AuthMiddleware = ({ children }: Props) => {
  const navigate = useNavigate();
  const { isLogged } = useAuth();

  useEffect(() => {
    if (!isLogged) navigate('/signin');
  }, []);

  return <>{children}</>;
};
