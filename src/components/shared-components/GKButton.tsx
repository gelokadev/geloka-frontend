import { Button } from "antd";
import { CSSProperties } from 'react';

type Props = {
    label: string,
    loading?: boolean,
    onClick: () => void,
    style?: CSSProperties,
    type?: "link" | "text" | "ghost" | "default" | "primary" | "dashed" | undefined,
}

const GKButton = (props: Props) => {

	const {loading, label, style, onClick, type} = props;

    console.log("PROPS => ", props);

	return (
        <Button type={type} block loading={loading} style={style} onClick={onClick}  htmlType="submit">
            { label }
        </Button>
	)
};

export default GKButton;