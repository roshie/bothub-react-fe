export default function emailVerified(props) {
  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <div className="card bg-info h-100">
        <div className="card-body p-5">
          <h2 className="fw-bold fs-1">Your Email has been verified!</h2>
          <h4>Now you can close this tab.</h4>
        </div>
      </div>
    </div>
  );
}
