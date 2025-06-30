import { Award, FileText, Wallet } from 'lucide-react';

export default function InfoCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="p-6 bg-white rounded-lg shadow-md text-center">
        <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Certificates</h3>
        <p className="text-gray-600">Issue tamper-proof certificates on the blockchain</p>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md text-center">
        <FileText className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Templates</h3>
        <p className="text-gray-600">Design beautiful certificate templates for any occasion</p>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md text-center">
        <Wallet className="w-12 h-12 text-purple-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Wallet Integration</h3>
        <p className="text-gray-600">Connect your wallet for seamless blockchain transactions</p>
      </div>
    </div>
  );
}
