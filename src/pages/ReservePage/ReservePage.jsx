import { Title } from '../../components/Title';
import * as Yup from 'yup';

import { Field, FieldArray, Form, Formik } from 'formik';
import { useState, useEffect } from 'react';
import api from '../../api/api';
import { useTranslation } from 'react-i18next';

let validationSchema = Yup.object().shape({
  reserves: Yup.array().of(
    Yup.object().shape({
      passenger: Yup.string().required('El nombre es requerido'),
      reference: Yup.string().required('El proovedor es requerido'),
      // country: Yup.string().required('El pais es requerido'),
      // age: Yup.number().typeError('Debe ser un número').required('La edad es requerida'),
      price: Yup.number().required('El precio es requerido'),
      // passport: Yup.string().required('Este parámetro es requerido'),
      ship: Yup.string().required('El barco es requerido'),
      route: Yup.string().required('La ruta es requerida'),
      time: Yup.string().required('El el horario es requerido'),
      date: Yup.date().required('La fecha es requerida'),
      number: Yup.number().required('El número de reservas es requerido'),
      birthday: Yup.date().required('El cumpleaños es requerido'),
      phone: Yup.string().required('El número de teléfono es requerido'),
    })
  ),
});

export const ReservePage = () => {
  const { t, i18n } = useTranslation();

  const initialValues = {
    reserves: [
      {
        passenger: '',
        reference: 'External',
        user: 'External', //*
        country: '',
        price: 20,
        passport: '',
        ship: 'undefined',
        route: 'SC-SX',
        date: '',
        time: 'Am',
        number: 1, //*
        age: 0,
        isConfirmed: false,
        isPayed: false,
        birthday: '',
        status: 'Permanente',
        phone: '',
        comment: '',
      },
    ],
  };

  let [type, setType] = useState([
    {
      passenger: '',
      reference: 'External',
      user: 'External', //*
      country: '',
      price: 20,
      passport: '',
      ship: 'undefined',
      route: 'SC-SX',
      date: '',
      time: 'Am',
      number: 1, //*
      age: 0,
      isConfirmed: false,
      isPayed: false,
      isPayed: false,
      birthday: '',
      status: 'Permanente',
      phone: '',
      comment: '',
    },
  ]);
  //*Inicializar referencias y paises
  /* const [references, setReferences] = useState([]);
const getReferences = async () => {
  const { data } = await api.get('/api/getAllReferences');
  setReferences(sortBy(data, ['name']));
}; */

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

  const [routes, setRoutes] = useState([
    {
      name: 'San Cristobal - Santa Cruz',
      value: 'SC-SX',
    },
    {
      name: 'Santa Cruz - San Cristobal',
      value: 'SX-SC',
    },
    {
      name: 'Santa Cruz - Isabela',
      value: 'SX-IB',
    },
    {
      name: 'Isabela - Santa Cruz',
      value: 'IB-SX',
    },
    {
      name: 'Santa Cruz - Floreana',
      value: 'SX-FL',
    },
    {
      name: 'Floreana - Santa Cruz',
      value: 'FL-SX',
    },
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

  const handleFormChange = (e, values, index) => {
    e.preventDefault();

    console.log(values);

    let { reserves } = values;

    console.log('reserves', reserves);

    let name = e.target.name;
    let value = e.target.value;

    let finalName = name.split('.');
    console.log('f', finalName);
    console.log('f value', value);

    if (!isNaN(value) && finalName[2] !== 'passport') {
      value = parseInt(value);
    }

    const newArray = reserves.map((item, i) => {
      if (index === i) {
        return { ...item, [finalName[2]]: value };
      } else {
        return item;
      }
    });

    console.log('new', newArray);
    setType(newArray);

    console.log(type);
  };

  return (
    <div className=''>
      <Title text='Generar Reserva' />
      <div className='mx-auto max-w-7xl'>
        <div className='bg-white dark:bg-slate-800  w-full h-full p-4'>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              console.log('click');
              let { reserves } = values;

              reserves = reserves.map((item) => {
                return { ...item, date: new Date(item.date) };
              });

              reserves = reserves.map((item) => {
                return { ...item, birthday: new Date(item.birthday) };
              });

              reserves = reserves.map((item) => {
                return { ...item, price: parseInt(item.price) };
              });

              /*  reserves = reserves.map((item) => {
                return { ...item, isConfirmed: parseBool(item.isConfirmed) };
              });

              reserves = reserves.map((item) => {
                return { ...item, isPayed: parseBool(item.isPayed) };
              });

              reserves = reserves.map((item) => {
                return { ...item, isBlocked: parseBool(item.isBlocked) };
              }); */

              console.log(reserves);
            }}
          >
            {({ values, errors, touched }) => (
              <Form>
                <FieldArray name='reserves'>
                  {({ insert, remove, push }) => (
                    <div className='m-4  rounded-lg'>
                      <div className='flex justify-between mx-5 my-3'>
                        {/* <div>Número de formularios: {count}</div> */}
                        <div className=''></div>
                      </div>
                      {values.reserves.length > 0 &&
                        values.reserves.map((reserve, index) => (
                          <div
                            key={index}
                            className='dark:border-slate-700 border-2 mt-6 rounded-lg'
                            onChange={(e) => handleFormChange(e, values, index)}
                          >
                            <div className='flex justify-end pt-4 pr-4'>
                              <button
                                type='button'
                                className='bg-indigo-500 text-white px-2.5 py-1 rounded-lg font-semibold cursor-pointer hover:bg-indigo-400'
                                onClick={() => push(type[index])}
                              >
                                <i className='fa-solid fa-plus'></i>
                              </button>
                              <button
                                type='button'
                                onClick={() => remove(index)}
                                className='ml-1 bg-red-500 text-white px-2.5 py-1 rounded-lg font-semibold cursor-pointer hover:bg-red-400'
                              >
                                <i className='fa-solid fa-minus'></i>
                              </button>
                            </div>
                            <div
                              className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 p-4'
                              key={index}
                            >
                              {/* //?Date */}
                              <div className='mb-4'>
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
                              </div>

                              {/* //?Ruta */}
                              <div className='mb-4'>
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
                              </div>

                              {/* //?Time */}
                              <div className='mb-4'>
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
                              </div>

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

                              {/* //!Estado esta en option para que se pueda traducir en tiempo real */}
                              {/* //?Estado */}
                              <div className='mb-4'>
                                <label className='block  text-base font-bold '>
                                  Estado
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

                              {/* //?Confirmado y Pagado */}
                              {/* <div className=''>
                                <label className='block text-base font-bold '>
                                  Estado
                                </label>
                                <div className='flex items-center gap-3'>
                                  <label className='block text-base font-bold '>
                                    Confirmado
                                  </label>
                                  <Field
                                    className='h-5 w-5 rounded-xl border-2 border-blue-300 dark:border-slate-700 cursor-pointer'
                                    type='checkbox'
                                    name={`reserves.${index}.isConfirmed`}
                                  />
                                </div>
                                <div className='flex items-center gap-3'>
                                  <label className='block text-base font-bold '>
                                    Pagado
                                  </label>
                                  <Field
                                    className='h-5 w-5 rounded-xl border-2 border-blue-300 dark:border-slate-700 cursor-pointer'
                                    type='checkbox'
                                    name={`reserves.${index}.isPayed`}
                                  />
                                </div>
                                <div className='flex items-center gap-3'>
                                  <label className='block text-base font-bold '>
                                    Bloqueado
                                  </label>
                                  <Field
                                    className='h-5 w-5 rounded-xl border-2 border-blue-300 dark:border-slate-700 cursor-pointer'
                                    type='checkbox'
                                    name={`reserves.${index}.isBlocked`}
                                  />
                                </div>
                              </div> */}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </FieldArray>
                <div className='flex justify-end pr-4 mb-1'>
                  {/* <button
                    className='bg-blue-500 text-white px-3 py-1 rounded-sm font-semibold cursor-pointer hover:bg-blue-400'
                    type='submit'
                    disabled={loading}
                  >
                    {loading ? (
                      <i className='fa-solid fa-spinner animate-spin'></i>
                    ) : (
                      'Crear Reserva'
                    )}
                  </button> */}
                  <button
                    className='bg-blue-500 text-white px-3 py-1 rounded-sm font-semibold cursor-pointer hover:bg-blue-400'
                    type='submit'
                    /* disabled={loading} */
                  >
                    {t('Crear Reserva')}
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
