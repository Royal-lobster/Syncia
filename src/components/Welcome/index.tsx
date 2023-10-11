import useThemeSync from '../../hooks/useThemeSync';

function Welcome() {
  useThemeSync();
  return <div className=''>Welcome</div>;
}

export default Welcome;
