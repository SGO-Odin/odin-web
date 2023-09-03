'use client'

import "./dashboard.scss";
import { TextField } from "../components/textField";
import { ButtonsPrimary } from "../components/buttons/primary";
import { Search } from "../components/search";
import { Select } from "../components/select";

interface IDashboard {
  text: string;
}

export function Dashboard({ text }: IDashboard) {
  function teste(event: string) {
    console.log(event);
  }

  return (
    <div>
      <h1 className="title">{text}</h1>
      <Search name="search" id="search" placeholder="search" />
      <TextField name="text" id="text" placeholder="text" label="Label" />
      <Select
        name="select"
        id="select"
        label="Label"
        value="opcao1"
        onChange={(event) => teste(event)}
      />
      <ButtonsPrimary name="button" type="button">
        Click Here!
      </ButtonsPrimary>
    </div>
  );
}
