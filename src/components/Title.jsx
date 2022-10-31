import { useTranslation } from 'react-i18next';

export const Title = ({ text = '' }) => {
  const { t } = useTranslation();

  return (
    <h1 className='text-center text-2xl font-seminbold mb-3'>{t(text)}</h1>
  );
};
