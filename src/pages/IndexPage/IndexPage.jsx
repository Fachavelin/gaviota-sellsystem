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
import { useEffect } from 'react';

export const IndexPage = () => {
  const { startCreate } = useClientStore();

  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  useEffect(() => {
    console.log('i18n', i18n.language);
  }, [i18n]);

  const [isSimple, setIsSimple] = useState(false);

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
      name: 'SANTA CRUZ - SAN CRISTÓBAL 3PM',
      value: 'SX-SC',
      time: 'Pm',
    },
    {
      name: 'SANTA CRUZ - SAN CRISTÓBAL 7AM',
      value: 'SX-SC',
      time: 'Am',
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
  // const [formRoute2, setFormRoute2] = useState(routes[4].value);
  const handleRouteSelect = (e) => {
    e.preventDefault();

    console.log(e.target.value);

    setFormRoute(e.target.value);
  };

  const getRoute = (value = '') => {
    if (value === '') {
      return '';
    }
    let route = routes.find((data) => data.name === value);
    return {
      time: route.time,
      value: route.value,
    };
  };

  const [firstDate, setFirstDate] = useState(new Date());
  const [secondDate, setSecondDate] = useState(new Date());
  const [thirdDate, setThirdDate] = useState(new Date());
  const [fourthDate, setFourthDate] = useState(new Date());

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

  const [visible, setVisible] = useState(1);

  return (
    <div className='min-h-screen w-full background-img'>
      {initialValues === null ? (
        /*   */
        <div
          className={`flex justify-center items-center py-20 ${
            isSimple ? 'md:py-64' : 'md:py-80'
          }  md:h-96`}
        >
          <div className='grid md:grid-cols-2 gap-6'>
            <div className='bg-white border  dark:border-slate-700 dark:bg-slate-800 w-96 rounded p-4'>
              <div className='grid grid-cols-2 gap-4 pb-3'>
                <button
                  className={`text-center text-lg font-semibold text-gray-700 dark:text-white hover:text-black hover:cursor-pointer border-b-2 ${
                    isSimple && 'border-blue-500 text-black dark:text-white'
                  }`}
                  onClick={() => setIsSimple(true)}
                >
                  <p>{t('Una ruta')}</p>
                </button>
                <button
                  className={`text-center text-lg font-semibold text-gray-700 dark:text-white hover:text-black hover:cursor-pointer border-b-2 ${
                    !isSimple && 'border-blue-500 text-black dark:text-white'
                  }`}
                  onClick={() => setIsSimple(false)}
                >
                  <p>{t('Varias rutas')}</p>
                </button>
                {/* <p
                  className={`text-center text-lg font-bold  dark:text-white hover:text-black hover:cursor-pointer`}
                >
                  {t('Datos de viaje')}
                </p> */}
              </div>
              {isSimple ? (
                <Formik
                  initialValues={{
                    route: routes[0].name,
                    date: new Date(),
                    number: 1,
                  }}
                  onSubmit={(form) => {
                    const { value, time } = getRoute(form.route);

                    console.log({
                      route: form.route,
                      date: firstDate,
                      time: time,
                      numberPassengers,
                    });

                    setInitialValues({
                      route: [form.route],
                      date: [firstDate],
                      time: [time],
                      numberPassengers,
                      visible: 0,
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
                        {routes.map((route, key) => (
                          <option key={key} value={route.name}>
                            {route.name}
                          </option>
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
                        dateFormat='d/MM/yyyy'
                      />
                      <label className='block  text-base font-bold mt-4'>
                        {t('Pasajeros')}
                        <i className='fa-solid fa-user ml-3'></i>
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
                          {t('Continuar')}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              ) : (
                <Formik
                  initialValues={{
                    route: routes[0].name,
                    route2: routes[1].name,
                    route3: routes[2].name,
                    route4: routes[3].name,
                    date: new Date(),
                    date2: new Date(),
                    date3: new Date(),
                    date4: new Date(),
                    number: 1,
                  }}
                  onSubmit={(form) => {
                    const { time } = getRoute(form.route);
                    const { time: time2 } = getRoute(form.route2);
                    const { time: time3 } = getRoute(form.route3);
                    const { time: time4 } = getRoute(form.route4);

                    console.log({
                      route: form.route,
                      route2: form.route2,
                      route3: form.route3,
                      route4: form.route4,
                      date: firstDate,
                      date2: secondDate,
                      date3: secondDate,
                      date4: secondDate,
                      time: time,
                      time2: time2,
                      time3: time3,
                      time4: time4,
                      numberPassengers,
                      visible,
                    });

                    setInitialValues({
                      route: [
                        form.route,
                        form.route2,
                        form.route3,
                        form.route4,
                      ],
                      date: [firstDate, secondDate, thirdDate, fourthDate],
                      time: [time, time2, time3, time4],
                      numberPassengers,
                      visible,
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
                        className='mt-1 flex items-center w-full pl-3 pr-3 py-2 text-base leading-tight border-b bg-white dark:border-slate-700 dark:bg-slate-800'
                        name={`route`}
                      >
                        {routes.map((route, key) => (
                          <option key={key} value={route.name}>
                            {route.name}
                          </option>
                        ))}
                      </Field>
                      <Field
                        as='select'
                        className='mt-1 flex items-center w-full pl-3 pr-3 py-2 text-base leading-tight border-b bg-white dark:border-slate-700 dark:bg-slate-800'
                        name={`route2`}
                      >
                        {routes.map((route, key) => (
                          <option key={key} value={route.name}>
                            {route.name}
                          </option>
                        ))}
                      </Field>
                      {visible >= 2 && (
                        <Field
                          as='select'
                          className='mt-1 flex items-center w-full pl-3 pr-3 py-2 text-base leading-tight border-b bg-white dark:border-slate-700 dark:bg-slate-800'
                          name={`route3`}
                        >
                          {routes.map((route, key) => (
                            <option key={key} value={route.name}>
                              {route.name}
                            </option>
                          ))}
                        </Field>
                      )}
                      {visible >= 3 && (
                        <Field
                          as='select'
                          className='mt-1 flex items-center w-full pl-3 pr-3 py-2 text-base leading-tight border-b bg-white dark:border-slate-700 dark:bg-slate-800'
                          name={`route4`}
                        >
                          {routes.map((route, key) => (
                            <option key={key} value={route.name}>
                              {route.name}
                            </option>
                          ))}
                        </Field>
                      )}

                      <div className='flex justify-end gap-2 mt-2'>
                        <button
                          className='text-azul hover:bg-gray-100 py-2 px-2'
                          type='button'
                          onClick={() => {
                            if (visible > 1) {
                              setVisible(visible - 1);
                            }
                          }}
                        >
                          {t('Eliminar ruta')}
                        </button>
                        <button
                          className='text-azul hover:bg-gray-100 py-2 px-2'
                          type='button'
                          onClick={() => {
                            if (visible < 3) {
                              setVisible(visible + 1);
                            }
                          }}
                        >
                          {t('Agregar ruta')}
                        </button>
                      </div>

                      <label className='block  text-base font-bold mt-4'>
                        {t('Fecha de ida')}
                      </label>
                      <ReactDatePicker
                        className='mt-1 flex items-center w-full pl-3 pr-3 py-2 text-base leading-tight border-b bg-white dark:border-slate-700 dark:bg-slate-800'
                        selected={firstDate}
                        onChange={(date) => setFirstDate(date)}
                        name='date'
                        dateFormat='d/MM/yyyy'
                      />
                      <ReactDatePicker
                        className='mt-1 flex items-center w-full pl-3 pr-3 py-2 text-base leading-tight border-b bg-white dark:border-slate-700 dark:bg-slate-800'
                        selected={secondDate}
                        onChange={(date) => setSecondDate(date)}
                        name='date'
                        dateFormat='d/MM/yyyy'
                      />
                      {visible >= 2 && (
                        <ReactDatePicker
                          className='mt-1 flex items-center w-full pl-3 pr-3 py-2 text-base leading-tight border-b bg-white dark:border-slate-700 dark:bg-slate-800'
                          selected={thirdDate}
                          onChange={(date) => setThirdDate(date)}
                          name='date'
                          dateFormat='d/MM/yyyy'
                        />
                      )}
                      {visible >= 3 && (
                        <ReactDatePicker
                          className='mt-1 flex items-center w-full pl-3 pr-3 py-2 text-base leading-tight border-b bg-white dark:border-slate-700 dark:bg-slate-800'
                          selected={fourthDate}
                          onChange={(date) => setFourthDate(date)}
                          name='date'
                          dateFormat='d/MM/yyyy'
                        />
                      )}
                      <label className='block  text-base font-bold mt-4'>
                        {t('Pasajeros')}
                        <i className='fa-solid fa-user ml-3'></i>
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
                          {t('Continuar')}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
            </div>
            <div className='bg-white border  dark:border-slate-700 dark:bg-slate-800  w-96 rounded p-4 hidden md:block overflow-y-auto max-h-96'>
              <label className='block  text-base font-bold mt-4'>
                {t('Fecha')} 1
              </label>
              <Calendar
                locale={i18n.language}
                onChange={setFirstDate}
                value={firstDate}
              />
              <div className={`${isSimple && 'hidden'} mt-6`}>
                <label className='block  text-base font-bold mt-4'>
                  {t('Fecha')} 2
                </label>
                <Calendar
                  locale={i18n.language}
                  onChange={setSecondDate}
                  value={secondDate}
                />
              </div>
              <div className={`${isSimple && 'hidden'} mt-6`}>
                <label className='block  text-base font-bold mt-4'>
                  {t('Fecha')} 3
                </label>
                <Calendar
                  locale={i18n.language}
                  onChange={setThirdDate}
                  value={thirdDate}
                />
              </div>
              <div className={`${isSimple && 'hidden'} mt-6`}>
                <label className='block  text-base font-bold mt-4'>
                  {t('Fecha')} 4
                </label>
                <Calendar
                  locale={i18n.language}
                  onChange={setFourthDate}
                  value={fourthDate}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ReservePage
          initValues={initialValues}
          setInitValues={setInitialValues}
        />
      )}
    </div>
  );
};
