"use client";

import React, { useContext, useState } from "react";
import "./login.scss";
import { LayoutAuthenticated } from "@/src/components/layoutAuthenticated";
import { TextField } from "@/src/components/textField";
import { ButtonsPrimary } from "@/src/components/buttons/primary";
import { MdLogin } from "react-icons/md";
import Link from "next/link";
import { AuthContext } from "@/src/context/AuthContext";
import { ISignInData } from "@/src/interface/utils";
import { HeaderForm } from "@/src/components/form/hearder";

export default function LoginTemplate() {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { singIn } = useContext(AuthContext);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: ISignInData = { login, password };
    console.log("FRONT DATA")
    console.log(data)

    await singIn(data);

    setLogin("");
    setPassword("");
  };

  return (
    <LayoutAuthenticated>
      <form className="form" method="post" onSubmit={handleSignIn}>
        <HeaderForm title="Entrar" span="Preencha seus dados para entrar" />
        <div className="form__inputs">
          <TextField
            name="login"
            placeholder="Digite seu e-mail"
            value={login}
            label="E-mail"
            id="login"
            onChange={(ev) => setLogin(ev.target.value)}
            required={true}
          />
          <div className="form__inputs__input">
            <TextField
              name="password"
              placeholder="Digite sua senha"
              value={password}
              label="Senha"
              id="password"
              type="password"
              onChange={(ev) => setPassword(ev.target.value)}
              required={true}
            />
            {/* <Link href={"/"}>Esqueci minha senha</Link> */}
          </div>
        </div>
        <ButtonsPrimary>
          <MdLogin size={24} />
          Entrar
        </ButtonsPrimary>
      </form>
    </LayoutAuthenticated>
  );
}
