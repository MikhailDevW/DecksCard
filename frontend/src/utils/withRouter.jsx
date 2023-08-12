<<<<<<< HEAD
import React, { useLocation, useMatch, useHistory } from "react";
//import { useLocation, useMatch, useHistory } from 'react-router-dom';

export const withRouter = Component => props => {
  const match = useMatch();
  const location = useLocation();
  const history = useHistory();

  return (
    <Component
      {...props}
      match={match}
      location={location}
      history={history}
    />
  );
};

export default withRouter;
=======
import React, { useLocation, useMatch, useHistory } from "react";
//import { useLocation, useMatch, useHistory } from 'react-router-dom';

export const withRouter = Component => props => {
  const match = useMatch();
  const location = useLocation();
  const history = useHistory();

  return (
    <Component
      {...props}
      match={match}
      location={location}
      history={history}
    />
  );
};

export default withRouter;
>>>>>>> 6e74c0a3aec6ba4adcc65121d292aafa40b04daf
