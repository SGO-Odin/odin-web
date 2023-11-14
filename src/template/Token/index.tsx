"use client";

import { useState } from "react";
import "./token.scss";
import { LayoutAuthenticated } from "@/src/components/layoutAuthenticated";
import { HeaderForm } from "@/src/components/form/hearder";
import { TextField } from "@/src/components/textField";
import { ButtonsPrimary } from "@/src/components/buttons/primary";
import Link from "next/link";

export default function TokenTemplate() {
  const [token, setToken] = useState<string>("");

  const handleTokenIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setToken("");
  };
  return (
    <LayoutAuthenticated>
      <form className="form" method="post" onSubmit={handleTokenIn}>
        <HeaderForm
          title="Esqueci minha senha"
          span="Informe o token que foi enviado no seu e-mail"
        />
        <div className="form__inputs">
          <TextField
            name="token"
            placeholder="123456"
            value={token}
            label="Token"
            id="token"
            onChange={(ev) => setToken(ev.target.value)}
            required={true}
          />
        </div>
        <ButtonsPrimary>Recuperar</ButtonsPrimary>
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
