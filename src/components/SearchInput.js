import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = ({ handleSubmit }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(searchQuery);
  };
  return (
    <form onSubmit={onSubmit}>
      <TextField
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ width: 300 }}
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="submit"
                color="primary"
                aria-label="search-by-name"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></TextField>
    </form>
  );
};
export default SearchInput;
