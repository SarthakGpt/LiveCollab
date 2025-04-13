// import React, { useState } from "react";
// import { v4 as uuid } from "uuid";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";

// function Home() {
//   const location = useLocation();
//   const initialUsername = location.state?.userName || "";
//    // fallback if undefined
//   const [roomId, setRoomId] = useState("");
//   // const [username, setUsername] = useState("");
//   const [username, setUsername] = useState(initialUsername);

//   const navigate = useNavigate();

//   const generateRoomId = (e) => {
//     e.preventDefault();
//     const Id = uuid();
//     setRoomId(Id);
//     toast.success("Room Id is generated");
//   };

//   const joinRoom = () => {
//     if (!roomId || !username) {
//       toast.error("Both the field is requried");
//       return;
//     }

//     // redirect
//     navigate(`/editor/${roomId}`, {
//       state: {
//         username,
//       },
//     });
//     toast.success("room is created");
//   };

//   // when enter then also join
//   const handleInputEnter = (e) => {
//     if (e.code === "Enter") {
//       joinRoom();
//     }
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row justify-content-center align-items-center min-vh-100">
//         <div className="col-12 col-md-6">
//           <div className="card shadow-sm p-2 mb-5 bg-secondary rounded">
//             <div className="card-body text-center bg-dark">
//               <img
//                 src="/images/logo1.png"
//                 alt="Logo"
//                 className="img-fluid mx-auto d-block"
//                 style={{ maxWidth: "150px" }}
//               />
//               <h4 className="card-title text-light mb-4">Enter the ROOM ID</h4>

//               <div className="form-group">
//                 <input
//                   type="text"
//                   value={roomId}
//                   onChange={(e) => setRoomId(e.target.value)}
//                   className="form-control mb-2"
//                   placeholder="ROOM ID"
//                   onKeyUp={handleInputEnter}
//                 />
//               </div>
//               <div className="form-group">
//                 <input
//                   type="text"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   className="form-control mb-2"
//                   placeholder="USERNAME"
//                   onKeyUp={handleInputEnter}
//                 />
//               </div>
//               <button
//                 onClick={joinRoom}
//                 className="btn btn-success btn-lg btn-block"
//               >
//                 JOIN
//               </button>
//               <p className="mt-3 text-light">
//                 Don't have a room ID? create{" "}
//                 <span
//                   onClick={generateRoomId}
//                   className=" text-success p-2"
//                   style={{ cursor: "pointer" }}
//                 >
//                   {" "}
//                   New Room
//                 </span>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;

import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const initialUsername = location.state?.userName || ""; // get username from login

  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState(initialUsername);

  const navigate = useNavigate();

  const generateRoomId = (e) => {
    e.preventDefault();
    const Id = uuid();
    setRoomId(Id);
    toast.success("Room Id is generated");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Both fields are required");
      return;
    }

    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
    toast.success("Room is created");
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-12 col-md-6">
          <div className="card shadow-sm p-2 mb-5 bg-secondary rounded">
            <div className="card-body text-center bg-dark">
              <img
                src="/images/logo1.png"
                alt="Logo"
                className="img-fluid mx-auto d-block rounded-circle border border-light"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                }}
              />

              <h4 className="card-title text-light mb-4">Enter the ROOM ID</h4>

              <div className="form-group">
                <input
                  type="text"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="form-control mb-2"
                  placeholder="ROOM ID"
                  onKeyUp={handleInputEnter}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control mb-2"
                  placeholder="USERNAME"
                  onKeyUp={handleInputEnter}
                />
              </div>
              <button
                onClick={joinRoom}
                className="btn btn-success btn-lg btn-block"
              >
                JOIN
              </button>
              <p className="mt-3 text-light">
                Don't have a room ID? create{" "}
                <span
                  onClick={generateRoomId}
                  className=" text-success p-2"
                  style={{ cursor: "pointer" }}
                >
                  New Room
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
