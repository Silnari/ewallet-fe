import {
  Checkbox,
  Container,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
import { FixedSizeList } from "react-window";

const useStyles = makeStyles((theme) => ({
  categoryItem: {
    backgroundColor: theme.white,
    borderRadius: 10,
  },
  incomeIcon: {
    color: theme.green,
  },
  outcomeIcon: {
    color: theme.red,
  },
  icon: {
    marginLeft: theme.spacing(3),
  },
}));

export default function CategoryList({
  checked,
  setChecked,
  categoryList,
  searchCategoryText,
}) {
  const classes = useStyles();

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const filteredCategoryList = categoryList.filter((category) =>
    category.toLowerCase().startsWith(searchCategoryText.toLowerCase())
  );

  const renderRow = ({ index, style }) => {
    const categoryArr = filteredCategoryList[index].split("^");

    return (
      <ListItem
        style={style}
        key={filteredCategoryList[index]}
        className={classes.categoryItem}
        dense
        button
        onClick={handleToggle(filteredCategoryList[index])}
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked.indexOf(filteredCategoryList[index]) !== -1}
          />
        </ListItemIcon>
        <ListItemText primary={categoryArr[0]} />
        <ListItemIcon>
          {categoryArr[1] === "INCOME" ? (
            <TrendingUpIcon
              className={`${classes.icon} ${classes.incomeIcon}`}
            />
          ) : (
            <TrendingDownIcon
              className={`${classes.icon} ${classes.outcomeIcon}`}
            />
          )}
        </ListItemIcon>
      </ListItem>
    );
  };

  return (
    <Container maxWidth="xs">
      <FixedSizeList
        height={300}
        width={400}
        itemSize={50}
        itemCount={filteredCategoryList.length}
      >
        {renderRow}
      </FixedSizeList>
    </Container>
  );
}
