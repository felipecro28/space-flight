import styles from "../styles/Home.module.css";
import { IoIosRocket, IoIosSearch } from "react-icons/io";
import { HiSelector } from "react-icons/hi";
import { MenuItem, TextField } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

const Header: React.FC = () => {
  const [date, setDate] = useState<string>("Sort");

  const handleChange = (event: SelectChangeEvent) => {
    setDate(event.target.value);
    console.log(date);
  };
  return (
    <div className={styles.contentHeader}>
      <div className={styles.headerMainDiv}>
        <form>
          <TextField
          placeholder="Search"
            size="small"
            id="outlined-start-adornment"
            sx={{
              m: 1,
              maxWidth: "60%",
              position: "relative",
              fontFamily: "Roboto Condensed",
              outline: 0,
            }}
            InputProps={{
              startAdornment: (
                <IoIosSearch className={styles.contentSearchIcon}></IoIosSearch>
              ),
            }}
          />
          <Select
            sx={{
              width: "140px",
              maxWidth: "30%",
              fontFamily: "Roboto Condensed",
              outline: 0,
            }}
            labelId="demo-select-small"
            id="demo-select-small"
            value={date}
            renderValue={() => date}
            onChange={handleChange}
            size="small"
            className={styles.select}
            IconComponent={HiSelector}
          >
            <MenuItem
              value="Mais Antigas"
              divider
              sx={{
                fontFamily: "Roboto Condensed",
              }}
            >
              Mais Antigas
            </MenuItem>
            <MenuItem
              sx={{
                fontFamily: "Roboto Condensed",
              }}
              value="Mais Recentes"
            >
              Mais Recentes
            </MenuItem>
          </Select>
        </form>
        <div className={styles.contentIcon}>
          <IoIosRocket className={styles.rocketIcon} />
        </div>
        <h2>Space Flight News</h2>
      </div>
      <div className={styles.borderDiv}></div>
    </div>
  );
};

export default Header;
