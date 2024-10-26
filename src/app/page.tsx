"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { CreditCardForm } from '../components/CreditCardForm';
import { CreditCardField } from '../components/CreditCardField';
import { creditCardMask } from '../masks/creditCardMask';
import { creditCardSchema } from '../schemas/creditCardSchema';

import { CreditCard } from '@/components/CreditCard';
import { Stepper } from '@/components/Stepper';


interface ICreditCardFields {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

export default function App() {
  const [creditCardData, setCreditCardData] = useState<ICreditCardFields>({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: ""
  });

  const [flipCreditCard, setFlipCreditCard] = useState(false)

  const [creditCardInstallments, setCreditCardInstallments] = useState<number[]>([])

  useEffect(() => {
    const getInstallments = async () => {
      const response = await fetch("/api/credit-card/installments");
      const data = await response.json()
      const installments = Array.from({ length: data.installments }, (_, index) => index + 1);
      setCreditCardInstallments(installments)
    }

    getInstallments()
  }, [])

  return (
    <main className='flex lg:flex-row flex-col'>
      <section className='relative lg:min-w-[510px] min-w-full h-[65vw] max-h-[350px] z-50'>
        <div className='flex lg:fixed lg:w-[350px] w-full h-full bg-[#4BDE95]' />
        <div className='absolute top-0 left-1/2 -translate-x-1/2 p-4'>
          <div className='flex items-center h-fit lg:mb-10 mt-4 gap-4'>
            <a href='#back' className='flex gap-4'>
              <Image
                src="/chevron-left.png"
                width={28}
                height={28}
                alt=''
                className='object-contain'
              />
              <span className='text-white text-lg md:hidden lg:block hidden'>
                Alterar forma de pagamento
              </span>
            </a>
            <Stepper
              className='md:block lg:hidden w-full text-center'
              step={2}
              variant='mini'
              items={[
                { name: "Carrinho" },
                { name: "Pagamento" },
                { name: "Confirmação" }
              ]}
            />
          </div>
          <div className='flex items-center gap-4 h-32'>
            <Image
              src="/new-card-thumbnail.png"
              width={64}
              height={64}
              alt=''
              className='object-contain'
            />
            <span className='text-white text-2xl'>
              Adicione um novo <br className='lg:block hidden' /> cartão de crédito
            </span>
          </div>
          <CreditCard
            creditCardData={creditCardData}
            flip={flipCreditCard}
          />
        </div>

      </section>
      <section className='flex flex-col lg:items-center items-start lg:mt-0 mt-44 items-start lg:justify-around w-full h-screen p-4'>
        <Stepper
          className='lg:flex hidden'
          step={2}
          variant='full'
          items={[
            { name: "Carrinho" },
            { name: "Pagamento" },
            { name: "Confirmação" }
          ]}
        />
        <CreditCardForm
          onChange={(data: ICreditCardFields) => setCreditCardData(data)}
          zodSchema={creditCardSchema}
          maskFunctions={creditCardMask}
          onSubmit={() => console.log(1)}
        >
          <CreditCardField
            fieldName='cardNumber'
          >
            Número do cartão
          </CreditCardField>
          <CreditCardField
            fieldName='cardName'
          >
            Nome (igual ao cartão)
          </CreditCardField>
          <div className='flex w-full justify-start gap-10'>
            <CreditCardField
              fieldName='expiryDate'
            >
              Validade
            </CreditCardField>
            <CreditCardField
              type='number'
              fieldName='cvv'
              onFocus={() => setFlipCreditCard(true)}
              onBlur={() => setFlipCreditCard(false)}
            >
              CVV
            </CreditCardField>
          </div>
          <CreditCardField
            fieldName='installments'
            options={creditCardInstallments}
          >
            Número de parcelas
          </CreditCardField>
          <button
            className='border rounded-lg bg-[#308E5F] px-6 py-2 text-white lg:self-end self-center'
            type="submit"
          >
            CONTINUAR
          </button>
        </CreditCardForm>
      </section>
    </main>
  );
}
