import { Container, TextField } from "@material-ui/core";

export default function CategoryFilter({ setSearchCategoryText }) {
  const filterCategory = (e) => {
    setSearchCategoryText(e.target.value);
  };

  return (
    <Container maxWidth="xs">
      <TextField
        fullWidth
        label="Search category"
        margin="normal"
        variant="outlined"
        onChange={filterCategory}
      />
    </Container>
  );
}
