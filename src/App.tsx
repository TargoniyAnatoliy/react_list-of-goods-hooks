import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

const SORT_BY_NAME: string = 'name';
const SORT_BY_LENGTH: string = 'length';

const sortGoods = (
  goods: string[],
  sortParam: string,
  reverseQuery: boolean,
): string[] => {
  const goodsToSort = [...goods];

  if (sortParam) {
    goodsToSort.sort((item1, item2) => {
      switch (sortParam) {
        case SORT_BY_NAME:
          return item1.localeCompare(item2);
        case SORT_BY_LENGTH:
          return item1.length - item2.length;
        default:
          return 0;
      }
    });
  }

  if (reverseQuery) {
    goodsToSort.reverse();
  }

  return goodsToSort;
};

export const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<string>('');
  const [reverse, setReverse] = useState<boolean>(false);

  const goodsToShow = sortGoods(goodsFromServer, sortField, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_BY_NAME)}
          className={`button is-info ${sortField === SORT_BY_NAME ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_BY_LENGTH)}
          className={`button is-success ${sortField === SORT_BY_LENGTH ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReverse(!reverse)}
          className={`button is-warning ${reverse ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {sortField || reverse ? (
          <button
            type="button"
            onClick={() => {
              setReverse(false);
              setSortField('');
            }}
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {goodsToShow.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
