import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { motion } from "framer-motion";
import { injectIntl } from 'react-intl';
import { Form, Input, Alert } from "antd";
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import UserService from '../../../services/users';
import { HOME } from '../../../constants/FrontendUrl';
import { AUTH_TOKEN } from '../../../redux/constants/Auth';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import GKButton from '../../../components/shared-components/GKButton';

export const LoginForm = (props) => {

	let history = useHistory();
	const [loading, setLoading] = useState(false);

	const { 
		extra,
		showMessage,
		message,
		token,
		user,
		allowRedirect
	} = props

	const onLogin = values => {
		setLoading(true);
		UserService.loginUserAccount(values).then(response => {
			localStorage.setItem(AUTH_TOKEN, response.access_token);
			history.push(HOME);
		}).catch(err => {
			console.log(err);
		}).finally(() => {
			setLoading(false);
		});
	};

	useEffect(() => {
		if (token !== null && user != null && allowRedirect) {
			history.push(HOME)
		}
	});

	return (
		<>
			<motion.div 
				initial={{ opacity: 0, marginBottom: 0 }} 
				animate={{ 
					opacity: showMessage ? 1 : 0,
					marginBottom: showMessage ? 20 : 0 
				}}> 
				<Alert type="error" showIcon message={message}></Alert>
			</motion.div>
			<Form 
				layout="vertical" 
				name="login-form"
				onFinish={onLogin}
			>
				<Form.Item 
					name="username"  
					rules={[
						{ 
							required: true,
							message: "Votre login est obligatoire",
						}
					]}>
					<Input placeholder={"Login"} label={"Login"} prefix={<UserOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item 
					name="password" 
					rules={[
						{ 
							required: true,
							message: "Votre mot de passe est obligatoire",
						}
					]}
				>
					<Input.Password placeholder={"Mot de passe"} label={"Mot de passe"} prefix={<LockOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item>
					<GKButton label='Me connecter' type="primary" loading={loading} />
				</Form.Item>
				{ extra }
			</Form>
		</>
	)
}

LoginForm.propTypes = {
	extra: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
};

const mapStateToProps = ({auth}) => {
	const { message, showMessage, token, redirect, user} = auth;
  	return {message, showMessage, token, redirect, user}
}

export default connect(mapStateToProps, {})(injectIntl(LoginForm));
