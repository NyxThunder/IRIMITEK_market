import { Suspense, forwardRef } from 'react';

// project imports
import Loader from './Loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component) => {
  const WrappedComponent = forwardRef(function WrappedComponent(props, ref) {
    return (
      <Suspense fallback={<Loader />}>
        <Component ref={ref} {...props} />
      </Suspense>
    );
  });

  WrappedComponent.displayName = `Loadable(${
    Component.displayName || Component.name || 'Component'
  })`;

  return WrappedComponent;
};

export default Loadable;
