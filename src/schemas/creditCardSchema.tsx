import { z } from 'zod';
import { checkCreditCardNumber } from '../utils/checkCreditCardNumber';


export const creditCardSchema = z.object({
  cardNumber: z
    .string()
    .refine(checkCreditCardNumber, {
      message: "Número do cartão inválido",
    }),
  cardName: z
    .string()
    .min(1, "O nome no cartão é obrigatório")
    .regex(/^[a-zA-Z\s]+$/, "O nome deve conter apenas letras e espaços"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, "Data de expiração inválida (use MM/AA)")
    .refine((date) => {
      const [month, year] = date.split("/").map(Number);
      const now = new Date();
      const expiry = new Date();
      expiry.setFullYear(year < 100 ? 2000 + year : year, month - 1, 1);
      return expiry >= now;
    }, {
      message: "O cartão já expirou",
    }),
  cvv: z
    .string()
    .min(3, "O CVV deve ter pelo menos 3 dígitos"),
  installments: z
    .string()
    .min(1, "O número de parcelas é obrigatório"),

});
