import React, { useState } from 'react';
import { ShoppingBag, Package, CheckCircle } from 'lucide-react';
import OrderCard from '../components/MyOrder/OrderCard';

const mockOrders = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    date: '2024-12-10',
    status: 'delivered',
    deliveryDate: '2024-12-15',
    total: 159.99,
    products: [
      {
        id: 'p1',
        name: 'Cowrie Shell Bracelet',
        price: 79.99,
        quantity: 1,
        image: 'https://img.drz.lazcdn.com/static/lk/p/fa5aa44bf0333c2bde83caf34c8f8ea9.jpg_720x720q80.jpg',
      },
      {
        id: 'p2',
        name: 'Sea Shell Earrings',
        price: 39.99,
        quantity: 2,
        image: 'https://content.instructables.com/FMV/OPR5/I916FEWJ/FMVOPR5I916FEWJ.jpg?auto=webp'
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102'
    }
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    date: '2024-12-18',
    status: 'shipped',
    total: 299.99,
    trackingNumber: 'TRK123456789',
    courierService: 'FedEx',
    courierUrl: 'https://www.fedex.com/fedextrack/?trknbr=TRK123456789',
    products: [
      {
        id: 'p3',
        name: 'Cowrie Shell Earrings',
        price: 299.99,
        quantity: 1,
        image: 'https://i.etsystatic.com/8631638/r/il/253304/3739954298/il_570xN.3739954298_o2jb.jpg'
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102'
    }
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    date: '2024-12-20',
    status: 'processing',
    total: 89.99,
    products: [
      {
        id: 'p4',
        name: 'Cone Shell Ring',
        price: 29.99,
        quantity: 2,
        image: 'https://i.etsystatic.com/36875758/r/il/c26f8a/5660862413/il_340x270.5660862413_3x83.jpg'
      },
      {
        id: 'p5',
        name: 'Multicolor beaded seashell anklet',
        price: 59.99,
        quantity: 1,
        image: 'https://classywomencollection.com/cdn/shop/products/Multicolor-beaded-seashell-anklet-on-ankle.jpg?v=1602692795'
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102'
    }
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    date: '2024-11-25',
    status: 'delivered',
    deliveryDate: '2024-11-30',
    total: 449.99,
    products: [
      {
        id: 'p6',
        name: 'Clover Necklace',
        price: 149.99,
        quantity: 1,
        image: 'https://i.ebayimg.com/images/g/vyUAAOSwAiVf3qQM/s-l1600.jpg',
        review: {
          rating: 5,
          comment: 'Excellent keyboard! Very responsive and great build quality.',
          date: '2024-12-01'
        }
      },
      {
        id: 'p7',
        name: 'Pink Beads Bracelet',
        price: 89.99,
        quantity: 1,
        image: 'https://www.azilaa.com/pics/Lotus-om-pink-gemstone-beaded-handmade-bracelet-42041_1_full.jpg'
      },
      {
        id: 'p8',
        name: 'Cone shell Earrings',
        price: 69.99,
        quantity: 3,
        image: 'https://i.etsystatic.com/25088563/r/il/c9a29a/2567827705/il_fullxfull.2567827705_thya.jpg'
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102'
    }
  }
];

function Myorders() {
  const [orders, setOrders] = useState(mockOrders);
  const [activeTab, setActiveTab] = useState('processing');

  const processingOrders = orders.filter(order => order.status === 'processing' || order.status === 'shipped');
  const deliveredOrders = orders.filter(order => order.status === 'delivered');

  const handleReviewSubmit = (orderId, productId, rating, comment) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? {
              ...order,
              products: order.products.map(product =>
                product.id === productId
                  ? {
                      ...product,
                      review: {
                        rating,
                        comment,
                        date: new Date().toISOString().split('T')[0]
                      }
                    }
                  : product
              )
            }
          : order
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-stone-100">
       {/* Header */}
      <div className="bg-white border-b shadow-sm border-stone-200">
        <div className="max-w-6xl px-4 py-6 mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-[#1b4965] to-[#0d3548] rounded-xl shadow-lg">
              <ShoppingBag className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-600">Track and manage your purchases</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl px-4 py-8 mx-auto">
        {/* Tab Navigation */}
        <div className="mb-8 bg-white border shadow-sm rounded-xl border-stone-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('processing')}
              className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 font-medium transition-all duration-200 rounded-l-xl ${
                activeTab === 'processing'
                  ? 'bg-gradient-to-r from-[#1b4965] to-[#0d3548] text-white shadow-sm'
                  : 'text-gray-600 hover:text-[#1b4965] hover:bg-stone-50'
              }`}
            >
              <Package size={20} />
              Processing Orders ({processingOrders.length})
            </button>
            <button
              onClick={() => setActiveTab('delivered')}
              className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 font-medium transition-all duration-200 rounded-r-xl ${
                activeTab === 'delivered'
                  ? 'bg-gradient-to-r from-[#1b4965] to-[#0d3548] text-white shadow-sm'
                  : 'text-gray-600 hover:text-[#1b4965] hover:bg-stone-50'
              }`}
            >
              <CheckCircle size={20} />
              Delivered Orders ({deliveredOrders.length})
            </button>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="space-y-6">
          {activeTab === 'processing' ? (
            processingOrders.length > 0 ? (
              processingOrders.map(order => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onReviewSubmit={handleReviewSubmit}
                />
              ))
            ) : (
              <div className="py-16 text-center">
                <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 rounded-full bg-stone-100">
                  <Package className="text-stone-400" size={32} />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">No Processing Orders</h3>
                <p className="text-gray-600">You don't have any orders being processed at the moment.</p>
              </div>
            )
          ) : (
            deliveredOrders.length > 0 ? (
              deliveredOrders.map(order => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onReviewSubmit={handleReviewSubmit}
                />
              ))
            ) : (
              <div className="py-16 text-center">
                <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 rounded-full bg-stone-100">
                  <CheckCircle className="text-stone-400" size={32} />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">No Delivered Orders</h3>
                <p className="text-gray-600">You don't have any delivered orders yet.</p>
              </div>
            )
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-3">
          <div className="p-6 bg-white border shadow-sm rounded-xl border-stone-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg">
                <Package className="text-orange-600" size={20} />
              </div>
              <span className="font-medium text-gray-900">Processing</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{processingOrders.length}</p>
            <p className="text-sm text-gray-600">Orders in progress</p>
          </div>

          <div className="p-6 bg-white border shadow-sm rounded-xl border-stone-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <span className="font-medium text-gray-900">Delivered</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{deliveredOrders.length}</p>
            <p className="text-sm text-gray-600">Successfully delivered</p>
          </div>

          <div className="p-6 bg-white border shadow-sm rounded-xl border-stone-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1b4965] to-[#0d3548] bg-opacity-10 rounded-lg flex items-center justify-center">
                <ShoppingBag className="text-[#b1cfe2]" size={20} />
              </div>
              <span className="font-medium text-gray-900">Total Orders</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
            <p className="text-sm text-gray-600">All time orders</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Myorders;
