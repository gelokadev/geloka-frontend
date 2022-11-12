import { Tooltip, message } from 'antd';
import 'react-json-pretty/themes/monikai.css';
import { CopyFilled } from '@ant-design/icons';
import { API_BASE_URL } from '../../configs/AppConfig';

export const UrlToCopy = (props) => {
    const separator = props.url ? props.url.includes('?') ? '&' : '?' : '?';
    const onCopy = () => {
        navigator.clipboard.writeText(`${API_BASE_URL+'/'+props.url}${ props?.token ? separator+'token='+props?.token : ''}`);
        message.success('Copied in your clipboard!');
    }
	return (
		<div 
            className='d-flex flex-row justify-content-between align-items-center' 
            style={{ backgroundColor: '#1b2531', padding: '1%', borderRadius: 10, fontSize: '1.15em' }}
        >
            { 
                props.url && (
                <p style={{ padding: 0, margin: 0 }}>
                    {`${API_BASE_URL+'/'+props.url}${ props?.token ? separator+'token='+props?.token : ''}`}
                </p>
            )}
            <Tooltip title='Copy data' style={{ backgroundColor: 'white' }}>
                <CopyFilled color='white' onClick={() => onCopy()}/>
            </Tooltip>
        </div>
	)
}

export default UrlToCopy;