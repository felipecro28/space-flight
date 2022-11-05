import styles from "../styles/Header.module.css";
import { IoIosRocket, IoIosSearch } from "react-icons/io";
import { HiSelector } from "react-icons/hi";
import { MenuItem, TextField } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import { IArticle } from "../services/api";

interface IProps {
  filterSearch: (search: string) => void;
  dateSearch: (dateValue: string) => void;
}

const Header: React.FC<IProps> = (props: IProps) => {
  const [date, setDate] = useState<string>("Sort");
  const [search, setSearch] = useState<string>("");

  const {filterSearch, dateSearch} = props;

  useEffect(() => {
    dateSearch(date)
  }, [date])

  const handleChange = (event: SelectChangeEvent) => {
    setDate(event.target.value);
  };

  const sendFilterInfo = () => {
    filterSearch(search)
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
                <IoIosSearch onClick={sendFilterInfo} className={styles.contentSearchIcon}></IoIosSearch>
              ),
            }}
            onChange={(e) => setSearch(e.target.value)}
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
