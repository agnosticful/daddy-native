import { Place } from "..";

interface Necessity {
  readonly name: string;
  readonly note: string;
  readonly isUrgent: boolean;
  readonly quantity: number;
  readonly linkedPlaces: Place[];
  readonly isDone: boolean;
}

export default Necessity;
