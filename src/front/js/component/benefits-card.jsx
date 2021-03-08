import React, { useContext, Fragment, useEffect } from "react";
import { Row, Container, Col } from "react-bootstrap";
import "../../styles/home.scss";

export const Benefits = () => {
	return (
		<div className="col-4">
			<div className="card user-card">
				<div className="card-block">
					<div className="user-image">
						<img
							src="https://bootdey.com/img/Content/avatar/avatar7.png"
							className="img-radius"
							alt="User-Profile-Image"
						/>
					</div>
					<hr />
					<p className="m-t-15 text-muted">
						Lorem Ipsum is simply dummy text of the printing and typesetting industry.
					</p>
				</div>
			</div>
		</div>
	);
};
