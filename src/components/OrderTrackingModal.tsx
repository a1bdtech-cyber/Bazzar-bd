import React from 'react';
import { 
  X, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  Store, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { OrderStatus } from '../types';

export const OrderTrackingModal: React.FC = () => {
  const { selectedOrder, setSelectedOrder } = useShop();

  if (!selectedOrder) return null;

  const milestones: { status: OrderStatus; labelBn: string; descBn: string; isDone: boolean; isCurrent: boolean }[] = [
    {
      status: 'pending_confirmation',
      labelBn: 'অর্ডার গৃহীত হয়েছে',
      descBn: 'সিস্টেমে আপনার অর্ডার সফলভাবে নথিভুক্ত হয়েছে',
      isDone: true,
      isCurrent: selectedOrder.orderStatus === 'pending_confirmation'
    },
    {
      status: 'confirmed',
      labelBn: 'বিক্রেতা কর্তৃক নিশ্চিত',
      descBn: 'বিক্রেতা অর্ডার যাচাই ও অনুমোদন করেছেন',
      isDone: ['confirmed', 'processing', 'packed', 'shipped', 'out_for_delivery', 'delivered'].includes(selectedOrder.orderStatus),
      isCurrent: selectedOrder.orderStatus === 'confirmed'
    },
    {
      status: 'packed',
      labelBn: 'প্যাকেজিং ও কোয়ালিটি চেক সম্পন্ন',
      descBn: 'নিরাপদ প্যাকেজিং ও বারকোড লেবেল সংযুক্ত হয়েছে',
      isDone: ['packed', 'shipped', 'out_for_delivery', 'delivered'].includes(selectedOrder.orderStatus),
      isCurrent: selectedOrder.orderStatus === 'packed'
    },
    {
      status: 'shipped',
      labelBn: 'কুরিয়ার সার্ভিসে হস্তান্তর',
      descBn: selectedOrder.trackingNotes || 'ডেলিভারি পার্টনারের কাছে পার্সেল হস্তান্তর করা হয়েছে',
      isDone: ['shipped', 'out_for_delivery', 'delivered'].includes(selectedOrder.orderStatus),
      isCurrent: selectedOrder.orderStatus === 'shipped'
    },
    {
      status: 'delivered',
      labelBn: 'সফলভাবে ডেলিভার্ড',
      descBn: 'গ্রাহকের নিকট পণ্য পৌঁছে দেওয়া হয়েছে',
      isDone: selectedOrder.orderStatus === 'delivered',
      isCurrent: selectedOrder.orderStatus === 'delivered'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 text-slate-800">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-teal-900 text-white rounded-t-3xl">
          <div className="flex items-center gap-2">
            <Package className="w-6 h-6 text-amber-300" />
            <div>
              <h2 className="font-bold text-base sm:text-lg font-['Hind_Siliguri']">
                লাইভ অর্ডার ট্র্যাকিং: {selectedOrder.orderNumber}
              </h2>
              <p className="text-xs text-teal-200">অর্ডারের তারিখ: {selectedOrder.orderDate}</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedOrder(null)}
            className="p-1.5 rounded-full hover:bg-teal-800 text-teal-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          
          {/* Status Badge */}
          <div className="p-4 bg-teal-50 rounded-2xl border border-teal-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-teal-700 uppercase tracking-wider block">বর্তমান অবস্থা:</span>
              <span className="text-base font-bold text-teal-950">
                {selectedOrder.orderStatus === 'pending_confirmation' && 'অর্ডার নিশ্চিতকরণের অপেক্ষায়'}
                {selectedOrder.orderStatus === 'confirmed' && 'অর্ডার নিশ্চিত হয়েছে'}
                {selectedOrder.orderStatus === 'packed' && 'প্যাকিং সম্পন্ন'}
                {selectedOrder.orderStatus === 'shipped' && 'ডেলিভারির পথে (Shipped)'}
                {selectedOrder.orderStatus === 'delivered' && 'ডেলিভারি সম্পন্ন হয়েছে'}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-semibold text-slate-500 block">পেমেন্ট স্ট্যাটাস:</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${selectedOrder.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                {selectedOrder.paymentStatus === 'paid' ? 'পরিশোধিত' : 'ক্যাশ অন ডেলিভারি (বকেয়া)'}
              </span>
            </div>
          </div>

          {/* Timeline Milestones */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">ডেলিভারি অগ্রগতি টাইমলাইন</h3>
            
            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {milestones.map((m, idx) => (
                <div key={idx} className="relative flex items-start gap-3">
                  <div className={`absolute -left-6 mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    m.isDone 
                      ? 'bg-teal-700 border-teal-700 text-white' 
                      : 'bg-white border-slate-300 text-slate-300'
                  }`}>
                    {m.isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3 h-3" />}
                  </div>
                  <div>
                    <h4 className={`text-xs sm:text-sm font-bold ${m.isDone ? 'text-slate-900' : 'text-slate-400'}`}>
                      {m.labelBn}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{m.descBn}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Items Snapshot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-teal-700" /> ডেলিভারি ঠিকানা
              </h4>
              <p className="font-semibold text-slate-700">{selectedOrder.shippingAddress.fullName}</p>
              <p className="text-slate-600">{selectedOrder.shippingAddress.phone}</p>
              <p className="text-slate-500 text-[11px] mt-1">
                {selectedOrder.shippingAddress.areaDetails}, {selectedOrder.shippingAddress.thana}, {selectedOrder.shippingAddress.district}, {selectedOrder.shippingAddress.division}
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-teal-700" /> বিলিং সারাংশ
              </h4>
              <div className="space-y-1 text-slate-600">
                <div className="flex justify-between">
                  <span>উপমোট:</span>
                  <span>৳{selectedOrder.subtotal.toLocaleString('bn-BD')}</span>
                </div>
                <div className="flex justify-between">
                  <span>ডেলিভারি চার্জ:</span>
                  <span>৳{selectedOrder.deliveryCharge.toLocaleString('bn-BD')}</span>
                </div>
                {selectedOrder.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>ছাড়:</span>
                    <span>-৳{selectedOrder.discountAmount.toLocaleString('bn-BD')}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-slate-200">
                  <span>সর্বমোট প্রদেয়:</span>
                  <span>৳{selectedOrder.totalPayable.toLocaleString('bn-BD')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ordered Products items list */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700">অর্ডারের আইটেমসমূহ:</h4>
            <div className="space-y-2">
              {selectedOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <img src={item.product.images[0]} alt={item.product.titleBn} className="w-12 h-12 rounded-lg object-cover bg-white" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 truncate">{item.product.titleBn}</p>
                    <p className="text-[11px] text-slate-500">
                      পরিমাণ: {item.quantity.toLocaleString('bn-BD')} টি {item.selectedVariant && `• ${item.selectedVariant.name}`}
                    </p>
                  </div>
                  <span className="font-bold text-teal-900 shrink-0">
                    ৳{((item.selectedVariant?.salePrice || item.product.salePrice || item.product.regularPrice) * item.quantity).toLocaleString('bn-BD')}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
          <button
            onClick={() => setSelectedOrder(null)}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
          >
            বন্ধ করুন
          </button>
        </div>

      </div>
    </div>
  );
};
