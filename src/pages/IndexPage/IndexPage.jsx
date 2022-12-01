import { Form, Formik, Field } from 'formik';
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

import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const initialValues = {
  name: '',
  email: '',
  phoneNumber: '',
  documentId: '',
};

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
    return route.name;
  };

  const [firstDate, setFirstDate] = useState(new Date());

  const [viewPos, setViewPos] = useState(0);

  const [numberPassengers, setNumberPassengers] = useState(1);

  return (
    <div className='h-screen w-full background-img'>
      <div className='flex justify-center items-center pt-72 md:h-96'>
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
            <div>
              <label className='block  text-base font-bold '>{t('Ruta')}</label>
              {/* <select
                className='flex items-center w-full pl-3 pr-3 py-2 text-base leading-tight border bg-white dark:border-slate-700 dark:bg-slate-800'
                name={`route`}
                onChange={handleRouteSelect}
              >
                {routes.map((item, key) => (
                  <option key={key} className='border-none' value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select> */}
              <input
                type='text'
                className='flex items-center w-full pl-3 pr-3 py-2 text-base leading-tight border bg-white dark:border-slate-700 dark:bg-slate-800'
                list='routes'
              />
              <datalist id='routes'>
                {routes.map((route) => (
                  <option value={route.name}></option>
                ))}
              </datalist>
              <label className='block  text-base font-bold mt-4'>
                {t('Fecha')}
              </label>
              <ReactDatePicker
                className='flex items-center w-full pl-3 pr-3 py-2 text-base leading-tight border bg-white dark:border-slate-700 dark:bg-slate-800'
                selected={firstDate}
                onChange={(date) => setFirstDate(date)}
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
                >
                  <i className='fa-solid fa-minus text-xl'></i>
                </button>
                {numberPassengers}
                <button
                  className=''
                  onClick={() => setNumberPassengers(numberPassengers + 1)}
                >
                  <i className='fa-solid fa-plus text-xl'></i>
                </button>
              </div>
              <button className=''>Continuar</button>
            </div>
          </div>
          <div className='bg-white border  dark:border-slate-700 dark:bg-slate-800  w-96 rounded p-4'>
            <label className='block  text-base font-bold mt-4'>
              {t('Fecha')}
            </label>
            <Calendar onChange={setFirstDate} value={firstDate} />
          </div>
        </div>
      </div>
    </div>
  );
};
