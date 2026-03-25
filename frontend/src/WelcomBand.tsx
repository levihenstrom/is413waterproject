import "./App.css";

type WelcomeBandProps = {
  totalItems: number;
};

function WelcomeBand({ totalItems }: WelcomeBandProps) {
  return (
    <>
      <div className="welcome-band text-center mt-4 mb-3">
        <div className="mx-auto">
          <h1 className="h2 mb-1">Water Project Dashboard</h1>
          <p className="text-muted mb-0">Total Projects: {totalItems}</p>
        </div>
      </div>
    </>
  );
}

export default WelcomeBand;
