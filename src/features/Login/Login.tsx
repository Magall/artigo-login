import { useState } from "react";
import "./style.css";
import validateUser from "./validateUser";
import validatePassword from "./validatePassword";
import { useCreateUser } from "./../../hooks/useCreateUser";

export default function Login() {
  const [errorMessages, setErrorMessages] = useState<Array<string>>([]);
  const [userPayload, setUserPayload] = useState({
    username: "",
    password: "",
  });
  const { createUser, isLoading, failed, response } = useCreateUser({
    username: userPayload.username,
    password: userPayload.password,
  });

  const handleFormSubmit = (event: any) => {
    event.preventDefault();

    const username = event.currentTarget.elements.user.value;
    const password = event.currentTarget.elements.pass.value;

    const { isValid: isUserValid, messages: userValidationErrors } =
      validateUser(username);

    const { isValid: isPasswordValid, messages: passwordValidadtionErrors } =
      validatePassword(password);

    if (!isUserValid || !isPasswordValid) {
      setErrorMessages([...userValidationErrors, ...passwordValidadtionErrors]);
    } else {
      setErrorMessages([]);
      setUserPayload({ username, password });
      createUser();
    }
  };
  return (
    <div className="login-container">
      {failed && !isLoading && (
        <div className="alert alert-danger mt-4 login-alerts">
          Erro ao criar usuário.
        </div>
      )}
      {response?.data && !isLoading && (
        <div className="alert alert-success mt-4 login-alerts">
          Usuário {response?.data.username} foi criado com sucesso!
        </div>
      )}
      <div className="card sign-in">
        <div>
          <h1>Cadastro</h1>
          <form data-testid="form" className="form" onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Crie o usuário"
              className="form-control"
              name="user"
              data-testid="user"
            />
            <input
              type="password"
              placeholder="Crie a senha"
              className="form-control"
              name="pass"
              data-testid="password"
            />
            {errorMessages.length > 0 && (
              <div className="errors" data-testid="errorsContainer">
                {errorMessages.map((message) => (
                  <span className="badge bg-danger mb-2" key={message}>
                    {message}
                  </span>
                ))}
              </div>
            )}
            {isLoading ? (
              <h4>Loading ...</h4>
            ) : (
              <input
                type="submit"
                className="btn btn-primary"
                value="Cadastrar"
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
