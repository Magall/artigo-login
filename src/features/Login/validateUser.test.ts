import validateUser from "./validateUser";
describe("username should", () => {
  it("be at least 4", () => {
    const { isValid, messages } = validateUser("usu");

    expect(isValid).toBeFalsy();
    expect(messages.length).toBe(1);
    expect(messages[0]).toBe("Usuário deve ter ao menos 4 caracteres.");
  });
  it("be smaller than 12", () => {
    const { isValid, messages } = validateUser("usuariousuariousuario");

    expect(isValid).toBeFalsy();
    expect(messages.length).toBe(1);
    expect(messages[0]).toBe("Usuário deve ter no máximo 12 caracteres.");
  });
  it("start with letter", () => {
    const { isValid, messages } = validateUser("1asd");

    expect(isValid).toBeFalsy();
    expect(messages.length).toBe(1);
    expect(messages[0]).toBe("Usuário deve começar com letra.");
  });
  it("be valid if all conditions are atendend", () => {
    const { isValid, messages } = validateUser("rafael");

    expect(isValid).toBeTruthy();
    expect(messages.length).toBe(0);
  });
});
