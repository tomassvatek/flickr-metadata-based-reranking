import './App.css';
import Header from './components/Header';
import Filter from './components/Filter';
import { ChakraProvider, Box, Container, Flex } from '@chakra-ui/react';
import ImageList from './features/Images/ImageList';
import SearchBar from './features/Search/SearchBar';

function App() {
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
            <Filter />
          </Box>
          <Box flex="4" pt="87px">
            <ImageList />
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default App;
