import axios from "axios";

const allLeagues = async () => {
  return axios.get("https://www.thesportsdb.com/api/v1/json/3/all_leagues.php");
};

export default allLeagues;
