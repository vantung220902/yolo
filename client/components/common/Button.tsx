import React, { ReactNode } from 'react';
const Button: React.FC<ButtonProps> = ({
  loading,
  disabled = false,
  children,
  onClick = (_event: any) => {},
  ...props
}) => {
  return (
    <button type="button" disabled={disabled} {...props}>
      {loading && (
        <div className="w-6 h-6 border-t-4 border-b-4 border-primary rounded-full animate-spin mx-auto"></div>
      )}
      {!loading && children}
    </button>
  );
};

export type ButtonProps = ReturnType<
  // @ts-ignore
  () => typeof DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {
    loading?: boolean;
    disabled?: boolean;
    children?: ReactNode;
  }
>;

export default Button;
