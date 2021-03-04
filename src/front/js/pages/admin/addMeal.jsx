import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";

export const AddMeal = props => {
	const { store, actions } = useContext(Context);

	return (
		<div className="App">
			{props.ListMeal.map((x, i) => {
				return (
					<div key={i}>
						<input
							name="name"
							placeholder="Nombre del plato"
							value={x.name}
							onChange={e => props.HandleOnChange(e, i)}
						/>
						<input
							className="ml10"
							name="description"
							placeholder="Descripción del plato"
							value={x.description}
							onChange={e => props.HandleOnChange(e, i)}
						/>
						<input
							className="ml10"
							name="price"
							placeholder="Precio del plato"
							value={x.price}
							onChange={e => props.HandleOnChange(e, i)}
						/>
						<div className="btn-secondary">
							{props.ListMeal.length !== 1 && (
								<button className="mr10" onClick={() => props.remove(i)}>
									Remove
								</button>
							)}
							{props.ListMeal.length - 1 === i && <button onClick={props.add}>Add</button>}
						</div>
					</div>
				);
			})}
			<div style={{ marginTop: 20 }}>{JSON.stringify(props.ListMeal)}</div>
		</div>
	);
};

AddMeal.propTypes = {
	ListMeal: PropTypes.any,
	HandleOnChange: PropTypes.func,
	remove: PropTypes.func,
	add: PropTypes.func,
	mapIndex: PropTypes.any
};
