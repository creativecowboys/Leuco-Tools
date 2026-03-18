import React from 'react';

export default function TermsOfUse() {
    return (
        <div>
            <div className="bg-leuco-black py-24 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-4">TERMS OF USE</h1>
                    <p className="text-gray-400 font-medium">Last updated: January 1, 2024</p>
                </div>
            </div>

            <div className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="max-w-3xl prose prose-gray">
                    {[
                        {
                            title: '1. Acceptance of Terms',
                            body: 'By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this website\'s particular services, you shall be subject to any posted guidelines or rules applicable to such services.',
                        },
                        {
                            title: '2. Intellectual Property',
                            body: 'The content on this website, including text, graphics, logos, images, and software, is the property of LEUCO Tool Corporation and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without express written permission.',
                        },
                        {
                            title: '3. Use of Website',
                            body: 'You agree to use this website for lawful purposes only and in a manner that does not infringe the rights of others. You may not use this site to transmit harmful, offensive, or illegal content, or to engage in any activity that disrupts the operation of the site.',
                        },
                        {
                            title: '4. Disclaimer of Warranties',
                            body: 'This website is provided "as is" without warranty of any kind, express or implied. LEUCO Tool Corporation does not warrant that the site will be error-free or uninterrupted. Technical specifications are subject to change without notice.',
                        },
                        {
                            title: '5. Limitation of Liability',
                            body: 'LEUCO Tool Corporation shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website or the information contained herein.',
                        },
                        {
                            title: '6. Changes to Terms',
                            body: 'LEUCO Tool Corporation reserves the right to modify these terms at any time. Your continued use of the website following any changes constitutes your acceptance of the new terms.',
                        },
                        {
                            title: '7. Contact Information',
                            body: 'If you have questions about these Terms of Use, please contact us at info@leuco.com or call +1 (800) 433-0771.',
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
