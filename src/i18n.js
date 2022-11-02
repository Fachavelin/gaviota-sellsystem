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
      'El numero de teléfono es requerido':
        'El numero de teléfono es requerido',
      'El documento de identificación es requerido':
        'El documento de identificación es requerido',
      Continuar: 'Continuar',
      Fecha: 'Fecha',
      Ruta: 'Ruta',
      Horario: 'Horario',
      Pais: 'Pais',
      Edad: 'Edad',
      'Seleccionar el pais': 'Seleccionar el pais',
      'Cédula/Pasaporte': 'Cédula/Pasaporte',
      'Crear Reserva': 'Crear Reserva',
      'Gracias por usar nuestro servicio': 'Gracias por usar nuestro servicio',
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
      'El numero de teléfono es requerido': 'The phone number is required',
      'El documento de identificación es requerido':
        'The identification document is required',
      Continuar: 'Continue',
      Fecha: 'Date',
      Ruta: 'Route',
      Horario: 'Time',
      Pais: 'Country',
      Edad: 'Age',
      'Seleccionar el pais': 'Chose a Country',
      'Cédula/Pasaporte': 'Id/Passport',
      'Crear Reserva': 'Save Reserve',
      'Gracias por usar nuestro servicio': 'Thank you for using our service',
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