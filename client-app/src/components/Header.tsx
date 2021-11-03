import { Container, Typography } from "@mui/material";

function Header() {
  return (
    <Container sx={{
        textAlign: 'center'
    }}>
      <Typography variant="h2">Flickr metadata re-reranking</Typography>
    </Container>
  );
}

export default Header;
