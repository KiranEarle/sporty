export type SelectProps = {
  options: string[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = ({ options, onChange }: SelectProps) => {
  return (
    <select onChange={onChange}>
      {options.map((type: string) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
};

export default Select;
