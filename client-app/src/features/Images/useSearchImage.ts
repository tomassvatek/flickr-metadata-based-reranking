import { useEffect, useState } from 'react';
import { ImageItem } from '../../types';
import { useSearch } from '../Search/searchAtom';

type RerankingParams = {
  title: string;
  latitude: number;
  longitude: number;
  height_z: number;
};

async function fetchImages(
  searchValue: string,
  searchParams: RerankingParams = {
    title: searchValue,
    latitude: 50.07656000914572,
    longitude: 14.434791191466752,
    height_z: 500,
  }
): Promise<ImageItem[]> {
  const url = new URL(`http://127.0.0.1:5000/images/${searchValue}`);
  Object.keys(searchParams).forEach((key) =>
    url.searchParams.append(key, (searchParams as any)[key])
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

  useEffect(() => {
    if (searchValue?.length < 3) return;

    (async function () {
      try {
        setLoading(true);
        const images = await fetchImages(searchValue);
        setImages(images);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    })();
  }, [searchValue]);

  return { images, loading, error };
}

export default useSearchImage;
