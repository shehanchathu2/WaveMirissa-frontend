import { motion } from "framer-motion";

const DeliveredOrdersTable = ({ filteredOrders }) => {
  return (
    <>
      {filteredOrders.map((order) => (
        <motion.tr
          key={order.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-green-50 hover:bg-gray-50 transition"
        >
          <td className="border-b px-6 py-4">{order.id}</td>
          <td className="border-b px-6 py-4">{order.customerName}</td>
          <td className="border-b px-6 py-4">Diamond bracelet</td>
          <td className="border-b px-6 py-4">{order.date}</td>
          <td className="border-b px-6 py-4">{order.total}</td>
          <td className="border-b px-6 py-4">Delivered</td>
        </motion.tr>
      ))}
    </>
  );
};

export default DeliveredOrdersTable;
