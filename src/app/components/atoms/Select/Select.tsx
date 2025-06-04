import styles from "./select.module.css";

export type SelectProps = {
  options: string[];
  label: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = ({ options, onChange, label, id, ...props }: SelectProps) => {
  return (
    <label className={styles.selectLabel}>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        {...props}
        onChange={onChange}
        className={styles.selectField}
      >
        <option value="">All</option>
        {options.map((type: string) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
