import { MagnifyingGlass } from 'react-loader-spinner';
import styles from './Spinner.module.scss';

const Spinner = () => {
  return (
    <div className={styles.spinnerWrapper}>
      <MagnifyingGlass
	  	timeout={10}
        visible={true}
        height="300"
        width="300"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#5932EA"
      />
    </div>
  );
};

export default Spinner;
