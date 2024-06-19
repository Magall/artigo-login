interface IValidationResponse {
  isValid: boolean;
  messages: string[];
}

interface FormElements extends HTMLFormControlsCollection {
  user: HTMLInputElement;
  pass: HTMLInputElement;
}

interface SigninFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export type { IValidationResponse, SigninFormElement };
