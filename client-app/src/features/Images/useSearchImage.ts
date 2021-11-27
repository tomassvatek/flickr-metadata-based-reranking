import { useCallback, useEffect, useState } from 'react';
import { ImageItem } from '../../types';
import { FilterValues, useFilter } from '../Filter/filterAtom';
import { useSearch } from '../Search/searchAtom';

type RerankingParams = {
  title: string;
  latitude: number;
  longitude: number;
  height_z: number;
};

async function fetchImages(
  searchValue: string,
  rerankingParams: RerankingParams
): Promise<ImageItem[]> {
  const url = new URL(`http://127.0.0.1:5000/images/${searchValue}`);
  Object.keys(rerankingParams).forEach((key) =>
    url.searchParams.append(key, (rerankingParams as any)[key])
  );

  const response = await fetch(url.toString());
  const images = (await response.json()) as ImageItem[];
  return images;
}

function useSearchImage() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [searchValue] = useSearch();
  // const [filter] = useFilter();

  const handleSubmit = useCallback(
    async (formValues: FilterValues) => {
      try {
        setLoading(true);
        const images = await fetchImages(searchValue, formValues);
        setImages(images);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    [searchValue]
  );

  // useEffect(() => {
  //   if (searchValue?.length < 3) return;
  //   console.log(filter);

  //   (async function () {
  //     try {
  //       setLoading(true);
  //       const images = await fetchImages(searchValue, filter);
  //       setImages(images);
  //     } catch (err) {
  //       setError(err as Error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   })();
  // }, [searchValue, filter]);

  return { images, loading, error, handleSubmit };
}

export default useSearchImage;
