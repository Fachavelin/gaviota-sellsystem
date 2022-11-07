import { useState } from 'react';
import { useReserveStore } from '../../api/hooks/useReserveStore';
import { customSwal } from '../../helpers';
import { useClientStore } from '../../hooks/useClientStore';

export const PaymentPage = () => {
  const swal = customSwal();

  const [open, setOpen] = useState();
  const { reserve } = useClientStore();
  const { startCreate } = useReserveStore();

  const loadPayhone = () => {
    payphone
      .Button({
        token:
          '98IVdcZW4yAub2AjI_jXsVh-GoQ-oZvtQHIo50CvrBKfwS2nw7WxH9MK63YiDCTZJlSRa6e4bNgTv5h3IM1tvIR1letrEme4qjsXgB8Qx8o8OJF4VWwXSvcARHBtcjCnYKY_osIrQzDM4u6QCnls3eseL6636xmj2ZiqS6NLIRGN15_3N5WgYQDZZ3XdjVS3CuMeAatDm1_mvfGwr3ys804lBTVJggg8aWhA_DmcICPUDeFsmV3xhuuKece9UUnJ5bfg31ibXaj6cg9hOi-t8qoaLz6WqsINSRCOwDO8b60RiivxGjEHtENqReyW_0-gaEx5fg',

        btnHorizontal: true,
        btnCard: true,

        createOrder: function (actions) {
          //Se ingresan los datos de la transaccion ej. monto, impuestos, etc
          return actions.prepare({
            amount: 10000,
            amountWithoutTax: 10000,
            tax: 0,
            service: 0,
            tip: 0,
            currency: 'USD',
            //CHAVEZ GENERA UN IDENTIFICADOR UNICO
            clientTransactionId: Math.random().toString(36),
            //mail de la empresa
            // email: 'gaviota.ferry@gmail.com',
            // phoneNumber: '+593993731079',
            // documentId: '2000105961',
            //Que se ponga el mes
            reference: `Pago reservas`,
          });
        },
        onComplete: function (model, actions) {
          //Se confirma el pago realizado
          actions
            .confirm({
              id: model.id,
              clientTxId: model.clientTxId,
            })
            .then(function (value) {
              //EN ESTA SECCIÓN SE RECIBE LA RESPUESTA Y SE MUESTRA AL USUARIO

              /* if (value.transactionStatus == 'Approved') {
                alert(
                  'Pago ' +
                    value.transactionId +
                    ' recibido, estado ' +
                    value.transactionStatus
                );
              } */

              if (value.transactionStatus == 'Approved') {
                swal.fire({
                  icon: 'success',
                  title: `Pago ${value.transactionId}`,
                  text: `Pago ${value.transactionId} recibido, estado: aprovado`,
                });
              }
            })
            .catch(function (err) {
              console.log(err);
            });
        },
      })
      .render('#pp-button');
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (open === undefined) {
      loadPayhone();
      setOpen(true);
    }
  };

  return (
    <div className='max-w-6xl'>
      <p className='text-center mt-3 font-bold text-xl'>Proceder con el pago</p>
      <button
        onClick={handleClick}
        className='bg-indigo-500 text-white px-3 py-1 rounded-sm font-semibold cursor-pointer hover:bg-indigo-40'
      >
        Mostrar Opciones de pago
      </button>
      <div className='flex justify-center mt-3'>
        <div id='pp-button' />
      </div>
    </div>
  );
};
