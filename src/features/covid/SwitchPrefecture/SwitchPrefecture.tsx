import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NativeSelect, FormControl } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { fetchAsyncCurrentPrefecture } from '../covidSlice';
import prefecturesObjectJSON from '../prefecturesObject.json';

export type prefecturesObjectType = {
  [key: string]: string;
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(3),
    minWidth: 320,
  },
}));

const SwitchPrefecture: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const prefecturesObject = prefecturesObjectJSON as prefecturesObjectType;
  return (
    <FormControl className={classes.formControl}>
      <NativeSelect
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          dispatch(fetchAsyncCurrentPrefecture(e.target.value))
        }
        defaultValue="東京都"
      >
        {Object.keys(prefecturesObject).map((key, i) => (
          <option key={i} value={key}>
            {prefecturesObject[key]}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default SwitchPrefecture;
