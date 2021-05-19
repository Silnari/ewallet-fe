import { Container, TextField } from "@material-ui/core";

export default function CategoryFilter({ setSearchCategoryText }) {
  const filterCategory = (e) => {
    setSearchCategoryText(e.target.value);
  };

  return (
    <Container maxWidth="xs">
      <TextField
        style={{ backgroundColor: "#fff" }}
        fullWidth
        label="Search category"
        margin="normal"
        variant="outlined"
        onChange={filterCategory}
      />
    </Container>
  );
}
