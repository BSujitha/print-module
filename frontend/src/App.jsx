import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import * as pdfjsLib from "pdfjs-dist/build/pdf";  
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function App() {
  const [orders, setOrders] = useState([]);
  const [fileName, setFileName] = useState("");
  const [pages, setPages] = useState(0);
  const [printType, setPrintType] = useState("B/W");
  const [copies, setCopies] = useState(1);
 

 useEffect(() => {
  const loadOrders = async () => {
    try {
      const res = await axios.get("/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.log("Backend connect:", err.message);
    }
  };

  loadOrders();
}, []);


 const rate = printType === "Color" ? 5 : 2;
 const totalPrice = (pages || 0) * (copies || 0) * rate;

 const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  if (!file || file.type !== "application/pdf") {
    alert("PDF only!");
    e.target.value = "";
    return;
  }

  try {
    console.log("Loading:", file.name);
    
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;  
    
    console.log("Pages:", pdf.numPages);
    setFileName(file.name);
    setPages(pdf.numPages);
  } catch (error) {
    console.error("PDF ERROR:", error);
    setPages(1);
  }
};


 const saveOrder = async () => {
  if (!fileName || pages === 0) {
    alert("Upload PDF first!");
    return;
  }

  try {
    await axios.post("/api/orders", {
      fileName,
      pages,
      type: printType,
      copies,
      price: totalPrice
    });

    const res = await axios.get("/api/orders");
    setOrders(res.data);

   
    setFileName("");
    setPages(0);
    setPrintType("B/W");
    setCopies(1);

    const fileInput = document.getElementById("fileInput");
    if (fileInput) fileInput.value = "";

    alert("✅ Saved! Ready for next.....");
  } catch (error) {
    alert("Save error: " + error.message);
  }
};

  const deleteOrder = async (id) => {
  await axios.delete(`/api/orders/${id}`);
  const res = await axios.get("/api/orders");
  setOrders(res.data);
};

  return (
    <div className="app">
      <h1>🖨️ Print Module</h1>
      
      <input 
     id="fileInput"  
     type="file" 
     accept=".pdf" 
     onChange={handleFileUpload} 
/>
      {fileName && (
        <>
          <p>{fileName} | {pages} pages</p>
          <select value={printType} onChange={e => setPrintType(e.target.value)}>
            <option>B/W</option>
            <option>Color</option>
          </select>
          <input type="number" min={1} value={copies} onChange={e => setCopies(Number(e.target.value))} />
          <p>price₹ {totalPrice}</p>
          <button onClick={saveOrder}>Save</button>
        </>
      )}
      
      <h2>Orders ({orders.length})</h2>
      {orders.length === 0 ? (
        <p style={{ color: "#64748b" }}>No orders yet</p>
      ) : (
        orders.map(order => (
        <div key={order.id} className="order-item">
          <span className="order-text">
            {order.fileName} | {order.pages} pages | {order.type} | {order.copies}x | ₹{order.price}
            </span>
            <button className="delete-btn" onClick={() => deleteOrder(order.id)}>
              Delete
              </button>
              </div>
          ))
         )}
      </div>
  );
}

export default App;