import { IValidationResponse } from "./types";

const isLetter = (char: string) => /[a-zA-Z]/.test(char);

export default function validateUser(user: string): IValidationResponse {
  let isValid = true;
  const messages = [];

  if (user.length <= 3) {
    isValid = false;
    messages.push("Usuário deve ter ao menos 4 caracteres.");
  }
  if (user.length > 12) {
    isValid = false;
    messages.push("Usuário deve ter no máximo 12 caracteres.");
  }
  if (!isLetter(user.charAt(0))) {
    isValid = false;
    messages.push("Usuário deve começar com letra.");
  }

  return { isValid, messages };
}
