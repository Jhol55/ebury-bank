export const getCreditCardFlag = (cardNumber: string) => {
    const cleanedNumber = cardNumber.replace(/\D/g, '');

    const flags = [
        { name: 'visa', pattern: /^4/ },
        { name: 'mastercard', pattern: /^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)/ },
        { name: 'amex', pattern: /^3[47]/ },
        { name: 'diners', pattern: /^3(0[0-5]|[68])/ },
        { name: 'discover', pattern: /^(6011|65|64[4-9])/ },
        { name: 'elo', pattern: /^(4011|4312|5067|5090|6363|4389|5041|4576)/ },
        { name: 'hipercard', pattern: /^(606282|3841)/ }
    ];

    for (const flag of flags) {
        if (flag.pattern.test(cleanedNumber)) {
            return flag.name;
        }
    }
    
    return null;
}
