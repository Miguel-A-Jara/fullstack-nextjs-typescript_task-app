import { StylesConfig } from 'react-select';

const DropDownStyles: StylesConfig = {
  control: (provided) => ({
    ...provided,
    border: 'none',
    outline: 'none',
    color: '#00C895',
    overflow: 'hidden',
    alignItems: 'stretch',
    backgroundColor: '#191933',
    transition: 'all ease-in-out 300ms',
    ":focus-within": { backgroundColor: '#11111a', color: '#00C895', outline: '1px solid #00C895' },
    ":hover": { backgroundColor: '#11111a', color: '#00C895', outline: '1px solid #00C895' },
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    minWidth: '150px',
  }),
  input: (provided, state) => ({
    ...provided,
    color: 'white'
  }),
  option: (provided, state) => ({
    ...provided,
    fontWeight: '600',
    color: state.isSelected ? 'white' : '#00C895',
    backgroundColor: state.isSelected ? '#545cff' : '#11111a',
    transition: 'all 150ms ease-out',
    "&:hover": { backgroundColor: '#00C895', color: 'white' }
  }),
  menu: (provided, state) => ({
    ...provided,
    overflow: 'hidden',
    border: 'none',
    borderRadius: '0 0 10px 10px',
  }),
  menuList: (provided, state) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (provided, state) => ({
    ...provided,
    fontWeight: 'bold',
    color: 'inherti',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: 'inherit',
    ":hover": { color: 'inherit' },
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: 'inherit',
    fontWeight: 'bold',
  }),
}

export default DropDownStyles;