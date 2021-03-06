import { useCallback, useState } from 'react';
import { ImageItem } from '../../types';
import { FilterValues } from '../Filter/filterAtom';

type RerankingParams = {
  title: string;
  latitude: number;
  longitude: number;
  height_z: number;
};

const INIT_PAGE = 2;

async function fetchImages(
  rerankingParams: RerankingParams
): Promise<ImageItem[]> {
  const url = new URL(`http://127.0.0.1:5000/images/${rerankingParams.title}`);
  Object.keys(rerankingParams).forEach((key) =>
    url.searchParams.append(key, (rerankingParams as any)[key])
  );

  const response = await fetch(url.toString());
  const images = (await response.json()) as ImageItem[];
  return images;
}

async function fetchMoreImages(searchValue: string, page: number) {
  const url = new URL(
    `http://127.0.0.1:5000/images/${searchValue}/pages/${page}`
  );

  const response = await fetch(url.toString());
  return (await response.json()) as ImageItem[];
}

function useSearchImage() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [page, setPage] = useState(INIT_PAGE);
  const [searchValue, setSearchValue] = useState('');

  const submit = useCallback(
    async (formValues: FilterValues) => {
      try {
        setLoading(true);
        const images = await fetchImages(formValues);
        setImages(images);
        setSearchValue(formValues.title);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
        setPage(INIT_PAGE);
      }
    },
    []
  );

  const loadMore = useCallback(async () => {
    try {
      const newImages = await fetchMoreImages(searchValue, page);
      setImages((prev) => [...prev, ...newImages]);
      setPage((prev) => prev + 1);
    } catch (e) {
      setError(e as Error);
    } finally {
      // setLoading(false);
    }
  }, [page, searchValue]);
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

  return { images, loading, error, submit, loadMore };
}

export default useSearchImage;
