import React from "react";

const FourOhFour = () => {
  return (
    <div
      className="text-center"
      style={{
        color: "red",
      }}
    >
      <h3>
      Looks like you got lost - use the navigation options above to find
        yourself again.
      </h3>
      <img
        src="/404image.jpg"
        alt="404 PAGE NOT FOUND"
        style={{ width: "60%", margin: "auto" }}
      />
      <footer style={{position:"fixed", bottom: "0px", right: "0px"}}>
        <a href="https://www.freepik.com/vectors/business">
          Business vector created by pikisuperstar - www.freepik.com
        </a>
      </footer>
    </div>
  );
};

export default FourOhFour;
