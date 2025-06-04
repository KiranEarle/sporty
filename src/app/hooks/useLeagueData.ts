import { useEffect, useState } from "react";
import allLeagues from "@services/allLeagues";
import seasonBadges from "@services/seasonBadges";
import SportyTypes from "@app-types/SportyTypes";

const useLeagueData = () => {
  const [data, setData] = useState<SportyTypes.LeagueData[]>([]);
  const [filterData, setFilteredData] = useState<SportyTypes.LeagueData[]>();
  const [sportTypes, setSportTypes] = useState<string[]>([]);
  const [filterSport, setFilteredSport] = useState<string>("");
  const [filteredSportType, setFilteredSportType] = useState<string>("");
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
  const [seasonBadgesData, setSeasonBadgesData] = useState<
    {
      id: string;
      strSeason: string;
      strBadge: string;
    }[]
  >([]);

  const [currentSeasonBadge, setCurrentSeasonBadge] = useState({
    id: "",
    strSeason: "",
    strBadge: "",
  });

  const callLeagueData = async () => {
    try {
      const leagueData = await allLeagues();
      const parseData = leagueData.data.leagues.map(
        (d: SportyTypes.AllLeagueData) => {
          return {
            id: d.idLeague,
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

  const filterBySport = (type: string, data: SportyTypes.LeagueData[]) => {
    if (!type) return data;
    return data?.filter(
      (info) => info.sport.toLowerCase() === type.toLowerCase()
    );
  };

  const filterByName = (
    searchString: string,
    data: SportyTypes.LeagueData[]
  ) => {
    return data?.filter((info) => {
      return info.league.toLowerCase().includes(searchString.toLowerCase());
    });
  };

  const handleOnFilterByName = (searchString: string) => {
    setFilteredSportType(searchString);
    const dataByName = filterByName(searchString, data);
    const dataBySport = filterBySport(filterSport, dataByName);
    setFilteredData(dataBySport);
  };
  const handleOnFilterBySport = (type: string) => {
    setFilteredSport(type);
    const dataBySport = filterBySport(type, data);
    const dataByName = filterByName(filteredSportType, dataBySport);
    setFilteredData(dataByName);
  };

  const handleOpenBadge = async (id: string) => {
    const badges = seasonBadgesData;
    let badgeResponse;
    console.log({ seasonBadgesData });

    try {
      if (badges.some((badge) => badge.id === id)) {
        setCurrentSeasonBadge(
          badges.find((badge) => badge.id === id) as {
            id: string;
            strSeason: string;
            strBadge: string;
          }
        );
        setIsBadgeModalOpen(true);
        return;
      }

      badgeResponse = await seasonBadges(id);
      if (!badgeResponse.data.seasons) return;
      const currentBadge = {
        id,
        ...badgeResponse.data.seasons[0],
      };
      badges.push(currentBadge);
      setCurrentSeasonBadge(currentBadge);
      setSeasonBadgesData(badges);
      setIsBadgeModalOpen(true);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    data,
    filterData,
    filterBySport,
    sportTypes,
    filterByName,
    handleOnFilterBySport,
    handleOnFilterByName,
    handleOpenBadge,
    seasonBadgesData,
    isBadgeModalOpen,
    setIsBadgeModalOpen,
    currentSeasonBadge,
  };
};

export default useLeagueData;
