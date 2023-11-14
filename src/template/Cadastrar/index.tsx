"use client";

import { LayoutAuthenticated } from "@/src/components/layoutAuthenticated";
import "./register.scss";
import Link from "next/link";
import { ButtonsPrimary } from "@/src/components/buttons/primary";
import { MdAppRegistration, MdLogin } from "react-icons/md";
import { TextField } from "@/src/components/textField";
import { HeaderForm } from "@/src/components/form/hearder";
import { useState } from "react";

export function RegisterTemplate() {
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegisterIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <LayoutAuthenticated>
      <form className="form" method="post" onSubmit={handleRegisterIn}>
        <HeaderForm
          title="Criar conta"
          span="Não possui uma conta? Cadastre-se agora"
        />
        <div className="form__inputs">
          <TextField
            name="name"
            placeholder="Digite seu nome"
            value={name}
            label="Nome"
            id="name"
            onChange={(ev) => setName(ev.target.value)}
            required={true}
          />
          <TextField
            name="lastname"
            placeholder="Digite seu sobrenome"
            value={lastName}
            label="Sobrenome"
            id="lastname"
            onChange={(ev) => setLastName(ev.target.value)}
            required={true}
          />
          <TextField
            name="email"
            placeholder="Digite seu e-mail"
            value={email}
            label="E-mail"
            id="email"
            onChange={(ev) => setEmail(ev.target.value)}
            required={true}
          />
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
        </div>
        <ButtonsPrimary>
          <MdAppRegistration size={24} />
          Cadastrar
        </ButtonsPrimary>
        <div className="form__footer">
          <span className="form__footer__content">
            Já possui uma conta? <br />
            <Link href={"/login"}>
              <strong>Clique aqui!</strong>
            </Link>
          </span>
        </div>
      </form>
    </LayoutAuthenticated>
  );
}
