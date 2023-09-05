import { v4 as uuid } from "uuid";
import { ISignInData } from "../interface/utils";

const delay = (amount = 750) =>
  new Promise((resolve) => setTimeout(resolve, amount));

export async function signInRequest(data: ISignInData) {
  await delay();

  return {
    token: uuid(),
    user: {
      name: "Dênerson",
      sobrenome: "Pinas",
      email: "denersonpinas19@gmail.com",
      photo:
        "https://lh3.googleusercontent.com/a/AGNmyxZG59-MK5e7V8SNzcavliTOHAQZajRb1gr65OhsOw=s96-c",
    },
  };
}

export async function recoverUserInformation(token : string) {
  await delay();

  return {
    user: {
      name: "Dênerson",
      sobrenome: "Pinas",
      email: "denersonpinas19@gmail.com",
      photo:
        "https://lh3.googleusercontent.com/a/AGNmyxZG59-MK5e7V8SNzcavliTOHAQZajRb1gr65OhsOw=s96-c",
    },
  };
}
