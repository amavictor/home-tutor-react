import { memo } from "react"
import { PropTypes } from 'prop-types';

const Input = ({
    type = 'text',
    placeholder,
    value,
    onChange,
    icon,
    ...props
}) => {
    return (
        <div className="flex items-center gap-4 bg-white rounded-custom-sm-12 w-full py-3 pl-6 pr-3">
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full border-none outline-none bg-transparent"
                {...props}
            />
            {icon && <span>{icon}</span>}
        </div>
    )
}

export const InputField = memo(Input)

Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    id: PropTypes.string,
    icon: PropTypes.element
}