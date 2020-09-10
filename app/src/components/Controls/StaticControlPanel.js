import React from 'react';

// Styles
import './StaticControlPanel.css';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';


const useStyles = makeStyles((theme) => ({
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));


function StaticControlPanel(props) {
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
      <section className="static-controls-container">
        <div id="static-controls" className={classes.controls}>
          <IconButton aria-label="previous" onClick={cycleToPreviousTable} value="previous">
            <NavigateBeforeIcon />
          </IconButton>
          <p>
            {tableName}
          </p>
          <IconButton aria-label="next" onClick={cycleToNextTable} value="next">
             <NavigateNextIcon />
          </IconButton>
        </div>
      </section>

  );
}

export default StaticControlPanel;