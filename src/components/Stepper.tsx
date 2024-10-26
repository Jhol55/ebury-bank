import Image from "next/image"

interface IItem {
    name: string;
}

interface IStepper {
    items: IItem[];
    step: number;
    variant: "mini" | "full"
    className?: string;
}


export const Stepper = ({ items, step, variant, className }: IStepper) => {

    const normalizedStep = step - 1

    return (variant === "mini" ? (
        <span className={`text-xl text-white ${className}`}>
            {"Etapa " + step + " de " + items.length}
        </span>
    ) : (
        <div className={`flex items-center gap-4 ${className}`}>
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 text-black">
                    <span
                        className={
                            `flex justify-center items-center h-8 w-8 border rounded-full
                            ${index < normalizedStep
                                ? "bg-[#4BDE95] border-[#4BDE95]"
                                : index === normalizedStep
                                    ? "border-[#4BDE95] text-[#4BDE95]"
                                    : "bg-transparent border-[#C6C6C6] text-[#C6C6C6]"}`
                        }>
                        {index < normalizedStep ? (
                            <Image src="/check.png" width={20} height={20} alt="" />
                        ) : (
                            <>
                                {index + 1}
                            </>
                        )}
                    </span>
                    <span className={
                        `${index <= normalizedStep
                            ? "text-[#4BDE95]"
                            : "text-[#C6C6C6]"}`
                    }>
                        {item.name}
                    </span>
                    {index !== items.length - 1 &&
                        <>
                            {index < normalizedStep ? (
                                <Image src="/green-chevron-right.png" width={24} height={24} alt="" />
                            ) : (
                                <Image src="/gray-chevron-right.png" width={24} height={24} alt="" />
                            )}
                        </>
                    }
                </div>
            ))}
        </div >
    ))
}