export const AdminStats = ({ icon, title, amount, symbol }) => {
  return (
    <div className="card p-4 h-100">
      <i className={`bi bi-${icon}`}></i>
      <span>{title}</span>
      <h1>
        {symbol}
        {amount}
      </h1>
    </div>
  );
};
