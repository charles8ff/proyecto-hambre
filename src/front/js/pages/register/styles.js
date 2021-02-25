import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const mingColor = "#387780";
const dartmouthGreenColor = "#2D7638";
const emeraldGreenColor = "#62C370";

export const CssTextField = withStyles({
	root: {
		"& label.Mui-focused": {
			color: mingColor
		},
		"& .MuiInput-underline:after": {
			borderBottomColor: dartmouthGreenColor
		},
		"&$checked": {
			color: "#3D70B2"
		},
		"& .MuiOutlinedInput-root": {
			"& fieldset": {
				borderColor: dartmouthGreenColor
			},
			"&:hover fieldset": {
				borderColor: emeraldGreenColor
			},
			"&.Mui-focused fieldset": {
				borderColor: mingColor
			}
		}
	}
})(TextField);

export const useStyles = makeStyles(theme => {
	return {
		paper: {
			marginTop: theme.spacing(8),
			display: "flex",
			flexDirection: "column",
			alignItems: "center"
		},
		avatar: {
			margin: theme.spacing(1),
			backgroundColor: theme.palette.secondary.main
		},
		form: {
			width: "100%", // Fix IE 11 issue.
			marginTop: theme.spacing(3)
		},
		submit: {
			margin: theme.spacing(3, 0, 2)
		}
	};
});
