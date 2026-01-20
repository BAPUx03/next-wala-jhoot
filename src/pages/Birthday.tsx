import { useParams, useNavigate } from 'react-router-dom';
import { BirthdayWish } from '@/components/BirthdayWish';

const Birthday = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return <BirthdayWish onBack={() => navigate('/')} linkId={id} />;
};

export default Birthday;
