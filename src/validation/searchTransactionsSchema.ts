import z from 'zod';

const today = new Date();

export const searchSchema = z.object({
  year: z.coerce
    .number<number>()
    .min(today.getFullYear() - 100)
    .max(today.getFullYear() + 1)
    .catch(today.getFullYear()),
  month: z.coerce
    .number<number>()
    .min(1)
    .max(12)
    .catch(today.getMonth() + 1),
});
