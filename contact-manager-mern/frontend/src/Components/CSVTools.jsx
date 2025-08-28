// src/components/CSVTools.jsx
import React from 'react';
import { useCSVDownloader, useCSVReader } from 'react-papaparse';
import Swal from 'sweetalert2';

export function ExportCSV({ contacts }) {
  const { CSVDownloader, Type } = useCSVDownloader();
  const data = contacts.map(c => ({
    Name: c.name,
    Email: c.email,
    Phone: c.phone
  }));
  return (
    <CSVDownloader type={Type.Button} filename="contacts.csv" bom data={data}>
      <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        Export CSV
      </button>
    </CSVDownloader>
  );
}

export function ImportCSV({ onImport }) {
  const { CSVReader } = useCSVReader();
  return (
    <CSVReader
      onUploadAccepted={results => {
        const rows = results.data.map(r => r.data);
        onImport(rows);
        Swal.fire('Imported!', 'Contacts imported from CSV.', 'success');
      }}
    >
      {({ getRootProps }) => (
        <button
          {...getRootProps()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ml-2"
        >
          Import CSV
        </button>
      )}
    </CSVReader>
  );
}
