import { Title } from '../../components/Title';
import * as Yup from 'yup';

import { Field, FieldArray, Form, Formik } from 'formik';
import { useState, useEffect } from 'react';
import api from '../../api/api';
import { useTranslation } from 'react-i18next';
import { useReserveStore } from '../../api/hooks/useReserveStore';
import { useNavigate } from 'react-router-dom';
import { customSwal } from '../../helpers';
import { useClientStore } from '../../hooks';

export const ReservePage = ({ initValues = {}, setInitValues }) => {
  const { t, i18n } = useTranslation();

  const swal = customSwal();

  let validationSchema = Yup.object().shape({
    reserves: Yup.array().of(
      Yup.object().shape({
        passenger: Yup.string().required(t('El nombre es requerido')),
        country: Yup.string().required(t('El pais es requerido')),
        passport: Yup.string().required(t('Este parámetro es requerido')),
        // route: Yup.string().required(t('La ruta es requerida')),
        // time: Yup.string().required(t('El el horario es requerido')),
        // date: Yup.date().required(t('La fecha es requerida')),
        birthday: Yup.date().required(t('El cumpleaños es requerido')),
        phone: Yup.string().required(t('El número de teléfono es requerido')),
      })
    ),
  });

  const { startAdd, startCreate, loading, msg } = useReserveStore();

  const { startLogout } = useClientStore();

  const navigate = useNavigate();

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
      name: 'SANTA CRUZ - ISABELA 3PM',
      value: 'SX-IB',
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

  const [formRoute, setFormRoute] = useState(routes[0].value);

  const handleRouteSelect = (e) => {
    e.preventDefault();

    console.log(e.target.value);

    setFormRoute(e.target.value);
  };

  let todayDate = new Date();
  todayDate.setHours(0, 0, 0);
  todayDate = todayDate.toLocaleDateString('en-CA');

  let birthdayDate = new Date('07/01/1987');
  birthdayDate.setHours(0, 0, 0);

  let initialValues = {
    reserves: [],
  };

  /* let initDate = new Date(initValues.date[0]);
  initDate.setHours(0, 0, 0);
  initDate = initDate.toLocaleDateString('en-CA'); */

  const initializeDate = (date = '') => {
    let initDate = new Date(date);
    initDate.setHours(0, 0, 0);
    return initDate.toLocaleDateString('en-CA');
  };

  for (let index = 0; index < initValues.numberPassengers; index++) {
    initialValues.reserves.push({
      country: '',
      date: initializeDate(initValues.date[0]) || todayDate,
      passenger: '',
      passport: '',
      route: initValues.route[0] || '',
      time: initValues.time[0] || 'Am',
      phone: '',
      birthday: '',
      comment: '',
      status: 'Residente',
      paymentDate: todayDate,
      number: 1,
    });
  }

  useEffect(() => {
    getCountries();
  }, []);

  const [countries, setCountries] = useState([]);
  const getCountries = async () => {
    const { data } = await api.get(
      'https://restcountries.com/v3.1/all?fields=translations'
    );
    setCountries(data);
  };

  //*Inicializar parámetros
  const [price, setPrice] = useState([20, 25, 30, 35, 40]);
  const [ship, setShip] = useState([
    'Gaviota',
    'Tropical Bird',
    'Trueno',
    'Arrecife',
    'Andy 1',
    'Andy 2',
    'Gema',
    'De Luis',
    'Queen Evolution',
    'Wolf',
    'Angy',
    'New Britany',
    'Britany',
    'Gladel',
    'Gabi',
    'Neptuno',
  ]);

  const [siNo, setSiNo] = useState([
    {
      name: 'Si',
      value: true,
    },
    {
      name: 'No',
      value: false,
    },
  ]);

  const [times, setTimes] = useState(['Am', 'Pm']);

  const getRoute = (value = '') => {
    if (value === '') {
      return '';
    }
    let route = routes.find((data) => data.name === value);

    return route === undefined ? routes[0].value : route.value;
  };

  const getDates = () => {
    let text = '';

    for (let index = 0; index <= initValues.visible; index++) {
      text += initializeDate(initValues.date[index] || new Date());

      if (index < initValues.visible) {
        text += ' - ';
      }
    }

    return text;
  };

  return (
    <div className=''>
      {/* <Title text='Generar Reserva' /> */}
      <div className='mx-auto max-w-7xl pt-20 px-4 md:px-12'>
        <div className='  w-full h-full p-4'>
          <p></p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              let { reserves } = values;

              //*Verificar que existen mas de una ruta
              if (initValues.visible >= 1) {
                console.log('si');

                let temp = reserves;
                for (let index = 1; index <= initValues.visible; index++) {
                  let temp2 = temp;

                  temp2 = temp2.map((item) => {
                    return {
                      ...item,
                      date: initializeDate(initValues.date[index]),
                      route: initValues.route[index],
                      time: initValues.time[index],
                    };
                  });
                  reserves = reserves.concat(temp2);
                  console.log(reserves);
                }
              }
              //*Fin Verificar

              let question = '';

              /* initValues.route.forEach((item) => {
                question =
                  question +
                  `${item.route} - ${item.numberPassengers} : ${item.date}` +
                  '</br>';
              }); */
              reserves = reserves.map((item) => {
                return { ...item, route: getRoute(item.route) };
              });

              for (let index = 0; index <= initValues.visible; index++) {
                question =
                  question +
                  `${initValues.route[index]} - ${
                    initValues.numberPassengers
                  }pax : ${initializeDate(initValues.date[index])}` +
                  '</br>';
              }

              reserves = reserves.map((item) => {
                return { ...item, date: new Date(item.date) };
              });

              reserves = reserves.map((item) => {
                return { ...item, birthday: new Date(item.birthday) };
              });

              reserves = reserves.map((item) => {
                return {
                  ...item,
                  paymentDate: new Date(todayDate),
                };
              });

              swal
                .fire({
                  icon: 'question',
                  title: `${t('¿Crear reserva(s)?')}`,
                  html: `${question}`,
                  showCancelButton: true,
                  cancelButtonText: `${t('Cancelar')}`,
                  confirmButtonText: `${t('Crear')}`,
                })
                .then((result) => {
                  if (result.isConfirmed) {
                    console.log(reserves);
                    startCreate(reserves);
                  }
                });
            }}
          >
            {({ values, errors, touched }) => (
              <Form>
                <FieldArray name='reserves'>
                  {({ insert, remove, push }) => (
                    <div className='mb-4 mx-4 rounded-lg '>
                      <div className='flex justify-between'>
                        <div className=' bg-white dark:bg-slate-800 dark:border-slate-700 border-t-2 border-b-2 border-r-2 border-l-2 rounded-md mb-1'>
                          <p className='dark:text-white px-2.5 py-1 rounded-lg font-bold  text-xl '>
                            {t('Reservas del ')}
                            {getDates()}
                          </p>
                        </div>
                        <button
                          onClick={() => setInitValues(null)}
                          className='mb-1 text-lg bg-red-500 text-white px-3 py-1 rounded-sm font-semibold cursor-pointer hover:bg-red-400'
                        >
                          Volver
                          <i className='ml-2 fa-solid fa-rotate-left'></i>
                        </button>
                      </div>
                      {values.reserves.length > 0 &&
                        values.reserves.map((reserve, index) => (
                          <div
                            key={index}
                            className=' bg-white dark:bg-slate-800 dark:border-slate-700 border-2 mb-6 rounded-lg'
                            // onChange={(e) => handleFormChange(e, values, index)}
                          >
                            <div className='flex justify-between pt-4 px-4'>
                              <p className='dark:text-white px-2.5 py-1 rounded-lg font-bold  text-xl '>
                                {t('Pasajero ')}
                                {index + 1}
                              </p>
                              {/* <div>
                                <button
                                  type='button'
                                  className='bg-indigo-500 text-white px-2.5 py-1 rounded-lg font-semibold cursor-pointer hover:bg-indigo-400'
                                  onClick={() => push(type[index])}
                                >
                                  {t('Agregar pasajero')}
                                </button>
                                <button
                                  type='button'
                                  onClick={() => remove(index)}
                                  className='ml-1 bg-red-500 text-white px-2.5 py-1 rounded-lg font-semibold cursor-pointer hover:bg-red-400'
                                >
                                  {t('Eliminar pasajero')}
                                </button>
                              </div> */}
                            </div>
                            <div
                              className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 p-4'
                              key={index}
                            >
                              {/* //?Date */}
                              {/* <div className='mb-4'>
                                <label className='block text-base font-bold'>
                                  {t('Fecha')}
                                </label>
                                <div className='flex items-center  border-2 border-blue-300 dark:border-slate-700 rounded-lg'>
                                  <Field
                                    className='w-full pl-3 pr-3 py-2  text-base leading-tight rounded-r-lg bg-transparent focus:outline-none focus:shadow-outline'
                                    type='date'
                                    placeholder='Fecha'
                                    name={`reserves.${index}.date`}
                                    lang={i18n.language}
                                  />
                                </div>
                                {errors.reserves &&
                                  errors.reserves[index] &&
                                  errors.reserves[index].date &&
                                  touched.reserves &&
                                  touched.reserves[index] &&
                                  touched.reserves[index].date && (
                                    <p className='text-red-500 font-medium '>
                                      {errors.reserves[index].date}
                                    </p>
                                  )}
                              </div> */}

                              {/* //?Ruta */}
                              {/* <div className='mb-4'>
                                <label className='block  text-base font-bold '>
                                  {t('Ruta')}
                                </label>
                                <Field
                                  className='flex items-center w-full pl-3 pr-3 py-2  text-base leading-tight border-2 border-blue-300 dark:border-slate-700 dark:bg-slate-800 rounded-lg'
                                  name={`reserves.${index}.route`}
                                  as='select'
                                >
                                  {routes.map((item, key) => (
                                    <option
                                      key={key}
                                      className='border-none'
                                      value={item.value}
                                    >
                                      {item.name}
                                    </option>
                                  ))}
                                </Field>
                                {errors.reserves &&
                                  errors.reserves[index] &&
                                  errors.reserves[index].route &&
                                  touched.reserves &&
                                  touched.reserves[index] &&
                                  touched.reserves[index].route && (
                                    <p className='text-red-500 font-medium '>
                                      {errors.reserves[index].route}
                                    </p>
                                  )}
                              </div> */}

                              {/* //?Time */}
                              {/* <div className='mb-4'>
                                <label className='block  text-base font-bold '>
                                  {t('Horario')}
                                </label>
                                <Field
                                  className='flex items-center w-full pl-3 pr-3 py-2  text-base leading-tight border-2 border-blue-300 dark:border-slate-700 dark:bg-slate-800 rounded-lg'
                                  name={`reserves.${index}.time`}
                                  as='select'
                                >
                                  {times.map((item, key) => (
                                    <option
                                      key={key}
                                      className='border-none'
                                      value={item}
                                    >
                                      {item}
                                    </option>
                                  ))}
                                </Field>
                                {errors.reserves &&
                                  errors.reserves[index] &&
                                  errors.reserves[index].time &&
                                  touched.reserves &&
                                  touched.reserves[index] &&
                                  touched.reserves[index].time && (
                                    <p className='text-red-500 font-medium '>
                                      {errors.reserves[index].time}
                                    </p>
                                  )}
                              </div> */}

                              {/* //?Nombre */}
                              <div className='mb-4'>
                                <label className='block text-base font-bold '>
                                  {t('nombre')}
                                </label>
                                <div className='flex items-center  border-2 border-blue-300 dark:border-slate-700 rounded-lg'>
                                  <Field
                                    className='w-full pl-3 pr-3 py-2  text-base leading-tight rounded-r-lg bg-transparent focus:outline-none focus:shadow-outline'
                                    type='text'
                                    placeholder={t('nombre')}
                                    name={`reserves.${index}.passenger`}
                                  />
                                </div>
                                {errors.reserves &&
                                  errors.reserves[index] &&
                                  errors.reserves[index].passenger &&
                                  touched.reserves &&
                                  touched.reserves[index] &&
                                  touched.reserves[index].passenger && (
                                    <p className='text-red-500 font-medium '>
                                      {errors.reserves[index].passenger}
                                    </p>
                                  )}
                              </div>

                              {/* //?Pais */}
                              <div className='mb-4'>
                                <label className='block  text-base font-bold '>
                                  {t('Pais')}
                                </label>
                                <div className='flex items-center  border-2 border-blue-300 dark:border-slate-700 rounded-lg'>
                                  <Field
                                    placeholder={t('Seleccionar el pais')}
                                    className='w-full pl-3 py-2 dark:bg-slate-800 focus:outline-none leading-tight focus:shadow-outline rounded-lg'
                                    type='text'
                                    name={`reserves.${index}.country`}
                                    id='country'
                                    list='dataCountry'
                                  />
                                  <datalist id='dataCountry' className=''>
                                    {countries.map((item, key) => (
                                      <option
                                        key={key}
                                        className='border-none'
                                        value={item.translations.spa.common}
                                      />
                                    ))}
                                  </datalist>
                                </div>
                                {errors.reserves &&
                                  errors.reserves[index] &&
                                  errors.reserves[index].country &&
                                  touched.reserves &&
                                  touched.reserves[index] &&
                                  touched.reserves[index].country && (
                                    <p className='text-red-500 font-medium '>
                                      {errors.reserves[index].country}
                                    </p>
                                  )}
                              </div>

                              {/* //?Cedula */}
                              <div className='mb-4'>
                                <label className='block text-base font-bold '>
                                  {t('Cédula/Pasaporte')}
                                </label>
                                <div className='flex items-center  border-2 border-blue-300 dark:border-slate-700 rounded-lg'>
                                  <Field
                                    className='w-full pl-3 pr-3 py-2  text-base leading-tight rounded-r-lg bg-transparent focus:outline-none focus:shadow-outline'
                                    type='text'
                                    placeholder={t('Cédula/Pasaporte')}
                                    name={`reserves.${index}.passport`}
                                  />
                                </div>
                                {errors.reserves &&
                                  errors.reserves[index] &&
                                  errors.reserves[index].passport &&
                                  touched.reserves &&
                                  touched.reserves[index] &&
                                  touched.reserves[index].passport && (
                                    <p className='text-red-500 font-medium '>
                                      {errors.reserves[index].passport}
                                    </p>
                                  )}
                              </div>

                              {/* //?Edad*/}
                              <div className='mb-4'>
                                <label className='block text-base font-bold'>
                                  {t('Fecha de nacimiento')}
                                </label>
                                <div className='flex items-center  border-2 border-blue-300 dark:border-slate-700 rounded-lg'>
                                  <Field
                                    className='w-full pl-3 pr-3 py-2  text-base leading-tight rounded-r-lg bg-transparent focus:outline-none focus:shadow-outline'
                                    type='date'
                                    placeholder='Fecha'
                                    name={`reserves.${index}.birthday`}
                                  />
                                </div>
                                {errors.reserves &&
                                  errors.reserves[index] &&
                                  errors.reserves[index].birthday &&
                                  touched.reserves &&
                                  touched.reserves[index] &&
                                  touched.reserves[index].birthday && (
                                    <p className='text-red-500 font-medium '>
                                      {errors.reserves[index].birthday}
                                    </p>
                                  )}
                              </div>

                              {/* //?Telefono */}
                              <div className='mb-4'>
                                <label className='block text-base font-bold '>
                                  {t('Número de teléfono')}
                                </label>
                                <div className='flex items-center  border-2 border-blue-300 dark:border-slate-700 rounded-lg'>
                                  <Field
                                    className='w-full pl-3 pr-3 py-2  text-base leading-tight rounded-r-lg bg-transparent focus:outline-none focus:shadow-outline'
                                    type='text'
                                    placeholder={t('Número de teléfono')}
                                    name={`reserves.${index}.phone`}
                                  />
                                </div>
                                {errors.reserves &&
                                  errors.reserves[index] &&
                                  errors.reserves[index].phone &&
                                  touched.reserves &&
                                  touched.reserves[index] &&
                                  touched.reserves[index].phone && (
                                    <p className='text-red-500 font-medium '>
                                      {errors.reserves[index].phone}
                                    </p>
                                  )}
                              </div>

                              {/* //!Estado esta en option para que se pueda traducir en tiempo real */}
                              {/* //?Estado */}
                              <div className='mb-4'>
                                <label className='block  text-base font-bold '>
                                  {t('Estado')}
                                </label>
                                <div className='flex items-center rounded-lg'>
                                  <Field
                                    className='flex items-center w-full pl-3 pr-3 py-2  text-base leading-tight border-2 border-blue-300 dark:border-slate-700 dark:bg-slate-800 rounded-lg'
                                    name={`reserves.${index}.status`}
                                    as='select'
                                  >
                                    <option value={'Permanente'}>
                                      {t('Permanente')}
                                    </option>
                                    <option value={'Temporal'}>
                                      {t('Temporal')}
                                    </option>
                                    <option value={'Turista'}>
                                      {t('Turista')}
                                    </option>
                                  </Field>
                                </div>
                                {errors.reserves &&
                                  errors.reserves[index] &&
                                  errors.reserves[index].status &&
                                  touched.reserves &&
                                  touched.reserves[index] &&
                                  touched.reserves[index].status && (
                                    <p className='text-red-500 font-medium '>
                                      {errors.reserves[index].status}
                                    </p>
                                  )}
                              </div>

                              {/* //?Observaciones */}
                              <div className='mb-4'>
                                <label className='block text-base font-bold '>
                                  {t('Observaciones')}
                                </label>
                                <div className='flex items-center  border-2 border-blue-300 dark:border-slate-700 rounded-lg'>
                                  <Field
                                    className='w-full pl-3 pr-3 py-2  text-base leading-tight rounded-r-lg bg-transparent focus:outline-none focus:shadow-outline'
                                    type='text'
                                    placeholder={t('Observaciones')}
                                    name={`reserves.${index}.comment`}
                                  />
                                </div>
                                {errors.reserves &&
                                  errors.reserves[index] &&
                                  errors.reserves[index].comment &&
                                  touched.reserves &&
                                  touched.reserves[index] &&
                                  touched.reserves[index].comment && (
                                    <p className='text-red-500 font-medium '>
                                      {errors.reserves[index].comment}
                                    </p>
                                  )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </FieldArray>
                <div className='-translate-y-4 flex justify-center md:justify-end pr-4 mb-1 text-lg'>
                  <button
                    className='bg-blue-500 text-white px-3 py-1 rounded-sm font-semibold cursor-pointer hover:bg-blue-400'
                    type='submit'
                    disabled={loading}
                  >
                    {loading ? (
                      <i className='fa-solid fa-spinner animate-spin'></i>
                    ) : (
                      t('Crear Reserva')
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
