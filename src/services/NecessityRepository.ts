import { NecessityList } from "../domains";

interface NecessityRepository {
  getPrimaryNecessityList(): Promise<NecessityList>;
}

export default NecessityRepository;
