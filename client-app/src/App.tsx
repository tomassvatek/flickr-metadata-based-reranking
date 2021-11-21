import './App.css';
import Header from './components/Header';
import { ChakraProvider, Box, Container, Flex } from '@chakra-ui/react';
import ImageList from './features/Images/ImageList';
import SearchBar from './features/Search/SearchBar';
import Filter from './features/Filter/Filter';
import RerankingForm from './features/Filter/RerankingForm';
import { FilterValues } from './features/Filter/filterAtom';
import useSearchImage from './features/Images/useSearchImage';

function App() {
  const { images, loading, error, handleSubmit } = useSearchImage();
  // function handleSubmit(formValues: FilterValues) {
  //   console.log(formValues);
  // }

  return (
    <ChakraProvider>
      <Box p="30">
        <Container pb="10">
          <Header />
          {/* <Container> */}
          <SearchBar />
        </Container>
        <Flex>
          <Box flex="1" mr="12">
            {/* <Filter /> */}
            <RerankingForm onSubmit={handleSubmit} />
          </Box>
          <Box flex="4" pt="87px">
            <ImageList images={images} loading={loading} error={error} />
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default App;
