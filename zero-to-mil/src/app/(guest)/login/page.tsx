import Image from "next/image";
import React from "react";

function Login() {
  return (
    <div>
      <Image
        src={"/ZeroToMilLogo.svg"}
        alt={"logo"}
        width={100}
        height={24}
        priority
      />
      <p>Get Started</p>
    </div>
  );
}

export default Login;
