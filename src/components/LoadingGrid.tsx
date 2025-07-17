import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function LoadingGrid() {
  return (
    <div className="rounded-md border border-slate-600 w-full mt-4">
      <Table className="w-[600px]">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Loading...</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
