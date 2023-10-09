import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { createNextState } from "@reduxjs/toolkit";

const BlogCategory = ({ getCategoryString }) => {
  const [checked, setChecked] = React.useState({
    all: true,
    sports: false,
    technology: false,
    agriculture: false,
  });
  let arr = [];
  React.useEffect(() => {
    const res = Object.values(checked).some((obj, index, arr) => obj === true);
    if (!res) {
      setChecked({
        all: true,
        sports: false,
        technology: false,
        agriculture: false,
      });
    } else {
      for (let item in checked) {
        if (checked[item] == true) {
          arr.push(item);
        }
      }
    }
  }, [checked]);

  React.useEffect(() => {
    console.log(arr);
    let str = "";
    for (let item of arr) {
      if (item !== "all") {
        str += `category=${item}&`;
      }
    }
    getCategoryString(str.slice(0, -1));
    // console.log(str.slice(0, -1));
  }, [checked]);

  const handleChange = (event) => {
    if (event.target.name == "all") {
      setChecked({
        all: true,
        sports: false,
        technology: false,
        agriculture: false,
      });
    } else {
      setChecked({
        ...checked,
        all: false,
        [event.target.name]: event.target.checked,
      });
    }
  };
  return (
    <div style={{ marginTop: 80, marginRight: 40 }}>
      <h4>Categories</h4>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={checked.all} onChange={handleChange} />}
          label="All"
          name="all"
        />
        <FormControlLabel
          control={
            <Checkbox checked={checked.technology} onChange={handleChange} />
          }
          label="Technology"
          name="technology"
        />
        <FormControlLabel
          control={
            <Checkbox checked={checked.agriculture} onChange={handleChange} />
          }
          label="Agriculture"
          name="agriculture"
        />
        <FormControlLabel
          control={
            <Checkbox checked={checked.sports} onChange={handleChange} />
          }
          label="Sports"
          name="sports"
        />
      </FormGroup>
    </div>
  );
};

export default BlogCategory;
