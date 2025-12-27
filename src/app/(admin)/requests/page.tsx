"use client";
import React from "react";
import { RequestTable } from "./request-table/request-table";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="mt-20">
      <RequestTable />
    </div>
  );
};
export default page;
