export { default as FakeNecessityRepository } from "./FakeNecessityRepository";

// hack because of babel's bug: https://github.com/babel/babel/issues/8361
import * as NecessityRepositoryExport from "./NecessityRepository";
export type NecessityRepository = NecessityRepositoryExport.default;
