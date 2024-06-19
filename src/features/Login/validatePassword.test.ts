import validatePassword from "./validatePassword";

describe("password should", () => {
  it("be bigger than 8", () => {
    const { isValid, messages } = validatePassword("123456a");

    expect(isValid).toBeFalsy();
    expect(messages.length).toBe(1);
    expect(messages[0]).toBe("Senha deve ter pelo menos 8 caracteres.");
  });
  it.each(["12345678", "asdfghjk"])(
    "contain numbers and letters %p",
    (pass) => {
      const { isValid, messages } = validatePassword(pass);

      expect(isValid).toBeFalsy();
      expect(messages.length).toBe(1);
      expect(messages[0]).toBe("Senha deve incluir letras e números.");
    }
  );

  it("be valid if all conditions attended", () => {
    const { isValid, messages } = validatePassword("1234asdf");

    expect(isValid).toBeTruthy();
    expect(messages.length).toBe(0);
  });
});
