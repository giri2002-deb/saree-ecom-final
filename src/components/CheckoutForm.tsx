
// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   CreditCard,
//   User,
//   Lock,
//   Calendar,
//   MapPin,
//   Phone,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// interface DeliveryInfo {
//   name: string;
//   address: string;
//   city: string;
//   state: string;
//   zip: string;
//   phone: string;
// }

// interface Product {
//   name: string;
//   quantity: number;
//   price: number;
//   image?: string;
// }

// const CheckoutForm: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const selectedProduct = location.state?.product;

//   useEffect(() => {
//     if (!selectedProduct) {
//       alert("No product selected. Redirecting...");
//       navigate("/");
//     }
//   }, [selectedProduct, navigate]);

//   const products: Product[] = selectedProduct
//     ? [{ ...selectedProduct, quantity: 1 }]
//     : [];

//   const [currentStep, setCurrentStep] = useState<
//     "delivery" | "confirmation" | "payment" | "finish"
//   >("delivery");
//   const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
//   const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
//     name: "",
//     address: "",
//     city: "",
//     state: "",
//     zip: "",
//     phone: "",
//   });

//   const handleChange = (field: keyof DeliveryInfo, value: string) => {
//     setDeliveryInfo({ ...deliveryInfo, [field]: value });
//   };

//   const formatINR = (amount: number) =>
//     `₹${amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
//   const totalAmount = products.reduce(
//     (acc, p) => acc + p.price * p.quantity,
//     0
//   );

//   const handleNext = () => {
//     if (
//       currentStep === "delivery" &&
//       Object.values(deliveryInfo).some((val) => val.trim() === "")
//     ) {
//       alert("Please fill in all fields.");
//       return;
//     }
//     setCurrentStep((prev) =>
//       prev === "delivery"
//         ? "confirmation"
//         : prev === "confirmation"
//         ? "payment"
//         : "finish"
//     );
//   };

//   const handleBack = () => {
//     setCurrentStep((prev) =>
//       prev === "payment"
//         ? "confirmation"
//         : prev === "confirmation"
//         ? "delivery"
//         : prev
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
//       >
//         {/* Left Panel */}
//         <motion.div
//           initial={{ opacity: 0, x: -30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.4 }}
//           className="bg-white p-6 rounded-xl shadow-md"
//         >
//           <h1 className="text-2xl font-bold mb-4 capitalize text-black">
//             {currentStep} Step
//           </h1>

//           <AnimatePresence mode="wait">
//             {currentStep === "delivery" && (
//               <motion.div
//                 key="delivery"
//                 initial={{ opacity: 0, x: 40 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -40 }}
//                 transition={{ duration: 0.3 }}
//                 className="space-y-4"
//               >
//                 <input
//                   placeholder="Full Name"
//                   value={deliveryInfo.name}
//                   onChange={(e) => handleChange("name", e.target.value)}
//                   className="w-full p-3 border rounded"
//                 />
//                 <div className="relative">
//                   <input
//                     placeholder="Full Address"
//                     value={deliveryInfo.address}
//                     onChange={(e) => handleChange("address", e.target.value)}
//                     className="w-full p-3 border rounded pl-10"
//                   />
//                   <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 </div>
//                 <div className="flex gap-4">
//                   <input
//                     placeholder="City"
//                     value={deliveryInfo.city}
//                     onChange={(e) => handleChange("city", e.target.value)}
//                     className="w-1/2 p-3 border rounded"
//                   />
//                   <input
//                     placeholder="State"
//                     value={deliveryInfo.state}
//                     onChange={(e) => handleChange("state", e.target.value)}
//                     className="w-1/2 p-3 border rounded"
//                   />
//                 </div>
//                 <div className="flex gap-4">
//                   <input
//                     placeholder="ZIP"
//                     value={deliveryInfo.zip}
//                     onChange={(e) => handleChange("zip", e.target.value)}
//                     className="w-1/2 p-3 border rounded"
//                   />
//                   <div className="relative w-1/2">
//                     <input
//                       placeholder="Phone"
//                       value={deliveryInfo.phone}
//                       onChange={(e) => handleChange("phone", e.target.value)}
//                       className="w-full p-3 border rounded pl-10"
//                     />
//                     <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                   </div>
//                 </div>
//               </motion.div>
//             )}

//             {currentStep === "confirmation" && (
//               <motion.div
//                 key="confirmation"
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -30 }}
//               >
//                 <h2 className="text-lg font-semibold">Review Delivery Info</h2>
//                 <ul className="text-sm text-gray-700 space-y-1 mt-2">
//                   <li>
//                     <strong>Name:</strong> {deliveryInfo.name}
//                   </li>
//                   <li>
//                     <strong>Address:</strong> {deliveryInfo.address}
//                   </li>
//                   <li>
//                     <strong>City:</strong> {deliveryInfo.city}
//                   </li>
//                   <li>
//                     <strong>State:</strong> {deliveryInfo.state}
//                   </li>
//                   <li>
//                     <strong>ZIP:</strong> {deliveryInfo.zip}
//                   </li>
//                   <li>
//                     <strong>Phone:</strong> {deliveryInfo.phone}
//                   </li>
//                 </ul>
//               </motion.div>
//             )}

//             {currentStep === "payment" && (
//               <motion.div
//                 key="payment"
//                 initial={{ opacity: 0, x: 30 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -30 }}
//                 transition={{ duration: 0.3 }}
//                 className="space-y-6"
//               >
//                 <div className="flex gap-4">
//                   <div
//                     onClick={() => setPaymentMethod("card")}
//                     className={`flex-1 flex items-center gap-2 justify-center border rounded p-4 cursor-pointer ${
//                       paymentMethod === "card"
//                         ? "border-black bg-gray-100"
//                         : "border-gray-300"
//                     }`}
//                   >
//                     <CreditCard className="w-5 h-5" />
//                     Card
//                   </div>
//                   <div
//                     onClick={() => setPaymentMethod("paypal")}
//                     className={`flex-1 flex items-center gap-2 justify-center border rounded p-4 cursor-pointer ${
//                       paymentMethod === "paypal"
//                         ? "border-black bg-gray-100"
//                         : "border-gray-300"
//                     }`}
//                   >
//                     <svg
//                       className="w-5 h-5"
//                       viewBox="0 0 24 24"
//                       fill="currentColor"
//                     >
//                       <path d="M6.5 3h10.7c2.5 0 4.2 2.3 3.7 4.7l-1.1 6.3c-.3 1.9-1.9 3.2-3.7 3.2h-2.9l-.4 2.3h-4l.3-2.2H7.5L6.8 20H3l3.5-17zM16 12c.6 0 1.1-.4 1.2-1l.8-4.5c.1-.4-.2-.8-.7-.8H11l-1.2 6.3H16z" />
//                     </svg>
//                     PayPal
//                   </div>
//                 </div>

//                 {paymentMethod === "card" && (
//                   <motion.form
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="space-y-4"
//                   >
//                     <div className="flex gap-4">
//                       <div className="w-1/2 relative">
//                         <input
//                           placeholder="Cardholder Name"
//                           className="w-full p-3 border rounded pl-10"
//                         />
//                         <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                       </div>
//                       <div className="w-1/2 relative">
//                         <input
//                           placeholder="Card Number"
//                           className="w-full p-3 border rounded pl-10"
//                         />
//                         <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                       </div>
//                     </div>
//                     <div className="flex gap-4">
//                       <div className="w-1/2 relative">
//                         <input
//                           placeholder="MM / YY"
//                           className="w-full p-3 border rounded pl-10"
//                         />
//                         <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                       </div>
//                       <div className="w-1/2 relative">
//                         <input
//                           placeholder="CVV / CVC"
//                           className="w-full p-3 border rounded pl-10"
//                         />
//                         <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                       </div>
//                     </div>
//                   </motion.form>
//                 )}
//               </motion.div>
//             )}

//             {currentStep === "finish" && (
//               <motion.div
//                 key="finish"
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 transition={{ duration: 0.4 }}
//                 className="space-y-4"
//               >
//                 <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-sm">
//                   <h2 className="text-xl font-bold text-green-600 mb-1">
//                     ✅ Thank you, {deliveryInfo.name}!
//                   </h2>
//                   <p className="text-sm text-gray-700">
//                     Your order has been placed successfully.
//                   </p>
//                 </div>

//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.2 }}
//                   className="bg-white p-4 rounded-lg shadow-md border"
//                 >
//                   <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                     Billing Summary
//                   </h3>

//                   <div className="text-sm text-gray-600 mb-4 space-y-1">
//                     <p>
//                       <strong>Name:</strong> {deliveryInfo.name}
//                     </p>
//                     <p>
//                       <strong>Phone:</strong> {deliveryInfo.phone}
//                     </p>
//                     <p>
//                       <strong>Address:</strong> {deliveryInfo.address},{" "}
//                       {deliveryInfo.city}, {deliveryInfo.state} -{" "}
//                       {deliveryInfo.zip}
//                     </p>
//                   </div>

//                   <div className="space-y-3 mb-4">
//                     {products.map((p, i) => (
//                       <div
//                         key={i}
//                         className="flex items-center justify-between border p-2 rounded-md"
//                       >
//                         <div className="flex items-center gap-3">
//                           <img
//                             src={p.image || "/placeholder.jpg"}
//                             alt={p.name}
//                             className="w-14 h-14 rounded object-cover border"
//                           />
//                           <div>
//                             <p className="font-medium text-sm">{p.name}</p>
//                             <p className="text-xs text-gray-500">
//                               Qty: {p.quantity}
//                             </p>
//                           </div>
//                         </div>
//                         <p className="text-sm font-semibold text-gray-700">
//                           {formatINR(p.price * p.quantity)}
//                         </p>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="border-t pt-3 flex justify-between text-gray-800 font-semibold text-base">
//                     <span>Total Paid</span>
//                     <span>{formatINR(totalAmount)}</span>
//                   </div>
//                 </motion.div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <div className="flex justify-between mt-6">
//             {currentStep !== "delivery" && (
//               <button
//                 onClick={handleBack}
//                 className="px-6 py-2 border border-black text-black rounded hover:bg-gray-100"
//               >
//                 Back
//               </button>
//             )}
//             {currentStep !== "finish" && (
//               <button
//                 onClick={handleNext}
//                 className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
//               >
//                 {currentStep === "payment" ? "Place Order" : "Next"}
//               </button>
//             )}
//           </div>
//         </motion.div>

//         {/* Right Panel */}
//         <motion.div
//           initial={{ opacity: 0, x: 30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.4 }}
//           className="bg-white p-6 rounded-xl shadow-md"
//         >
//           <h2 className="text-lg font-bold text-black mb-4">Order Summary</h2>
//           <ul className="space-y-4">
//             {products.map((product, i) => (
//               <li
//                 key={i}
//                 className="flex items-center gap-4 border p-2 rounded"
//               >
//                 <img
//                   src={product.image || "/placeholder.jpg"}
//                   className="w-16 h-16 object-cover rounded"
//                   alt="Product"
//                 />
//                 <div className="flex-1">
//                   <p className="text-sm font-medium">{product.name}</p>
//                   <p className="text-xs text-gray-500">
//                     Qty: {product.quantity}
//                   </p>
//                 </div>
//                 <p className="text-sm font-semibold">
//                   {formatINR(product.price * product.quantity)}
//                 </p>
//               </li>
//             ))}
//           </ul>
//           <div className="flex justify-between mt-4 border-t pt-3 font-semibold text-gray-700">
//             <span>Total</span>
//             <span>{formatINR(totalAmount)}</span>
//           </div>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default CheckoutForm;
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, User, Lock, Calendar, MapPin, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DeliveryInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image?: string;
  fabric?: string;
}

const CheckoutForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const cartItems = location.state?.cartItems;

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (product) {
      setProducts([{ ...product, quantity: 1 }]);
    } else if (cartItems && Array.isArray(cartItems)) {
      setProducts(cartItems.map((item: any) => ({
        ...item,
        quantity: item.quantity ?? 1,
      })));
    } else {
      alert('No product or cart items found. Redirecting...');
      navigate('/');
    }
  }, [product, cartItems, navigate]);

  const [currentStep, setCurrentStep] = useState<'delivery' | 'confirmation' | 'payment' | 'finish'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
  });

  const handleChange = (field: keyof DeliveryInfo, value: string) => {
    setDeliveryInfo({ ...deliveryInfo, [field]: value });
  };

  const formatINR = (amount: number) =>
    `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

  const totalAmount = products.reduce((acc, p) => acc + p.price * p.quantity, 0);

  const handleNext = () => {
    if (
      currentStep === 'delivery' &&
      Object.values(deliveryInfo).some((val) => val.trim() === '')
    ) {
      alert('Please fill in all fields.');
      return;
    }
    setCurrentStep((prev) =>
      prev === 'delivery'
        ? 'confirmation'
        : prev === 'confirmation'
        ? 'payment'
        : 'finish'
    );
  };

  const handleBack = () => {
    setCurrentStep((prev) =>
      prev === 'payment'
        ? 'confirmation'
        : prev === 'confirmation'
        ? 'delivery'
        : prev
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* LEFT PANEL */}
        <motion.div className="bg-white p-6 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold mb-4 capitalize text-black">
            {currentStep} Step
          </h1>

          <AnimatePresence mode="wait">
            {/* Delivery Step */}
            {currentStep === 'delivery' && (
              <motion.div
                key="delivery"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <input placeholder="Full Name" value={deliveryInfo.name} onChange={(e) => handleChange('name', e.target.value)} className="w-full p-3 border rounded" />
                <div className="relative">
                  <input placeholder="Full Address" value={deliveryInfo.address} onChange={(e) => handleChange('address', e.target.value)} className="w-full p-3 border rounded pl-10" />
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                </div>
                <div className="flex gap-4">
                  <input placeholder="City" value={deliveryInfo.city} onChange={(e) => handleChange('city', e.target.value)} className="w-1/2 p-3 border rounded" />
                  <input placeholder="State" value={deliveryInfo.state} onChange={(e) => handleChange('state', e.target.value)} className="w-1/2 p-3 border rounded" />
                </div>
                <div className="flex gap-4">
                  <input placeholder="ZIP" value={deliveryInfo.zip} onChange={(e) => handleChange('zip', e.target.value)} className="w-1/2 p-3 border rounded" />
                  <div className="relative w-1/2">
                    <input placeholder="Phone" value={deliveryInfo.phone} onChange={(e) => handleChange('phone', e.target.value)} className="w-full p-3 border rounded pl-10" />
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Confirmation Step */}
            {currentStep === 'confirmation' && (
              <motion.div key="confirmation" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}>
                <h2 className="text-lg font-semibold">Review Delivery Info</h2>
                <ul className="text-sm text-gray-700 space-y-1 mt-2">
                  {Object.entries(deliveryInfo).map(([key, val]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {val}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Payment Step */}
            {currentStep === 'payment' && (
              <motion.div key="payment" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="space-y-6">
                <div className="flex gap-4">
                  <div onClick={() => setPaymentMethod('card')} className={`flex-1 flex items-center gap-2 justify-center border rounded p-4 cursor-pointer ${paymentMethod === 'card' ? 'border-black bg-gray-100' : 'border-gray-300'}`}>
                    <CreditCard className="w-5 h-5" />
                    Card
                  </div>
                  <div onClick={() => setPaymentMethod('paypal')} className={`flex-1 flex items-center gap-2 justify-center border rounded p-4 cursor-pointer ${paymentMethod === 'paypal' ? 'border-black bg-gray-100' : 'border-gray-300'}`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.5 3h10.7c2.5 0 4.2 2.3 3.7 4.7l-1.1 6.3c-.3 1.9-1.9 3.2-3.7 3.2h-2.9l-.4 2.3h-4l.3-2.2H7.5L6.8 20H3l3.5-17zM16 12c.6 0 1.1-.4 1.2-1l.8-4.5c.1-.4-.2-.8-.7-.8H11l-1.2 6.3H16z" />
                    </svg>
                    PayPal
                  </div>
                </div>
              </motion.div>
            )}

            {/* Finish Step */}
            {currentStep === 'finish' && (
              <motion.div key="finish" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }} className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-sm">
                  <h2 className="text-xl font-bold text-green-600 mb-1">✅ Thank you, {deliveryInfo.name}!</h2>
                  <p className="text-sm text-gray-700">Your order has been placed successfully.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between mt-6">
            {currentStep !== 'delivery' && (
              <button onClick={handleBack} className="px-6 py-2 border border-black text-black rounded hover:bg-gray-100">
                Back
              </button>
            )}
            {currentStep !== 'finish' && (
              <button onClick={handleNext} className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800">
                {currentStep === 'payment' ? 'Place Order' : 'Next'}
              </button>
            )}
          </div>
        </motion.div>

        {/* RIGHT PANEL */}
        <motion.div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-bold text-black mb-4">Order Summary</h2>
          <ul className="space-y-4">
            {products.map((product, i) => (
              <li key={i} className="flex items-center gap-4 border p-2 rounded">
                <img src={product.image || '/placeholder.jpg'} className="w-16 h-16 object-cover rounded" alt="Product" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-gray-500">Qty: {product.quantity}</p>
                </div>
                <p className="text-sm font-semibold">{formatINR(product.price * product.quantity)}</p>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-4 border-t pt-3 font-semibold text-gray-700">
            <span>Total</span>
            <span>{formatINR(totalAmount)}</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CheckoutForm;
