import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { connect, useSelector } from "react-redux";
import UserService from '../../../../services/users';
import { HOME } from '../../../../constants/FrontendUrl';
import { Card, Row, Col, Form, Input, Alert } from "antd";
import { AUTH_TOKEN } from '../../../../redux/constants/Auth';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import GKButton from "../../../../components/shared-components/GKButton";

const backgroundStyle = {
	backgroundImage: 'url(/img/others/img-17.jpg)',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
	minHeight: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center'
}

const Login = (props) => {

	const { 
		extra,
		showMessage,
		message,
		token,
		user
	} = props

	let history = useHistory();
	const theme = useSelector(state => state.theme.currentTheme);
	
	const [loading, setLoading] = useState(false);

	const onLogin = values => {
		setLoading(true);
		UserService.loginUserAccount(values).then(response => {
			localStorage.setItem(AUTH_TOKEN, response.data.access_token);
			history.push(HOME);
		}).catch(err => {
			console.log(err);
		}).finally(() => {
			setLoading(false);
		});
	};

	useEffect(() => {
		if (token !== null && user != null) {
			history.push(HOME)
		}
	});

	return (
		<div style={backgroundStyle}>
			<div className="container d-flex flex-column justify-content-center">
				<Row justify="center">
					<Col xs={24} sm={24} md={24} lg={7}>
						<Card>
							<div className="my-4">
								<div className="text-center">
									<img onClick={() => window.location.href = '/' } className="img-fluid cursor-pointer" src={`/img/${theme === 'light' ? 'logo.png': 'logo-white.png'}`} alt="" width={'70%'} />
								</div>
								<Row justify="center">
									<Col xs={24} sm={24} md={20} lg={20}>
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
									</Col>
								</Row>
							</div>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	)
}

const mapStateToProps = ({auth}) => {
	const { message, showMessage, token, redirect, user} = auth;
  	return {message, showMessage, token, redirect, user}
}

export default connect(mapStateToProps, {})(Login);
