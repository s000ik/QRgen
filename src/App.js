import React, { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import { toPng, toJpeg, toSvg } from 'html-to-image';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [value, setValue] = useState('');
  const [back, setBack] = useState('#FFFFFF');
  const [fore, setFore] = useState('#000000');
  const [size, setSize] = useState(250);
  const [format, setFormat] = useState('png');

  const qrRef = useRef();

  const handleBackChange = (e) => setBack(e.target.value);
  const handleForeChange = (e) => setFore(e.target.value);
  const handleSizeChange = (e) => setSize(parseInt(e.target.value, 10));
  const handleFormatChange = (e) => setFormat(e.target.value);

  const handleDownload = () => {
    if (qrRef.current) {
      const downloadMap = {
        png: toPng,
        jpg: toJpeg,
        svg: toSvg,
      };

      downloadMap[format](qrRef.current, { cacheBust: true })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = `qr-code.${format}`;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => console.error(`Error generating ${format.toUpperCase()}:`, err));
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Generate QR Code</h1>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="form-group mb-4">
            <label htmlFor="valueInput" className="form-label">Enter Value</label>
            <input
              type="text"
              className="form-control"
              id="valueInput"
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value for QR code"
              //cetnre the text
              style={{ textAlign: 'center' }}
              value={value}
            />
          </div>
          <div className="form-group mb-4">
            <label className="form-label ">Background Color</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                onChange={handleBackChange}
                value={back}
                placeholder="#FFFFFF"
              />
              <input
                type="color"
                className="form-control"
                onChange={handleBackChange}
                value={back}
              />
            </div>
          </div>
          <div className="form-group mb-4">
            <label className="form-label">Foreground Color</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                onChange={handleForeChange}
                value={fore}
                placeholder="#000000"
              />
              <input
                type="color"
                className="form-control"
                onChange={handleForeChange}
                value={fore}
              />
            </div>
          </div>
          <div className="form-group mb-4">
            <label className="form-label">Size of QR Code (px)</label>
            <input
              type="range"
              className="form-control-range"
              onChange={handleSizeChange}
              min="100"
              max="320"
              step="10"
              value={size}
            />
            <div>{size}px</div>
          </div>
          <div className="text-center">
            {value && (
              <div className="d-flex justify-content-center">
                <div ref={qrRef} className="qr-code-wrapper">
                  <QRCode
                  //center the qr code
                    style={{ margin: 'auto' }}
                    title="QR code"
                    value={value}
                    bgColor={back}
                    fgColor={fore}
                    size={size}
                  />
                </div>
              </div>
            )}
            {value && (
              <div className="form-group mt-4">
                <label className="form-label">Download</label>
                <div className="input-group">
                  <select
                    className="form-control"
                    onChange={handleFormatChange}
                    value={format}
                  >
                    <option value="png">PNG</option>
                    <option value="jpg">JPG</option>
                    <option value="svg">SVG</option>
                  </select>
                  <button className="btn btn-primary" onClick={handleDownload}>
                    Download
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
