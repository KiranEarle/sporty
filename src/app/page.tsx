"use client";

import Header from "@components/atoms/Header";
import LeagueTable from "@components/molecules/LeagueTable";
import Select from "@components/atoms/Select";
import useLeagueData from "@hooks/useLeagueData";

import styles from "./page.module.css";

export default function Home() {
  const { filterData, filterBySport, sportTypes } = useLeagueData();
  return (
    <div>
      <Header />
      <main className={styles.Main}>
        <Select
          onChange={(e) => filterBySport(e.target.value)}
          options={sportTypes}
        />

        {filterData && <LeagueTable leagueData={filterData} />}
      </main>
    </div>
  );
}
