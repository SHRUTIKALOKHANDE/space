import React from 'react';
import { withRouter } from 'react-router';
import { Button } from 'antd';
import './FindPage.css';
import Header from './Header';
import Footer from './Footer';

class FindPage extends React.Component {
	constructor(props) {
		super(props);
		this.planet_name = this.props.location.state.details.planet_name;
		this.timeTaken = this.props.location.state.timeTaken;
	}

	handlebtnStartAgain = () => {
		this.props.history.push('/');
	};

	render() {
		return (
			<>
				<Header history={this.props.history} />
				<div className="find-container">
					<h3>Success! Congratulations on Finding Falcone. King Shan is mighty pleased.</h3>

					<div className="findcontent">
						<h3>Time taken: {this.timeTaken}</h3>
						<h3>Planet found: {this.planet_name}</h3>
					</div>

					<div>
						<Button className="ant-btn-primary" onClick={this.handlebtnStartAgain}>
							Start Again
						</Button>
					</div>
				</div>

				<Footer />
			</>
		);
	}
}
export default withRouter(FindPage);
