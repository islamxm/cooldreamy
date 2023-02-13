import { JsxElement } from "typescript";

export interface InputPropsTypes extends React.HTMLProps<HTMLInputElement> {
    error?: boolean,
    valid?: boolean,
    beforeIcon?: React.ReactNode;
}