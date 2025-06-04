import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import SportyTypes from "@app-types/SportyTypes";

import styles from "./league-table.module.css";

export type LeagueTableProps = {
  leagueData: SportyTypes.LeagueData[];
};

const columnHelper = createColumnHelper<SportyTypes.LeagueData>();

const columns = [
  columnHelper.accessor("league", {
    header: () => "League",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("sport", {
    header: () => "Sport",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("leagueAlt", {
    header: () => "League Alternative",
    cell: (info) => info.getValue(),
  }),
];

const LeagueTable = ({ leagueData }: LeagueTableProps) => {
  console.log({ columns });
  const table = useReactTable({
    data: leagueData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className={styles.LeagueTable}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeagueTable;
