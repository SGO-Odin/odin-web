"use client";

import { LayoutAuthenticated } from "@/src/components/layoutAuthenticated";
import "./resetPassword.scss";
import { HeaderForm } from "@/src/components/form/hearder";
import { TextField } from "@/src/components/textField";
import { ButtonsPrimary } from "@/src/components/buttons/primary";
import Link from "next/link";
import { useState } from "react";
import { MdLogin } from "react-icons/md";

export default function ResetPasswordTemplate() {
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [isErro, setIsError] = useState<boolean>(false);
  const [messageErro, setMessageErro] = useState<string>("");

  const handleResetIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === repeatPassword) {
      setIsError(false);
    } else {
      setMessageErro("As senhas não são iguais.");
      setIsError(true);
    }
    setPassword("");
    setRepeatPassword("");
  };
  return (
    <LayoutAuthenticated>
      <form className="form" method="post" onSubmit={handleResetIn}>
        <HeaderForm title="Redefinir senha" span="Defina sua nova senha" />
        <div className="form__inputs">
          <TextField
            name="password"
            placeholder="Digite sua nova senha"
            value={password}
            label="Senha"
            id="password"
            onChange={(ev) => setPassword(ev.target.value)}
            required={true}
            erro={isErro}
            messageErro={""}
          />
          <TextField
            name="repeatPassword"
            placeholder="Digite a senha novamente"
            value={repeatPassword}
            label="Confirmar Senha"
            id="repeatPassword"
            onChange={(ev) => setRepeatPassword(ev.target.value)}
            required={true}
            erro={isErro}
            messageErro={messageErro}
          />
        </div>
        <ButtonsPrimary>
          <MdLogin size={24} />
          Entrar
        </ButtonsPrimary>
        <div className="form__footer">
          <span className="form__footer__content">
            Ainda não tem uma conta? <br />
            <Link href={"/cadastrar"}>
              <strong>Crie uma conta agora!</strong>
            </Link>
          </span>
        </div>
      </form>
    </LayoutAuthenticated>
  );
}
