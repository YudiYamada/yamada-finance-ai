import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Insira um email válido."),
  password: z.string().min(1, "A senha é obrigatória."),
});
