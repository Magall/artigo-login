import { useCallback, useState } from "react";

type CreateUserParams = {
  username: string;
  password: string;
};

type CreateUserResponse = {
  data: CreateUserParams;
};

export function useCreateUser({ username, password }: CreateUserParams) {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<CreateUserResponse | undefined>(
    undefined
  );
  const [failed, setFailed] = useState(false);

  const createUser = useCallback(() => {
    setIsLoading(true);
    createUserRequest({ username, password })
      .then((data) => {
        setResponse(data);
        setFailed(false);
      })
      .catch(() => {
        setFailed(true);
        setResponse(undefined);
      })
      .finally(() => setIsLoading(false));
  }, [username, password]);
  return { isLoading, failed, response, createUser };
}
const createUserRequest = ({ username, password }: CreateUserParams) =>
  new Promise<CreateUserResponse>((resolve, reject) => {
    const isSuccess = Math.random() > 0.5;
    setTimeout(() => {
      if (isSuccess) resolve({ data: { username, password } });
      else reject(new Error("Server error"));
    }, 1000);
  });
