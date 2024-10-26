

export const creditCardMask = {
    cardNumber: (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value.replace(/\D/g, '');
        const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        e.currentTarget.value = formattedValue.trim().substring(0, 19);
    },
    cardName: (e: React.ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.value = e.currentTarget.value.replace(/\d/, '').substring(0, 20).toUpperCase()
    },
    expiryDate: (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value.replace(/\D/g, ''); 
        const formattedValue = value.replace(/(\d{2})(\d)/, '$1/$2'); 
        e.currentTarget.value = formattedValue.substring(0, 5);
    },
    cvv: (e: React.ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.value = e.currentTarget.value.substring(0, 4)
    }
}