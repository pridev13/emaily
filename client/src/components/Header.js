import React, {Component} from 'react';

class Header extends Component {
	render() {
		return (
			<nav>
				<div class="nav-wrapper">

					<a href="#" className="brand-logo left">
						Emaily
					</a>

					<ul className="right">
						<li>
							<a>Login with Google</a>
						</li>
					</ul>

				</div>
			</nav>
		);
	}
}

export default Header;
