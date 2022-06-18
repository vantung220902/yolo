import { useField } from 'formik';
interface IInputFieldProps {
    name: string;
    label: string;
    placeholder: string;
    type: string;
    textarea?: boolean;

}

const InputField = ({ textarea, ...props }: IInputFieldProps) => {
    const [field, { error }] = useField(props)
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field.name}>
                {props.label}
            </label>
            {textarea ? <textarea id={field.name} value={field.value} onChange={field.onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
            leading-tight focus:outline-none focus:shadow-outline"
                {...props} /> : <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
            leading-tight focus:outline-none focus:shadow-outline"
                    id={field.name}  {...props} value={field.value} onChange={field.onChange} />}
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
    )
}

export default InputField