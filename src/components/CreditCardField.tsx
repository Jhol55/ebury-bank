"use client"

import { ChangeEvent, useState } from 'react';
import { useFormContext } from './CreditCardForm';

interface ICreditCardField {
    children: React.ReactNode;
    type?: "text" | "number"
    options?: number[]
    fieldName: keyof Record<string, (e: ChangeEvent<HTMLInputElement>) => void>;
    onFocus?: () => void
    onBlur?: () => void
}

const CreditCardField = ({ children, type, options, fieldName, onFocus, onBlur }: ICreditCardField) => {
    const { register, errors, maskFunctions } = useFormContext();
    const [showLabel, setShowLabel] = useState(true);

    return (
        <fieldset className='flex flex-col relative w-full'>
            <label className='absolute -z-10 whitespace-nowrap overflow-hidden text-lg text-[#C6C6C6]'>
                {showLabel && children}
            </label>

            {!options?.length ? (
                <input
                    {...register(fieldName)}
                    type={type}
                    className='w-full border-b-2 outline-0 bg-transparent text-lg text-gray-600'
                    onFocus={() => onFocus && onFocus()}
                    onBlur={(e) => {
                        setShowLabel(!e.target.value.length);
                        if (onBlur) onBlur()
                    }}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setShowLabel(!e.target.value.length);
                        if (maskFunctions) maskFunctions[fieldName](e);
                    }}
                />
            ) : (
                <select
                    {...register(fieldName)}
                    className="w-full h-[calc(1.75rem+2px)] border-b-2 outline-0 bg-transparent text-lg text-[#C6C6C6]"
                    onFocus={() => onFocus && onFocus()}
                    onBlur={(e) => {
                        setShowLabel(!e.target.value.length);
                        if (onBlur) onBlur();
                    }}
                    onInput={() => setShowLabel(false)}
                >
                    <option value="" hidden />

                    {options?.map((option, index) => (
                        <option key={index} value={option} className='text-gray-600'>
                            {option}
                        </option>
                    ))}
                </select>
            )}

            <p className='text-red-500 h-1 mb-2'>{errors[fieldName]?.message as string}</p>
        </fieldset>
    );
};

export { CreditCardField };
