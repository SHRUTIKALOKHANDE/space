import React from 'react';
import { withRouter } from 'react-router';
import { Menu, Dropdown, Button, Radio } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './Destination.css';

class Destination extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			planetSelected: false,
			value: 0,
			planet: null,
		};
	}

	handleMenuClick = (event, planet) => {
		this.props.handleOnSelect(event.key, this.props.id);
		this.setState({
			planetSelected: true,
			planet: planet,
		});
	};

	onChange = (e) => {
		let d = this.state.planet.distance;
		let s = this.props.vehicles[e.target.value].speed;
		let t = d / s;
		this.setState({
			value: e.target.value,
		});
		this.props.handleOnChange(e.target.value,this.props.id, t);
	};

	render() {
		const menu = (
			<Menu>
				{this.props.planets.map((planet, idx) => (
					<Menu.Item key={idx} onClick={(event) => this.handleMenuClick(event, planet)}>
						{planet.name}
					</Menu.Item>
				))}
			</Menu>
		);
       const title= this.state.planetSelected ? this.state.planet.name : 'Select';
		return (
			<div className="destination_container">
				<h3>Destination {this.props.id + 1}</h3>
				<Dropdown classname="dropdown" overlay={menu} key={this.props.idx}>
					<Button>
						{title} <DownOutlined />
					</Button>
				</Dropdown>
				<div className="content">
					{this.state.planetSelected ? (
						<Radio.Group onChange={this.onChange} >
							{this.props.vehicles.map((vehicle, idx) => (
								<Radio value={idx} 
                                key={idx} 
                                disabled={vehicle.max_distance < this.state.planet.distance}>
									{vehicle.name}({vehicle.total_no})
								</Radio>
							))}
						</Radio.Group>
					) : (
						''
					)}
				</div>
			</div>
		);
	}
}

export default withRouter(Destination);
