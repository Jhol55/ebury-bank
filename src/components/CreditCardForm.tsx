import React, { createContext, useContext } from 'react';
import { useForm, UseFormRegister, FieldErrors, FieldValues, UseFormWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodSchema } from 'zod';
import { ICreditCardFields } from './CreditCard';

interface IFormContext {
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
    maskFunctions: Record<string, (e: React.ChangeEvent<HTMLInputElement>) => void>;
    watch: UseFormWatch<FieldValues>;
}

const FormContext = createContext<IFormContext | null>(null);

const useFormContext = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
};


interface ICreditCardForm<T> {
    onSubmit?: () => void;
    onChange?: (data: ICreditCardFields) => void;
    children: React.ReactNode;
    zodSchema?: ZodSchema<T>;
    maskFunctions: Record<string, (e: React.ChangeEvent<HTMLInputElement>) => void>;
}

const CreditCardForm = <T,>({ onSubmit, onChange, children, zodSchema, maskFunctions }: ICreditCardForm<T>) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: zodSchema ? zodResolver(zodSchema) : undefined,
    });

    return (
        <FormContext.Provider value={{ register, errors, watch, maskFunctions }}>
            <form
                onSubmit={onSubmit && handleSubmit(onSubmit)}
                onChange={() => onChange && onChange(watch() as ICreditCardFields)}
                className='flex flex-col gap-10 xl:w-2/3 w-full p-4'
            >
                {children}
            </form>
        </FormContext.Provider>
    );
};

export { CreditCardForm, useFormContext };
