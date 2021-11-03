import './App.css';
import { Container } from "@mui/material";
import Header from './components/Header';
import FilterList from './components/FilterList';

function App() {
  return (
    <Container>
      <Header></Header>
      <FilterList />
    </Container>
  );
}

export default App;
