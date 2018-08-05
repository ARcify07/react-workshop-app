import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './Steps.css';

class Steps extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cur_step_position: 0
    };
  }

  goPrev = () => {
    const {cur_step_position} = this.state;
    if (cur_step_position === 0) {
      return;
    }
    this.setState({
      cur_step_position: cur_step_position - 1
    });
  }

  goNext = () => {
    const {cur_step_position} = this.state;
    const {data} = this.props;
    if (cur_step_position === data.length - 1) {
      return;
    }
    this.setState({
      cur_step_position: cur_step_position + 1
    });
  }

  generateTextArea = (key, textarea) => {
    return (
      <TextField key={key} label={textarea.label} multiline={true} name={textarea.name}/>
    );
  }

  generateRadioButtons = (key, radiobuttons) => {
    let result = [];
    for (let i = 0; i < radiobuttons.values.length; ++i) {
      result.push((
        <div>
          <input
            type="radio"
            name={radiobuttons.name}
            value={radiobuttons.values[i].value}
          />{radiobuttons.values[i].label}
        </div>
      ));
    }
    return result;
  }

  generateInput = (key, input) => {
    console.log(input);
    return (
      <TextField
        label={input.label}
        type={input.characterstics.type}
        required={input.characterstics.required ? true : false}
        min={input.characterstics.min}
        max = {input.characterstics.max}
      />
    );
  }

  generateCheckBox = (key, checkboxes) => {
    let result = [];
    for (let i = 0; i < checkboxes.values.length; ++i) {
      result.push((
        <div>
          <input
            type="checkbox"
            name={checkboxes.name}
            value={checkboxes.values[i].value}
          />{checkboxes.values[i].label}
        </div>
      ));
    }
    return result;
  }

  generateInputs = () => {
    const {data = []} = this.props;
    const {cur_step_position} = this.state;
    const step = data.length > cur_step_position ? data[cur_step_position] : {};
    const {inputs = []} = step;

    const result = [];
    for (let i = 0; i < inputs.length; ++i) {
      switch(inputs[i].type) {
        case "textarea":
          result.push(this.generateTextArea(i, inputs[i]));
          break;
        case "radio":
          result.push(this.generateRadioButtons(i, inputs[i]));
          break;
        case "checkbox":
          result.push(this.generateCheckBox(i, inputs[i]));
          break;
        case "input":
          result.push(this.generateInput(i, inputs[i]));
          break;
        default:
          break;
      }
    }
    return result;
  }

  render() {

    const {data = []} = this.props;
    const {cur_step_position} = this.state;
    const step = data.length > cur_step_position ? data[cur_step_position] : {};

    const {title = ""} = step;

    return (
      <div>
        <Card style={{margin: "20px"}} className="step_card">
          <CardContent>
            <Typography color="textSecondary">
              {title}
            </Typography>
            {this.generateInputs()}
          </CardContent>
          <CardActions>
            <Button disabled={cur_step_position === 0} onClick={this.goPrev} size="small" color="primary">
              Prev
            </Button>
            <Button onClick={this.goNext} variant="contained" size="small" color="primary">
              {cur_step_position === data.length - 1 ? "Submit" : "Next"}
            </Button>
          </CardActions>
        </Card>
      </div>
      );
}

}

export default Steps;
