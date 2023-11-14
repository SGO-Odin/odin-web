"use client";

import { LayoutAuthenticated } from "@/src/components/layoutAuthenticated";
import "./recoverPassword.scss";
import { TextField } from "@/src/components/textField";
import { HeaderForm } from "@/src/components/form/hearder";
import { ButtonsPrimary } from "@/src/components/buttons/primary";
import Link from "next/link";
import { useState } from "react";

export function RecoverPasswordTemplate() {
  const [email, setEmail] = useState<string>("");

  const handleRecoverIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmail("");
  };
  return (
    <LayoutAuthenticated>
      <form className="form" method="post" onSubmit={handleRecoverIn}>
        <HeaderForm title="Esqueci minha senha" span="Esqueci minha senha" />
        <div className="form__inputs">
          <TextField
            name="email"
            placeholder="Digite seu e-mail"
            value={email}
            label="E-mail"
            id="email"
            onChange={(ev) => setEmail(ev.target.value)}
            required={true}
          />
        </div>
        <ButtonsPrimary>Confirmar e-mail</ButtonsPrimary>
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
