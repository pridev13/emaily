import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
	renderContent = () => {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
					<li>
						<a href="/auth/google">Login with Google</a>
					</li>
				);
			default:
				return [
					<li key="a">
						<Payments />
					</li>,
					<li key="c" style={{margin: '0px 10px'}}>
						Credits: {this.props.auth.credits}
					</li>,
					<li key="b">
						<a href="/api/logout">Logout</a>
					</li>
				];
		}
	};

	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<Link
						to={this.props.auth ? '/surveys' : '/'}
						className="brand-logo left"
					>
						Emaily
					</Link>

					<ul className="right">{this.renderContent()}</ul>
				</div>
			</nav>
		);
	}
}

function mapStateToProps({auth}) {
	return {auth};
}

export default connect(mapStateToProps)(Header);
