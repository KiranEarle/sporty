import axios from "axios";

const seasonBadges = async (id: string) => {
  return axios.get(
    `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=${id}`
  );
};

export default seasonBadges;
