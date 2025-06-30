import { Award, FileText } from 'lucide-react';

interface Props {
  onCreateTemplate: () => void;
  onCreateCertificate: () => void;
}

export default function ActionButtons({ onCreateTemplate, onCreateCertificate }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
      <button
        onClick={onCreateCertificate}
        className="flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
      >
        <Award className="w-6 h-6 mr-3" />
        Create Certificates
      </button>
      <button
        onClick={onCreateTemplate}
        className="flex items-center px-8 py-4 bg-green-600 text-white text-lg font-medium rounded-lg hover:bg-green-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
      >
        <FileText className="w-6 h-6 mr-3" />
        Create Template
      </button>
    </div>
  );
}
