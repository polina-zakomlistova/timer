import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { ChangeEvent, InputHTMLAttributes, memo } from 'react';
import cls from './Input.module.scss';

export enum InputTheme {
    COLOR = 'color',
    ERROR = 'error',
}

export enum InputSize {
    S = 'size-s',
    M = 'size-m',
    L = 'size-l',
    Width100 = 'width100'
}

export enum LabelPosition {
    left = 'left-label',
    right = 'right-label',
}

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value'|'onChange'|'id'|'size'>

export interface InputProps extends HTMLInputProps {
    id:string;
    className?: string;
    label?: string;
    value?: string;
    name?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    theme?: InputTheme;
    size?:InputSize,
    labelPosition?:LabelPosition,
}

export const Input = memo((props: InputProps) => {
    const {
        className = '',
        label,
        name,
        onChange,
        type = 'text',
        id,
        size = InputSize.M,
        theme = InputTheme.COLOR,
        labelPosition = LabelPosition.left,
        ...otherProps
    } = props;

    const classes: string[] = [cls[size], cls[theme], className];

    const mods: Mods = { };

    return (
        <div
            className={classNames(
                cls.wrapperInputLabel,
                {},
                [cls[labelPosition]],
            )}
        >
            {label && (
                <label htmlFor={id} className={cls.label}>
                    {label}
                </label>
            )}

            <input
                className={classNames(
                    cls.input,
                    mods,
                    classes,
                )}
                id={id}
                type={type}
                name={name}
                onChange={onChange}
                {...otherProps}
            />
        </div>
    );
});
