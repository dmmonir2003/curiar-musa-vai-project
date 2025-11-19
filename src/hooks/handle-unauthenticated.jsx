import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../store/userSlice';
import toast from 'react-hot-toast';

const useUnauthenticate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const unauthenticate = () => {
    dispatch(clearUser());

    navigate('/login/user');
    toast.error('Session expired. Please login again.');
  };

  return unauthenticate;
};

export default useUnauthenticate;
