import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const NotFound = () => {
  return (
    <h1>No encontrado.<code><br/> Error 404.</code></h1>
  );
};

const Redirect= () => {
  var { id } = useParams();
  var api = `${id}`;

  const [state, setState] = useState({
    'found': true
  });

  const on = () => {
    axios.post(api)
    .then(res => {
      window.location = res.data.url;
    })
    .catch(e => {
      if (e.response.status === 404) {
        setState({ 
          found: false
        });
      }
    });
  };

  if (state.found === false) {
    return (
      <NotFound />
    );
  } else {
    return (
        window.onload = on()
    );
  }
};
export default Redirect
