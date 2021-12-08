import { atom, useAtom } from 'jotai';

export type FilterValues = {
  title: string;
  ownername: string;
  datetaken: Date | null;
  height_z: number;
  latitude: number;
  longitude: number;
  title_weight: number;
  geo_weight: number;
  author_weight: number;
  height_z_weight: number;
  date_taken_weight: number;
};

const initialValue: FilterValues = {
  title: '',
  ownername: '',
  datetaken: new Date(),
  height_z: 0,
  latitude: 0,
  longitude: 0,
  geo_weight: 1,
  title_weight: 1,
  author_weight: 1,
  height_z_weight: 1,
  date_taken_weight: 1,
};

const filterAtom = atom<FilterValues>(initialValue);
// const derivedFilterAtom = atom(
//   (get) => get(filterAtom),
//   (get, set, key: string) => {
//     set(filterAtom, (key: string, value: any) => ({
//       ...get(filterAtom),
//       ...(get(filterAtom)[key] = value),
//     }));
//   }
// );

export function useFilter() {
  return useAtom(filterAtom);
}
