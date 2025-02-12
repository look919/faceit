import { ColumnDef, Getter } from "@tanstack/react-table";
import { StatsTableRecord } from "./types";

export const renderDecimalValue = (getValue: Getter<number>) => {
  const value = getValue<number | undefined>();
  return value ? parseFloat(getValue().toFixed(2)) : "-";
};

export const startColumns: ColumnDef<StatsTableRecord>[] = [
  {
    accessorKey: "No.",
    header: "No.",
    cell: ({ row, table }) => {
      const sortedIndex = table
        .getSortedRowModel()
        .flatRows.findIndex((r) => r.id === row.id);
      return sortedIndex + 1;
    },
    maxSize: 20,
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="text-left">{row.getValue<number>("name")}</div>
    ),
    minSize: 200,
    enableSorting: false,
  },
];
