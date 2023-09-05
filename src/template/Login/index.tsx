"use client"

import React, { useContext, useState } from "react";
import "./login.scss";
import { LayoutAuthenticated } from "@/src/components/layoutAuthenticated";
import Image from "next/image";
import logo from "@/src/images/logo-2.svg";
import { TextField } from "@/src/components/textField";
import { ButtonsPrimary } from "@/src/components/buttons/primary";
import { MdLogin } from "react-icons/md";
import Link from "next/link";
import { AuthContext } from "@/src/context/AuthContext";
import { ISignInData } from "@/src/interface/utils";

export default function LoginTemplate() {
  const [login, setLogin] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const { singIn } = useContext(AuthContext)

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data : ISignInData = {login, password} 
    await singIn(data)
    setLogin("")
    setPassword("")
}

  return (
    <LayoutAuthenticated>
      <div className="login">
        <Image
          src={logo}
          width={180}
          height={44}
          alt="Logo Odin Sistema de Gerenciamento Optico"
          className="login__logo"
        />
        <form className="login__form" method="post" onSubmit={handleSignIn}>
          <header className="login__form__header">
            <h2 className="login__form__header__title">Entrar</h2>
            <span className="login__form__header__paragraph">
              Preencha seus dados para entrar
            </span>
          </header>
          <div className="login__form__inputs">
            <TextField
              name="login"
              placeholder="Digite seu e-mail"
              value={login}
              label="E-mail"
              id="login"
              onChange={ev => setLogin(ev.target.value)}
              required={true}/>
            <div className="login__form__inputs__input">
              <TextField
                name="password"
                placeholder="Digite sua senha"
                value={password}
                label="Senha"
                id="password"
                type="password"
                onChange={ev => setPassword(ev.target.value)}
                required={true}/>
              <Link href={'/'}>
                Esqueci minha senha
              </Link>
            </div>
          </div>
          <ButtonsPrimary>
            <MdLogin size={24} />
            Entrar
          </ButtonsPrimary>
          <div className="login__form__footer">
            <span className="login__form__footer__content">
              Ainda não tem uma conta? <br />
              <Link href={'/cadastrar'}><strong>Crie uma conta agora</strong></Link>
            </span>
          </div>
        </form>
      </div>
    </LayoutAuthenticated>
  );
}
