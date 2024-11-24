import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import './App.css';
import { useState } from 'react';

function App() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [isHeightValid, setIsHeightValid] = useState(true);
  const [isWeightValid, setIsWeightValid] = useState(true);
  const [bmi, setBmi] = useState(0);
  const [status, setStatus] = useState('');

  const validate = (e) => {
    const { name, value } = e.target;

    if (!!value.match('^[0-9]*$')) {
      if (name === 'height') {
        setHeight(value);
        setIsHeightValid(true);
      } else {
        setWeight(value);
        setIsWeightValid(true);
      }
    } else {
      if (name === 'height') {
        setHeight(value);
        setIsHeightValid(false);
      } else {
        setWeight(value);
        setIsWeightValid(false);
      }
    }
  };

  const calculate = () => {
    if (height && weight) {
      const bmiValue = (weight / (height / 100) ** 2).toFixed(2); 
      setBmi(bmiValue);

    
      if (bmiValue < 18.5) setStatus('Underweight');
      else if (bmiValue >= 18.5 && bmiValue <= 24.9) setStatus('Normal');
      else if (bmiValue >= 25 && bmiValue <= 29.9) setStatus('Overweight');
      else setStatus('Obese');
    }
  };

 
  const reset = () => {
    setHeight('');
    setWeight('');
    setBmi(0);
    setStatus('');
    setIsHeightValid(true);
    setIsWeightValid(true);
  };

  return (
    <>
      <div
        className="bg-dark d-flex justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <div
          className="bg-light p-4 rounded-3"
          style={{ width: '500px' }}
        >
          <h1 className="text-center">BMI CALCULATOR</h1>

          <div
            className="bg-primary p-3 d-flex justify-content-center align-items-center rounded-3 mt-4 flex-column"
            style={{ height: '130px' }}
          >
            <h1>{bmi || 'Enter values'}</h1>
            <h4>{status || 'Your status will appear here'}</h4>
          </div>

          <div>
            <div className="my-3">
              <TextField
                className="w-100 rounded"
                label="Height (cm)"
                id="outlined-basic"
                name="height"
                value={height}
                error={!isHeightValid}
                helperText={!isHeightValid && 'Enter a valid number'}
                onChange={validate}
              />
            </div>
            <div className="my-3">
              <TextField className="w-100 rounded" label="Weight (kg)"id="outlined-basic"
                name="weight"
                value={weight}
                error={!isWeightValid}
                helperText={!isWeightValid && 'Enter a valid number'}
                onChange={validate}
              />
            </div>
            <div className="my-3 d-flex justify-content-between">
              <Button
                variant="contained"
                style={{ width: '190px' }}
                className="p-3 me-1"
                onClick={calculate}
              >
                Calculate
              </Button>
              <Button
                variant="outlined"
                color="error"
                style={{ width: '190px' }}
                className="p-3"
                onClick={reset}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
