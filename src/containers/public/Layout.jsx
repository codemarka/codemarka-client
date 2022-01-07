import React, { useState, useEffect, Suspense } from 'react';
import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

import Preloader from '../../components/Partials/Preloader';
import NavigationBar from '../../components/UI/Navigation/NavigationBar';
import FooterBar from '../../components/UI/Footer/FooterBar';

// import Button from '../../components/Partials/Button';
import ErrorBoundary from '../../HOC/Error/ErrorBoundary';

// import * as actions from '../../store/actions/Types';

export default function Layout(props) {

  const [ appLoaded, setappLoaded ] = useState(false);
  const [ content, setContent ] = useState(<Preloader />);
  const state = useSelector(state => state);
  const { cookie_token } = state.app;
  // const dispatch = useDispatch();

  // const acceptCookieForUser = () => {
  //   dispatch({ type:actions.ACCEPT_COOKIE });
  // };

  const body = (
      <div>
          {!cookie_token ? ( ''
        //       <div
        //   className="modal fade show d-inline-block"
        //   tabIndex="-1"
        //   role="dialog"
        //   id="modal-cookies"
        //   data-backdrop="false"
        //   aria-labelledby="modal-cookies"
        //   aria-hidden="false"
        // >
        //           <div className="modal-dialog modal-dialog-float top-5">
        //               <div className="modal-content bg-dark">
        //                   <div className="modal-body">
        //                       <p className="text-sm text-white mb-3">
        //           We use cookies so that our services works just fine for you. By using our
        //           website, you agree to our use of cookies.
        //                       </p>
        //                       <Link
        //           to="pages/utility/terms"
        //           className="btn btn-sm btn-neutral"
        //           target="_blank"
        //         >
        //           Learn more
        //                       </Link>
        //                       <Button
        //           color="primary"
        //           size="sm"
        //           textColor="#fff"
        //           clicked={ acceptCookieForUser }
        //         >
        //           OK
        //                       </Button>
        //                   </div>
        //               </div>
        //           </div>
        //       </div>
      ) : (
        ''
      )}
          <NavigationBar />
          {props.children}
          <FooterBar/>
      </div>
  );
  useEffect(() => {
    setTimeout(() => {
      setappLoaded(true);
      setContent(body);
    }, 500);
    return () => {
      if (!appLoaded) {
        setContent(body);
      }
    };
  }, [ appLoaded, setContent, setappLoaded, props.children, body ]);

  const preloaderjsx = (
      <div style={ { position:'absolute',top:'50%',textAlign:'center',left:'50%' } }>
          <Preloader />
      </div>
  )
  return (
      <ErrorBoundary>
          <Suspense fallback={ preloaderjsx }>
              {content}
          </Suspense>
      </ErrorBoundary>
  );
}
