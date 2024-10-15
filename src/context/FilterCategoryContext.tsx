import React, {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
} from 'react';

interface FilterCategoryContextType {
  byGenres: boolean;
  byArtists: boolean;
  byAdvance: boolean;
  searchArtists: string;
  checkBoxSelected: string;
  handleSelectedCheckBox: (item: string) => void;
  handleSelection: (type: string) => void;
  handleSearchArtists: (search: string) => void;
}
const initialCategoryContext: FilterCategoryContextType = {
  byGenres: false,
  byArtists: false,
  byAdvance: false,
  searchArtists: '',
  checkBoxSelected: '',
  handleSelectedCheckBox: () => {},
  handleSelection: () => {},
  handleSearchArtists: () => {},
};

const FilterCategoryContext = createContext<FilterCategoryContextType>(
  initialCategoryContext,
);

export const FilterCategoryProvider = ({children}: PropsWithChildren) => {
  const [byGenres, setByGenres] = useState(true);
  const [byArtists, setByArtists] = useState(false);
  const [byAdvance, setByAdvance] = useState(false);
  const [searchArtists, setSearchArtists] = useState('');
  const [checkBoxSelected, setCheckBoxSelected] = useState('');

  const handleSelection = (type: string) => {
    if (type === 'modal') {
      setByAdvance(true);
    } else {
      setSearchArtists('');
      setCheckBoxSelected('');
      if (type === 'genres') {
        setByGenres(true);
        setByArtists(false);
      } else if (type === 'artists') {
        setByArtists(true);
        setByGenres(false);
      }
    }
  };

  const handleSearchArtists = (search: string) => {
    setSearchArtists(search);
  };

  const handleSelectedCheckBox = (item: string) => {
    setCheckBoxSelected(item);
  };

  return (
    <FilterCategoryContext.Provider
      value={{
        byGenres,
        byArtists,
        byAdvance,
        searchArtists,
        checkBoxSelected,
        handleSelectedCheckBox,
        handleSelection,
        handleSearchArtists,
      }}>
      {children}
    </FilterCategoryContext.Provider>
  );
};

export const useFilter = () => useContext(FilterCategoryContext);
