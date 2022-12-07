import { Form, Formik, Field, useFormikContext, useField } from 'formik';
import React from 'react';
import { Title } from '../../components/Title';

import * as Yup from 'yup';
import { useClientStore } from '../../hooks';
import { useNavigate } from 'react-router-dom';

// import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

import { useTranslation } from 'react-i18next';

import './IndexPage.css';
import { useState } from 'react';

import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { ReservePage } from '../ReservePage/ReservePage';
import { useEffect } from 'react';

import DatePicker, { Calendar } from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import colors from 'react-multi-date-picker/plugins/colors';

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

  const [firstDate, setFirstDate] = useState();
  const [secondDate, setSecondDate] = useState();
  const [thirdDate, setThirdDate] = useState();
  const [fourthDate, setFourthDate] = useState();

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
                        className='mt-1 flex items-center w-full pl-3 pr-3 py-2 text-base leading-tight border-b bg-white dark:border-slate-700 dark:bg-slate-800'
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

                      <DatePicker
                        inputClass='mt-1 ml-4 flex items-center w-80 pl-3 pr-3 py-2 text-base leading-tight border-b bg-white dark:border-slate-700 dark:bg-slate-800'
                        value={firstDate}
                        onChange={(date) => setFirstDate(date)}
                        dateFormat='d/MM/yyyy'
                        placeholder={t('Fecha de salida')}
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
                      date: [
                        firstDate || new Date(),
                        secondDate || new Date(),
                        thirdDate || new Date(),
                        fourthDate || new Date(),
                      ],
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
                              if (visible === 3) {
                                setFourthDate();
                              }
                              if (visible === 2) {
                                setThirdDate();
                              }
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

                      <DatePicker
                        inputClass='mt-1 ml-4 flex items-center w-80 pl-3 pr-3 py-2 text-base leading-tight border-b bg-white dark:border-slate-700 dark:bg-slate-800'
                        value={firstDate}
                        onChange={(date) => setFirstDate(date)}
                        dateFormat='d/MM/yyyy'
                        placeholder={t('Primera fecha')}
                      />
                      <DatePicker
                        inputClass='mt-1 ml-4 flex items-center w-80 pl-3 pr-3 py-2 text-base leading-tight border-b bg-white dark:border-slate-700 dark:bg-slate-800'
                        value={secondDate}
                        onChange={(date) => setSecondDate(date)}
                        dateFormat='d/MM/yyyy'
                        placeholder={t('Segunda fecha')}
                      />

                      {visible >= 2 && (
                        <DatePicker
                          inputClass='mt-1 ml-4 flex items-center w-80 pl-3 pr-3 py-2 text-base leading-tight border-b bg-white dark:border-slate-700 dark:bg-slate-800'
                          value={thirdDate}
                          onChange={(date) => setThirdDate(date)}
                          dateFormat='d/MM/yyyy'
                          placeholder={t('Tercera fecha')}
                        />
                      )}
                      {visible >= 3 && (
                        <DatePicker
                          inputClass='mt-1 ml-4 flex items-center w-80 pl-3 pr-3 py-2 text-base leading-tight border-b bg-white dark:border-slate-700 dark:bg-slate-800'
                          value={fourthDate}
                          onChange={(date) => setFourthDate(date)}
                          dateFormat='d/MM/yyyy'
                          placeholder={t('Cuarta fecha')}
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
            <div className='bg-white border  dark:border-slate-700 dark:bg-slate-800  w-96 rounded p-4 hidden md:block'>
              <label className='block  text-base font-bold mt-4 text-center'>
                {t('Calendario')}
              </label>
              <div
                className={`flex justify-center items-center ${
                  isSimple ? 'pt-2' : 'pt-10'
                }`}
              >
                <Calendar
                  multiple
                  locale={i18n.language}
                  // onChange={setFirstDate}
                  readOnly
                  value={[firstDate, secondDate, thirdDate, fourthDate]}
                  /* plugins={[<DatePanel />]} */
                />
              </div>
              {/* <div className={`${isSimple && 'hidden'} mt-6`}>
                <label className='block  text-base font-bold mt-4'>
                  {t('Fecha')} 2
                </label>
                <div className='flex justify-center mt-2'>
                  <Calendar
                    locale={i18n.language}
                    onChange={setSecondDate}
                    value={secondDate}
                  />
                </div>
              </div>
              <div className={`${isSimple && 'hidden'} mt-6`}>
                <label className='block  text-base font-bold mt-4'>
                  {t('Fecha')} 3
                </label>
                <div className='flex justify-center mt-2'>
                  <Calendar
                    locale={i18n.language}
                    onChange={setThirdDate}
                    value={thirdDate}
                  />
                </div>
              </div>
              <div className={`${isSimple && 'hidden'} mt-6`}>
                <label className='block  text-base font-bold mt-4'>
                  {t('Fecha')} 4
                </label>
                <div className='flex justify-center mt-2'>
                  <Calendar
                    locale={i18n.language}
                    onChange={setFourthDate}
                    value={fourthDate}
                  />
                </div>
              </div> */}
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
