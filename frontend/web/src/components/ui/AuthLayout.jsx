export default function AuthLayout({ title, children }) {
  return (
    <div className="authPage">
      <div className="authCard">
        <h1 className="authTitle">{title}</h1>
        {children}
      </div>
    </div>
  );
}
