import React from 'react';
import { withRouter } from 'react-router';
import './Header.css';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clicked: false,
		};
	}

	handleClick = () => {
		let check = this.state.clicked;
		this.setState({
			clicked: !check,
		});
	};

	root = () => {
		this.props.history.push('/');
	};

	handleReset = () => {
		this.props.history.push('/');
	};

	render() {
		return (
			<div className="header">
				<h1>Finding Falcone!</h1>
				<div className="header-btn">
					<div className="menu-icon" onClick={this.handleClick}>
						<i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
					</div>
					<ul className={this.state.clicked ? 'nav-menu-active' : 'nav-menu'}>
						<li>
							<a className="nav-links" onClick={this.handleReset} href="/">
								Reset
							</a>
						</li>
						<hr className="hr"></hr>
						<li>
							<a className="nav-links" href={'https://www.geektrust.in/'}>
								GeekTrust Home
							</a>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default withRouter(Header);
