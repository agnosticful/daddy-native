import { createContext } from "react";
import { NecessityRepository } from "../services";

const NecessityRepositoryContext = createContext<NecessityRepository>(
  null as any
);

export default NecessityRepositoryContext;
