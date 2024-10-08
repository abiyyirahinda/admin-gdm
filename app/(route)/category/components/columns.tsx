"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Category = {
  id: string
  categoryName: string
  createdAt: string
}

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "categoryName",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
]
