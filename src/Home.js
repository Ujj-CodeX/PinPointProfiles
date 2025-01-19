import React from "react";

const Home = () => {
  return (
    <>
    {/* Main Content */}
    <form>
    <div className="container mt-4">
      <div className="row align-items-center">
        {/* Left Thumbnail Image */}
        <div className="col-sm-6">
          <img
            src={`${process.env.PUBLIC_URL}/Designer.png`}
            className="rounded img-thumbnail"
            alt="Designer"
          />
        </div>

        {/* Right Card */}
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-3">Sign In</h5>
              {/* Input fields */}
              <div className="mb-3">
                <input
                  className="form-control form-control-sm"
                  type="text"
                  placeholder="User ID"
                  aria-label="User ID"
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control form-control-sm"
                  type="password"
                  placeholder="Password"
                  aria-label="Password"
                />
              </div>
              {/* Submit Button */}
              <button type="submit" className="btn btn-primary btn-sm">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
     </form>
     </>
  );
};

export default Home;
