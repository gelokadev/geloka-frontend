import React from 'react';
import { Input, InputNumber, Form, DatePicker } from 'antd';


const DynamicInput = (props) => {

    const handleInputChange = (value) => {
        props.onChange(props.name, value.target.value);
    }

    const handleDateChange = (_, dateString) => {
        props.onChange(props.name, dateString);
    }

    const displayInput = (type) => {
        switch (type) {
            case 'TEXT':
                return (
                    <Form.Item name={props.name} label={props.label} onChange={handleInputChange} rules={[{ required: true }]}>
                        <Input placeholder={props.placeholder} />
                    </Form.Item>
                );
            case 'TEXTAREA':
                return (
                    <Form.Item name={props.name} label={props.label} onChange={handleInputChange} rules={[{ required: true }]}>
                        <Input.TextArea rows={4} placeholder={props.placeholder} />
                    </Form.Item>
                );
            case 'DATE':
                return (
                    <Form.Item name={props.name} label={props.label} rules={[{ required: true }]}>
                        <DatePicker style={{ width: '100%' }} onChange={handleDateChange}/>
                    </Form.Item>
                );
            case 'NUMBER':
                return (
                    <Form.Item name={props.name} label={props.label} onChange={handleInputChange} rules={[{ required: true }]}>
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                );
            case 'EMAIL':
                return (
                    <Form.Item name={props.name} label={props.label} rules={[{ type: 'email' }, {required: true}]} onChange={handleInputChange}>
                        <Input placeholder={props.placeholder} />
                    </Form.Item>
                );
            case 'URL':
                return (
                    <Form.Item name={props.name} label={props.label} rules={[{ type: 'url' }, {required: true}]} onChange={handleInputChange}>
                        <Input placeholder={props.placeholder} />
                    </Form.Item>
                );
            case 'TELEPHONE':
                return (
                    <Form.Item name={props.name} label={props.label} onChange={handleInputChange} rules={[{ required: true }]}>
                        <Input placeholder={props.placeholder} />
                    </Form.Item>
                );
            default:
                break;
        }
    }

	return (
        displayInput(props.type)
    )
}

export default DynamicInput;