import { Form, Formik, Field } from 'formik';
import React from 'react';
import { Title } from '../../components/Title';

import * as Yup from 'yup';
import { useClientStore } from '../../hooks';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  name: '',
  email: '',
  phoneNumber: '',
  documentId: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('El nombre es requerido'),
  email: Yup.string().required('El correo electrónico es requerido'),
  phoneNumber: Yup.number()
    .typeError('Debe ser un número')
    .required('El numero de teléfono es requerido'),
  documentId: Yup.string().required(
    'El documento de identificación es requerido'
  ),
});

export const IndexPage = () => {
  //TODO: Crear Formulario con:
  //TODO: Nommbre
  //TODO: email,
  //TODO: phoneNumber
  //TODO: documentId

  const { startCreate } = useClientStore();

  const navigate = useNavigate();

  return (
    <div className=''>
      <Title text='Datos del comprador' />
      <div className='mx-auto max-w-xl'>
        <div className='bg-white dark:bg-slate-800  w-full h-full py-2 rounded-md'>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              startCreate(values);
              navigate('/2');
            }}
          >
            {({ values, errors, touched }) => (
              <Form>
                <div className='grid md:grid-cols-2 gap-2 p-4'>
                  {/* //?Nombre */}
                  <div className='mb-4'>
                    <label className='block text-base font-bold '>Nombre</label>
                    <div className='flex items-center  border-2 border-blue-300 dark:border-slate-700 rounded-lg'>
                      <Field
                        className='w-full pl-3 pr-3 py-2  text-base leading-tight rounded-r-lg bg-transparent focus:outline-none focus:shadow-outline'
                        type='text'
                        placeholder='Nombre'
                        name={`name`}
                      />
                    </div>
                    {errors && errors.name && touched && touched.name && (
                      <p className='text-red-500 font-medium '>{errors.name}</p>
                    )}
                  </div>

                  {/* //?Email */}
                  <div className='mb-4'>
                    <label className='block text-base font-bold '>Email</label>
                    <div className='flex items-center  border-2 border-blue-300 dark:border-slate-700 rounded-lg'>
                      <Field
                        className='w-full pl-3 pr-3 py-2  text-base leading-tight rounded-r-lg bg-transparent focus:outline-none focus:shadow-outline'
                        type='email'
                        placeholder='Correo Electrónico'
                        name={`email`}
                      />
                    </div>
                    {errors && errors.email && touched && touched.email && (
                      <p className='text-red-500 font-medium '>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* //?phoneNumber */}
                  <div className='mb-4'>
                    <label className='block text-base font-bold '>
                      Número de teléfono
                    </label>
                    <div className='flex items-center  border-2 border-blue-300 dark:border-slate-700 rounded-lg'>
                      <Field
                        className='w-full pl-3 pr-3 py-2  text-base leading-tight rounded-r-lg bg-transparent focus:outline-none focus:shadow-outline'
                        type='text'
                        placeholder='Número de teléfono'
                        name={`phoneNumber`}
                      />
                    </div>
                    {errors &&
                      errors.phoneNumber &&
                      touched &&
                      touched.phoneNumber && (
                        <p className='text-red-500 font-medium '>
                          {errors.phoneNumber}
                        </p>
                      )}
                  </div>

                  {/* //?documentId */}
                  <div className='mb-4'>
                    <label className='block text-base font-bold '>
                      Documento de Identificación
                    </label>
                    <div className='flex items-center  border-2 border-blue-300 dark:border-slate-700 rounded-lg'>
                      <Field
                        className='w-full pl-3 pr-3 py-2  text-base leading-tight rounded-r-lg bg-transparent focus:outline-none focus:shadow-outline'
                        type='text'
                        placeholder='Cedula/Passaporte'
                        name={`documentId`}
                      />
                    </div>
                    {errors &&
                      errors.documentId &&
                      touched &&
                      touched.documentId && (
                        <p className='text-red-500 font-medium '>
                          {errors.documentId}
                        </p>
                      )}
                  </div>
                  <div></div>
                  <button
                    type='submit'
                    className='bg-blue-500 text-white px-3 py-1 rounded-sm font-semibold cursor-pointer hover:bg-blue-400'
                  >
                    Continuar
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
