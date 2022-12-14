import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  es: {
    translation: {
      'Datos del comprador': 'Datos del comprador',
      'Generar Reserva': 'Generar Reserva',
      nombre: 'Nombre',
      email: 'Correo Electrónico',
      'Número de teléfono': 'Número de teléfonos',
      'documento de Identificación': 'Documento de Identificación',
      'El nombre es requerido': 'El nombre es requerido',
      'El correo electrónico es requerido':
        'El correo electrónico es requerido',
      'Debe ser un número': 'Debe ser un número',
      'El número de teléfono es requerido':
        'El número de teléfono es requerido',
      'El documento de identificación es requerido':
        'El documento de identificación es requerido',
      Continuar: 'Continuar',
      Fecha: 'Fecha',
      Ruta: 'Ruta',
      Horario: 'Horario',
      Pais: 'Pais',
      Edad: 'Edad',
      Estado: 'Estado',
      'Seleccionar el pais': 'Seleccionar el pais',
      'Cédula/Pasaporte': 'Cédula/Pasaporte',
      'Crear Reserva': 'Crear Reserva',
      'Gracias por usar nuestro servicio': 'Gracias por usar nuestro servicio',
      'Fecha de nacimiento': 'Fecha de nacimiento',
      'Número de teléfono': 'Número de teléfono',
      Observaciones: 'Observaciones',
      Permanente: 'Permanente',
      Temporal: 'Temporal',
      Turista: 'Turista',
      'El pais es requerido': 'El pais es requerido',
      'Este parámetro es requerido': 'Este parámetro es requerido',
      'La ruta es requerida': 'La ruta es requerida',
      'La fecha es requerida': 'La fecha es requerida',
      'El cumpleaños es requerido': 'El cumpleaños es requerido',
      '¿Crear reserva(s)?': '¿Crear reserva(s)?',
      Crear: 'Crear',
      Cancelar: 'Cancelar',
      'Gracias por usar nuestro servicio, nos comunicaremos muy pronto':
        'Gracias por usar nuestro servicio, nos comunicaremos muy pronto',
      'Tu reserva fue agregada de manera éxitosa':
        'Tu reserva fue agregada de manera éxitosa',
      'Pasajero ': 'Pasajero ',
      'Agregar pasajero': 'Agregar pasajero',
      'Eliminar pasajero': 'Eliminar pasajero',
      'Datos de viaje': 'Datos de viaje',
      Pasajeros: 'Pasajeros',
      'Viaje Simple': 'Viaje Simple',
      'Viaje Compuesto': 'Viaje Compuesto',
      Continuar: 'Continuar',
      'Ruta de ida': 'Ruta de ida',
      'Ruta de vuelta': 'Ruta de vuelta',
      'Fecha de ida': 'Fecha de ida',
      'Fecha de vuelta': 'Fecha de vuelta',
      'Reservas del': 'Reservas del',
      ' al ': ' al ',
      'Una ruta': 'Una ruta',
      'Varias rutas': 'Varias rutas',
      'Eliminar ruta': 'Eliminar ruta',
      'Agregar ruta': 'Agregar ruta',
      Calendario: 'Calendario',
      'Primera fecha': 'Primera fecha',
      'Segunda fecha': 'Segunda fecha',
      'Tercera fecha': 'Tercera fecha',
      'Cuarta fecha': 'Cuarta fecha',
    },
  },
  en: {
    translation: {
      'Datos del comprador': 'Buyer Data',
      'Generar Reserva': 'Make a reserve',
      nombre: 'Name',
      email: 'Email',
      'Número de teléfono': 'Telephone Number',
      'documento de Identificación': 'Identification Document',
      'El nombre es requerido': 'The name is required',
      'El correo electrónico es requerido': 'The email is required',
      'Debe ser un número': 'This field must be a number',
      'El número de teléfono es requerido': 'The phone number is required',
      'El documento de identificación es requerido':
        'The identification document is required',
      Continuar: 'Continue',
      Fecha: 'Date',
      Ruta: 'Route',
      Horario: 'Time',
      Pais: 'Country',
      Edad: 'Age',
      Estado: 'State',
      'Seleccionar el pais': 'Chose a Country',
      'Cédula/Pasaporte': 'Id/Passport',
      'Crear Reserva': 'Save Reserve',
      'Gracias por usar nuestro servicio': 'Thank you for using our service',
      'Fecha de nacimiento': 'Birthday',
      'Número de teléfono': 'Phonenumber',
      Observaciones: 'Comments',
      Permanente: 'Permanent',
      Temporal: 'Temporary',
      Turista: 'Tourist',
      'El pais es requerido': 'The country is required',
      'Este parámetro es requerido': 'This parameter is required',
      'La ruta es requerida': 'La ruta es requerida',
      'La fecha es requerida': 'The date is required',
      'El cumpleaños es requerido': 'The birthday is required',
      '¿Crear reserva(s)?': '¿Create reserve(s)?',
      Crear: 'Create',
      Cancelar: 'Cancel',
      'Gracias por usar nuestro servicio, nos comunicaremos muy pronto':
        'Thanks four using our service',
      'Tu reserva fue agregada de manera éxitosa':
        'Your reservation was added successfully',
      'Pasajero ': 'Passenger ',
      'Agregar pasajero': 'Add passenger',
      'Eliminar pasajero': 'Delete passenger',
      'Datos de viaje': 'Trip data',
      Pasajeros: 'Passengers',
      'Viaje Simple': 'Simple trip',
      'Viaje Compuesto': 'Compound trip',
      Continuar: 'Continue',
      'Ruta de ida': 'Departure route',
      'Ruta de vuelta': 'Return route',
      'Fecha de ida': 'Departure date',
      'Fecha de vuelta': 'Return date',
      'Reservas del': 'Reserves from',
      ' al ': ' to ',
      'Una ruta': 'Single route',
      'Varias rutas': 'Multiple routes',
      'Eliminar ruta': 'Delete route',
      'Agregar ruta': 'Add route',
      Calendario: 'Calendar',
      'Primera fecha': 'First date',
      'Segunda fecha': 'Second date',
      'Tercera fecha': 'Third date',
      'Cuarta fecha': 'Fourth date',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'es', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
