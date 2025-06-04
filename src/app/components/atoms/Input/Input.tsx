export type InputProps = {
  label?: string;
  isValid?: string;
  setValidation?: (value: string) => void;
  validationText?: string;
  tooltip?: string;
  testId?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = (props: InputProps) => {
  const { id, label, value, onChange, ...inputProps } = props;
  return (
    <label htmlFor={id} className="">
      <label htmlFor={id} className="">
        {label}
      </label>
      <input
        className=""
        onChange={onChange}
        value={value}
        id={id}
        {...inputProps}
      />
    </label>
  );
};

export default Input;
