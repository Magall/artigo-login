import { IValidationResponse } from "./types";

const includeLetters = (val: string) => /[a-zA-Z]/.test(val);
const includesNumbers = (val: string) => /\d/.test(val);
export default function validatePassword(
  password: string
): IValidationResponse {
  let isValid = true;
  const messages = [];

  if (password.length < 8) {
    isValid = false;
    messages.push("Senha deve ter pelo menos 8 caracteres.");
  }
  if (!includeLetters(password) || !includesNumbers(password)) {
    isValid = false;
    messages.push("Senha deve incluir letras e números.");
  }

  return { isValid, messages };
}
