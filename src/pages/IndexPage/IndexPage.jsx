import { Form, Formik, Field, useFormikContext, useField } from 'formik';
import React from 'react';
import { Title } from '../../components/Title';

import * as Yup from 'yup';
import { useClientStore } from '../../hooks';
import { useNavigate } from 'react-router-dom';

import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

import { useTranslation } from 'react-i18next';

import './IndexPage.css';
import { useState } from 'react';

import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { ReservePage } from '../ReservePage/ReservePage';

export const IndexPage = () => {
  const { startCreate } = useClientStore();

  const navigate = useNavigate();

  const { t } = useTranslation();

  const [isSimple, setIsSimple] = useState(true);

  const [routes, setRoutes] = useState([
    {
      name: 'SAN CRISTÓBAL - SANTA CRUZ 7AM',
      value: 'SC-SX',
      time: 'Am',
    },
    {
      name: 'SAN CRISTÓBAL - SANTA CRUZ 3PM',
      value: 'SC-SX',
      time: 'Pm',
    },
    {
      name: 'SANTA CRUZ - SAN CRISTÓBAL 7AM',
      value: 'SX-SC',
      time: 'Am',
    },
    {
      name: 'SANTA CRUZ - SAN CRISTÓBAL 3PM',
      value: 'SX-SC',
      time: 'Pm',
    },
    {
      name: 'SANTA CRUZ - ISABELA 7AM',
      value: 'SX-IB',
      time: 'Am',
    },
    {
      name: 'ISABELA - SANTA CRUZ 6AM',
      value: 'IB-SX',
      time: 'Am',
    },
    {
      name: 'ISABELA - SANTA CRUZ 3PM',
      value: 'IB-SX',
      time: 'Pm',
    },
    {
      name: 'SANTA CRUZ - FLOREANA 8AM',
      value: 'SX-FL',
      time: 'Am',
    },
    {
      name: 'FLOREANA - SANTA CRUZ 3PM',
      value: 'FL-SX',
      time: 'Pm',
    },
  ]);

  const [query1, setQuery1] = useState('');

  const [formRoute, setFormRoute] = useState(routes[0].value);

  const handleRouteSelect = (e) => {
    e.preventDefault();

    console.log(e.target.value);

    setFormRoute(e.target.value);
  };

  const getRoute = (value = '') => {
    if (value === '') {
      return '';
    }
    let route = routes.find((data) => data.value === value);
    return {
      time: route.time,
      name: route.name,
    };
  };

  const [firstDate, setFirstDate] = useState(new Date());

  const [viewPos, setViewPos] = useState(0);

  const [numberPassengers, setNumberPassengers] = useState(1);

  const handleContinueBtn = (e) => {
    e.preventDefault();
  };

  const DatePickerField = ({ ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);

    return (
      <ReactDatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.value, val);
        }}
        // dateFormat='d/MMMM/yyyy'
      />
    );
  };

  const [initialValues, setInitialValues] = useState(null);

  return (
    <div className='h-screen w-full background-img'>
      {initialValues === null ? (
        <div className='flex justify-center items-center pt-20 md:pt-64 md:h-96'>
          <div className='grid md:grid-cols-2 gap-6'>
            <div className='bg-white border  dark:border-slate-700 dark:bg-slate-800 w-96 rounded p-4'>
              <div className='grid grid-cols-2 gap-4 pb-3'>
                <button
                  className={`text-center text-lg font-semibold text-gray-700 dark:text-white hover:text-black hover:cursor-pointer border-b-2 ${
                    isSimple && 'border-blue-500 text-black dark:text-white'
                  }`}
                  onClick={() => setIsSimple(true)}
                >
                  <p>Viaje Simple</p>
                </button>
                <button
                  className={`text-center text-lg font-semibold text-gray-700 dark:text-white hover:text-black hover:cursor-pointer border-b-2 ${
                    !isSimple && 'border-blue-500 text-black dark:text-white'
                  }`}
                  onClick={() => setIsSimple(false)}
                >
                  <p>Viaje Compuesto</p>
                </button>
              </div>
              {isSimple ? (
                <Formik
                  initialValues={{
                    route: routes[0].value,
                    date: new Date(),
                    number: 1,
                  }}
                  onSubmit={(form) => {
                    const { name, time } = getRoute(form.route);

                    console.log({
                      route: form.route,
                      date: firstDate,
                      time: time,
                      numberPassengers,
                    });

                    setInitialValues({
                      route: form.route,
                      date: firstDate,
                      time: time,
                      numberPassengers,
                    });
                  }}
                >
                  {({ values, errors, touched }) => (
                    <Form>
                      <label className='block  text-base font-bold '>
                        {t('Ruta')}
                      </label>
                      <Field
                        as='select'
                        className='flex items-center w-full pl-3 pr-3 py-2 text-base leading-tight border bg-white dark:border-slate-700 dark:bg-slate-800'
                        name={`route`}
                      >
                        {routes.map((route) => (
                          <option value={route.value}>{route.name}</option>
                        ))}
                      </Field>

                      <label className='block  text-base font-bold mt-4'>
                        {t('Fecha')}
                      </label>
                      <ReactDatePicker
                        className='flex items-center w-full pl-3 pr-3 py-2 text-base leading-tight border bg-white dark:border-slate-700 dark:bg-slate-800'
                        selected={firstDate}
                        onChange={(date) => setFirstDate(date)}
                        name='date'
                        dateFormat='d/MMMM/yyyy'
                      />
                      <label className='block  text-base font-bold mt-4'>
                        {t('Pasajeros')}
                        <i class='fa-solid fa-user ml-3'></i>
                      </label>
                      <div className='flex justify-center gap-3'>
                        <button
                          className=''
                          onClick={() => {
                            numberPassengers > 1 &&
                              setNumberPassengers(numberPassengers - 1);
                          }}
                          type='button'
                        >
                          <i className='fa-solid fa-minus text-xl'></i>
                        </button>
                        {numberPassengers}
                        <button
                          className=''
                          onClick={() =>
                            setNumberPassengers(numberPassengers + 1)
                          }
                          type='button'
                        >
                          <i className='fa-solid fa-plus text-xl'></i>
                        </button>
                      </div>
                      <div className='flex justify-center pt-3'>
                        <button
                          className='bg-azul text-white hover:bg-azulClaro py-1 px-2 rounded-md'
                          onChange={handleContinueBtn}
                          type='submit'
                        >
                          Continuar
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              ) : (
                <></>
              )}
            </div>
            <div className='bg-white border  dark:border-slate-700 dark:bg-slate-800  w-96 rounded p-4 hidden md:block'>
              <label className='block  text-base font-bold mt-4'>
                {t('Fecha')}
              </label>
              <Calendar onChange={setFirstDate} value={firstDate} />
            </div>
          </div>
        </div>
      ) : (
        <ReservePage initValues={initialValues} />
      )}
    </div>
  );
};
