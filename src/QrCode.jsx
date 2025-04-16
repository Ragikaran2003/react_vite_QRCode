import { useState } from "react";

export const QrCode = () => {
  const [img , setImg] = useState("");
  const [loading , setLoading] = useState(false);
  const [qrData,setQrData] = useState("")
  const [size,setSize] = useState("")
  
  async function generateQR() {
    setLoading(true)
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrData)}`;
      setImg(url)
    } catch (error) {
      console.log(`Error generating Qr Code ${error}`);
    } finally {
      setLoading(false);
    }
  }

  function downloadQR() {
    fetch(img)
    .then((response)=>response.blob())
    .then((blob)=>{
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download="qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error)=>{
      console.log(`Error downloading QR code ${error}`);
    })
  }
  return (
    <div className="app-container">
      <h1>Qr Code Generator</h1>
      {loading && <p>Please Wait ....</p>}
        {img && <img src={img} className="qr-code-image"/>}
        <div>
            <label htmlFor="dataInput" className="input-label">Data For QR Code</label>
            <input type="text" id="dataInput" value={qrData} onChange={(e)=>setQrData(e.target.value)} placeholder="Enter Data For QR Code"/>
            <label htmlFor="sixeInput" className="input-label">Image Size (e.g-150): </label>
            <input type="text" id="sixeInput" value={size} onChange={(e)=>setSize(e.target.value)} placeholder="Enter Image Size"/>
            <button className="generate-button" disabled={loading} onClick={generateQR}>Generate QR Code</button>
            <button className="download-button" onClick={downloadQR}>Download QR Code</button>
        </div>
        <p className="footer">Designed By <a href="http://ragikaran2003.free.nf">Baskaran Ragikaran</a></p>
    </div>
  );
};
