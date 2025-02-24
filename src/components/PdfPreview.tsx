// components/PdfPreview.tsx
import { Document, Page } from 'react-pdf';

type PdfPreviewProps = {
    pdfUrl: string;
};

const PdfPreview = ({ pdfUrl }: PdfPreviewProps) => {
    return (
        <Document file={pdfUrl}>
            <Page pageNumber={1} width={400} />
        </Document>
    );
};

export default PdfPreview;
