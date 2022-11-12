import { Card, Row, Col } from "antd";
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';

const backgroundStyle = {
	backgroundImage: 'url(/dashboard/img/others/img-17.jpg)',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
	minHeight: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center'
}

const LoginOne = props => {
	const theme = useSelector(state => state.theme.currentTheme)
	return (
		<div style={backgroundStyle}>
			<div className="container d-flex flex-column justify-content-center">
				<Row justify="center">
					<Col xs={24} sm={24} md={24} lg={7}>
						<Card>
							<div className="my-4">
								<div className="text-center">
									<img onClick={() => window.location.href = '/' } className="img-fluid cursor-pointer" src={`/dashboard/img/${theme === 'light' ? 'logo.png': 'logo-white.png'}`} alt="" width={'70%'} />
								</div>
								<Row justify="center">
									<Col xs={24} sm={24} md={20} lg={20}>
										<LoginForm {...props} />
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

export default injectIntl(withRouter(LoginOne));
