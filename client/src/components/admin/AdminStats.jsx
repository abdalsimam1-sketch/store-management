export const AdminStats = ({ icon, title, amount, symbol }) => {
  return (
    <div className="card p-4 h-100">
      <i className={`bi bi-${icon} fs-3`}></i>
      <span>{title}</span>
      <h1 className="amount">
        {symbol}
        <span className="amount">{amount}</span>
      </h1>
    </div>
  );
};
