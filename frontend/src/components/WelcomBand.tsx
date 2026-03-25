import "../App.css";

type WelcomeBandProps = {
  totalItems?: number;
  showTotal?: boolean;
};

function WelcomeBand({
  totalItems = 0,
  showTotal = false,
}: WelcomeBandProps) {
  return (
    <div className="welcome-band text-center mt-4 mb-4">
      <div className="welcome-band-inner">
        <h1 className="h2 mb-1">Water Projects</h1>
        {showTotal ? (
          <p className="text-muted mb-0">Total Projects: {totalItems}</p>
        ) : null}
      </div>
    </div>
  );
}

export default WelcomeBand;
