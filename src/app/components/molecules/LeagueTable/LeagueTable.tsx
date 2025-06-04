/* eslint-disable @next/next/no-img-element */
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import ModalComponent from "@components/molecules/ModalComponent";

import SportyTypes from "@app-types/SportyTypes";

import styles from "./league-table.module.css";
import { Dispatch, SetStateAction } from "react";

export type LeagueTableProps = {
  leagueData: SportyTypes.LeagueData[];
  handleOpenBadge: (id: string) => Promise<void>;
  currentSeasonBadge: {
    id: string;
    strSeason: string;
    strBadge: string;
  };
  isBadgeModalOpen: boolean;
  setIsBadgeModalOpen: Dispatch<SetStateAction<boolean>>;
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

const LeagueTable = ({
  leagueData,
  isBadgeModalOpen,
  setIsBadgeModalOpen,
  currentSeasonBadge,
  handleOpenBadge,
}: LeagueTableProps) => {
  const table = useReactTable({
    data: leagueData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.LeagueTable_container}>
      <div>
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
              <tr
                key={row.id}
                onClick={async () => handleOpenBadge(row.original.id)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalComponent
        isOpen={isBadgeModalOpen}
        onClose={() => setIsBadgeModalOpen((prev) => !prev)}
      >
        <img
          className={styles.Badge_img}
          src={currentSeasonBadge.strBadge}
          alt={currentSeasonBadge.strSeason}
        />
      </ModalComponent>
    </div>
  );
};

export default LeagueTable;
