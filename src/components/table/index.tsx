import "./table.scss";
import { ITable } from "@/src/interface/utils";
import Head from "./head";
import Body from "./body";

export function Table({ data, columns, isButton, typeButton }: ITable) {
  return (
    <table className="table">
      <Head columns={columns} isButton={isButton} />
      <Body columns={columns} data={data} typeButton={typeButton} />
    </table>
  );
}
