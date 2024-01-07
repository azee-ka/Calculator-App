import axios from 'axios';

const sendLatex = (latex, handleApiResponse, mode, authState) => {
  // Prepare the data to be sent to the backend
  
  const config = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${authState.token}`,
    }
};

  let data;
    data = {
      expression: latex,
      oper: 'tex',
      mode: mode
    };
  
  // Make a POST request to the backend API
  axios.post(`http://127.0.0.1:8000/calculator/submit-expression/`, data)
    .then((response) => {
      // Handle the response from the backend if needed
      console.log(response.data)
      handleApiResponse(response.data);
    })
    .catch((error) => {
      // Handle any errors that occur during the request
      console.error(error);
      const err_data = {
        result: {
          'output': null,
          'userExpr': data.latex,
          'decimal': null,
          'isInteger': false,
          'isExact': false,
        }
      }
      handleApiResponse(err_data);
    });
};

export default sendLatex;
