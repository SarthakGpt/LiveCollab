// import React, { useEffect, useRef, useState } from "react";
// import Client from "./Client";
// import Editor from "./Editor";
// import { initSocket } from "../Socket";
// import { ACTIONS } from "../Actions";
// import {
//   useNavigate,
//   useLocation,
//   Navigate,
//   useParams,
// } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import axios from "axios";

// // List of supported languages
// const LANGUAGES = [
//   "python3",
//   "java",
//   "cpp",
//   "nodejs",
//   "c",
//   "ruby",
//   "go",
//   "scala",
//   "bash",
//   "sql",
//   "pascal",
//   "csharp",
//   "php",
//   "swift",
//   "rust",
//   "r",
// ];

// function EditorPage() {
//   const [clients, setClients] = useState([]);
//   const [output, setOutput] = useState("");
//   const [isCompileWindowOpen, setIsCompileWindowOpen] = useState(false);
//   const [isCompiling, setIsCompiling] = useState(false);
//   const [selectedLanguage, setSelectedLanguage] = useState("python3");
//   const codeRef = useRef(null);

//   const Location = useLocation();
//   const navigate = useNavigate();
//   const { roomId } = useParams();

//   const socketRef = useRef(null);

//   useEffect(() => {
//     const init = async () => {
//       socketRef.current = await initSocket();
//       socketRef.current.on("connect_error", (err) => handleErrors(err));
//       socketRef.current.on("connect_failed", (err) => handleErrors(err));

//       const handleErrors = (err) => {
//         console.log("Error", err);
//         toast.error("Socket connection failed, Try again later");
//         navigate("/");
//       };

//       socketRef.current.emit(ACTIONS.JOIN, {
//         roomId,
//         username: Location.state?.username,
//       });

//       socketRef.current.on(
//         ACTIONS.JOINED,
//         ({ clients, username, socketId }) => {
//           if (username !== Location.state?.username) {
//             toast.success(`${username} joined the room.`);
//           }
//           setClients(clients);
//           socketRef.current.emit(ACTIONS.SYNC_CODE, {
//             code: codeRef.current,
//             socketId,
//           });
//         }
//       );

//       socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
//         toast.success(`${username} left the room`);
//         setClients((prev) => {
//           return prev.filter((client) => client.socketId !== socketId);
//         });
//       });
//     };
//     init();

//     return () => {
//       socketRef.current && socketRef.current.disconnect();
//       socketRef.current.off(ACTIONS.JOINED);
//       socketRef.current.off(ACTIONS.DISCONNECTED);
//     };
//   }, []);

//   if (!Location.state) {
//     return <Navigate to="/" />;
//   }

//   const copyRoomId = async () => {
//     try {
//       await navigator.clipboard.writeText(roomId);
//       toast.success(`Room ID is copied`);
//     } catch (error) {
//       console.log(error);
//       toast.error("Unable to copy the room ID");
//     }
//   };

//   const leaveRoom = async () => {
//     navigate("/");
//   };

//   const runCode = async () => {
//     setIsCompiling(true);
//     try {
//       const response = await axios.post("http://localhost:5000/compile", {
//         code: codeRef.current,
//         language: selectedLanguage,
//       });
//       console.log("Backend response:", response.data);
//       setOutput(response.data.output || JSON.stringify(response.data));
//     } catch (error) {
//       console.error("Error compiling code:", error);
//       setOutput(error.response?.data?.error || "An error occurred");
//     } finally {
//       setIsCompiling(false);
//     }
//   };

//   const toggleCompileWindow = () => {
//     setIsCompileWindowOpen(!isCompileWindowOpen);
//   };

//   return (
//     <div className="container-fluid vh-100 d-flex flex-column">
//       <div className="row flex-grow-1">
//         {/* Client panel */}
//         <div className="col-md-2 bg-dark text-light d-flex flex-column">
//           <img
//             src="/images/logo1.png"
//             alt="Logo"
//             className="img-fluid mx-auto rounded-circle border border-light"
//             style={{
//               width: "80px",
//               height: "80px",
//               objectFit: "cover",
//               marginBottom: "10px",
//               marginTop: "10px",
//             }}
//           />

//           <hr style={{ marginTop: "-3rem" }} />

//           {/* Client list container */}
//           <div className="d-flex flex-column flex-grow-1 overflow-auto">
//             <span className="mb-2">Members</span>
//             {clients.map((client) => (
//               <Client key={client.socketId} username={client.username} />
//             ))}
//           </div>

//           <hr />
//           {/* Buttons */}
//           <div className="mt-auto mb-3">
//             <button className="btn btn-success w-100 mb-2" onClick={copyRoomId}>
//               Copy Room ID
//             </button>
//             <button className="btn btn-danger w-100" onClick={leaveRoom}>
//               Leave Room
//             </button>
//           </div>
//         </div>

//         {/* Editor panel */}
//         <div className="col-md-10 text-light d-flex flex-column">
//           {/* Language selector */}
//           <div className="bg-dark p-2 d-flex justify-content-end">
//             <select
//               className="form-select w-auto"
//               value={selectedLanguage}
//               onChange={(e) => setSelectedLanguage(e.target.value)}
//             >
//               {LANGUAGES.map((lang) => (
//                 <option key={lang} value={lang}>
//                   {lang}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <Editor
//             socketRef={socketRef}
//             roomId={roomId}
//             onCodeChange={(code) => {
//               codeRef.current = code;
//             }}
//           />
//         </div>
//       </div>

//       {/* Compiler toggle button */}
//       <button
//         className="btn btn-primary position-fixed bottom-0 end-0 m-3"
//         onClick={toggleCompileWindow}
//         style={{ zIndex: 1050 }}
//       >
//         {isCompileWindowOpen ? "Close Compiler" : "Open Compiler"}
//       </button>

//       {/* Compiler section */}
//       <div
//         className={`bg-dark text-light p-3 ${
//           isCompileWindowOpen ? "d-block" : "d-none"
//         }`}
//         style={{
//           position: "fixed",
//           bottom: 0,
//           left: 0,
//           right: 0,
//           height: isCompileWindowOpen ? "30vh" : "0",
//           transition: "height 0.3s ease-in-out",
//           overflowY: "auto",
//           zIndex: 1040,
//         }}
//       >
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h5 className="m-0">Compiler Output ({selectedLanguage})</h5>
//           <div>
//             <button
//               className="btn btn-success me-2"
//               onClick={runCode}
//               disabled={isCompiling}
//             >
//               {isCompiling ? "Compiling..." : "Run Code"}
//             </button>
//             <button className="btn btn-secondary" onClick={toggleCompileWindow}>
//               Close
//             </button>
//           </div>
//         </div>
//         <pre className="bg-secondary p-3 rounded">
//           {output || "Output will appear here after compilation"}
//         </pre>
//       </div>
//     </div>
//   );
// }

// export default EditorPage;
import React, { useEffect, useRef, useState } from "react";
import Client from "./Client";
import Editor from "./Editor";
import { initSocket } from "../Socket";
import { ACTIONS } from "../Actions";
import {
  useNavigate,
  useLocation,
  Navigate,
  useParams,
} from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const LANGUAGES = [
  "python3",
  "java",
  "cpp",
  "nodejs",
  "c",
  "ruby",
  "go",
  "scala",
  "bash",
  "sql",
  "pascal",
  "csharp",
  "php",
  "swift",
  "rust",
  "r",
];

function EditorPage() {
  const [clients, setClients] = useState([]);
  const [output, setOutput] = useState("");
  const [isCompileWindowOpen, setIsCompileWindowOpen] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("python3");
  const codeRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const socketRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();

      const handleErrors = (err) => {
        console.log("Socket error:", err);
        toast.error("Socket connection failed, Try again later");
        navigate("/");
      };

      socketRef.current.on("connect_error", handleErrors);
      socketRef.current.on("connect_failed", handleErrors);

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room.`);
          }
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );

      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room`);
        setClients((prev) =>
          prev.filter((client) => client.socketId !== socketId)
        );
      });
    };

    init();

    return () => {
      socketRef.current?.disconnect();
      socketRef.current?.off(ACTIONS.JOINED);
      socketRef.current?.off(ACTIONS.DISCONNECTED);
    };
  }, []);

  if (!location.state) {
    return <Navigate to="/" />;
  }

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID copied!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to copy Room ID.");
    }
  };

  const leaveRoom = () => {
    navigate("/");
  };

  const runCode = async () => {
    setIsCompiling(true);
    try {
      const response = await axios.post("http://localhost:5000/compile", {
        code: codeRef.current,
        language: selectedLanguage,
      });
      setOutput(response.data.output || JSON.stringify(response.data));
    } catch (error) {
      console.error("Compile error:", error);
      setOutput(error.response?.data?.error || "An error occurred");
    } finally {
      setIsCompiling(false);
    }
  };

  const toggleCompileWindow = () => {
    setIsCompileWindowOpen(!isCompileWindowOpen);
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column p-0">
      <div className="row flex-grow-1 m-0">
        {/* Sidebar */}
        <div className="col-md-2 bg-dark text-light d-flex flex-column p-3">
          <div className="text-center mb-4">
            <img
              src="/images/logo1.png"
              alt="Logo"
              className="rounded-circle border border-light"
              style={{
                width: "90px",
                height: "90px",
                objectFit: "cover",
              }}
            />
            <hr className="bg-light mt-3" />
          </div>

          <div className="flex-grow-1 overflow-auto mb-3">
            <h6 className="text-center">Members</h6>
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>

          <div className="mt-auto">
            <button className="btn btn-success w-100 mb-2" onClick={copyRoomId}>
              Copy Room ID
            </button>
            <button
              className="btn btn-danger w-100"
              onClick={leaveRoom}
              style={{ marginBottom: "10px" }}
            >
              Leave Room
            </button>
          </div>
        </div>

        {/* Main Panel */}
        <div className="col-md-10 d-flex flex-column p-0">
          {/* Language Selector */}
          <div className="bg-dark p-3 d-flex justify-content-end align-items-center border-bottom border-secondary">
            <label className="text-light me-2 mb-0">Language:</label>
            <select
              className="form-select w-auto bg-dark text-light border-secondary"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Editor */}
          <div className="flex-grow-1">
            <Editor
              socketRef={socketRef}
              roomId={roomId}
              onCodeChange={(code) => {
                codeRef.current = code;
              }}
            />
          </div>
        </div>
      </div>

      {/* Compiler Toggle Button */}
      <button
        className="btn btn-primary position-fixed bottom-0 end-0 m-3 shadow"
        onClick={toggleCompileWindow}
        style={{ zIndex: 1050 }}
      >
        {isCompileWindowOpen ? "Close Compiler" : "Open Compiler"}
      </button>

      {/* Compiler Output */}
      <div
        className={`bg-dark text-light border-top border-secondary ${
          isCompileWindowOpen ? "d-block" : "d-none"
        }`}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: isCompileWindowOpen ? "30vh" : "0",
          transition: "height 0.3s ease-in-out",
          overflowY: "auto",
          zIndex: 1040,
        }}
      >
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-secondary">
          <h6 className="m-0">Compiler Output ({selectedLanguage})</h6>
          <div className="d-flex gap-2">
            <button
              className="btn btn-success btn-sm"
              onClick={runCode}
              disabled={isCompiling}
            >
              {isCompiling ? "Compiling..." : "Run Code"}
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={toggleCompileWindow}
            >
              Close
            </button>
          </div>
        </div>

        <pre className="bg-secondary text-light m-3 p-3 rounded small">
          {output || "Output will appear here after compilation"}
        </pre>
      </div>
    </div>
  );
}

export default EditorPage;
