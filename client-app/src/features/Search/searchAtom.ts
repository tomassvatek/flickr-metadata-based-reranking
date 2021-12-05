import { atom, useAtom } from 'jotai';

// type Search = {
//   value: string;
//   shouldSearch: boolean;
// };

const searchAtom = atom<string>('');

export function useSearch() {
  return useAtom(searchAtom);
}
