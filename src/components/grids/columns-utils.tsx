import { ColumnDef, Getter } from "@tanstack/react-table";
import Image from "next/image";

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
  gamesPlayed?: number;
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
  minSize: 30,
  ...options,
});

type CreateStartColumnsOptions = {
  shouldHideGamesPlayed?: boolean;
};

export const createIndexColumn = <T,>(): ColumnDef<T> => ({
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
  enableHiding: false,
});

export const createNameColumn = <T,>(): ColumnDef<T> => ({
  accessorKey: "name",
  header: "Name",
  cell: ({ row }) => {
    const rowData = row.original as { avatar?: string; name: string };

    return (
      <div className="flex items-center">
        <Image
          src={`/avatars/${rowData.avatar || "default.jpg"}`}
          alt=""
          width={20}
          height={20}
          className="mr-1 rounded-sm"
        />
        <span>{row.getValue("name")}</span>
      </div>
    );
  },
  minSize: 200,
  enableSorting: false,
  enableHiding: false,
});

export const createStartColumns = <T extends AnyGridRecord>(
  options?: CreateStartColumnsOptions
): ColumnDef<T>[] => {
  const startingColumns: ColumnDef<T>[] = [
    createIndexColumn<T>(),
    createNameColumn<T>(),
    createColumn("gamesPlayed", "Games"),
  ];

  return options?.shouldHideGamesPlayed
    ? startingColumns.slice(0, 2)
    : startingColumns;
};
