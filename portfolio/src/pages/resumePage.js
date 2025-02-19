const ResumePage = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0  }}>
      <iframe
        src="/assets/Raihan_Resume.pdf"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      ></iframe>
      <br />
      {/* <a
        href="/assets/resume.pdf"
        download="Raihan_Rafeek_Resume.pdf"
        style={{
          display: 'inline-block',
          marginTop: '10px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
        }}
      >
        Download PDF
      </a> */}
    </div>
  );
};

export default ResumePage;
