"use client";

import React, { useContext, useEffect, useState } from "react";
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
  const [messageErrorUsuario, setMessageErrorUsuario] = useState<string>("");
  const [messageErrorSenha, setMessageErrorSenha] = useState<string>("");

  const { singIn } = useContext(AuthContext);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: ISignInData = { login, password };

    await singIn(data);

    setLogin("");
    setPassword("");
  };

  // useEffect(() => {
  //   if (login.length > 0) {
  //     setMessageErrorUsuario("")
  //   } else if (password.length > 0) {
  //     setMessageErrorSenha("")

  //   }
  // }, [login, password])

  return (
    <LayoutAuthenticated>
      <form className="form" method="post" onSubmit={handleSignIn}>
        <HeaderForm title="Entrar" span="Preencha seus dados para entrar" />
        <div className="form__inputs">
          <TextField
            name="login"
            placeholder="Digite seu usuário"
            value={login}
            label="Nome de Usuário"
            id="login"
            onChange={(ev) => setLogin(ev.target.value)}
            required={true}
            messageErro={messageErrorUsuario}
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
              messageErro={messageErrorSenha}
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
