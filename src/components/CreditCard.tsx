"use client"

import { useMemo, useState } from "react";
import Image from "next/image"
import { getCreditCardFlag } from "@/utils/getCreditCardFlag";


export interface ICreditCardFields {
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
}

interface ICreditCardData {
    creditCardData: ICreditCardFields;
    flip?: boolean
}

export const CreditCard = ({ creditCardData, flip }: ICreditCardData) => {
    const [flipped, setFlipped] = useState(false);
    const flag = getCreditCardFlag(creditCardData?.cardNumber);

    useMemo(() => {
        if (!flip) setFlipped(false)
    }, [flip])

    return (
        <div
            onClick={() => setFlipped(!flipped)}
            className="relative sm:w-[460px] max-w-[460px] sm:h-[317px] max-h-[317px] w-[85vw] h-[60vw] cursor-pointer"
            style={{ perspective: "1000px" }}
        >
            <div
                className="absolute inset-0 flex flex-col justify-center h-full w-full rounded-2xl sm:px-12 px-8 py-6 text-white bg-gradient-to-r from-[#898989] via-[#747474] to-[#5f5f5f] shadow-2xl"
                style={{
                    backfaceVisibility: "hidden",
                    transformStyle: "preserve-3d",
                    transform: flipped || flip ? "rotateY(180deg)" : "rotateY(0deg)",
                    transition: "transform 0.4s ease-in-out"
                }}
            >
                <div className="h-1/2 w-full">
                    <Image
                        src={`/flags/${flag}.svg`}
                        width={128}
                        height={128}
                        alt=""
                        className={`${!flag ? "hidden" : "-translate-x-[2px]"}`}
                    />
                </div>
                <div className="flex items-center h-1/3">
                    <span className="text-white sm:text-2xl text-xl tracking-wide">
                        {creditCardData?.cardNumber + "**** **** **** ****".substring(creditCardData?.cardNumber.length, 19)}
                    </span>
                </div>
                <div className="flex justify-between items-center h-1/3">
                    <span className="text-white sm:text-xl text-lg">
                        {creditCardData?.cardName.toUpperCase() || "NOME DO TITULAR"}
                    </span>
                    <span className="text-white sm:text-xl text-lg">
                        {creditCardData?.expiryDate + "00/00".substring(creditCardData?.expiryDate.length, 5)}
                    </span>
                </div>
            </div>

            <div
                className="absolute inset-0 flex flex-col items-center justify-center h-full w-full rounded-2xl bg-gradient-to-r from-[#898989] via-[#747474] to-[#5f5f5f] shadow-2xl"
                style={{
                    backfaceVisibility: "hidden",
                    transformStyle: "preserve-3d",
                    transform: flipped || flip ? "rotateY(0deg)" : "rotateY(-180deg)",
                    transition: "transform 0.4s ease-in-out"
                }}
            >
                <div className="h-full w-full">
                    <div className="h-10 mt-10 bg-[#454545]"></div>
                </div>
                <div className="flex flex-col justify-center h-full w-[70%]">
                    <span className="text-black sm:text-xl text-lg text-end tracking-widest bg-white p-2">
                        {creditCardData?.cvv + "***".substring(creditCardData?.cvv.length, 3)}
                    </span>
                </div>
                <div className="h-full">
                    {flag && <Image src={`/flags/${flag}.svg`} width={128} height={128} alt="" />}
                </div>
            </div>

        </div>
    );
};
