import { useEffect, useState } from "react";

type Image = {
  url: string;
};

async function fetchImages(searchValue: string): Promise<Image[]> {
  const response = await fetch("localhost:5000/api/images?searchValue=");
  return response;
}

function useSearchImage(searchValue: string) {
  const [images, setImages] = useState<Image[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
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
