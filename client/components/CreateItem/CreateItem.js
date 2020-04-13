import React from "react";

import Input from '@material-ui/core/Input';
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import {styles} from "./styles";

const CreateItem = () => {
    const classes = styles();

    const [values, setValues] = React.useState({
        title: '',
    });

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value});
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={3}>
                <form noValidate autoComplete="off" className={classes.form}>
                    <Typography variant="h4" component="h2" align="center" className={classes.item}>
                        Create your Sale Product
                    </Typography>
                    <FormControl fullWidth className={classes.margin}>
                        <InputLabel htmlFor="name">Item of Sale</InputLabel>
                        <Input
                            id="name"
                            value={values.name}
                            onChange={handleChange('title')}
                        />
                    </FormControl>
                    <FormControl fullWidth className={classes.margin}>
                        <TextField
                            id="description"
                            label="Description"
                            multiline
                            rowsMax={4}
                            value={values.description}
                            onChange={handleChange('description')}
                        />
                    </FormControl>
                    <div className={classes.inputWrap}>
                        <TextField
                            type="number"
                            InputProps={{
                                inputProps: {
                                    max: 100, min: 1
                                }
                            }}
                            label="Choose your price"
                            style={{width: "45%"}}
                        />
                        <TextField
                            type="number"
                            InputProps={{
                                inputProps: {
                                    max: 100, min: 1
                                }
                            }}
                            label="Amount of products"
                            style={{width: "45%"}}
                        />
                    </div>
                    <div className={classes.margin}>
                        <Button
                            variant="contained"
                            component="label"
                            color="primary"
                        >
                            Upload File
                            <input
                                type="file"
                                style={{display: "none"}}
                            />
                        </Button>
                    </div>
                </form>
            </Paper>
        </div>
    )
};

export default CreateItem;