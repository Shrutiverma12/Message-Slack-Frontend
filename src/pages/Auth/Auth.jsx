export const Auth = ({ children }) => {
  //Layout for auth pages
  return (
    <div className='h-[100vh] flex items-center justify-center bg-slack'>
      <div className='md:h-auto md:w-[420px]'>{children}</div>
    </div>
  );
};
