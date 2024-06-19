import { render, screen, waitFor } from "@testing-library/react";
import Login from "./Login";
import userEvent from "@testing-library/user-event";
import { useCreateUser } from "../../hooks/useCreateUser";

describe("Login", () => {
  describe("on validation error", () => {
    it("should show error tags messages username validation errors", async () => {
      render(<Login />);

      await typeUsername("1cv");
      const submit = screen.getByRole("button");
      await userEvent.click(submit);

      await waitFor(() => {
        expect(
          screen.getByText("Usuário deve começar com letra.")
        ).toBeVisible();
      });
      await waitFor(() => {
        expect(
          screen.getByText("Usuário deve ter ao menos 4 caracteres.")
        ).toBeVisible();
      });
    });
    it("should show error tags messages on password validation errors", async () => {
      render(<Login />);

      await typeUsername("user");
      await typePassword("x");
      const submit = screen.getByRole("button");
      await userEvent.click(submit);

      await waitFor(() => {
        expect(
          screen.getByText("Senha deve ter pelo menos 8 caracteres.")
        ).toBeVisible();
        expect(
          screen.getByText("Senha deve incluir letras e números.")
        ).toBeVisible();
      });
    });
  });

  describe("on validation success", () => {
    it("should clean all errors", async () => {
      render(<Login />);
      await typeUsername("us");
      await typePassword("a2");
      const submit = screen.getByRole("button");
      await userEvent.click(submit);

      await typeUsername("user");
      await typePassword("pass123");
      await userEvent.click(submit);

      await waitFor(async () => {
        expect(screen.queryByTestId("errorsContainer")).not.toBeInTheDocument();
      });
    });
  });
});

async function typeUsername(username: string) {
  const userE = userEvent.setup();
  const userInput = screen.getByTestId("user");
  await userE.click(userInput);
  await userE.type(userInput, username);
}

async function typePassword(password: string) {
  const userE = userEvent.setup();
  const passwordInput = screen.getByTestId("password");
  await userE.click(passwordInput);
  await userE.type(passwordInput, password);
}
