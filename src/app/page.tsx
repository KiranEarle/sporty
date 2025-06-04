/* eslint-disable @next/next/no-img-element */
"use client";

import LeagueTable from "@components/molecules/LeagueTable";
import Select from "@components/atoms/Select";
import Input from "@components/atoms/Input";
import LoadingSpinner from "@components/atoms/LoadingSpinner";

import useLeagueData from "@hooks/useLeagueData";

import style from "./page.module.css";

export default function Home() {
  const {
    filterData,
    handleOnFilterBySport,
    sportTypes,
    handleOnFilterByName,
    handleOpenBadge,
    currentSeasonBadge,
    isBadgeModalOpen,
    setIsBadgeModalOpen,
  } = useLeagueData();
  return (
    <div>
      <div className={style.Inputs_field_container}>
        <Input
          onChange={(e) => handleOnFilterByName(e.target.value)}
          label="Filter by League name"
          placeholder="Enter league name..."
        />
        <Select
          label="Select Sport"
          defaultValue=""
          onChange={(e) => handleOnFilterBySport(e.target.value)}
          options={sportTypes}
        />
      </div>

      {!filterData && (
        <div className={style.Loading}>
          <LoadingSpinner />{" "}
        </div>
      )}

      {filterData && (
        <LeagueTable
          currentSeasonBadge={currentSeasonBadge}
          handleOpenBadge={handleOpenBadge}
          leagueData={filterData}
          isBadgeModalOpen={isBadgeModalOpen}
          setIsBadgeModalOpen={setIsBadgeModalOpen}
        />
      )}
    </div>
  );
}
