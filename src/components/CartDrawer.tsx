import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, Plus, Minus, ArrowRight, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function formatMoney(amount: string, currencyCode: string): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
    }).format(parseFloat(amount));
}

export default function CartDrawer() {
    const { cart, isOpen, loading, closeCart, removeFromCart, updateQuantity } = useCart();
    const lines = cart?.lines.edges ?? [];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/50 z-[70]"
                        onClick={closeCart}
                    />

                    {/* Drawer */}
                    <motion.div
                        key="drawer"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[80] flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-leuco-black">
                            <div className="flex items-center gap-3">
                                <ShoppingCart size={20} className="text-leuco-purple" />
                                <span className="text-white font-black tracking-widest text-sm uppercase">
                                    Your Cart
                                </span>
                                {lines.length > 0 && (
                                    <span className="bg-leuco-purple text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                                        {lines.reduce((s, { node }) => s + node.quantity, 0)}
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={closeCart}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Line Items */}
                        <div className="flex-1 overflow-y-auto px-6 py-4">
                            {lines.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
                                    <ShoppingCart size={64} className="text-gray-200" />
                                    <div>
                                        <p className="font-black text-xl tracking-tight text-gray-800 mb-1">Your cart is empty</p>
                                        <p className="text-gray-500 text-sm font-medium">Add a product to get started.</p>
                                    </div>
                                    <Link
                                        to="/pages/tools"
                                        onClick={closeCart}
                                        className="bg-leuco-purple text-white font-black text-sm px-8 py-4 inline-flex items-center gap-2 hover:bg-leuco-black transition-colors"
                                    >
                                        SHOP NOW <ArrowRight size={16} />
                                    </Link>
                                </div>
                            ) : (
                                <ul className="divide-y divide-gray-100">
                                    {lines.map(({ node: line }) => {
                                        const image = line.merchandise.product.images.edges[0]?.node;
                                        const variantLabel = line.merchandise.title !== 'Default Title'
                                            ? line.merchandise.title
                                            : null;

                                        return (
                                            <motion.li
                                                key={line.id}
                                                layout
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, x: 40 }}
                                                className="py-5 flex gap-4"
                                            >
                                                {/* Product Image */}
                                                <div className="w-20 h-20 bg-gray-50 border border-gray-100 flex-shrink-0 overflow-hidden">
                                                    {image ? (
                                                        <img
                                                            src={image.url}
                                                            alt={image.altText ?? line.merchandise.product.title}
                                                            className="w-full h-full object-contain mix-blend-multiply"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                            <ShoppingCart size={24} />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Details */}
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-black text-sm leading-tight text-gray-900 truncate">
                                                        {line.merchandise.product.title}
                                                    </p>
                                                    {variantLabel && (
                                                        <p className="text-xs text-gray-500 font-medium mt-0.5">{variantLabel}</p>
                                                    )}
                                                    <p className="text-leuco-purple font-black text-sm mt-1">
                                                        {formatMoney(
                                                            line.cost.totalAmount.amount,
                                                            line.cost.totalAmount.currencyCode
                                                        )}
                                                    </p>

                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center gap-3 mt-3">
                                                        <div className="flex items-center border border-gray-200">
                                                            <button
                                                                disabled={loading || line.quantity <= 1}
                                                                onClick={() => updateQuantity(line.id, line.quantity - 1)}
                                                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 transition-colors"
                                                            >
                                                                <Minus size={12} />
                                                            </button>
                                                            <span className="w-8 text-center text-sm font-black">
                                                                {line.quantity}
                                                            </span>
                                                            <button
                                                                disabled={loading}
                                                                onClick={() => updateQuantity(line.id, line.quantity + 1)}
                                                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 transition-colors"
                                                            >
                                                                <Plus size={12} />
                                                            </button>
                                                        </div>
                                                        <button
                                                            disabled={loading}
                                                            onClick={() => removeFromCart(line.id)}
                                                            className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-40"
                                                            title="Remove item"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>

                        {/* Footer — Totals & Checkout */}
                        {lines.length > 0 && cart && (
                            <div className="border-t border-gray-100 px-6 py-6 space-y-4 bg-gray-50">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-black text-gray-500 tracking-widest uppercase">Subtotal</span>
                                    <span className="font-black text-xl text-gray-900">
                                        {formatMoney(
                                            cart.cost.subtotalAmount.amount,
                                            cart.cost.subtotalAmount.currencyCode
                                        )}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 font-medium">
                                    Shipping and taxes calculated at checkout.
                                </p>
                                <a
                                    href={cart.checkoutUrl}
                                    className="w-full bg-leuco-purple text-white font-black text-sm py-5 flex items-center justify-center gap-3 hover:bg-leuco-black transition-colors"
                                >
                                    PROCEED TO CHECKOUT <ArrowRight size={18} />
                                </a>
                                <button
                                    onClick={closeCart}
                                    className="w-full text-center text-xs font-bold text-gray-500 hover:text-leuco-purple transition-colors py-1"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
