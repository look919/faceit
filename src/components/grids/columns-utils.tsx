import { ColumnDef, Getter } from "@tanstack/react-table";

export const renderDecimalValue = (getValue: Getter<number>) => {
  const value = getValue<number | undefined>();

  if (value === null) {
    return "-";
  }
  return typeof value === "number" ? parseFloat(getValue().toFixed(2)) : "0";
};

export const renderDecimalPercentageValue = (getValue: Getter<number>) => {
  const value = getValue<number | undefined>();

  if (value === null) {
    return "-";
  }
  return typeof value === "number"
    ? `${parseFloat(getValue().toFixed(2))}%`
    : "0%";
};

type CreateColumnOptions<T> = Partial<ColumnDef<T>> & {
  percentageDisplay?: boolean;
};

export type AnyGridRecord = {
  id?: bigint;
  name?: string;
  avatar?: string;
};

export const createColumn = <T,>(
  accessorKey: keyof T,
  header: string,
  options?: CreateColumnOptions<T>
): ColumnDef<T> => ({
  accessorKey,
  header,
  cell: ({ getValue }) =>
    options?.percentageDisplay
      ? renderDecimalPercentageValue(getValue)
      : renderDecimalValue(getValue),
  maxSize: 60,
  ...options,
});

export const createStartColumns = <
  T extends AnyGridRecord
>(): ColumnDef<T>[] => [
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
