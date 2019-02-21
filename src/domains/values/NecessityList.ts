import { Necessity } from "..";

interface NecessityList {
  readonly necessities: Necessity[];

  delete(necessity: Necessity): NecessityList;
}

export default NecessityList;
