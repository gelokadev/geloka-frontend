import React from 'react';
import { Row, Col } from 'antd';
import { Component } from 'react';

export class Home extends Component {
	render() {
		return (
			<>
				<div className="container my-4">
					<Row gutter="16">
						<Col xs={24} sm={24} md={24}>
							<p>Bonjour le monde</p>
						</Col>
					</Row>
				</div>
			</>
		)
	}
}

export default Home;