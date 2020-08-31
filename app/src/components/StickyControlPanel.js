import React from 'react';

// Styles
import './StickyControlPanel.css';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';


const missouri_img = require('../images/river.jpg');
const illinois_img = require('../images/bean.jpg');
const stl_img = require('../images/arch.jpg');

const images = {
  Missouri :  {img: missouri_img, title: "Missouri river"},
  Illinois : {img: illinois_img, title: "The Bean"},
  "Saint Louis" : {img: stl_img, title: "The Arch"}
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));


function StickyControlPanel(props) {
  const classes = useStyles();

  const { tableNames, currentView, setTableView } = props;
  const [tableName, setTableName] = React.useState(currentView);

  const cycleToNextTable = (event) => {
    let oldIndex = tableNames.indexOf(tableName);
    let newIndex = tableNames[oldIndex + 1] === undefined ? 0 : oldIndex + 1;
    let nextTable = tableNames[newIndex];
    setTableName(nextTable);
    setTableView(nextTable);
  }

  const cycleToPreviousTable = (event) => {
    let oldIndex = tableNames.indexOf(tableName);
    let newIndex = tableNames[oldIndex - 1] === undefined ? tableNames.length - 1 : oldIndex - 1;
    let previousTable = tableNames[newIndex];
    setTableName(previousTable);
    setTableView(previousTable);
  }
  
  return (
    <Card className={classes.root} id="card">
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <h5 id="ControlPanelTitle">
            Geography
          </h5>
        </CardContent>
        <div className={classes.controls} id="controls">
          <IconButton aria-label="previous" onClick={cycleToPreviousTable} value="previous">
            <NavigateBeforeIcon />
          </IconButton>
          <p id="ControlPanelDesc">
            {tableName}
          </p>
          <IconButton aria-label="next" onClick={cycleToNextTable} value="next">
             <NavigateNextIcon />
          </IconButton>
        </div>
      </div>
      <img id="cover" src={images[tableName].img} title={images[tableName].title} alt=""/>
    </Card>
  );
}

export default StickyControlPanel;