const fs = require('fs');
const path = require('path');

async function testBookingLarge() {
    // Create a dummy 6MB buffer
    const imgBuffer = Buffer.alloc(6 * 1024 * 1024, 'a');

    const formData = new FormData();
    formData.append('service', 'umzug');
    formData.append('name', 'Test');
    formData.append('email', 'test@example.com');
    formData.append('phone', '123456');
    formData.append('file', new Blob([imgBuffer], { type: 'image/jpeg' }), 'test_large.jpg');

    try {
        console.log("Sending 6MB payload...");
        const res = await fetch('http://localhost:3000/api/bookings', {
            method: 'POST',
            body: formData
        });
        const text = await res.text();
        console.log("Status:", res.status);
        console.log("Response:", text.substring(0, 100));
    } catch(e) {
        console.error("Fetch failed:", e.message);
    }
}

testBookingLarge();
