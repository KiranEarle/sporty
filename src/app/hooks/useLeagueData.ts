import { useEffect, useState } from "react";
import allLeagues from "@services/allLeagues";
import SportyTypes from "@app-types/SportyTypes";

const useLeagueData = () => {
  const [data, setData] = useState<SportyTypes.LeagueData[]>();
  const [filterData, setFilteredData] = useState<SportyTypes.LeagueData[]>();
  const [sportTypes, setSportTypes] = useState<string[]>([]);

  const callLeagueData = async () => {
    try {
      const leagueData = await allLeagues();
      const parseData = leagueData.data.leagues.map(
        (d: SportyTypes.AllLeagueData) => {
          return {
            id: d.id,
            league: d.strLeague,
            sport: d.strSport,
            leagueAlt: d.strLeagueAlternate,
          };
        }
      );

      setData(parseData);
      setFilteredData(parseData);
      setSportTypes(
        Array.from(
          leagueData.data.leagues.reduce(
            (acc: Set<string>, curr: SportyTypes.AllLeagueData) =>
              acc.add(curr.strSport),
            new Set<string>()
          )
        )
      );
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    callLeagueData();
  }, []);

  const filterBySport = (type: string) => {
    console.log("fired");
    setFilteredData(
      data?.filter((info) => info.sport.toLowerCase() === type.toLowerCase())
    );
  };

  return {
    data,
    filterData,
    filterBySport,
    sportTypes,
  };
};

export default useLeagueData;
