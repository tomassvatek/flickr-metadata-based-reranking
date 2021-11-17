import './App.css';
import Header from './components/Header';
import FilterList from './components/FilterList';
import { ChakraProvider, Container } from '@chakra-ui/react';
import ImageList from './features/Images/ImageList';
import SearchBar from './features/Search/SearchBar';

function App() {
  return (
    <ChakraProvider>
      <Container p="25">
        <Header />
        <SearchBar />
        <FilterList />
        <ImageList />
      </Container>
    </ChakraProvider>
  );
}

export default App;
