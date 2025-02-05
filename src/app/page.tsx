import { columns } from "./DataTable/columns";
import { DataTable } from "./DataTable/DataTable";
import { PrismaClient } from "@prisma/client";

export default async function Home() {
  const prisma = new PrismaClient();

  const players = await prisma.playerStats.findMany();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <DataTable columns={columns} data={players} />
      </main>
      <footer className="row-start-3 text-center text-sm text-gray-500">
        Tomuś 2025
      </footer>
    </div>
  );
}
