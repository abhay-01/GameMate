const LoginAlert = ({ onLoginClick }) => (
    <div className="login-banner bg-yellow-500 text-center p-4 mt-2">
      <p>Please <button onClick={onLoginClick} className="underline">log in</button> to access all features!</p>
    </div>
  );

export default LoginAlert;