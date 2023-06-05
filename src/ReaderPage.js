import React from 'react';
import { useLocation } from 'react-router-dom';
import Linkify from 'linkify-react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 20 },
  note: { fontSize: 12, marginBottom: 10 },
  url: { fontSize: 8, marginTop: 10 },
});

const linkifyOptions = {
    nl2br: true, // Preserves line breaks
  };

const ReaderPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const note = searchParams.get('note');

  const handleEmailButtonClick = () => {
    const subject = 'My Note';
    const body = `Note: ${note}%0D%0A%0D%0ASource URL: ${window.location.href}`;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const MyDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.note}>{note}</Text>
          <Text style={styles.url}>Source URL: {window.location.href}</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="flex flex-column items-center justify-center min-vh-100 pv3">
      <h1>Qr Code Message</h1>
      
      <div className="w-90 w-50-ns mv5 bg-washed-green pa3 " style={{wordBreak: 'break-word'}}>
        <Linkify as='p' tagName="pre" options={linkifyOptions}>
          {note}
        </Linkify>
      </div>
      <p class="f7 f6-l db black-70">Save note by emailing it to your email.</p>
      <button className='f6 b--black link dim br1 ba ph3 pv2 mb3 dib black bg-white' onClick={handleEmailButtonClick}>Email Note</button>
      <p class="f7 f6-l db black-70">Save as PDF file.</p>
      <div className="w-75 tc mt-3">
        <PDFDownloadLink document={MyDocument} fileName="note.pdf" className='f6  link dim br1 ba ph3 pv2 mb3 dib black'>
          {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default ReaderPage;
