/* eslint-disable @typescript-eslint/no-namespace */
namespace SportyTypes {
  export type AllLeagueData = {
    id: string;
    strLeague: string;
    strSport: string;
    strLeagueAlternate: string;
  };

  export type LeagueData = {
    id: string;
    league: string;
    sport: string;
    leagueAlt: string;
  };
}

export default SportyTypes;
