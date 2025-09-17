import { motion } from "framer-motion";

const DeliveredOrdersTable = ({ filteredOrders }) => {
  return (
    <>
      {filteredOrders.map((order, index) => (
        <motion.tr
          key={order.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="hover:bg-gray-50 border-b border-gray-100"
        >
          <td className="px-6 py-4 text-sm font-medium text-gray-900">
            ORD-2024-{String(index + 1).padStart(3, '0')}
            <div className="text-xs text-gray-500 mt-1">
              {new Date(order.createdAt).toLocaleDateString()}
            </div>
          </td>
          
          <td className="px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">{order.user?.name || order.customerName}</div>
                <div className="text-sm text-gray-500 flex items-center mt-1">
                  <Mail className="w-3 h-3 mr-1" />
                  {order.user?.email || 'customer@email.com'}
                </div>
                <div className="text-sm text-gray-500 flex items-center">
                  <Phone className="w-3 h-3 mr-1" />
                  +94 77 123 4567
                </div>
              </div>
            </div>
          </td>

          <td className="px-6 py-4">
            <div className="text-sm text-gray-900">
              {order.products ? `${order.products.length} item(s)` : '1 item(s)'}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Diamond bracelet
            </div>
          </td>

          <td className="px-6 py-4">
            <div className="text-sm font-semibold text-gray-900">{order.total || `$${order.amount}`}</div>
            <div className="text-xs text-gray-500">Credit Card</div>
          </td>

          <td className="px-6 py-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              ✅ Delivered
            </span>
          </td>

          <td className="px-6 py-4">
            <div className="flex items-center space-x-2">
              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                <Eye className="w-4 h-4" />
              </button>
              
              <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors">
                <Edit className="w-4 h-4" />
              </button>
              
              <button className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </td>
        </motion.tr>
      ))}
    </>
  );
};

export default DeliveredOrdersTable;
