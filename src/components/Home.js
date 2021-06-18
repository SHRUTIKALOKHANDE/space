import React from 'react';
import { withRouter } from 'react-router';
import { Button } from 'antd';
import './Home.css';
import Header from './Header';
import Destination from './Destination';
import Footer from './Footer';
import {getPlanetsData, getVehicleData, getToken, findFalcone} from '../utils/apiCallHandler';
class Home extends React.Component {
	constructor(props) {
		super(props);
		this.noOfPlanets = 4;
		this.planet = [0, 1, 2, 3];
		this.planets = [];
		this.vehicles = [];
		this.planet_names = [];
		this.vehicle_names = [];
		this.token = '';
		this.timeTaken = 0;
		this.state = {
			filteredPlanets: [],
			filteredVehicles: [],
			planets: [
				{ dest: 0, planet: 0 },
				{ dest: 1, planet: 0 },
				{ dest: 2, planet: 0 },
				{ dest: 3, planet: 0 },
			],
			vehicles: [
				{ dest: 0, vehicle: 0 },
				{ dest: 1, vehicle: 0 },
				{ dest: 2, vehicle: 0 },
				{ dest: 3, vehicle: 0 },
			],
			time: [
				{ dest: 0, tm: 0 },
				{ dest: 1, tm: 0 },
				{ dest: 2, tm: 0 },
				{ dest: 3, tm: 0 },
			],
		};
	};

	async componentDidMount() {
		this.planets = await getPlanetsData();
		this.vehicles = await getVehicleData();
		this.setState({
			filteredPlanets: this.planets,
			filteredVehicles: this.vehicles,
		});
		this.token = await getToken();
	};

	handleOnSelect = (e, planetId) => {
		this.setState({
			distance: this.planets[e].distance,
		});
		this.setState(
			(prevState) => ({
				planets: prevState.planets.map((ele) =>
					ele.dest === planetId
						? {
								...ele,
								planet: this.planets[e],
						  }
						: ele
				),
			}),
		);
	};

	handleOnChange = (key, id, t) => {
		this.setState((prevState) => ({
			filteredVehicles: prevState.filteredVehicles.map((e) =>
				e.key === key
					? {
							...e,
							total_no: e.total_no - 1,
					  }
					: e
			),
			time: prevState.time.map((ele) =>
				ele.dest === id
					? {
							...ele,
							tm: t,
					  }
					: ele
			),
			vehicles: prevState.vehicles.map((ele) =>
				ele.dest === id
					? {
							...ele,
							vehicle: this.vehicles[id],
					  }
					: ele
			),
		}));

		this.updateTime();
	};

	updateTime = () => {
		let t = this.state.time;
		let total_t = 0;
		for (let i = 0; i < t.length; i++) {
			total_t += t[i].tm;
		}
		this.timeTaken = total_t;
	};

	handleFindFalcone = async () => {
		let planet_names = [];
		let vehicle_names = [];
		for (let i = 0; i < this.noOfPlanets; i++) {
			let planet_name = this.state.planets[i].planet.name;
			let vehicle_name = this.state.vehicles[i].vehicle.name;
			planet_names.push(planet_name);
			vehicle_names.push(vehicle_name);
		}
		this.planet_names = planet_names;
		this.vehicle_names = vehicle_names;

		let find = await findFalcone(this.token.token, this.planet_names,this.vehicle_names);
		if (find.status === 'success') {
			this.props.history.push({
				pathname: '/find',
				state: {
					details: find,
					timeTaken: this.timeTaken,
				},
			});
		}else if(find.staus === 'false'){
			message.info('Sorry! Failed on Finding Falcone. Try again.');
		}else{
			message.error('Oops! please check backend.');
		}
	};

	render() {
		return (
			<>
				<Header history={this.props.history} />
				<div className="mainView">
					<h2>Select planets you want to search in:</h2>
					<div className="destination dest-mob">
						{this.planet.map((e, idx) => (
							<Destination
								key={idx}
								id={e}
								planets={this.state.filteredPlanets}
								vehicles={this.state.filteredVehicles}
								handleOnSelect={this.handleOnSelect}
								handleOnChange={this.handleOnChange}
							/>
						))}
						<h3 className="time">Time Taken:{this.timeTaken}</h3>
					</div>
					<Button className="ant-btn-primary" onClick={this.handleFindFalcone}>
						Find Falcone!
					</Button>
					<h4 className="footer-content">Coding problem - www.geektrust.in/finding-falcone</h4>
				</div>

				<Footer />
			</>
		);
	}
}

export default withRouter(Home);
