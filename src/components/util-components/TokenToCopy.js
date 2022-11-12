import { connect } from 'react-redux';
import { Tooltip, message } from 'antd';
import 'react-json-pretty/themes/monikai.css';
import { CopyFilled } from '@ant-design/icons';

export const TokenToCopy = (props) => {
    const onCopy = () => {
        navigator.clipboard.writeText(props?.user?.token);
        message.success('Copied in your clipboard!');
    }
	return (
		<div 
            className='d-flex flex-row justify-content-between align-items-center' 
            style={{ backgroundColor: '#1b2531', padding: '1%', borderRadius: 10, fontSize: '1.15em' }}
        >
            <p style={{ padding: 0, margin: 0 }}>
                {props?.user?.token}
            </p>
            <Tooltip title='Copy data' style={{ backgroundColor: 'white' }}>
                <CopyFilled color='white' onClick={() => onCopy()}/>
            </Tooltip>
        </div>
	)
}

const mapStateToProps = ({ auth }) => {
	const { user } = auth;
	return { user }
}

export default connect(mapStateToProps, {})(TokenToCopy);