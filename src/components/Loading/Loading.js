import './css/Loading.min.css';

const Loading = () => {
  return (
    <div className='vh-100 d-flex justify-content-center align-items-center'>
      <div className='sk-chase'>
        <div className='sk-chase-dot'></div>
        <div className='sk-chase-dot'></div>
        <div className='sk-chase-dot'></div>
        <div className='sk-chase-dot'></div>
        <div className='sk-chase-dot'></div>
        <div className='sk-chase-dot'></div>
      </div>
    </div>
  );
};

export default Loading;
