import React from "react";
import { OrderTable } from "./order-table/order-table";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="mt-20">
      <OrderTable />
    </div>
  );
};
export default page;
