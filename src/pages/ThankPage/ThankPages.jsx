import { useTranslation } from 'react-i18next';
import { Layout } from '../../layout';

export const ThankPages = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className='mt-20 text-center text-4xl'>
        {t('Gracias por usar nuestro servicio')}
      </div>
    </Layout>
  );
};
