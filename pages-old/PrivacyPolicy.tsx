import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div>
            <div className="bg-leuco-black py-24 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-4">PRIVACY POLICY</h1>
                    <p className="text-gray-400 font-medium">Last updated: January 1, 2024</p>
                </div>
            </div>

            <div className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="max-w-3xl">
                    {[
                        {
                            title: '1. Information We Collect',
                            body: 'We collect information that you provide directly to us, such as your name, email address, phone number, and company when you contact us, request a quote, or sign up for updates. We also automatically collect certain information when you visit our website, including your IP address, browser type, and pages visited.',
                        },
                        {
                            title: '2. How We Use Your Information',
                            body: 'We use the information we collect to respond to your inquiries, provide requested services, send product and service updates, improve our website and services, and comply with legal obligations. We do not sell or rent your personal information to third parties.',
                        },
                        {
                            title: '3. Cookies',
                            body: 'Our website uses cookies to enhance your browsing experience. Cookies are small text files stored on your device. You can control cookie settings through your browser preferences. Disabling some cookies may affect website functionality.',
                        },
                        {
                            title: '4. Information Sharing',
                            body: 'We may share your information with trusted service providers who assist us in operating our website and delivering our services, subject to confidentiality obligations. We may also disclose information as required by law or to protect our legal rights.',
                        },
                        {
                            title: '5. Data Security',
                            body: 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
                        },
                        {
                            title: '6. Your Rights',
                            body: 'You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at info@leuco.com.',
                        },
                        {
                            title: '7. Contact Us',
                            body: 'If you have questions about this Privacy Policy, please contact LEUCO Tool Corporation at info@leuco.com or +1 (800) 433-0771.',
                        },
                    ].map(({ title, body }, i) => (
                        <div key={i} className="mb-10">
                            <h2 className="text-xl font-black mb-4">{title}</h2>
                            <p className="text-gray-600 font-medium leading-relaxed">{body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
