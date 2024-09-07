"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Size = {
  id: string
  sizeValue: number
  sizeUnit: string
  createdAt: string
}

export const columns: ColumnDef<Size>[] = [
  {
    accessorKey: "sizeValue",
    header: "Value",
  },
  {
    accessorKey: "sizeUnit",
    header: "Unit",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
]
