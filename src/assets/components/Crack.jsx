import React from "react";
// #daa520 //gold
const Crack = () => {
  return (
    <div className="fireworks">
      <div className="firework">
        <div className="explosion">
          <div className="spark gold"></div>
        </div>
        <div className="explosion">
          <div className="spark gold"></div>
        </div>
        <div className="explosion">
          <div className="spark gold"></div>
        </div>
        <div className="explosion">
          <div className="spark gold"></div>
        </div>
        <div className="explosion">
          <div className="spark gold"></div>
        </div>
        <div className="explosion">
          <div className="spark gold"></div>
        </div>
        <div className="explosion">
          <div className="spark gold"></div>
        </div>
        <div className="explosion">
          <div className="spark gold"></div>
        </div>
      </div>
      <div className="firework" style={{ marginTop: "-70px" }}>
        <div className="explosion">
          <div className="spark silver"></div>
        </div>
        <div className="explosion">
          <div className="spark silver"></div>
        </div>
        <div className="explosion">
          <div className="spark silver"></div>
        </div>
        <div className="explosion">
          <div className="spark silver"></div>
        </div>
        <div className="explosion">
          <div className="spark silver"></div>
        </div>
        <div className="explosion">
          <div className="spark silver"></div>
        </div>
        <div className="explosion">
          <div className="spark silver"></div>
        </div>
        <div className="explosion">
          <div className="spark silver"></div>
        </div>
      </div>
      <div className="firework">
        <div className="explosion">
          <div className="spark gold"></div>
        </div>
        <div className="explosion">
          <div className="spark gold"></div>
        </div>
        <div className="explosion">
          <div className="spark gold"></div>
        </div>
        <div className="explosion">
          <div className="spark gold"></div>
        </div>
        <div className="explosion">
          <div className="spark gold"></div>
        </div>
        <div className="explosion">
          <div className="spark gold"></div>
        </div>
        <div className="explosion">
          <div className="spark gold"></div>
        </div>
        <div className="explosion">
          <div className="spark gold"></div>
        </div>
      </div>
      <div className="firework" style={{ marginTop: "70px" }}>
        <div className="explosion">
          <div className="spark silver"></div>
        </div>
        <div className="explosion">
          <div className="spark silver"></div>
        </div>
        <div className="explosion">
          <div className="spark silver"></div>
        </div>
        <div className="explosion">
          <div className="spark silver"></div>
        </div>
        <div className="explosion">
          <div className="spark silver"></div>
        </div>
        <div className="explosion">
          <div className="spark silver"></div>
        </div>
        <div className="explosion">
          <div className="spark silver"></div>
        </div>
        <div className="explosion">
          <div className="spark silver"></div>
        </div>
      </div>
      <div className="firework">
        <div className="explosion">
          <div className="spark gold"></div>
        </div>
        <div className="explosion">
          <div className="spark gold"></div>
        </div>
        <div className="explosion">
          <div className="spark gold"></div>
        </div>
        <div className="explosion">
          <div className="spark gold"></div>
        </div>
        <div className="explosion">
          <div className="spark gold"></div>
        </div>
        <div className="explosion">
          <div className="spark gold"></div>
        </div>
        <div className="explosion">
          <div className="spark gold"></div>
        </div>
        <div className="explosion">
          <div className="spark gold"></div>
        </div>
      </div>
      <div className="firework" style={{ marginTop: "-70px" }}>
        <div className="explosion">
          <div className="spark silver"></div>
        </div>
        <div className="explosion">
          <div className="spark silver"></div>
        </div>
        <div className="explosion">
          <div className="spark silver"></div>
        </div>
        <div className="explosion">
          <div className="spark silver"></div>
        </div>
        <div className="explosion">
          <div className="spark silver"></div>
        </div>
        <div className="explosion">
          <div className="spark silver"></div>
        </div>
        <div className="explosion">
          <div className="spark silver"></div>
        </div>
        <div className="explosion">
          <div className="spark silver"></div>
        </div>
      </div>
      <div className="firework">
        <div className="explosion">
          <div className="spark gold"></div>
        </div>
        <div className="explosion">
          <div className="spark gold"></div>
        </div>
        <div className="explosion">
          <div className="spark gold"></div>
        </div>
        <div className="explosion">
          <div className="spark gold"></div>
        </div>
        <div className="explosion">
          <div className="spark gold"></div>
        </div>
        <div className="explosion">
          <div className="spark gold"></div>
        </div>
        <div className="explosion">
          <div className="spark gold"></div>
        </div>
      </div>

      {/* Inline Keyframes */}
      <style>{`
.fireworks {
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 40px;
  left: 0;
  z-index: -1;
  opacity: 0.5;
}
.fireworks .firework {
  position: relative;
  top: 0px;
  left: 0px;
  margin: 0px 50px;
}

.fireworks .firework .explosion {
  position: absolute;
  top: 0;
  width: 5px;
  height: 20px;
  opacity: 0;
  transform-origin: top center;
  will-change: transform;
  animation: explosion 0.7s linear infinite;
}
.fireworks .firework .explosion:nth-child(1) {
  transform: rotate(0deg);
}
.fireworks .firework .explosion:nth-child(2) {
  transform: rotate(90deg);
}
.fireworks .firework .explosion:nth-child(3) {
  transform: rotate(180deg);
}
.fireworks .firework .explosion:nth-child(4) {
  transform: rotate(-90deg);
}
.fireworks .firework .explosion:nth-child(5) {
  transform: rotate(45deg);
}
.fireworks .firework .explosion:nth-child(6) {
  transform: rotate(-45deg);
}
.fireworks .firework .explosion:nth-child(7) {
  transform: rotate(135deg);
}
.fireworks .firework .explosion:nth-child(8) {
  transform: rotate(225deg);
}

.fireworks .firework .explosion .spark {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  will-change: transform;
  animation: explosion2 0.7s ease-in-out infinite;
}

.fireworks .firework .explosion .spark.silver {
  background-color: #c0c0c0;
}
.fireworks .firework .explosion .spark.gold {
  background-color: #daa520;
}
@keyframes fireworkstart {
  0% {
    height: 0px;
    transform: translateY(1000px);
  }
  50% {
    height: 50px;
  }
  75% {
    height: 30px;
  }
  100% {
    height: 0;
    transform: translateY(0);
  }
}

@keyframes explosion {
  0% {
    height: 0px;
    opacity: 0;
  }
  50% {
    height: 25px;
    opacity: 1;
  }
  100% {
    height: 0px;
    opacity: 0;
  }
}
@keyframes explosion2 {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(5px);
  }
  75% {
    transform: translateY(50px);
  }
  100% {
    transform: translateY(70px);
  }
}
`}</style>
    </div>
  );
};

export default Crack;
