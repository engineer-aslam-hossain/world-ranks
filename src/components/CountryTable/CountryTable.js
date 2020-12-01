import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from '@material-ui/icons';
import { useState } from 'react';
import styles from './CountryTable.module.css';
import Link from 'next/Link';
const orderBy = (countries, value, direction) => {
  if (direction === 'asc') {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }
  if (direction === 'desc') {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }

  return countries;
};

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }
  if (direction === 'asc') {
    return <KeyboardArrowDownRounded className={styles.arrow} />;
  } else {
    return <KeyboardArrowUpRounded className={styles.arrow} />;
  }
};

const CountryTable = ({ countries }) => {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();
  const orderedCountry = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (!direction) {
      setDirection('desc');
    } else if (direction === 'desc') {
      setDirection('asc');
    } else {
      setDirection(null);
    }
  };

  const setValueAndDirection = value => {
    switchDirection();
    setValue(value);
  };

  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.heading_flag}></div>
        <button
          className={styles.heading_name}
          onClick={() => setValueAndDirection('name')}>
          <div>Name</div>
          {value === 'name' && <SortArrow direction={direction} />}
        </button>
        <button
          className={styles.heading_population}
          onClick={() => setValueAndDirection('population')}>
          <div>population</div>
          {value === 'population' && <SortArrow direction={direction} />}
        </button>
        <button
          className={styles.heading_area}
          onClick={() => setValueAndDirection('area')}>
          <div>
            Area (km<sup style={{ fontSize: '.5rem' }}>2</sup>)
          </div>
          {value === 'area' && <SortArrow direction={direction} />}
        </button>
        <button
          className={styles.heading_gini}
          onClick={() => setValueAndDirection('gini')}>
          <div>Gini</div>
          {value === 'gini' && <SortArrow direction={direction} />}
        </button>
      </div>
      {orderedCountry.map(country => (
        <Link href={`/country/${country.alpha3Code}`} key={country.name}>
          <div className={styles.row}>
            {/* {console.log(country)} */}
            <div className={styles.flag}>
              <img src={country.flag} alt='' />
            </div>
            <div className={styles.name}> {country.name} </div>
            <div className={styles.population}> {country.population} </div>
            <div className={styles.area}> {country.area || 0} </div>
            <div className={styles.gini}> {country.gini || 0}% </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CountryTable;
