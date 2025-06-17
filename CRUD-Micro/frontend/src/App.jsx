import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateBook from "./Pages/CreateBook";
import Books from "./Pages/Books";
import UpdateBook from "./Pages/Updatebook";
import Sidebar from "./components/Sidebar";
import Publisher from "./Pages/Publisher";
import Review from "./Pages/Review";

function App() {
  return (
    <BrowserRouter>
      <div className="wrapper d-flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <div
          className="content-wrapper"
          style={{ padding: "20px", minHeight: "100vh", width: "100%" }}
        >
          <Routes>
            <Route path="/" element={<Books />} />
            <Route path="/create" element={<CreateBook />} />
            <Route path="/update/:id" element={<UpdateBook />} />
            <Route path="/publisher" element={<Publisher />} />
            <Route path="/review" element={<Review />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
