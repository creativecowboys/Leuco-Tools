'use client';

import Script from 'next/script';

export default function AISearchBar() {
    return (
        <section style={{ backgroundColor: '#0B0D12' }}>
            <div
                style={{
                    maxWidth: '1440px',
                    margin: '0 auto',
                    padding: '0 3rem',
                }}
            >
                <div id="leuco-chat" />
            </div>

            <Script
                src="https://leuco-tools.replit.app/embed.js"
                data-mode="inline"
                data-target="#leuco-chat"
                data-max-width="980px"
                strategy="afterInteractive"
            />
        </section>
    );
}
